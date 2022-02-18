import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { appToastContext } from "context/state";

const LoginPage = () => {
  const { showToast } = React.useContext(appToastContext);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, [loading, setLoading, router]);
  if (loading) {
    return <p>Loading...</p>;
  }
  // const handleClick = async () => {
  //   const status = await signIn("credentials", {
  //     redirect: false,
  //     email: email,
  //     password: password,
  //   });
  //   console.log(status);
  // };

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
      let message = `Welcome back`;
      router.push("/");
      showToast("success", message);
    }
    if (status.error !== null) {
      console.log(status.error);
      showToast("error", status.error);
    }
  }

  return (
    <>
      <Head>
        <title>Dev.to Sign in</title>
      </Head>

      <section className="login-form">
        <div className="login-form-card w-full flex justify-center items-center">
          <div className="bg-gray-900 border-2 border-gray-500 rounded modal">
            {/* === sing in header */}
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <div>
                <span className="text-sm">Don&#39;t have an account?</span>
                <Link href="/signup">
                  <a className="text-sm text-blue-300 hover:text-blue-400 font-semibold">
                    Sign up
                  </a>
                </Link>
              </div>
            </div>
            <div className="p-3">
              <h2 className=" text-2xl font-bold">Log in</h2>

              <form onSubmit={onSubmit}>
                {/* {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null} */}

                <div className="mb-4 mt-6">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="bg-gray-300 focus:bg-gray-100 appearance-none rounded w-full py-2 px-3 text-gray-900 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                </div>

                <div className="mb-6 mt-6">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="bg-gray-300 focus:bg-gray-100 appearance-none rounded w-full py-2 px-3 text-gray-900 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <p>
                    Forgot password? &#160;
                    <Link href="/forget-password">
                      <a className="text-sm text-blue-300 hover:text-blue-400 font-semibold">
                        Click here
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="flex w-full mt-8">
                  <button
                    className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
