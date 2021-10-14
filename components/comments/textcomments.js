import React from "react";
import CommentCard from "../ui/commentcard";
import ReplyComments from "./replycomments";
import Link from "next/link";
import { CommentContext } from "./commentsection";
import AddReply from "./addreplyfrom";
// import { useEffect } from "react/cjs/react.development";

export default function TextComments(props) {
  let cardSize = 100;
  if (props.cardSize) {
    cardSize = props.cardSize - 3;
  }
  const [commentReply, setCommentReply] = React.useState(props.comment);
  // console.log(commentReply);
  let action = null;
  if (props.type === "ADD_REPLY") {
    action = props.type;
  }

  const { userSession: session } = React.useContext(CommentContext);
  const [displayReplyForm, setDisplayReplyFrom] = React.useState("none");
  const replyFormState = { display: `${displayReplyForm}` };

  const formId = `hiddenInput_${props.comment._id}`;
  let repliesSorted = commentReply.repliesFound.slice().reverse();

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
                <i className="fas fa-ellipsis-v w-full h-full">
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
          updateComment={setCommentReply}
          commentId={commentReply._id}
          formStyle={replyFormState}
          formId={formId}
          openorclose={openCloseCommentReply}
          type={`REPLY_COMMENT`}
        />
      )}

      {session && action === "ADD_REPLY" && (
        <AddReply
          updateComment={setCommentReply}
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
