import React, { useEffect } from "react";
import Head from "next/head";
import { appToastContext } from "context/state";
import { useRouter } from "next/router";

const ForgetPasswordPage = () => {
  const { useFetch, userSession, showToast } =
    React.useContext(appToastContext);
  const router = useRouter();

  const sendLink = useFetch;
  async function handleSubmit(e) {
    e.preventDefault(e);

    const body = {
      email: e.currentTarget.email.value,
    };

    const res = await sendLink("POST", "/api/user/passwordreset", body);

    if (res.data.success === true) {
      showToast("success", res.data.message);
    }
  }
  const getUserSession = () => {
    if (userSession) {
      router.push("/");
    }
  };
  useEffect(() => {
    getUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);

  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>

      <main className="flex flex-row justify-center">
        <section className="modal rounded border-2 border-gray-500 bg-gray-100 dark:bg-slate-900 ">
          <div className="mx-auto flex bg-gray-400 p-6 dark:bg-gray-800 ">
            <div className="px-6 py-6 md:px-8 md:py-0">
              <h2 className="text-xl font-bold">
                Enter email you sign up with.
              </h2>

              <p className="mt-2 text-lg">
                An email will be sent to your personal email address. Just
                follow the instruction .
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row overflow-hidden rounded-lg border border-gray-300 p-1 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40  dark:focus-within:border-blue-300 Psm:flex-col">
                <input
                  id="email"
                  className="bg-white px-6 py-2 placeholder-gray-300 outline-none focus:placeholder-transparent dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:placeholder-transparent"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                />

                <button
                  type="submit"
                  className="transform rounded-lg bg-gray-700 px-4 py-3 text-sm font-medium uppercase tracking-wider text-gray-100 transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                >
                  Submit{" "}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default ForgetPasswordPage;
