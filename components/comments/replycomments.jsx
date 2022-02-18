import React from "react";

export default function ReplyComments(props) {
  console.log(props.reply);
  return (
    <>
      <div className="reply-container mb-3 rounded-lg border border-gray-600 border-opacity-50 py-0 px-5">
        <div className="comment-header flex justify-between pt-2">
          <h6 className="self-center text-sm text-gray-400">
            <a
              href="/blogs/userprofile/<%= reply.profile %>"
              className="text-sm font-semibold text-blue-300 hover:text-blue-400"
            >
              {props.reply.userProfile.name}
            </a>
            <span className="comment-dot"> {"\u00b7"} </span>
            <span>{new Date(props.reply.created).toDateString()}</span>
          </h6>
        </div>
        <p className="py-2 text-gray-100" aria-label="user comment reply">
          {props.reply.reply}
        </p>
      </div>

      {props.reply.repliesFound.length > 0 && (
        <ReplyComments reply={props.reply.foundReplies} />
      )}
    </>
  );
}
