import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
// import useFetch from "@/hooks/fetch";
import Compressor from "compressorjs";
import Button, { useBtnState } from "@/components/ui/Button";
import { appToastContext } from "../../../../context/state";

export default function AccountPicture(props) {
  const {
    useFetch,
    showToast,
    userSession,
    setUserSession,
    setTokenRefreshInterval,
  } = React.useContext(appToastContext);
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
  ] = useBtnState(true, "Save Picture/Color", "bg-slate-700", "block");
  // console.log(props.user);
  // const [show, setShow] = useState(true);
  const [newcolorstate, setNewColorState] = useState([]);
  const profilePictureRef = useRef();
  const oldProfilePic = useRef();
  const newColor = useRef();
  const router = useRouter();
  const updateNewColorPic = useFetch;
  // console.log(newcolorstate);

  const changeBtnColorActive = () => {
    btnDisabled === true && setBtnDisabled(false);
    btnColor === "bg-slate-700" &&
      setBtnColor("bg-indigo-500 hover:bg-indigo-600");
    return;
  };

  const loadFile = (event) => {
    //===== change btn color and change btn active  =====

    changeBtnColorActive();
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const newPic = async (e) => {
    e.preventDefault();

    // function btnAnimate() {
    //   document.querySelector("#svgSpin").classList.add("animate-spin");
    //   document.querySelector("#svgSpin").style.display = "inline-block";
    //   document.querySelector("#postText").style.display = "none";
    //   document.querySelector("#postingText").style.display = "inline";
    // }
    //===== form data creation =====
    const formData = new FormData();
    const oldFilename = oldProfilePic.current.getAttribute("data-filename");
    // console.log(newColor.current.getAttribute("data-color"));
    if (oldFilename) {
      formData.append("oldFileName", oldFilename);
    }
    // updateImageSubmit(formData);
    // console.log();

    if (profilePictureRef.current.files[0]) {
      // btnAnimate();
      // formData.append("file", profilePictureRef.current.files[0]);
      // console.log(formData);
      let imageForm = profilePictureRef.current.files[0];
      new Compressor(imageForm, {
        quality: 0.4,
        success(result) {
          // if (oldFilename) {
          //   const oldImage = oldFilename.getAttribute("data-filename");
          //   formData.append("oldImage", oldImage);
          // }
          let newImage = result;
          formData.append("file", newImage, newImage.name);
          updateImageSubmit(formData);
        },
      });
    } else {
      updateColor();
    }
    function updateColor() {
      // btnAnimate();
      if (newColor.current.getAttribute("data-color")) {
        // console.log(newcolorstate);
        formData.append("newColor", JSON.stringify(newcolorstate));
        updateImageSubmit(formData);
      } else {
        console.log("nothing has change");
      }
    }

    // const formData = new FormData();
  };

  const updateImageSubmit = async (formData) => {
    // console.log(message);
    // const res = await fetch("/api/user/uploadimage", {
    //   method: "PUT",
    //   body: formData,
    // });
    const res = await updateNewColorPic(
      "PUT",
      "/api/user/uploadimage",
      formData
    );
    // Await for data for any desirable next steps
    console.log(res.data.message);
    if (res.data.success === true) {
      const res = await updateNewColorPic(
        "GET",
        "/api/auth/session?updateUserSession=true"
      );
      showToast("success", "Picture updated.");
      setBtnColor("bg-slate-700");
      setBtnDisabled(true);
      stopBtnAnimate("sendNewColorBtn");
    }

    // if (res.ok === true) {
    //   router.reload();
    // }
  };

  async function generateRandomColors(num) {
    // make an array
    var arr = [];
    // repeat num times
    for (var i = 0; i < num; i++) {
      // get random color and push into arr
      arr.push(await randomColor());
    }
    // return that array
    return arr;
  }
  async function randomColor() {
    // pick a "red" fromm 0-255
    let r = Math.floor(Math.random() * 256);
    // pick a "green" fromm 0-255
    let g = Math.floor(Math.random() * 256);
    // pick a "blue" fromm 0-255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  } //===

  //===== new colors =====
  const newColorPic = async (e) => {
    e.preventDefault();

    changeBtnColorActive();
    let newColorpic = await generateRandomColors(6);
    // console.log(newColorPic);
    setNewColorState(newColorpic);
    // console.log(newcolorstate);
    const colorCircle = document.querySelector("#colorPic");
    colorCircle.style.backgroundImage = `linear-gradient(225deg, ${newColorpic[0]}, ${newColorpic[1]}, ${newColorpic[2]}, ${newColorpic[3]}, ${newColorpic[4]}, ${newColorpic[5]})`;
    colorCircle.setAttribute("data-color", newColor);
  };
  const colorProfilePic = {
    background: `linear-gradient(225deg, ${props.user.genericImage[0]} , ${props.user.genericImage[1]}, ${props.user.genericImage[2]}, ${props.user.genericImage[3]}, ${props.user.genericImage[4]}, ${props.user.genericImage[5]})`,
  };

  return (
    <>
      <section className="settings-card mt-4 p-4">
        <h4 className="headings-style">Change Profile Picture/Color</h4>
        <h6 className="pb-4 text-sm font-medium tracking-wide">
          Pick between new random color or choose your own custom picture.
        </h6>

        <form
          id="edit-profile-pic-form"
          method="post"
          action="/api/user/uploadimage"
          encType="multipart/form-data"
        >
          <div className="field flex justify-evenly Psm:flex-col Psm:justify-center">
            <div
              ref={newColor}
              id="colorPic"
              style={colorProfilePic}
              className="generic-circle m-auto grid h-80 w-64 items-center rounded-md Psm:mb-4"
            >
              <div
                id="colorPic-container"
                className="m-auto h-3/6 w-4/5 flex-col flex-wrap justify-center rounded-md bg-gray-800 bg-opacity-70 p-4"
              >
                <h3 className="mb-4 mt-4 text-center font-medium antialiased">
                  Change your profile color
                </h3>
                <button
                  onClick={newColorPic}
                  id="changeColor"
                  className="m-auto flex rounded bg-gray-600 p-2 text-center font-medium tracking-tighter antialiased hover:bg-gray-700"
                >
                  <span className="latop-code pr-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.3847 2.87868C19.2132 1.70711 17.3137 1.70711 16.1421 2.87868L14.0202 5.00052L13.313 4.29332C12.9225 3.9028 12.2894 3.9028 11.8988 4.29332C11.5083 4.68385 11.5083 5.31701 11.8988 5.70754L17.5557 11.3644C17.9462 11.7549 18.5794 11.7549 18.9699 11.3644C19.3604 10.9739 19.3604 10.3407 18.9699 9.95018L18.2629 9.24316L20.3847 7.12132C21.5563 5.94975 21.5563 4.05025 20.3847 2.87868Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.9297 7.09116L4.1515 14.8693C3.22786 15.793 3.03239 17.169 3.5651 18.2842L1.99994 19.8493L3.41415 21.2635L4.97931 19.6984C6.09444 20.2311 7.4705 20.0356 8.39414 19.112L16.1723 11.3338L11.9297 7.09116ZM13.3439 11.3338L11.9297 9.91959L5.56571 16.2835C5.17518 16.6741 5.17518 17.3072 5.56571 17.6978C5.95623 18.0883 6.5894 18.0883 6.97992 17.6978L13.3439 11.3338Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  New Color
                </button>
              </div>
            </div>
            {/* <h4 className="m-auto">or</h4> */}
            <div className="m-auto w-64">
              {/* //image container goes here */}
              <picture className="mb-2 block overflow-hidden">
                <img
                  ref={oldProfilePic}
                  id="oldFilenameImage"
                  data-filename={props.profile.image.filename}
                  className="object-cover"
                  src={props.profile.image.url}
                  alt=""
                />
              </picture>
              <div>
                {/* uploadt image input */}
                <label
                  htmlFor="profileImage"
                  className="m-auto block rounded bg-gray-600 p-2 text-center text-white hover:bg-gray-700"
                >
                  <i className="relative pr-2 text-xl">
                    <svg
                      className="inline-block"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 7C5.34315 7 4 8.34315 4 10C4 11.6569 5.34315 13 7 13C8.65685 13 10 11.6569 10 10C10 8.34315 8.65685 7 7 7ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM21 5H3C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H7.31374L14.1924 12.1214C15.364 10.9498 17.2635 10.9498 18.435 12.1214L22 15.6863V6C22 5.44772 21.5523 5 21 5ZM21 19H10.1422L15.6066 13.5356C15.9971 13.145 16.6303 13.145 17.0208 13.5356L21.907 18.4217C21.7479 18.7633 21.4016 19 21 19Z"
                        fill="currentColor"
                      />
                    </svg>
                  </i>
                  Custom Upload
                  <input
                    onChange={loadFile}
                    id="profileImage"
                    type="file"
                    name="image"
                    ref={profilePictureRef}
                  />
                </label>

                <picture className="mt-4 block overflow-hidden">
                  <img className="object-cover" id="output" alt="" />
                </picture>
              </div>
            </div>
          </div>
          <Button
            disabled={btnDisabled}
            label={label}
            idTag={"sendNewColorBtn"}
            handleClick={newPic}
            className={`${btnColor} mt-3 mr-1.5 h-10 w-full rounded bg-opacity-80 p-2 hover:text-white`}
          />
          {/* <button
            onClick={newPic}
            id="edit-pic-btn"
            data-action="/blogs/profile/settings"
            className="mt-3 mr-1.5 inline-flex h-10 w-full items-center justify-center rounded bg-indigo-500 bg-opacity-80  p-2 transition duration-150 ease-in-out hover:bg-indigo-600 hover:text-white"
            aria-roledescription="save profile picture button"
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
              Saving
            </span>

            <span id="postText">Save Picture/Color</span>
          </button> */}
        </form>
      </section>
    </>
  );
}
