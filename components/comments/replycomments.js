import React from "react";
import useFetch from "@/hooks/fetch";

export default function ReplyComments(props) {
  console.log(props.reply);
  return (
    <>
      <div className="reply-container mb-3 py-0 px-5 rounded-lg border-opacity-50 border border-gray-600">
        <div className="comment-header flex justify-between pt-2">
          <h6 className="text-sm text-gray-400 self-center">
            <a
              href="/blogs/userprofile/<%= reply.profile %>"
              className="text-sm text-blue-300 hover:text-blue-400 font-semibold"
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
