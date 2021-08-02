import React, { Fragment, useRef } from "react";

export default function Comments(props) {
  const commentRef = useRef();

  const expandTextareaComment = (e) => {
    const c_textContainer = document.getElementById("comment-submit-container");
    const hiddenBtn = document.getElementById("hidden-btn");

    hiddenBtn.style.display = "block";
    c_textContainer.classList.add("comment-submit-container");
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    console.log(commentRef.current.value);
  };
  return (
    <Fragment>
      <div id="comment-submit-container" className="mb-6">
        <form id="submit-comment-form" method="POST">
          <textarea
            ref={commentRef}
            onFocus={expandTextareaComment}
            id="comment-textarea"
            className="comment-textarea py-2 text-white bg-gray-700 pl-1 focus:outline-none border-gray-500 focus:bg-gray-900 focus:text-gray-300"
            rows="3"
            type="text"
            name="comment[text]"
            placeholder="Add to the discussion"
          ></textarea>
        </form>
        <button
          onClick={handleCommentSubmit}
          id="hidden-btn"
          data-url="/blogs/<%= blog._id %>/comments"
          className="hidden-btn rounded hover:text-white bg-indigo-500 hover:bg-indigo-600 p-2 mr-1.5"
        >
          submit
        </button>
      </div>
    </Fragment>
  );
}
