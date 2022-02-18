import React from "react";
import CommentCard from "../ui/CommentCard";
import Link from "next/link";
import { CommentContext } from "./commentsection";
import AddReply from "./addreplyfrom";
import { useDetectCommentOutsideClick } from "./useCommentDetectClick";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

export default function TextComments(props) {
  const { userSession: session } = React.useContext(CommentContext);
  //===== modals state =====
  const [openCommentModal, setOpenCommentModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  //===== comment/reply menu dropdown state  =====
  const commentDropdownRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectCommentOutsideClick(
    commentDropdownRef,
    false
  );
  const commentDropdwn = () => {
    setIsActive(!isActive);
  };
  //===== comments props states, for main comment and replies =====
  const [commentReply, setCommentReply] = React.useState(props.comment);
  const [repliesComment, setRepliesComment] = React.useState(
    props.comment.repliesFound
  );
  //===== form state and action =====
  const [displayReplyForm, setDisplayReplyFrom] = React.useState("none");
  const replyFormState = { display: `${displayReplyForm}` };
  const formId = `hiddenInput_${props.comment._id}`;
  //===== action determines what function it will run on the backend =====
  let action = null;
  if (props.type === "ADD_REPLY") {
    action = props.type;
  }
  //===== card size is use for a visual presentation for what is a reply of a comment  =====
  let cardSize = 100;
  if (props.cardSize) {
    cardSize = props.cardSize - 2;
  }
  //===== sorts comments by date =====
  let repliesSorted = repliesComment.slice().reverse();
  const updateCommentReplies = (newReply) => {
    setRepliesComment([...repliesComment, newReply]);
  };
  //=====  opens drwopdown reply form =====
  const openCloseCommentReply = (e) => {
    e.preventDefault();

    if (displayReplyForm === "none") {
      setDisplayReplyFrom("block");
      return;
    }
    if (displayReplyForm === "block") {
      setDisplayReplyFrom("none");
      return;
    }
  };

  const openCommentModalBtn = () => {
    setOpenCommentModal(!openCommentModal);
  };

  return (
    <>
      {commentReply !== null && (
        <ul>
          <CommentCard
            commentReply={commentReply}
            cardStyle={props.cardStyle ? props.cardStyle : undefined}
            cardSize={props.cardSize ? props.cardSize : undefined}
          >
            <div className="comment-header flex justify-between pt-2">
              <span className="comment-info self-center text-sm text-gray-400">
                <Link href={"/user/" + commentReply.userProfile.id}>
                  <a className="text-sm font-semibold text-blue-300 hover:text-blue-400">
                    {commentReply.userProfile.name}
                  </a>
                </Link>
                <span className="comment-dot"> {"\u00b7"} </span>
                {new Date(commentReply.created).toDateString()}
              </span>
              <div className="comment-options flex justify-end">
                {session.user && (
                  <div className="">
                    <button
                      onClick={openCloseCommentReply}
                      className="reply-comment-btn flex h-8 w-8 items-center justify-end rounded-full"
                    >
                      <i className="far fa-comment-dots">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                      </i>
                    </button>
                  </div>
                )}

                {session.user &&
                  session.user.id === commentReply.userProfile.id && (
                    <div className="comment-dropdown-btn relative flex h-8 w-8 items-center justify-end rounded-full">
                      <i
                        onClick={commentDropdwn}
                        className="fas fa-ellipsis-v h-full w-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </i>

                      {/* dropdown menu */}

                      {/* <!-- ===== dropdown options for comment content ===== --> */}

                      <div
                        ref={commentDropdownRef}
                        className={`commentMenu ${
                          isActive ? "active" : "inactive"
                        } nav-dropdown-content absolute right-0 z-10 w-56 origin-top-right rounded-md border-2 border-gray-500 bg-gray-900 py-1`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <div onClick={commentDropdwn}>
                          {/* <!-- ===== edit btn ===== --> */}
                          <button
                            onClick={() => setOpenCommentModal(true)}
                            id=""
                            className="block w-full px-4 py-2 text-left font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                          >
                            Edit
                          </button>
                          {/* <!-- ===== delete comment btn =====  --> */}
                          <button
                            onClick={() => setShowDeleteModal(true)}
                            id="delete-comment"
                            className="delete-comment block w-full px-4 py-2 text-left font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                          >
                            Delete
                          </button>
                          {/* <!-- ===== edit comment modal ===== --> */}
                        </div>
                      </div>

                      {/* end of dropdown menu */}
                      <EditCommentModal
                        action={action}
                        openCommentModal={openCommentModal}
                        setOpenCommentModal={setOpenCommentModal}
                        comment={commentReply}
                        setCommentReply={setCommentReply}
                        commentId={commentReply._id}
                      />
                      <DeleteCommentModal
                        action={action}
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                        comment={commentReply.comment}
                        setCommentReply={setCommentReply}
                        commentId={commentReply._id}
                      />
                    </div>
                  )}
              </div>
            </div>
            <p className="py-2 text-gray-100" aria-label="user comment reply">
              {commentReply.comment}
            </p>
          </CommentCard>

          {session && action === null && (
            <AddReply
              updateComment={updateCommentReplies}
              commentId={commentReply._id}
              formStyle={replyFormState}
              formId={formId}
              openorclose={openCloseCommentReply}
              type={`REPLY_COMMENT`}
            />
          )}

          {session && action === "ADD_REPLY" && (
            <AddReply
              updateComment={updateCommentReplies}
              commentId={props.comment._id}
              formStyle={replyFormState}
              formId={formId}
              openorclose={openCloseCommentReply}
              type={action}
            />
          )}

          {/* {commentReply.repliesFound.length > 0 && (
        <TextComments comment={commentReply.repliesFound} />
      )} */}
          {/* recusive component */}
          {repliesSorted.map((reply) => (
            <TextComments
              key={reply._id}
              comment={reply}
              type={"ADD_REPLY"}
              cardStyle={"reply-container"}
              cardSize={cardSize}
            />
          ))}
        </ul>
      )}
    </>
  );
}
