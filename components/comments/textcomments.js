import React, { Fragment } from "react";
import CommentCard from "../ui/commentcard";
import ReplyComments from "./replycomments";

export default function TextComments(props) {
  return (
    <div>
      <CommentCard>
        <div className="comment-header flex justify-between pt-2">
          <span className="comment-info text-sm text-gray-400 self-center">
            <a
              href="/blogs/userprofile/<%= comments.profile %>"
              className="text-sm text-blue-300 hover:text-blue-400 font-semibold"
            >
              {props.comment.userProfile.user.name}
            </a>
            <span className="comment-dot"> {"\u00b7"} </span>
            {new Date(props.comment.created).toDateString()}
          </span>
        </div>
        <p className="py-2 text-gray-100" aria-label="user comment reply">
          {props.comment.comment}
        </p>
      </CommentCard>
      {props.comment.replies.map((reply) => (
        <ReplyComments key={reply._id} reply={reply} />
      ))}
    </div>
  );
}
