import React from "react";

export default function PictureUpload(props) {
  const loadFile = (event) => {
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="field mt-4 mb-4 flex flex-wrap">
      <label
        htmlFor="imagePost"
        className="self-start mr-32 rounded hover:text-white bg-gray-500 hover:bg-gray-600 p-2 Psm:w-full Psm:mr-0"
      >
        <i className="far fa-image text-xl relative pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </i>
        Custom Upload
      </label>
      <input
        onChange={loadFile}
        id="imagePost"
        type="file"
        name="image"
        ref={props.postImageRef}
      />
      <picture className="block overflow-hidden mt-4 Psm:w-full w-1/2">
        <img className="object-cover" id="output" alt="" />
      </picture>
    </div>
  );
}
