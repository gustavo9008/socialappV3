import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { appToastContext } from "@/context/state";

import { useRouter } from "next/router";
import {
  PasswordCheck,
  usePasswordInputState,
} from "@/components/utils/inputs/PasswordInput";
import Button, { useBtnState } from "@/components/ui/Button";

import Link from "next/link";

const SignupPage = () => {
  const { useFetch, showToast } = React.useContext(appToastContext);
  const router = useRouter();
  const [
    newPasswordRef,
    containerWarning,
    repeatPasswordRef,
    repeatPasswordCheck,
  ] = usePasswordInputState();
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
  ] = useBtnState(true, "Sign up", "bg-blue-900", "block");
  const nameRef = useRef();
  const emailRef = useRef();
  const nameRefCheck = useRef();
  const emailRefCheck = useRef();

  // const repeatPasswordRef = useRef();
  let timeout;
  //===== submit form to create new account =====

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    nameRef.current.value.length === 0 &&
      (nameRefCheck.current.classList.remove("hidden"),
        stopBtnAnimate("signUpBtn"));
    emailRef.current.value.length === 0 &&
      (emailRefCheck.current.classList.remove("hidden"),
        stopBtnAnimate("signUpBtn"));

    emailRef.current.value.length !== 0 &&
      nameRef.current.value.length !== 0 &&
      (nameRefCheck.current.classList.add("hidden"),
        emailRefCheck.current.classList.add("hidden"),
        sendData());

    //Getting value from useRef()

    // const email = e.currentTarget.email.value;
    // const name = e.currentTarget.name.value;
    // const password = e.currentTarget.password.value;

    //Validation

    //POST form values
    async function sendData() {
      const data = {
        email: emailRef.current.value,
        name: nameRef.current.value,
        password: newPasswordRef.current.value,
      };
      const res = await useFetch("POST", "/api/auth/signup", data);
      //Await for data for any desirable next steps
      if (res.data.created === true) {
        showToast("success", res.data.message);

        router.push("/login");
      }
      if (res.data.created === false) {
        showToast("error", res.data.message)
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <main className="ui register-back-image">
        <div className="login-form-card flex w-full items-center justify-center">
          <div className="register-form-container rounded border-2 bg-gray-100 border-gray-600 dark:bg-gray-800 ">
            <div className="flex items-center justify-between border-b-2 border-gray-600 dark:border-gray-600 px-4 py-2">
              <div>
                <span className="text-sm">Already have an account?</span>
                <Link href="/login">
                  <a className="text-sm font-semibold text-blue-300 hover:text-blue-400">
                    Sign in
                  </a>
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-center font-semibold text-xl">
                <span className="laptop-code  pr-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H5C3.89543 16 3 15.1046 3 14V6ZM5 6H19V14H5V6Z"
                      fill="currentColor"
                    />
                    <path
                      d="M2 18C1.44772 18 1 18.4477 1 19C1 19.5523 1.44772 20 2 20H22C22.5523 20 23 19.5523 23 19C23 18.4477 22.5523 18 22 18H2Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>Sign up</h2>
              <form>
                {/* {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null} */}
                <div className="field pb-4">
                  <label htmlFor="name">Your Name</label>
                  <input
                    ref={nameRef}
                    className="mb-2 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 pb-2 text-gray-900 leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />

                  <div
                    ref={nameRefCheck}
                    className="relative hidden rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-gray-700"
                    role="alert"
                  >
                    <span className="block sm:inline">Name is required.</span>
                  </div>
                </div>

                <div className="field pb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    ref={emailRef}
                    className="mb-2 h-10 w-full appearance-none rounded bg-gray-300 text-gray-900 py-2 px-3 pb-2 text-sm leading-tight focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="off"
                    required
                  />
                  <div
                    ref={emailRefCheck}
                    className="relative hidden rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-gray-700"
                    role="alert"
                  >
                    <span className="block sm:inline">Email is required</span>
                  </div>
                </div>
                <div className="field pb-4">
                  <PasswordCheck
                    newPasswordRef={newPasswordRef}
                    containerWarning={containerWarning}
                    bgColor={"bg-gray-300 focus:bg-white"}
                    inputLabel={"Password"}
                    setBtnDisabled={setBtnDisabled}
                    setBtnColor={setBtnColor}
                    repeatPasswordRef={repeatPasswordRef}
                    repeatPasswordCheck={repeatPasswordCheck}
                  />
                  {/* <label htmlFor="password">Repeat Password</label>
                  <input
                    ref={repeatPasswordRef}
                    onChange={enableBtn}
                    className="mb-2 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 pb-2 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Reapeat password"
                  /> */}
                </div>

                {/* <button
                  className="hover:bg-grey-900 focus:shadow-outline h-10 w-full rounded bg-gray-800 py-2 px-4 text-sm font-semibold text-white focus:outline-none"
                  type="submit"
                >
                  Sign up
                </button> */}
                <Button
                  disabled={btnDisabled}
                  label={label}
                  idTag={`signUpBtn`}
                  handleClick={handleSignUpSubmit}
                  className={`${btnColor} mt-3 mr-1.5 h-10 w-full rounded bg-opacity-80 p-2 hover:text-white`}
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
