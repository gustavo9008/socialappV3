import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSession } from "next-auth/react";
import PictureUpload from "@/components/ui/PictureUpload";
import { appToastContext } from "context/state";
import Compressor from "compressorjs";
import { useRouter } from "next/router";

const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

export default function NewPost(props) {

  const { useFetch, showToast, userSession } =
    React.useContext(appToastContext);
  const [disable, setDisable] = React.useState(false);
  const sendNewPost = useFetch;
  const postCustomImage = useRef();
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
  const editor = useRef();
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

  // const config = {
  //   allowTabNavigation: false,

  //   askBeforePasteFromWord: false,
  //   askBeforePasteHTML: false,
  //   minHeight: "400",
  //   readonly: false, // all options from https://xdsoft.net/jodit/doc/
  // };
  //===== submits new post =====
  //===== commented code below is a experimental image convert to webp but stayed with compressor js =====
  // const handleNewPost = async (e) => {
  //   e.preventDefault();
  //   // console.log(customImg);
  //   let formData = new FormData();
  //   // newPic(customImg)
  //   //===== function test =====

  //   //=====  =====
  //   //===== animate spinner on button function =====
  //   function btnAnimate() {
  //     document.querySelector("#svgSpin").classList.add("animate-spin");
  //     document.querySelector("#svgSpin").style.display = "inline-block";
  //     document.querySelector("#postText").style.display = "none";
  //     document.querySelector("#postingText").style.display = "inline";
  //   }
  //   //===== add title and image url data ref to form =====
  //   function appendFormData() {
  //     formData.append("title", titleRef.current.value);
  //     formData.append("content", content);
  //   }
  //   //===== compression for new custom image =====
  //   function newPic(customImg) {
  //     setDisable(true);
  //     btnAnimate();
  //     // let postImage = postCustomImage.current.files[0];
  //     new Compressor(customImg, {
  //       quality: 0.4,
  //       mimeType: 'image/webp',
  //       success(result) {
  //         let newImage = result;
  //         newImage.name = `img${newImage.size.toString()}`
  //         console.log(result);
  //         formData.append("file", newImage, newImage.name);
  //         // submitNewPost(formData);
  //       },
  //     });
  //   }
  //   //===== check input refs =====
  //   if (!titleRef.current.value) {
  //     //===== checks of title ref is empty =====
  //     let err = "Title is required";
  //     showToast("error", err);
  //   } else {
  //     //===== check if image ref are empty =====
  //     if (customImg === undefined || null) {
  //       // check if url image input is empty
  //       if (!imageRef.current.value) {
  //         let err =
  //           "Please choose and image. It can either be an url or a custom image. ";
  //         showToast("error", err);
  //       } else {
  //         setDisable(true);
  //         btnAnimate();
  //         appendFormData();
  //         formData.append("imageUrl", imageRef.current.value);
  //         submitNewPost(formData);
  //       }
  //     } else {
  //       appendFormData();
  //       newPic(customImg);
  //     }
  //   }
  // };
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
          // submitNewPost(formData);
        },
      });
    }
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

    const res = await sendNewPost("POST", "/api/post/newpost", formData);
    if (res.data.success === true) {
      showToast("success", res.data.message);
      router.push(`/post/${res.data.newPostId}`);
    }
    if (res.data.createdPost === false) {
      showToast("error", res.data.error);
    }
  };



  // useEffect(() => {
  //   if (userSession === null) {
  //     // showToast("error", "You must be sign in.");
  //     // router.push("/login");
  //   }
  // }, [router, userSession]);
  return (
    <>
      <Head>
        <title>Create New Post</title>
      </Head>
      {userSession !== null && (
        <main className="edit-card Psm:px-2">
          <header>
            <p className="text-gray-500">New Post</p>
          </header>
          <form id="create-form" className="">
            <div className="field">
              <label>Title</label>
              <input
                ref={titleRef}
                className="mb-1 h-10 w-full appearance-none rounded bg-gray-700 py-2 px-3 leading-tight text-gray-300 focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="mb-1 h-10 w-full appearance-none rounded bg-gray-700 py-2 px-3 leading-tight text-gray-300 focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="imageUrl"
                placeholder="image url"
              />
            </div>
            <PictureUpload
              loadUrlImage={loadImage}
              postImageRef={postCustomImage}
            // setCustomImg={setCustomImg}
            />
            <div className="pt-4">
              <JoditEditor
                ref={editor}
                value={content}
                config={configMemo}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => { }}
              />

            </div>
          </form>
          <button
            disabled={disable}
            onClick={handleNewPost}
            id="postBtn"
            type="button"
            className="fixed bottom-7 right-4 z-50 inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium leading-6 transition  duration-150 ease-in-out hover:bg-indigo-600"
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
          <p>You must best sign in.</p>
        </>
      )}
    </>
  );
}
