import React, { Fragment, useRef } from "react";
// import { getSession } from "next-auth/react";
import useFetch from "@/hooks/fetch";
import { CommentContext } from "./commentsection";
import { appToastContext } from "context/state";
import Button, { useBtnState } from "../ui/Button";
// import { stopBtnAnimate } from "@/components/ui/Button";
// import useBtnState from "@/hooks/useBtnState";

function Comments(props) {
  const addComment = useFetch;
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
    btnVisibility,
    setBtnVisibility,
  ] = useBtnState(true, "Comment", "bg-slate-700 text-gray-400", "block");
  const { setPostComments } = React.useContext(CommentContext);
  const { showToast, userSession } = React.useContext(appToastContext);
  // console.log(props.context);
  const commentRef = useRef();
  // const [disableBtn, setDisableBtn] = React.useState(true);
  // const [label, setLabel] = React.useState("Save New Password");
  // const [btnColor, setBtnColor] = React.useState("bg-slate-700");
  // const [btnVisibility, setBtnVisibility] = React.useState("hidden-btn");

  const expandTextareaComment = (e) => {
    const c_textContainer = document.getElementById("comment-submit-container");
    const hiddenBtn = document.getElementById("hidden-btn");
    setBtnVisibility("block");
    // hiddenBtn.style.display = "block";
    c_textContainer.classList.add("comment-submit-container");
  };

  //===== function to enable btn =====
  const enableCommentSubmitBtn = (e) => {
    e.preventDefault();
    if (commentRef.current.value !== "") {
      // console.log(commentRef.current.value);
      setBtnDisabled(false);
      setBtnColor("bg-indigo-500 text-white hover:bg-indigo-600");
      return;
    } else {
      // if(disabledBtn !== true)
      setBtnDisabled(true);
      setBtnColor("bg-slate-700 text-gray-400");
      return;
    }
  };

  //===== function to post comment =====
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // setLabel("Commenting...");
    const session = userSession;
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
      let message = "Comment has been added!";
      showToast("success", message);
      setPostComments(res.data);
      commentRef.current.value = "";
      setBtnDisabled(true);
      setLabel("Comment");
      setBtnColor("bg-slate-700");
      stopBtnAnimate("mainAddCommentForm");
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
      {!userSession ? (
        <p>
          <button
            id="loginbtn"
            className="mb-2 font-medium text-blue-300 focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              props.setShowLoginModal(true);
            }}
          >
            Sign in
          </button>{" "}
          to join the discussion.
        </p>
      ) : (
        <div
          id="comment-submit-container"
          className="comment-submit-container mb-6"
        >
          <form id="submit-comment-form" method="POST">
            <textarea
              ref={commentRef}
              onChange={enableCommentSubmitBtn}
              id="comment-textarea"
              className="comment-textarea border-gray-500 py-2 pl-1 focus:outline-none dark:bg-gray-700 dark:focus:bg-gray-900 dark:focus:text-gray-300"
              rows="3"
              type="text"
              name="comment[text]"
              placeholder="Add to the discussion"
            ></textarea>
          </form>

          <Button
            label={label}
            className={`${btnVisibility} ${btnColor} ml-2 mr-1.5 mt-2 mb-2 rounded  p-2`}
            disabled={btnDisabled}
            idTag={"mainAddCommentForm"}
            handleClick={handleCommentSubmit}
          />

          {/*old btn style  */}
          {/* <button
            onClick={handleCommentSubmit}
            id="hidden-btn"
            className="hidden-btn mr-1.5 rounded bg-indigo-500 p-2 hover:bg-indigo-600 hover:text-white"
          >
            submit
          </button> */}
        </div>
      )}
    </Fragment>
  );
}
export default Comments;
