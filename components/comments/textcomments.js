import React from "react";
import CommentCard from "../ui/commentcard";
import ReplyComments from "./replycomments";
import Link from "next/link";
import { CommentContext } from "./commentsection";
import AddReply from "./addreplyfrom";
import { useDetectOutsideClick } from "@/components/ui/useDetectClick";
// import EditCommentModal from "./EditCommentModal";
// import { useEffect } from "react/cjs/react.development";

export default function TextComments(props) {
  const [openCommentModal, setOpenCommentModal] = React.useState(false);
  // console.log(props.comment);
  let cardSize = 100;
  if (props.cardSize) {
    cardSize = props.cardSize - 2;
  }
  const commentDropdownRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(
    commentDropdownRef,
    false
  );
  const [commentReply, setCommentReply] = React.useState(props.comment);
  const [repliesComment, setRepliesComment] = React.useState(
    props.comment.repliesFound
  );
  // console.log(repliesComment);
  // console.log(commentReply);
  const updateCommentReplies = (newReply) => {
    // console.log(newReply);
    setRepliesComment([...repliesComment, newReply]);
    // props.comment.push(newReply);
    // commentReply.push(newReply);
    // setCommentReply(commentReply, newReply);
    console.log(repliesComment);
  };
  // console.log(commentReply);
  let action = null;
  if (props.type === "ADD_REPLY") {
    action = props.type;
  }

  const { userSession: session } = React.useContext(CommentContext);
  const [displayReplyForm, setDisplayReplyFrom] = React.useState("none");
  const replyFormState = { display: `${displayReplyForm}` };

  const formId = `hiddenInput_${props.comment._id}`;
  let repliesSorted = repliesComment.slice().reverse();
  // console.log(commentReply);

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

  const commentDropdwn = () => {
    setIsActive(!isActive);
  };
  const openCommentModalBtn = () => {};

  return (
    <ul>
      <CommentCard
        commentReply={commentReply}
        cardStyle={props.cardStyle ? props.cardStyle : undefined}
        cardSize={props.cardSize ? props.cardSize : undefined}
      >
        <div className="comment-header flex justify-between pt-2">
          <span className="comment-info text-sm text-gray-400 self-center">
            <Link
              href={"/post/user/userprofile/" + commentReply.userProfile.id}
            >
              <a className="text-sm text-blue-300 hover:text-blue-400 font-semibold">
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
                  className="reply-comment-btn rounded-full h-8 w-8 flex items-center justify-end"
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

            {session.user && session.user.id === commentReply.userProfile.id && (
              <div className="relative comment-dropdown-btn rounded-full h-8 w-8 flex items-center justify-end">
                <i
                  onClick={commentDropdwn}
                  className="fas fa-ellipsis-v w-full h-full"
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
                  className={`commentMenu ${
                    isActive ? "active" : "inactive"
                  } z-10 origin-top-right absolute right-0 w-56 rounded-md py-1 bg-gray-900 border-2 border-gray-500 nav-dropdown-content`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <div>
                    {/* <!-- ===== edit btn ===== --> */}
                    <button
                      id=""
                      className="block w-full text-left px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    {/* <!-- ===== delete comment btn =====  --> */}
                    <button
                      id="delete-comment"
                      className="delete-comment block w-full text-left px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                    >
                      Delete
                    </button>
                    {/* <!-- ===== edit comment modal ===== --> */}
                    <div
                      style={{ display: "none" }}
                      className="z-20 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50"
                    >
                      {/* <!-- ===== modal ===== --> */}
                      <div className="bg-gray-800 border-2 border-gray-500 rounded modal">
                        {/* <!-- ===== modal header ===== --> */}
                        <div className="border-b px-4 py-2 flex justify-between items-center">
                          <h3 className="font-semibold text-lg">
                            Edit Comment
                          </h3>
                          <button className="">&cross;</button>
                        </div>
                        {/* <!-- ===== modal body ===== --> */}
                        <div className="p-3">
                          <form id="<%= comments.id %>">
                            <div className="">
                              <textarea
                                id="saveCommentBtn"
                                className="comment-textarea py-2 text-white bg-gray-700 rounded-md pl-1 focus:outline-none border border-gray-500 focus:border-purple-800 focus:bg-gray-900 focus:text-gray-300"
                                autoComplete="off"
                                rows="3"
                                type="text"
                                name="comment[text]"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="flex justify-end items-center w-100 border-t p-3">
                          <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1">
                            Cancel
                          </button>
                          <button
                            data-action="/blogs/<%= blog._id %>/comments/<%= comments._id %>"
                            className="save-comment-btn bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <!-- ===== end of edit comment modal ===== --> */}
                  </div>
                </div>

                {/* end of dropdown menu */}
                {/* <EditCommentModal /> */}
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
  );
}
