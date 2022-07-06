import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { appToastContext } from "context/state";
import { getCookie, removeCookies } from "cookies-next";
import Spinner from "./Spinner";

function LoginForm(props) {
  const { showToast, userSession } = React.useContext(appToastContext);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  if (userSession) {
    // showToast("success", "Alredy logged in.");
    router.push("/");
  }

  //===== login function =====
  async function onSubmit(e) {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const status = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    console.log(status);
    if (status.error === null) {
      let readingCookie = getCookie("user_lists");
      // console.log(readingCookie);
      localStorage.setItem("user_lists", readingCookie);
      // let message = `Welcome back`;
      if (props.redirect) {
        router.push("/");
      }
      showToast("success", `Welcome back`);
      removeCookies("user_lists");
    }
    if (status.error !== null) {
      // console.log(status.error);
      showToast("error", status.error);
    }
    return;
  }

  const checkUserSession = () => {
    if (userSession) {
      // showToast("success", "Alredy logged in.");
      router.push("/");
    }
  };

  // useEffect(() => {
  //   // getSession().then((session) => {
  //   //   // console.log(session);
  //   //   if (session) {
  //   //     showToast("success", "Alredy logged in.");
  //   //     router.push("/");
  //   //   } else {
  //   //     setLoading(false);
  //   //   }
  //   // });
  //   checkUserSession();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userSession]);

  return (
    <>
      {userSession ? (
        <Spinner></Spinner>
      ) : (
        <div className="modal rounded border-2 border-gray-500 bg-white dark:bg-gray-800">
          {/* === sing in header */}
          <div className="flex items-center justify-between border-b px-4 py-2">
            <div className="flex flex-row justify-between">
              <span className="text-sm">Don&#39;t have an account?</span>
              <Link href="/signup">
                <a className="text-sm font-semibold text-blue-300 hover:text-blue-400">
                  Sign up
                </a>
              </Link>
            </div>
            {props.closeBtn}
          </div>
          <div className="p-3">
            <h2 className=" text-2xl font-bold">{props.title}</h2>

            <form id="formLogin" method="post" onSubmit={onSubmit}>
              {/* {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null} */}
              {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}

              <div className="mb-4 mt-6">
                <label
                  className="mb-2 block text-sm font-semibold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 leading-tight text-gray-900 focus:border-transparent focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                />
              </div>

              <div className="mb-6 mt-6">
                <label
                  className="mb-2 block text-sm font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="mb-1 h-10 w-full appearance-none rounded bg-gray-300 py-2 px-3 leading-tight text-gray-900 focus:border-transparent focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <p>
                  Forgot password? &#160;
                  <Link href="/forget-password">
                    <a className="text-sm font-semibold text-blue-300 hover:text-blue-400">
                      Click here
                    </a>
                  </Link>
                </p>
              </div>
              <div className="mt-8 flex w-full">
                <button
                  className="hover:bg-grey-900 focus:shadow-outline h-10 w-full rounded bg-gray-800 py-2 px-4 text-sm font-semibold text-white focus:outline-none"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
