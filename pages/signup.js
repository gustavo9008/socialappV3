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
  const { useFetch } = React.useContext(appToastContext);
  const router = useRouter();
  const [newPasswordRef, containerWarning, strengthBadge, repeatPasswordRef] =
    usePasswordInputState();
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
  ] = useBtnState(true, "Sign up", "bg-slate-700", "block");
  const nameRef = useRef();
  const emailRef = useRef();
  const nameRefCheck = useRef();
  const emailRefCheck = useRef();

  // const repeatPasswordRef = useRef();
  let timeout;
  //===== submit form to create new account =====

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    console.log(nameRef.current.value.length, emailRef.current.value.length);

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
    // console.log(data);
    //Validation

    //POST form values
    async function sendData() {
      const data = {
        email: emailRef.current.value,
        name: nameRef.current.value,
        password: newPasswordRef.current.value,
      };
      console.log(data);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      //Await for data for any desirable next steps
      if (res.ok === true) {
        console.log("success");
        router.push("/login");
      }
      const resData = await res.json();
      console.log(res);
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <main className="ui register-back-image">
        <div className="login-form-card flex w-full items-center justify-center">
          <div className="register-form-container rounded border-2 border-gray-500 bg-gray-900">
            <div className="flex items-center justify-between border-b px-4 py-2">
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
              <h2>Sign up</h2>
              <form>
                {/* {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null} */}
                <div className="field pb-4">
                  <label htmlFor="name">Your Name</label>
                  <input
                    ref={nameRef}
                    className="mb-2 h-10 w-full appearance-none rounded bg-gray-500 py-2 px-3 pb-2 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="mb-2 h-10 w-full appearance-none rounded bg-gray-500 py-2 px-3 pb-2 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    strengthBadge={strengthBadge}
                    bgColor={"bg-gray-500"}
                    inputLabel={"Password"}
                    setBtnDisabled={setBtnDisabled}
                    setBtnColor={setBtnColor}
                  />
                  {/* <label htmlFor="password">Repeat Password</label>
                  <input
                    ref={repeatPasswordRef}
                    onChange={enableBtn}
                    className="mb-2 h-10 w-full appearance-none rounded bg-gray-500 py-2 px-3 pb-2 text-sm leading-tight focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
