'use client';
import React, { useState, useRef, useMemo, Suspense, createRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSession } from "next-auth/react";
import PictureUpload from "@/components/ui/PictureUpload";
import { appToastContext } from "context/state";
import Compressor from "compressorjs";
import { useRouter } from "next/router";
import Spinner from "@/components/ui/loaders/Spinner";

// import Editor from "@/components/posts/editor"
// let Editor = dynamic(() => import('@/components/posts/editor'), {
//   ssr: false,
//   suspense: true,
// });
const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  suspense: true,
  ssr: false,
});

export default function NewPost(props) {

  const { useFetch, showToast, userSession, createPostBtn, setCreatePostBtn } =
    React.useContext(appToastContext);
  const [disable, setDisable] = React.useState(false);
  const sendNewPost = useFetch;
  // const postCustomImage = useRef();
  const postCustomImage = createRef();
  const router = useRouter();

  //===== commented state below was for image conversion to blob webp, migth implented in future =====
  // const [customImg, setCustomImg] = useState()
  //=====  =====

  const loadImage = (event) => {
    const output = document.getElementById("output");
    output.src = event.target.value;
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };


  const titleRef = useRef();
  const imageRef = useRef();
  // const editor = useRef();
  const editor = createRef();
  // const [videoType, setVideotype] = React.useState("");
  const [content, setContent] = useState("");





  const configMemo = useMemo(() => {
    return {
      allowTabNavigation: false,
      askBeforePasteFromWord: false,
      askBeforePasteHTML: false,
      minHeight: "400",
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
    }
  })
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
      let mimeType = "image/webp";
      let OS;
      if (navigator.userAgent.indexOf("Safari") != -1) {
        OS = "Safari"; mimeType = "image/jpeg";
        if (navigator.userAgent.indexOf("Chrome") != -1) {
          mimeType = "image/webp"

        }

      };
      new Compressor(postImage, {
        quality: 0.4,
        mimeType: mimeType,
        success(result) {
          let newImage = result;
          formData.append("file", newImage, newImage.name);
          submitNewPost(formData);
        },
      });
    }

    async function newVideo() {
      setDisable(true);
      btnAnimate();
      let postImage = postCustomImage.current.files[0];
      formData.append("file", postImage, postImage.name);
      submitNewPost(formData);

    }
    //===== beginning =====
    //===== below code needs to be change , to many if statements =====
    //===== check input refs =====
    if (!titleRef.current.value) {
      //===== checks of title ref is empty =====
      let err = "Title is required";
      showToast("error", err);
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
        postCustomImage.current.files[0].type.includes("image") && newPic();
        postCustomImage.current.files[0].type.includes("video") && newVideo();

        // newPic();
      }
    }
  };
  //===== end =====
  const submitNewPost = async (formData) => {
    // const res = await fetch("/api/post/newpost", {
    //   method: "POST",
    //   body: formData,
    // });
    // // Await for data for any desirable next steps
    // const data = await res.json();
    const res = await sendNewPost("POST", "/api/post/newpost", formData);
    if (res.data.success === true) {

      console.log(res.data);
      showToast("success", res.data.message);
      router.push(`/post/${res.data.newPostId}`);
    }
    if (res.data.createdPost === false) {
      console.log(res.data);
      showToast("error", res.data.error);
    }
  };



  React.useEffect(() => {

    if (router.pathname === "/post/newpost") {

      setCreatePostBtn(false)
    }

    // router.beforePopState(() => {
    //   setCreatePostBtn(true)
    //   return true;
    // });
    // // return true;
  }, [router]);
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      {userSession !== null && (
        <main className="edit-card flex flex-col Psm:px-2">
          <header>
            <h1 className="text-gray-500 text-3xl py-4">Create Post</h1>

          </header>
          <form id="create-form" className="">
            <div className="field pt-2">
              <label>Title</label>
              <input
                ref={titleRef}
                className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 dark:bg-gray-800 focus:dark:bg-gray-700 py-2 px-3 leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="title"
                placeholder="title"
                required
              />
            </div>

            <div className="field pt-4 pb-6 Psm:pb-2 border-b-2 border-opacity-50 border-gray-500">
              <p className="text-lg opacity-60">You can choose between a link to your image or custom image.</p>
              <label>Image</label>
              <input
                ref={imageRef}
                onChange={loadImage}
                className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 leading-tight focus:border-transparent focus:bg-white focus:dark:bg-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="imageUrl"
                placeholder="image url"
              />
              <PictureUpload
                loadUrlImage={loadImage}
                ref={postCustomImage}
              // setCustomImg={setCustomImg}
              />
            </div>

            <div className="pt-6">
              <p className="text-lg opacity-60 pb-4">Write your post content below.</p>
              <Suspense fallback={<Spinner marginTop={"mt-10 flex flex-row justify-center"} />}>

                <JoditEditor
                  ref={editor}
                  value={content}
                  config={configMemo}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={(newContent) => { }}
                />
                {/* <Editor ref={editor} value={content} onblur={setContent} /> */}
                {/* {CustomEditor && <CustomEditor />} */}
              </Suspense>


            </div>
            {/* <button
              disabled={disable}
              onClick={handleNewPost}
              id="postBtn"
              type="button"
              className="justify-self-end z-50 inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium leading-6 transition  duration-150 ease-in-out hover:bg-blue-600"
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
            </button> */}
          </form>
          <button
            disabled={disable}
            onClick={handleNewPost}
            id="postBtn"
            type="button"
            className="self-end mt-4 z-50 inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium leading-6 transition  duration-150 ease-in-out hover:bg-blue-600"
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
      )}
      {userSession === null && (
        <>
          <p className="text-center font-semibold text-3xl p-10">You must best sign in.</p>
        </>
      )}
    </>
  );
}
