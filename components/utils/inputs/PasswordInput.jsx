import React from "react";
import { appToastContext } from "../../../context/state";
import Button, { useBtnState } from "@/components/ui/Button";

export function usePasswordInputState() {
  const newPasswordRef = React.useRef();
  // const strengthBadge = React.useRef();

  return [newPasswordRef];
}

function PasswordInput(props, ref) {
  const repeatPasswordRef = React.useRef();
  const repeatPasswordCheck = React.useRef();
  const containerWarning = React.useRef();
  const strengthBadge = React.useRef();
  const matchBadge = React.useRef();
  const [passwordMatchColor, setPasswordMatchColor] = React.useState("");
  let timeout;

  //=====  =====

  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  function StrengthChecker(PasswordParameter) {
    // We then change the badge's color and text based on the password strength

    if (strongPassword.test(PasswordParameter)) {
      containerWarning.current.classList.remove("bg-red-100");
      containerWarning.current.classList.remove("border-red-400");
      containerWarning.current.classList.add("bg-green-100");
      containerWarning.current.classList.add("border-green-400");
      // strengthBadge.current.style.backgroundColor = "green";
      strengthBadge.current.innerText = "Strong Password";
    } else {
      containerWarning.current.classList.remove("bg-green-100");
      containerWarning.current.classList.remove("border-green-400");
      containerWarning.current.classList.add("bg-red-100");
      containerWarning.current.classList.add("border-red-400");
      strengthBadge.current.innerText = "Weak Password";
    }

    repeatPasswordRef.current.value.length !== 0 && checkPasswordMatch();
  }

  // function checkPasswordMatch() {
  //   newPasswordRef.current.value === repeatPasswordRef.current.value &&
  //     (console.log("password matches"),
  //     console.log(
  //       newPasswordRef.current.value,
  //       repeatPasswordRef.current.value
  //     ));
  //   return;
  // }

  const checkPassword = () => {
    console.log("password input had been used!");
    containerWarning.current.classList.remove("hidden");

    clearTimeout(timeout);

    timeout = setTimeout(
      () => StrengthChecker(props.newPasswordRef.current.value),
      500
    );

    if (props.newPasswordRef.current.value.length !== 0) {
      containerWarning.current.classList.add("block");
    } else {
      containerWarning.current.classList.add("hidden");
    }

    // console.log(newPasswordRef.current.value);
    // newPasswordRef.current.value !== "" &&
    //   repeatPasswordRef.current.value &&
    //   newPasswordRef.current.value === repeatPasswordRef.current.value &&
    //   (console.log("password matches"),
    //   console.log(
    //     newPasswordRef.current.value,
    //     repeatPasswordRef.current.value
    //   ));
    // // console.log(newPasswordRef.current.value, repeatPasswordRef.current.value);
    // (repeatPasswordRef.current.value === "" ||
    //   newPasswordRef.current.value === "") &&
    //   (setBtnColor("bg-slate-700"), setBtnDisabled(true));
  };

  function passwordMatch() {
    setPasswordMatchColor("bg-green-100 border-green-400");
    // repeatPasswordCheck.current.classList.add("bg-green-100");
    // repeatPasswordCheck.current.classList.add("border-green-400");
    props.setBtnColor("bg-indigo-500");
    props.setBtnDisabled(false);
    matchBadge.current.innerText = "Password matches.";
  }

  function passwordNotMatch() {
    setPasswordMatchColor("bg-yellow-100 border-yellow-400");

    // repeatPasswordCheck.current.classList.add("bg-yellow-100");
    // repeatPasswordCheck.current.classList.add("border-yellow-400");
    repeatPasswordCheck.current.style.display = "block";
    matchBadge.current.innerText = "Password does not match";
    props.setBtnColor("bg-slate-700");
    props.setBtnDisabled(true);
  }

  function checkPasswordMatch() {
    props.newPasswordRef.current.value === repeatPasswordRef.current.value &&
      passwordMatch();

    props.newPasswordRef.current.value !== repeatPasswordRef.current.value &&
      passwordNotMatch();

    return;
  }

  return (
    <div className="field pb-4">
      <label htmlFor="new-password" className="font-medium">
        {props.inputLabel}
      </label>
      <input
        ref={props.newPasswordRef}
        onChange={checkPassword}
        id="new-password"
        className={`mb-2 h-10 w-full appearance-none rounded py-2 px-3 pb-2 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props?.bgColor}`}
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
            <span ref={strengthBadge} className="block Psm:inline">
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
                  &middot; The password has at least one special character.
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

      <label htmlFor="password">Repeat Password</label>
      <input
        ref={repeatPasswordRef}
        onChange={checkPasswordMatch}
        className={`mb-2 h-10 w-full appearance-none rounded bg-gray-500 py-2 px-3 pb-2 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        id="password"
        name="password"
        type="password"
        placeholder="Reapeat password"
      />

      <div
        ref={repeatPasswordCheck}
        className={`relative hidden rounded border px-4 py-3 text-gray-700 ${passwordMatchColor}`}
        role="alert"
      >
        <span ref={matchBadge} className="block sm:inline">
          Password does not match.
        </span>
      </div>
      {/* <p ref={strengthBadge} className="hidden">
      Password CheckL@k0st0n321
    </p> */}
    </div>
  );
}

export const PasswordCheck = React.forwardRef(PasswordInput);
