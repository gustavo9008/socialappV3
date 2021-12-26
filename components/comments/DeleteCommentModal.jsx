import React from "react";
import { appToastContext } from "context/state";
import { CommentContext } from "./commentsection";
import { useRouter } from "next/router";

export default function Modal(props) {
  const router = useRouter();
  const { postId } = React.useContext(CommentContext);
  const { useFetch, showToast } = React.useContext(appToastContext);
  const deleteComment = useFetch;

  const deleteAccount = async (e) => {
    console.log(props.commentId);
    const data = {
      commentId: props.commentId,
      postId,
      action: props.action === "ADD_REPLY" ? props.action : "EDIT_COMMENT",
      type: "DELETE_COMMENT",
    };

    const res = await deleteComment("DELETE", "/api/comments/addcomment", data);
    console.log(res.data);
    if (res.statusText === "OK") {
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
          <div className="justify-center bg-black bg-opacity-70 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="bg-gray-900 border-2 border-gray-500 rounded modal flex flex-col outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-red-700">
                    Delete Comment
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowDeleteModal(false)}
                  >
                    <span className=" text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-lg leading-relaxed">
                    Are you sure you want to delete this comment?
                  </p>
                  <div className="mt-4">
                    <span className="font-semibold">{props.comment}</span>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={deleteAccount}
                  >
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
