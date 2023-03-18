import React from "react";
import { appToastContext } from "context/state";
import Button, { useBtnState } from "../ui/globalUI/Button";
// import { useRouter } from "next/router";

export default function EditCommentModal(props) {
  const commentRef = React.useRef("");
  const { useFetch, showToast } = React.useContext(appToastContext);
  const sendCommentEdit = useFetch;
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
  ] = useBtnState(false, "Reply", "hover:bg-indigo-400 bg-indigo-500", "block");

  // const resFunctions = () => {
  //   console.log("inside resFucntion");
  //   props.setOpenCommentModal(false);
  //   props.setCommentReply(res.data.updatedComment);
  // };

  //===== enable or disable btn for text area input =====

  const enableEditBtn = (e) => {
    e.preventDefault();
    if (commentRef.current.value !== "") {
      setBtnDisabled(false);
      setBtnColor("hover:bg-indigo-400 bg-indigo-500 ");
      return;
    } else {
      setBtnDisabled(true);
      setBtnColor("bg-indigo-900 text-gray-400");
      return;
    }
  };

  const editCommentSubmit = async (e) => {
    e.preventDefault();
    const updatedComment = {
      comment: commentRef.current.value,
      commentId: props.commentId,
      action: props.action === "ADD_REPLY" ? props.action : "EDIT_COMMENT",
      type: "EDIT_COMMENT",
    };
    const res = await sendCommentEdit(
      "PUT",
      "/api/comments/addcomment",
      updatedComment
    );
    if (res.data.success === true) {
      showToast("success", res.data.message);
      props.setOpenCommentModal(false);
      props.setCommentReply(res.data.updatedComment);
      // resFunctions();
    }
    // res.statusText === "OK" &&
    //   showToast("success", res.data.message) &&
    //   resFunctions;
  };
  return (
    <>
      {props.openCommentModal ? (
        // <!-- ===== edit comment modal ===== -->
        <div className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
          {/* <!-- ===== modal ===== --> */}
          <div className="modal rounded border-2 border-gray-300 bg-gray-100 shadow-[4px_4px_0px_0px_#e2e8f0] dark:border-gray-600 dark:bg-gray-900 dark:shadow-[4px_4px_0px_0px_#374151]">
            {/* <!-- ===== modal header ===== --> */}
            <div className="flex items-center justify-between border-b px-4 py-2">
              <h3 className="text-lg font-semibold">Edit Comment</h3>
              <button
                onClick={() => props.setOpenCommentModal(false)}
                className=""
              >
                <span>
                  {/* exit modal btn */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/* <!-- ===== modal reply body ===== --> */}
            <div className="p-3">
              <form id="<%= reply._id %>">
                <div className="">
                  <textarea
                    ref={commentRef}
                    onChange={enableEditBtn}
                    defaultValue={props.comment.comment}
                    id="update-reply-comment"
                    className="comment-textarea rounded-md border border-gray-500 bg-gray-200 py-2 pl-1 focus:border-purple-800 focus:bg-white focus:text-gray-100 focus:outline-none dark:bg-gray-700 dark:focus:bg-gray-900"
                    autoComplete="off"
                    rows="3"
                    type="text"
                    name="comment[text]"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="w-100 flex items-center justify-end border-t p-3">
              <button
                onClick={() => props.setOpenCommentModal(false)}
                className="mr-1 rounded px-3 py-1 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              {/* <button
                onClick={editCommentSubmit}
                id="update-reply-btn"
                data-action="/blogs/<%= blog._id %>/<%= comments._id %>/<%= reply._id %>"
                className="update-reply-btn rounded bg-indigo-500 px-3 py-1 hover:bg-indigo-400"
              >
                Submit
              </button> */}
              <Button
                label={label}
                className={`${btnVisibility} ${btnColor} rounded p-1.5 font-semibold`}
                handleClick={editCommentSubmit}
                disabled={btnDisabled}
                idTag={"update-reply-btn"}
              />
            </div>
          </div>
        </div>
      ) : // <!-- ===== end of edit comment modal ===== -->
      null}
    </>
  );
}
