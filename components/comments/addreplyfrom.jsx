import React from "react";
import useFetch from "@/hooks/fetch";
import { getSession } from "next-auth/react";
import { CommentContext } from "./commentsection";
import { appToastContext } from "context/state";
import Button, { useBtnState } from "../ui/globalUI/Button";

export default function AddReply(props) {
  const { showToast } = React.useContext(appToastContext);
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
  ] = useBtnState(true, "Submit", "bg-indigo-900 text-gray-400", "block");

  const addReply = useFetch;
  const { title, postId } = React.useContext(CommentContext);
  const replyRef = React.useRef();
  const [displayReplyForm, setDisplayReplyFrom] = React.useState("none");
  const replyFormState = { display: `${displayReplyForm}` };
  const openCloseCommentReply = props.openorclose;
  const formStyle = props.formStyle;

  // const formId = `hiddenInput_${props.comment._id}`;

  const enableReplyBtn = (e) => {
    e.preventDefault();
    if (replyRef.current.value !== "") {
      setBtnDisabled(false);
      setBtnColor("hover:bg-indigo-400 bg-indigo-500");
      return;
    } else {
      setBtnDisabled(true);
      setBtnColor("bg-indigo-900 text-gray-400");
      return;
    }
  };

  const submitReplyHandler = async (e) => {
    e.preventDefault();
    const session = await getSession(props);
    // const type = props.type;
    const data = {
      reply: replyRef.current.value,
      userProfile: {
        id: session.user.id,
        name: session.user.name,
        profileImage: session.user.image,
        profileGenericPic: session.user.genericImage,
      },
      postUrl: {
        address: `/post/${postId}`,
        title: title,
      },
      postId: postId,
      commentId: props.commentId,
      originalCommentId: props.originalCommentId,
      type: props.type,
    };

    const res = await addReply("POST", "/api/comments/addcomment", data);
    if (res.data) {
      setBtnDisabled(true), setBtnColor("bg-indigo-900 text-gray-400");
      showToast("success", "Your reply has been added.");
      props.updateComment(res.data);
      replyRef.current.value = "";
      stopBtnAnimate("addReplyForm");
      openCloseCommentReply(e);
    }
  };

  return (
    <aside
      id={props.formId}
      style={formStyle}
      className="comment-submit-container mb-4 hidden"
    >
      <form id="submit-reply-form" method="POST">
        {/* <!-- <input type="text" name="commentReply"> --> */}
        <textarea
          ref={replyRef}
          onChange={enableReplyBtn}
          id="reply-textarea"
          className="submit-reply-form comment-textarea border-gray-500 py-2 pl-1 focus:outline-none dark:bg-gray-700 dark:focus:bg-gray-900 dark:focus:text-gray-300"
          autoComplete="off"
          rows="3"
          type="text"
          name="commentReply"
          placeholder="Add to the discussion"
        ></textarea>
      </form>
      <div className="flex justify-between p-2 pt-2">
        <Button
          label={"Cancel"}
          className={`rounded p-1.5 font-semibold hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-700 `}
          handleClick={openCloseCommentReply}
          disabled={false}
          idTag={"addReplyForm"}
          btnType={"CANCEL"}
        />
        {/* <button
          onClick={openCloseCommentReply}
          id="cancelReplyBtn"
          className='reply-button mr-1.5" rounded bg-red-500 p-2 hover:bg-red-600 hover:text-white'
        >
          cancel
        </button> */}
        <Button
          label={label}
          className={`${btnVisibility} ${btnColor} rounded p-1.5 font-semibold`}
          handleClick={submitReplyHandler}
          disabled={btnDisabled}
          idTag={"addReplyForm"}
        />
        {/* <button
          onClick={submitReplyHandler}
          id="replyBtn"
          data-url="/blogs/<%= blog._id %>/comments/<%= comments._id %>"
          className="reply-button mr-1.5 rounded bg-indigo-500 p-2 hover:bg-indigo-600 hover:text-white"
        >
          submit
        </button> */}
      </div>
    </aside>
  );
}
