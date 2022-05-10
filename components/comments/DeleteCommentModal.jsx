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
              <div className="modal flex flex-col rounded border-2 border-gray-500 bg-gray-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-3xl font-semibold text-red-700">
                    Delete Comment
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                    onClick={() => props.setShowDeleteModal(false)}
                  >
                    <span className=" block h-6 w-6 text-2xl text-white outline-none focus:outline-none">
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
                    className="mr-1 mb-1 rounded bg-green-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={() => props.setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={deleteComment}
                  >
                    Yes Delete
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
