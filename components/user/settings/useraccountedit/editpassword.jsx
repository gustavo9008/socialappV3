import React from "react";
import { appToastContext } from "../../../../context/state";
import Button, { useBtnState } from "@/components/ui/Button";
import {
  PasswordCheck,
  usePasswordInputState,
} from "@/components/utils/inputs/PasswordInput";

export default function EditPassword(props) {
  //===== state init =====
  const {
    useFetch,
    showToast,
    userSession,
    setUserSession,
    setTokenRefreshInterval,
  } = React.useContext(appToastContext);
  //===== btn init =====
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
  ] = useBtnState(true, "Update", "bg-slate-700", "block");
  const [
    newPasswordRef,
    containerWarning,
    repeatPasswordRef,
    repeatPasswordCheck,
  ] = usePasswordInputState();
  const sendAccountData = useFetch;
  const oldPasswordRef = React.useRef();
  // const newPasswordRef = React.useRef();
  // const strengthBadge = React.useRef();
  const oldPassCheck = React.useRef();
  // const containerWarning = React.useRef();
  // const [disabledBtn, setBtnDisabled] = React.useState(true);
  // const [label, setLabel] = React.useState("Save New Password");
  // const [btnColor, setBtnColor] = React.useState("bg-slate-700");
  //=====  =====
  let idTagPass = "svgSpinChangPassword";

  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  // let mediumPassword = new RegExp(
  //   "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  // );

  //===== sumbmit handler for sending new account data =====
  const updateAccountPasswordSubmit = async (e) => {
    e.preventDefault();
    if (oldPasswordRef.current.value.length === 0) {
      oldPassCheck.current.style.display = "block";
      stopBtnAnimate(idTagPass);
    } else {
      oldPassCheck.current.style.display = "none";
      updatePassword();
    }

    async function updatePassword() {
      setBtnDisabled(true);
      setLabel("Saving...");
      const type = "EDIT_USER_PASSWORD";
      const data = {
        oldPassword: oldPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
        type,
      };

      const res = await sendAccountData("PUT", "/api/user/editaccount", data);
      if (res.status === 201) {
        res.data.message &&
          (showToast("success", res.data.message),
          stopBtnAnimate(idTagPass),
          setLabel("Save New Password"),
          (oldPasswordRef.current.value = ""),
          (newPasswordRef.current.value = ""),
          (repeatPasswordRef.current.value = ""),
          containerWarning.current.classList.add("hidden"),
          repeatPasswordCheck.current.classList.add("hidden"),
          setBtnColor("bg-slate-700"),
          setBtnDisabled(true));
      }

      res.data.error &&
        (showToast("error", res.data.errorMessage.message),
        stopBtnAnimate(idTagPass),
        setLabel("Save New Password"),
        (oldPasswordRef.current.value = ""),
        setBtnDisabled(false));
    }
  };

  return (
    <>
      <section className="settings-card mt-4 p-4">
        <h4 className="headings-style">Edit Password</h4>
        <form action="/blogs/changepassword" method="POST">
          <div className="field pb-4">
            <label htmlFor="old-password" className="font-medium">
              Current Password
            </label>
            <input
              ref={oldPasswordRef}
              id="old-password"
              className="mb-2 h-10 w-full appearance-none rounded bg-gray-700 py-2 px-3 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              name="oldPassword"
              placeholder="Password"
            />
            {/* <p ref={oldPassCheck} className="hidden">
                You must provide current password.
              </p> */}
            <div
              ref={oldPassCheck}
              className="relative hidden rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-gray-700"
              role="alert"
            >
              <span className="block sm:inline">
                You must provide current password.
              </span>
            </div>
          </div>
          {/* new password input */}
          {/* <NewDefaultPasswordInput
            newPasswordRef={newPasswordRef}
            enableBtn={enableBtn}
            containerWarning={containerWarning}
            strengthBadge={strengthBadge}
          /> */}

          <PasswordCheck
            newPasswordRef={newPasswordRef}
            containerWarning={containerWarning}
            bgColor={"bg-gray-700"}
            inputLabel={"Enter New Password"}
            setBtnDisabled={setBtnDisabled}
            setBtnColor={setBtnColor}
            repeatPasswordRef={repeatPasswordRef}
            repeatPasswordCheck={repeatPasswordCheck}
          />
          {/* <button
              onClick={updateAccountPasswordSubmit}
              className="w-full bg-opacity-80 rounded hover:text-white bg-indigo-500 hover:bg-indigo-600 p-2 mt-3 mr-1.5 h-10"
              type="submit"
              aria-label="save new password button"
            >
              Save New Password
            </button> */}
          <Button
            disabled={btnDisabled}
            label={label}
            idTag={idTagPass}
            handleClick={updateAccountPasswordSubmit}
            className={`${btnColor} mt-3 mr-1.5 h-10 w-full rounded bg-opacity-80 p-2 hover:text-white`}
          />
        </form>
      </section>
    </>
  );
}
