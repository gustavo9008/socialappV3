import React, { useRef } from "react";
import { appToastContext } from "../../../../context/state";
import Button, { useBtnState } from "@/components/ui/Button";

export default function UserAccount(props) {
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
  ] = useBtnState(true, "Update", "bg-slate-700", "block");
  // console.log(props);
  // console.log(userSession);
  // const [btnColor, setBtnColor] = React.useState("bg-slate-700");
  // const [animateBtn, setAnimateBtn] = React.useState("animate-spin");
  // const [label, setLabel] = React.useState("Update");
  const [emailError, setEmailError] = React.useState(false);
  // const [disabledBtn, setBtnDisabled] = React.useState(true);
  const sendAccountData = useFetch;
  const newNameRef = useRef();
  const newEmailRef = useRef();
  const idTagChangeUser = "svgSpinChangUser";

  const refreshToeknTrigger = () => {
    setTokenRefreshInterval(432000);
  };
  const emailErrorMessage = "You must provide valid email.";
  // console.log(sendAccountData);

  // const stopBtnAnimate = () => {
  //   document.querySelector("#svgSpin").classList.remove("animate-spin");
  //   document.querySelector("#svgSpin").style.display = "none";
  // };
  //===== fucntion to send user account update =====
  const updateAccountSubmit = async (e) => {
    e.preventDefault();
    console.log("change account user name");
    setBtnDisabled(true);
    setLabel("Updating...");
    const type = `EDIT_USER_ACCOUNT`;
    const data = {
      newName: newNameRef.current.value
        ? newNameRef.current.value
        : props.user.name,
      newEmail: newEmailRef.current.value
        ? newEmailRef.current.value
        : props.user.email,
      type,
    };
    // console.log(data);
    const res = await sendAccountData("PUT", "/api/user/editaccount", data);
    if (res.statusText === "Created") {
      // console.log(userSession);
      setTokenRefreshInterval(2);
      setTimeout(() => {
        console.log("setTimeout Triggered!");
        refreshToeknTrigger();
      }, 4000);
      showToast("success", res.data.message);
      newEmailRef.current.value = "";
      newNameRef.current.value = "";
      stopBtnAnimate(idTagChangeUser);
      setLabel("Update");
      setBtnColor("bg-slate-700");
    }
  };
  //===== function check if form are valid to enable btn =====
  const enableBtn = async (e) => {
    e.preventDefault();
    // let regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //===== checks inputes if empty, will disabble btn =====
    // if (!regEmail.test(newEmailRef.current.value)) {
    //   console.log("Email error FALSE");
    // }
    // if (regEmail.test(newEmailRef.current.value)) {
    //   console.log("Email error TRUE");
    // }
    (newNameRef.current.value === "" || newEmailRef.current.value === "") &&
      (setBtnColor("bg-slate-700"), setBtnDisabled(true), setEmailError(false));

    //===== if input not empty will enable btn =====
    if (newNameRef.current.value !== "") {
      emailError && setEmailError(false);
      !regEmail.test(newEmailRef.current.value) &&
        btnColor !== "bg-indigo-500" &&
        (setBtnColor("bg-indigo-500 hover:bg-indigo-600"),
        setBtnDisabled(false));
    }
    //===== checks email input if valid it will enable btn =====
    if (regEmail.test(newEmailRef.current.value) === true) {
      setEmailError(false);
      regEmail.test(newEmailRef.current.value) &&
        btnColor !== "bg-indigo-500" &&
        (setBtnColor("bg-indigo-500 hover:bg-indigo-600"),
        setBtnDisabled(false)),
        setEmailError(false);
    } else {
      // setEmailError(true);
      newEmailRef.current.value !== "" &&
        (setBtnColor("bg-slate-700"),
        setBtnDisabled(true),
        setEmailError(true));
    }
  };

  return (
    <>
      <section className="settings-card mt-4 p-4">
        <h4 className="headings-style">Edit User Account</h4>
        <form action="/blogs/changeuser?_method=PUT" method="POST">
          <div className="field pb-3">
            <p className="font-medium">
              {" "}
              Current Name: <span>{props.user.name}</span>
            </p>
            <label htmlFor="name" className="font-medium">
              New Name
            </label>
            <input
              onChange={enableBtn}
              ref={newNameRef}
              id="name"
              className="mb-1 h-10 w-full appearance-none rounded bg-gray-700 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="name"
            />
          </div>
          <div className="field pt-3">
            <p className="font-medium">
              {" "}
              Current Email: <span>{props.user.email}</span>
            </p>
            <label htmlFor="email" className="font-medium">
              New Email
            </label>
            <input
              onChange={enableBtn}
              ref={newEmailRef}
              id="email"
              className="mb-1 h-10 w-full appearance-none rounded bg-gray-700 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              name="email"
            />
            {emailError && (
              <div
                className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <strong className="font-bold">Warning! </strong>
                <span className="block sm:inline">Email not valid.</span>
              </div>
            )}
          </div>

          {/* <button
            onClick={checkForms}
            className="w-full bg-opacity-80 rounded hover:text-white bg-indigo-500 hover:bg-indigo-600 p-2 mt-3 mr-1.5 h-10"
            type="submit"
            aria-roledescription="update user info"
          >
            Update User
          </button> */}
          <Button
            disabled={btnDisabled}
            label={label}
            idTag={idTagChangeUser}
            handleClick={updateAccountSubmit}
            className={`${btnColor} mt-3 mr-1.5 h-10 w-full rounded bg-opacity-80 p-2 hover:text-white`}
          />
        </form>
      </section>
    </>
  );
}
