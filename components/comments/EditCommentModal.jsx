import React from "react";

export default function EditCommentModal(props) {
  return (
    // <!-- ===== edit comment modal ===== -->
    <div
      style="display: none;"
      className="z-20 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      {/* <!-- ===== modal ===== --> */}
      <div className="bg-gray-800 border-2 border-gray-500 rounded modal">
        {/* <!-- ===== modal header ===== --> */}
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Edit Comment</h3>
          <button className="">&cross;</button>
        </div>
        {/* <!-- ===== modal reply body ===== --> */}
        <div className="p-3">
          <form id="<%= reply._id %>">
            <div className="">
              <textarea
                id="update-reply-comment"
                className="comment-textarea py-2 text-white bg-gray-700 rounded-md pl-1 focus:outline-none border border-gray-500 focus:border-purple-800 focus:bg-gray-900 focus:text-gray-300"
                autoComplete="off"
                rows="3"
                type="text"
                name="comment[text]"
              >
                {props.comment.comment}
              </textarea>
            </div>
          </form>
        </div>
        <div className="flex justify-end items-center w-100 border-t p-3">
          <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1">
            Cancel
          </button>
          <button
            id="update-reply-btn"
            data-action="/blogs/<%= blog._id %>/<%= comments._id %>/<%= reply._id %>"
            className="update-reply-btn bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    // <!-- ===== end of edit comment modal ===== -->
  );
}
