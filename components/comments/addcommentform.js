import React, { Fragment, useRef } from "react";
import { getSession } from "next-auth/client";
import useFetch from "@/hooks/fetch";
import { CommentContext } from "./commentsection";

function Comments(props) {
  const addComment = useFetch;
  const { setPostComments } = React.useContext(CommentContext);
  // console.log(props.context);
  const commentRef = useRef();

  const expandTextareaComment = (e) => {
    const c_textContainer = document.getElementById("comment-submit-container");
    const hiddenBtn = document.getElementById("hidden-btn");

    hiddenBtn.style.display = "block";
    c_textContainer.classList.add("comment-submit-container");
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const session = await getSession(props);
    const type = `ADD_COMMENT`;
    const data = {
      comment: commentRef.current.value,
      userProfile: {
        id: session.user.id,
        name: session.user.name,
        profileImage: session.user.image,
        profileGenericPic: session.user.genericImage,
      },
      postUrl: {
        address: `/post/${props.postId}`,
        title: props.title,
      },
      postId: props.postId,
      type,
    };

    const res = await addComment("POST", "/api/comments/addcomment", data);
    if (res.data) {
      setPostComments(res.data);
      commentRef.current.value = "";
    }
    // console.log(res.data);
  };
  //=====  =====
  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   const session = await getSession(props);
  //   // console.log(session);

  //   const res = await fetch("/api/comments/addcomment", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       comment: commentRef.current.value,
  //       userProfile: {
  //         id: session.user.id,
  //         name: session.user.name,
  //         profileImage: session.user.image,
  //         profileGenericPic: session.user.genericImage,
  //       },
  //       postUrl: {
  //         address: `/post/${props.postId}`,
  //         title: props.title,
  //       },
  //       postId: props.postId,
  //     }),
  //   });
  //   // Await for data for any desirable next steps
  //   const data = await res.json();
  //   // props.updateComponent();
  //   // console.log(data);

  //   console.log(commentRef.current.value);
  // };
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
export default Comments;
