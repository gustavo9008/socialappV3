import React from "react";
import { appToastContext } from "context/state";
import { useRouter } from "next/router";

export default function EditCommentModal(props) {
  // console.log(props.action);
  const router = useRouter();
  const commentRef = React.useRef("");
  const { useFetch, showToast } = React.useContext(appToastContext);
  const sendCommentEdit = useFetch;

  // const resFunctions = () => {
  //   console.log("inside resFucntion");
  //   props.setOpenCommentModal(false);
  //   props.setCommentReply(res.data.updatedComment);
  // };

  const editCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("editCommentSubmit");
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
    console.log(res);
    if (res.statusText === "OK") {
      showToast("success", res.data.message);
      props.setOpenCommentModal(false);
      console.log(res.data.updatedComment);
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
        <div className="z-20 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          {/* <!-- ===== modal ===== --> */}
          <div className="bg-gray-800 border-2 border-gray-500 rounded modal">
            {/* <!-- ===== modal header ===== --> */}
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Edit Comment</h3>
              <button
                onClick={() => props.setOpenCommentModal(false)}
                className=""
              >
                <span>
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
                    defaultValue={props.comment.comment}
                    id="update-reply-comment"
                    className="comment-textarea py-2 text-white bg-gray-700 rounded-md pl-1 focus:outline-none border border-gray-500 focus:border-purple-800 focus:bg-gray-900 focus:text-gray-300"
                    autoComplete="off"
                    rows="3"
                    type="text"
                    name="comment[text]"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="flex justify-end items-center w-100 border-t p-3">
              <button
                onClick={() => props.setOpenCommentModal(false)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1"
              >
                Cancel
              </button>
              <button
                onClick={editCommentSubmit}
                id="update-reply-btn"
                data-action="/blogs/<%= blog._id %>/<%= comments._id %>/<%= reply._id %>"
                className="update-reply-btn bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : // <!-- ===== end of edit comment modal ===== -->
      null}
    </>
  );
}
