import React from "react";
import { appToastContext } from "context/state";
import { CommentContext } from "./commentsection";
import { useRouter } from "next/router";

export default function Modal(props) {
  const router = useRouter();
  const { postId } = React.useContext(CommentContext);
  const { useFetch, showToast } = React.useContext(appToastContext);
  const deleteCR = useFetch;

  const deleteComment = async (e) => {
    console.log(props.commentId);
    const data = {
      commentId: props.commentId,
      postId,
      action: props.action === "ADD_REPLY" ? props.action : "EDIT_COMMENT",
      type: "DELETE_COMMENT",
    };

    const res = await deleteCR("DELETE", "/api/comments/addcomment", data);
    console.log(res.data);
    if (res.data.success === true) {
      showToast("success", res.data.message);
      props.setShowDeleteModal(false);
      // router.reload();
      props.setCommentReply(null);
      // props.setCommentReply(res.data.updatedComment);
      // resFunctions();
    }
  };
  // console.log(deleteAccountRef.current.value);

  return (
    <>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
      {props.showDeleteModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-70 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="modal flex flex-col rounded border-2 border-gray-300 bg-gray-100 shadow-[4px_4px_0px_0px_#e2e8f0] outline-none focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:shadow-[4px_4px_0px_0px_#374151]">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-gray-200 p-5">
                  <h3 className="text-3xl font-semibold text-red-700">
                    Delete Comment
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                    onClick={() => props.setShowDeleteModal(false)}
                  >
                    <span className=" block h-6 w-6 text-2xl outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-lg leading-relaxed">
                    Are you sure you want to delete this comment?
                  </p>
                  <div className="mt-4">
                    <span className="font-semibold">{props.comment}</span>
                  </div>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-between rounded-b border-t border-solid p-4">
                  <button
                    className="hover:shadow-lgdark:bg-gray-800 mr-1 mb-1 rounded px-5 py-2 font-semibold outline-none transition-all duration-150 ease-linear hover:bg-gray-300 dark:hover:bg-gray-700"
                    type="button"
                    onClick={() => props.setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="mr-1 mb-1 rounded bg-red-600 px-5 py-2 font-semibold outline-none transition-all duration-150 ease-linear hover:bg-red-700 hover:shadow-lg"
                    type="button"
                    onClick={deleteComment}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
