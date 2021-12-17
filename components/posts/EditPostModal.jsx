import React from "react";
import dynamic from "next/dynamic";
import { appToastContext } from "context/state";
import { useRouter } from "next/router";
// import MyEditor from "./editor";

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
    console.log("submit handler has been clicked");
    // const title = titleRef.current.value;

    // console.log(content);
    const updatedPost = {
      post: { title: titleRef.current.value, content: content },
      postId: props.post._id,
      imageToDelete: props.post.image[0].filename
        ? props.post.image[0].filename
        : null,
      type: "UPDATE_POST",
    };
    // console.log(updatedPost);

    const res = await sendPostUpdate(
      "PUT",
      "/api/post/updatepost",
      updatedPost
    );
    if (res.statusText === "Created") {
      console.log(res.data);
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
          <div className="justify-center bg-black bg-opacity-70 items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="z-50 w-auto mx-auto max-w-3xl sticky top-0">
              {/*content*/}
              <div className="Psm:max-h-1/2 Psm:overflow-scroll bg-gray-900 border-2 border-gray-500 rounded post-modal flex flex-col outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-100">
                    Edit Post
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold"
                    onClick={() => props.setShowPostModal(false)}
                  >
                    <span className="hover:text-gray-100 text-gray-400 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <div className="field">
                    <label>Title</label>
                    <input
                      ref={titleRef}
                      defaultValue={props.post.title}
                      className="bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                      type="text"
                      name="title"
                      placeholder="title"
                      required
                    />
                  </div>
                  {props.post.image[0] ? (
                    <img
                      className="edit-post-modal object-cover m-auto"
                      src={props.post.image[0].url}
                      alt="this is a picture"
                    />
                  ) : (
                    <img
                      className="object-cover m-auto"
                      src={props.post.imageUrl}
                      alt="this is a picture"
                    />
                  )}
                  <div className="pt-4">
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    onClick={deletePostHandler}
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={submitEditHandler}
                    className="bg-blue-500 hover:bg-blue-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Update
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
};

export default EditPostModal;
