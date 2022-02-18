import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSession } from "next-auth/react";
import PictureUpload from "@/components/ui/PictureUpload";
import { appToastContext } from "context/state";
import Compressor from "compressorjs";
import { useRouter } from "next/router";
// import useFetch from "@/hooks/fetch";

const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

export default function NewPost(props) {
  const { useFetch, showToast } = React.useContext(appToastContext);
  const [disable, setDisable] = React.useState(false);
  const sendNewPost = useFetch;
  const postCustomImage = useRef();
  const router = useRouter();

  const loadImage = (event) => {
    const output = document.getElementById("output");
    output.src = event.target.value;
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  const { data: session, status } = useSession();
  // console.log(props);

  const titleRef = useRef();
  const imageRef = useRef();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    allowTabNavigation: false,

    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    minHeight: "400",
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  //===== submits new post =====
  const handleNewPost = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    //===== function test =====

    //=====  =====
    //===== animate spinner on button function =====
    function btnAnimate() {
      document.querySelector("#svgSpin").classList.add("animate-spin");
      document.querySelector("#svgSpin").style.display = "inline-block";
      document.querySelector("#postText").style.display = "none";
      document.querySelector("#postingText").style.display = "inline";
    }
    //===== add title and image url data ref to form =====
    function appendFormData() {
      formData.append("title", titleRef.current.value);
      formData.append("content", content);
    }
    //===== compression for new custom image =====
    function newPic() {
      setDisable(true);
      btnAnimate();
      let postImage = postCustomImage.current.files[0];
      console.log(postImage);
      new Compressor(postImage, {
        quality: 0.4,
        success(result) {
          let newImage = result;
          console.log(newImage);
          formData.append("file", newImage, newImage.name);
          console.log(Object.fromEntries(formData));
          submitNewPost(formData);
        },
      });
    }

    //===== check input refs =====
    if (!titleRef.current.value) {
      //===== checks of title ref is empty =====
      let err = "Title is required";
      showToast("error", err);
      // console.log(postCustomImage.current.files[0]);
    } else {
      //===== check if image ref are empty =====
      if (postCustomImage.current.files[0] === undefined) {
        if (!imageRef.current.value) {
          let err =
            "Please choose and image. It can either be an url or a custom image. ";
          showToast("error", err);
        } else {
          setDisable(true);
          btnAnimate();
          appendFormData();
          formData.append("imageUrl", imageRef.current.value);
          submitNewPost(formData);
        }
      } else {
        appendFormData();
        newPic();
      }
    }
  };
  const submitNewPost = async (formData) => {
    // const res = await fetch("/api/post/newpost", {
    //   method: "POST",
    //   body: formData,
    // });
    // // Await for data for any desirable next steps
    // const data = await res.json();
    // console.log(data);

    const res = await sendNewPost("POST", "/api/post/newpost", formData);
    // console.log(res);
    if (res.statusText === "Created") {
      showToast("success", res.data.message);
      router.push(`/post/${res.data.newPostId}`);
    }
    // if (res.data.createdPost === false) {
    //   showToast("error", res.data.error);
    // }
  };

  // if (data.message) {
  // }

  return (
    <>
      <Head>
        <title>Create New Post</title>
      </Head>
      <main className="edit-card Psm:px-2">
        <header>
          <p className="text-gray-500">New Post</p>
        </header>
        <form id="create-form" className="">
          <div className="field">
            <label>Title</label>
            <input
              ref={titleRef}
              className="bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
              type="text"
              name="title"
              placeholder="title"
              required
            />
          </div>
          <div className="field">
            <label>Image</label>
            <input
              ref={imageRef}
              onChange={loadImage}
              className="bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
              type="text"
              name="imageUrl"
              placeholder="image url"
            />
          </div>
          <PictureUpload
            loadUrlImage={loadImage}
            postImageRef={postCustomImage}
          />
          <div className="pt-4">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
          </div>
        </form>
        <button
          disabled={disable}
          onClick={handleNewPost}
          id="postBtn"
          type="button"
          className="z-50 fixed bottom-7 right-4 inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md bg-indigo-500 hover:bg-indigo-600  transition ease-in-out duration-150"
        >
          <svg
            id="svgSpin"
            className="-ml-1 mr-3 h-5 w-5 text-white"
            viewBox="0 0 24 24"
            style={{ display: "none" }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span id="postingText" style={{ display: "none" }}>
            Posting
          </span>

          <span id="postText">Post</span>
        </button>
      </main>
    </>
  );
}
