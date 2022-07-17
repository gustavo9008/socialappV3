import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { appToastContext } from "context/state";
import { useRouter } from "next/router";
import Spinner from "@/components/ui/loaders/Spinner";

const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const EditPostModal = (props) => {
  const router = useRouter();
  // console.log(props.post);
  const { useFetch, showToast } = React.useContext(appToastContext);
  const sendPostUpdate = useFetch;
  const titleRef = React.useRef(props.post.title);
  // const imageRef = React.useRef();
  const editor = React.useRef(null);
  const [content, setContent] = React.useState(props.post.body);

  const config = {
    allowTabNavigation: false,
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    minHeight: "400",
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  // submit handler
  const submitEditHandler = async (e) => {
    e.preventDefault();
    // const title = titleRef.current.value;
    const updatedPost = {
      post: { title: titleRef.current.value, content: content },
      postId: props.post._id,
      imageToDelete:
        props.post.image[0] !== undefined ? props.post.image[0].filename : null,
      type: "UPDATE_POST",
    };
    // console.log(updatedPost);

    const res = await sendPostUpdate(
      "PUT",
      "/api/post/updatepost",
      updatedPost
    );
    if (res.data.success === true) {
      props.setShowPostModal(false);
      showToast("success", res.data.message);
      props.setPost(res.data.post);
    }
    // console.log(res.data);
  };

  const deletePostHandler = async (e) => {
    e.preventDefault();
    console.log("submit delete has been clicked");
    const cloudImage = props.post.image[0]
      ? props.post.image[0].filename
      : null;

    // console.log(content);
    const deletePost = {
      postId: props.post._id,
      imageToDelete: cloudImage,
      type: "DELETE_POST",
    };
    // console.log(updatedPost);

    const res = await sendPostUpdate(
      "DELETE",
      "/api/post/updatepost",
      deletePost
    );
    if (res.data.deleted === true) {
      showToast("success", res.data.message);
      router.push(`/user/profile`);
    }
    // if (res.statusText === "OK") {
    //   console.log(res.data);
    //   // props.setShowPostModal(false);
    //   showToast("success", res.data.message);
    //   // props.setPost(res.data.post);
    // }
    // console.log(res.data);
  };
  return (
    <>
      {/* <button
      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={() => setShowModal(true)}
    >
      Open regular modal
    </button> */}
      {props.showPostModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto bg-black bg-opacity-70 outline-none focus:outline-none">
            <div className="sticky top-0 z-50 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="post-modal flex flex-col overflow-scroll overscroll-x-contain rounded border-2 border-gray-500 bg-gray-100 outline-none focus:outline-none dark:bg-gray-900 Psm:max-h-1/2">
                {/*header*/}
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  {/* title */}
                  <h3 className="text-3xl font-semibold">Edit Post</h3>
                  <button
                    className="float-right ml-auto border-0 p-1 text-3xl font-semibold leading-none"
                    onClick={() => props.setShowPostModal(false)}
                  >
                    {/* close */}
                    <span className="block h-6 w-6 text-2xl  outline-none hover:text-red-800 focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-3">
                  <div className="field">
                    <label>Title</label>
                    <input
                      ref={titleRef}
                      defaultValue={props.post.title}
                      className="mb-1 h-10 w-full appearance-none rounded bg-gray-400 py-2 px-3 leading-tight text-gray-300 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 focus:dark:bg-gray-900"
                      type="text"
                      name="title"
                      placeholder="title"
                      required
                    />
                  </div>
                  {props.post.image[0] ? (
                    <img
                      className="edit-post-modal m-auto object-cover"
                      src={props.post.image[0].url}
                      alt="this is a picture"
                    />
                  ) : (
                    <img
                      className="m-auto object-cover"
                      src={props.post.imageUrl}
                      alt="this is a picture"
                    />
                  )}
                  <div className="pt-4">
                    <Suspense
                      fallback={
                        <Spinner
                          marginTop={"mt-10 flex flex-row justify-center"}
                        />
                      }
                    >
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                      />
                    </Suspense>
                  </div>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-between rounded-b border-t border-solid p-4">
                  <button
                    onClick={deletePostHandler}
                    className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={submitEditHandler}
                    className="mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-blue-600 hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                  >
                    Update
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
};

export default EditPostModal;
