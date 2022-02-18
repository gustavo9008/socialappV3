import React from "react";
import useFetch from "@/hooks/fetch";
import { getSession } from "next-auth/react";
import { CommentContext } from "./commentsection";
import { appToastContext } from "context/state";
import Button, { useBtnState } from "../ui/Button";

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
  ] = useBtnState(true, "Reply", "bg-slate-700", "block");
  // console.log(props.commentId);
  const addReply = useFetch;
  const { title, postId } = React.useContext(CommentContext);
  // console.log(postId);
  const replyRef = React.useRef();
  const [displayReplyForm, setDisplayReplyFrom] = React.useState("none");
  const replyFormState = { display: `${displayReplyForm}` };
  const openCloseCommentReply = props.openorclose;
  const formStyle = props.formStyle;
  // console.log(replyFormState);
  // const formId = `hiddenInput_${props.comment._id}`;

  const enableReplyBtn = (e) => {
    e.preventDefault();
    if (replyRef.current.value !== "") {
      // console.log(replyRef.current.value);
      setBtnDisabled(false);
      setBtnColor("bg-indigo-500 hover:bg-indigo-600");
      return;
    } else {
      setBtnDisabled(true);
      setBtnColor("bg-slate-700");
      return;
    }
  };

  const submitReplyHandler = async (e) => {
    e.preventDefault();
    const session = await getSession(props);
    const type = props.type;
    // console.log(props.commentId);
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
      type,
    };

    const res = await addReply("POST", "/api/comments/addcomment", data);
    console.log(res.data);
    if (res.data) {
      let message = "Your reply has been added.";
      showToast("success", message);
      props.updateComment(res.data);
      replyRef.current.value = "";
      openCloseCommentReply(e);
    }
  };

  return (
    <aside
      id={props.formId}
      style={formStyle}
      className="comment-submit-container mb-4 hidden"
    >
      <form
        id="submit-reply-form"
        action="/blogs/<%= blog._id %>/comments/<%= comments._id %>"
        method="POST"
      >
        {/* <!-- <input type="text" name="commentReply"> --> */}
        <textarea
          ref={replyRef}
          onChange={enableReplyBtn}
          id="reply-textarea"
          className="submit-reply-form comment-textarea border-gray-500 bg-gray-700 py-2 pl-1 text-white focus:bg-gray-900 focus:text-gray-300 focus:outline-none"
          autoComplete="off"
          rows="3"
          type="text"
          name="commentReply"
          placeholder="Add to the discussion"
        ></textarea>
      </form>
      <div className="flex justify-between px-4 pt-2">
        <Button
          label={"Cancel"}
          className={`reply-button mr-1.5" mb-2 rounded bg-red-500 p-2 hover:bg-red-600 hover:text-white`}
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
          className={`${btnVisibility} ${btnColor} reply-button mr-1.5 mb-2 rounded p-2 hover:text-white`}
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