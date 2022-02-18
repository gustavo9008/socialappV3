import React from "react";
import { appToastContext } from "../../../../context/state";
import Button, { useBtnState } from "@/components/ui/Button";

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
  const sendAccountData = props.send;
  const oldPasswordRef = React.useRef();
  const newPasswordRef = React.useRef();
  const strengthBadge = React.useRef();
  const oldPassCheck = React.useRef();
  const containerWarning = React.useRef();
  // const [disabledBtn, setBtnDisabled] = React.useState(true);
  // const [label, setLabel] = React.useState("Save New Password");
  // const [btnColor, setBtnColor] = React.useState("bg-slate-700");
  //=====  =====
  let timeout;
  let idTagPass = "svgSpinChangPassword";

  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );
  //===== sumbmit handler for sending new account data =====
  const updateAccountPasswordSubmit = async (e) => {
    e.preventDefault();
    setLabel("Saving...");
    console.log("change password submit");
    const type = "EDIT_USER_PASSWORD";
    const data = {
      oldPassword: oldPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
      type,
    };
    console.log(data);

    const res = await sendAccountData("PUT", "/api/user/editaccount", data);
    if (res.statusText === "Created") {
      res.data.message &&
        (showToast("success", res.data.message),
        stopBtnAnimate(idTagPass),
        setLabel("Save New Password"),
        (oldPasswordRef.current.value = ""),
        (newPasswordRef.current.value = ""),
        setBtnColor("bg-slate-700"),
        setBtnDisabled(true),
        console.log(res.data),
        containerWarning.current.classList.add("hidden"));
    }
    if (res.statusText === "OK") {
      console.log(res.data);
      res.data.error &&
        (showToast("error", res.data.error.message),
        stopBtnAnimate(idTagPass),
        setLabel("Save New Password"),
        (oldPasswordRef.current.value = ""),
        setBtnColor("bg-slate-700"),
        setBtnDisabled(true));
    }
    console.log(res);
  };

  function StrengthChecker(PasswordParameter) {
    // We then change the badge's color and text based on the password strength

    if (strongPassword.test(PasswordParameter)) {
      containerWarning.current.classList.remove("bg-red-100");
      containerWarning.current.classList.remove("border-red-400");
      containerWarning.current.classList.add("bg-green-100");
      containerWarning.current.classList.add("border-green-400");
      // strengthBadge.current.style.backgroundColor = "green";
      strengthBadge.current.innerText = "Strong Password";
      if (oldPasswordRef.current.value.length === 0) {
        oldPassCheck.current.style.display = "block";
      } else {
        oldPassCheck.current.style.display = "none";
        setBtnColor("bg-indigo-500");
        setBtnDisabled(false);
      }
    } else {
      containerWarning.current.classList.remove("bg-green-100");
      containerWarning.current.classList.remove("border-green-400");
      containerWarning.current.classList.add("bg-red-100");
      containerWarning.current.classList.add("border-red-400");
      strengthBadge.current.innerText = "Weak Password";
    }
  }

  const enableBtn = async (e) => {
    e.preventDefault();

    console.log(strengthBadge.current.innerText);
    containerWarning.current.classList.remove("hidden");

    clearTimeout(timeout);

    timeout = setTimeout(
      () => StrengthChecker(newPasswordRef.current.value),
      500
    );

    if (newPasswordRef.current.value.length !== 0) {
      containerWarning.current.classList.add("block");
    } else {
      containerWarning.current.classList.add("hidden");
    }

    //===== checks inputes if empty, will disabble btn =====

    (oldPasswordRef.current.value === "" ||
      newPasswordRef.current.value === "") &&
      (setBtnColor("bg-slate-700"), setBtnDisabled(true));
  };

  return (
    <>
      <section className="settings-card mt-4 p-4">
        <h4 className="headings-style">Edit Password</h4>
        <form action="/blogs/changepassword" method="POST">
          <div className="field pb-4">
            <label htmlFor="old-password" className="font-medium">
              Old Password
            </label>
            <input
              ref={oldPasswordRef}
              onChange={enableBtn}
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
          <div className="field pb-4">
            <label htmlFor="new-password" className="font-medium">
              New Password
            </label>
            <input
              ref={newPasswordRef}
              onChange={enableBtn}
              id="new-password"
              className="mb-2 h-10 w-full appearance-none rounded bg-gray-700 py-2 px-3 pb-2 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              name="newPassword"
              placeholder="Password"
            />
            <div
              ref={containerWarning}
              className="relative hidden rounded border px-4 py-3 text-gray-900"
              role="alert"
            >
              {/* password info */}
              <aside className="flex flex-row justify-between ">
                <p>
                  <span ref={strengthBadge} className="Psm:inline block">
                    Weak password.
                  </span>
                </p>

                {/* <!-- Component Start --> */}
                <div className="group relative flex items-center">
                  <div className="relative right-0 flex hidden items-center group-hover:flex">
                    <ul className="whitespace-no-wrap absolute right-[-3px] top-[0px] z-50 flex w-72	 flex-col rounded-md border-2 border-solid border-gray-500 bg-gray-900 p-2 text-xs leading-none tracking-tight text-gray-300 opacity-95 shadow-lg">
                      <li className="pb-1">
                        &middot; The password is at least 8 characters long.
                      </li>
                      <li className="pb-1">
                        &middot; The password has at least one uppercase letter.
                      </li>
                      <li className="pb-1">
                        &middot; The password has at least one lowercase letter.
                      </li>
                      <li className="pb-1">
                        &middot; The password has at least one digit.
                      </li>
                      <li className="pb-1">
                        &middot; The password has at least one special
                        character.
                      </li>
                    </ul>
                    {/* <div className="w-3 h-3 -ml-2 rotate-45 bg-black"></div> */}
                  </div>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* <!-- Component End  --> */}
              </aside>
              {/* end of password info */}
            </div>
            {/* <p ref={strengthBadge} className="hidden">
              Password CheckL@k0st0n321
            </p> */}
          </div>
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
            submitForm={updateAccountPasswordSubmit}
            className={`${btnColor} mt-3 mr-1.5 h-10 w-full rounded bg-opacity-80 p-2 hover:text-white`}
          />
        </form>
      </section>
    </>
  );
}
