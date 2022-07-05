import React from "react";

export default function PictureUpload(props) {
  const loadFile = (event) => {
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  //===== commented code below was the loader for image conversion to blob webp =====
  // function fileSelectorChanged() {
  //   let refs = {};
  //   refs.imagePreviews = document.querySelector("#previews");
  //   refs.fileSelector = document.querySelector("input[type=file]");

  //   function addImageBox(container) {
  //     let imageBox = document.createElement("div");
  //     let progressBox = document.createElement("progress");
  //     imageBox.appendChild(progressBox);
  //     container.appendChild(imageBox);

  //     return imageBox;
  //   }

  //   function processFile(file) {
  //     if (!file) {
  //       return;
  //     }
  //     // console.log(file);

  //     let imageBox = addImageBox(refs.imagePreviews);

  //     // Load the data into an image
  //     new Promise(function (resolve, reject) {
  //       let rawImage = new Image();

  //       rawImage.addEventListener("load", function () {
  //         resolve(rawImage);
  //       });

  //       rawImage.src = URL.createObjectURL(file);
  //     })
  //       .then(function (rawImage) {
  //         // Convert image to webp ObjectURL via a canvas blob
  //         return new Promise(function (resolve, reject) {
  //           let canvas = document.createElement("canvas");
  //           let ctx = canvas.getContext("2d");

  //           canvas.width = rawImage.width;
  //           canvas.height = rawImage.height;
  //           ctx.drawImage(rawImage, 0, 0);

  //           canvas.toBlob(function (blob) {
  //             console.log(blob);
  //             props.setCustomImg(blob);
  //             resolve(URL.createObjectURL(blob));
  //           }, "image/webp");
  //         });
  //       })
  //       .then(function (imageURL) {
  //         console.log(imageURL);
  //         // Load image for display on the page
  //         return new Promise(function (resolve, reject) {
  //           let scaledImg = new Image();

  //           scaledImg.addEventListener("load", function () {
  //             resolve({ imageURL, scaledImg });
  //           });

  //           scaledImg.setAttribute("src", imageURL);
  //         });
  //       })
  //       .then(function (data) {
  //         // Inject into the DOM
  //         let imageLink = document.createElement("a");

  //         imageLink.setAttribute("href", data.imageURL);
  //         imageLink.setAttribute("download", `${file.name}.webp`);
  //         imageLink.appendChild(data.scaledImg);

  //         imageBox.innerHTML = "";
  //         imageBox.appendChild(imageLink);
  //         // props.setCustomImg(data);
  //       });
  //   }

  //   function processFiles(files) {
  //     for (let file of files) {
  //       console.log(file);
  //       processFile(file);
  //     }
  //   }
  //   // console.log(refs.fileSelector.files);
  //   processFiles(refs.fileSelector.files);
  //   refs.fileSelector.value = "";
  // }
  return (
    <div className="field mt-4 mb-4 flex flex-wrap">
      <label
        htmlFor="imagePost"
        className="mr-32 self-start rounded bg-gray-200 p-2 hover:bg-gray-400 dark:bg-gray-600 hover:dark:bg-gray-600 Psm:mr-0 Psm:w-full"
      >
        <i className="far fa-image relative pr-2 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block h-6 w-6"
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
      {/* //===== commented code below was for experimental image conversion , might implement in future ===== */}
      {/* <input
        onChange={fileSelectorChanged}
        id="imagePost"
        type="file"
        multiple
        accept="image/*"
        name="image"
        ref={props.postImageRef}
      />
      <div
        className="mt-4 block w-1/2 overflow-hidden Psm:w-full"
        id="previews"
      ></div> */}
      <picture className="mt-4 block w-1/2 overflow-hidden Psm:w-full">
        <img className="object-cover" id="output" alt="" />
      </picture>
    </div>
  );
}
