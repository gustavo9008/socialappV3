import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Getting value from useRef()
    const email = e.currentTarget.email.value;
    const name = e.currentTarget.name.value;
    const password = e.currentTarget.password.value;
    // console.log(email, name, password);
    //Validation
    if (!email || !email.includes("@") || !password) {
      alert("Invalid details");
      return;
    }
    //POST form values
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    });
    //Await for data for any desirable next steps
    if (res.ok === true) {
      console.log("success");
      router.push("/login");
    }
    const data = await res.json();
    // console.log(res);
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <main className="ui register-back-image">
        <div className="login-form-card w-full flex justify-center items-center">
          <div className="bg-gray-900 border-2 border-gray-500 rounded register-form-container">
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <div>
                <span className="text-sm">Already have an account?</span>
                <Link href="/login">
                  <a className="text-sm text-blue-300 hover:text-blue-400 font-semibold">
                    Sign in
                  </a>
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h2>Sign up</h2>
              <form onSubmit={handleSubmit}>
                {/* {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null} */}
                <label htmlFor="name">
                  <input
                    className="bg-gray-300 focus:bg-gray-100 appearance-none rounded w-full py-2 px-3 text-gray-900 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                  />
                </label>
                <label htmlFor="email">
                  <input
                    className="bg-gray-300 focus:bg-gray-100 appearance-none rounded w-full py-2 px-3 text-gray-900 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                  />
                </label>
                <label htmlFor="password">
                  <input
                    className="bg-gray-300 focus:bg-gray-100 appearance-none rounded w-full py-2 px-3 text-gray-900 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                  />
                </label>
                <button
                  className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
