import React from "react";
import useFetch from "@/hooks/fetch";
import { getSession } from "next-auth/react";
import { CommentContext } from "./commentsection";
import { appToastContext } from "context/state";

export default function AddReply(props) {
  const { showToast } = React.useContext(appToastContext);
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
          id="reply-textarea"
          className="submit-reply-form comment-textarea py-2 text-white bg-gray-700 pl-1 focus:outline-none border-gray-500 focus:bg-gray-900 focus:text-gray-300"
          autoComplete="off"
          rows="3"
          type="text"
          name="commentReply"
          placeholder="Add to the discussion"
        ></textarea>
      </form>
      <div className="flex justify-between px-4">
        <button
          onClick={openCloseCommentReply}
          id="cancelReplyBtn"
          className='reply-button rounded hover:text-white bg-red-500 hover:bg-red-600 p-2 mr-1.5"'
        >
          cancel
        </button>
        <button
          onClick={submitReplyHandler}
          id="replyBtn"
          data-url="/blogs/<%= blog._id %>/comments/<%= comments._id %>"
          className="reply-button rounded hover:text-white bg-indigo-500 hover:bg-indigo-600 p-2 mr-1.5"
        >
          submit
        </button>
      </div>
    </aside>
  );
}
