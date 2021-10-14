import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSession } from "next-auth/client";

const importJodit = () => import("jodit-react");
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

export default function NewPost(props) {
  const [session, loading] = useSession();
  console.log(props);

  const titleRef = useRef();
  const imageRef = useRef();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    allowTabNavigation: false,
    minHeight: "400",
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const handleNewPost = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/post/newpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        image: imageRef.current.value,
        content: content,
      }),
    });
    // Await for data for any desirable next steps
    const data = await res.json();
    console.log(data);
  };

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
              className="bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
              type="text"
              name="imageUrl"
              placeholder="image url"
            />
          </div>
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
