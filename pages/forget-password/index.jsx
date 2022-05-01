import React, { useEffect } from "react";
import Head from "next/head";
import { appToastContext } from "context/state";
import { useRouter } from "next/router";

const ForgetPasswordPage = () => {
  const { useFetch, userSession, showToast } =
    React.useContext(appToastContext);
  const router = useRouter();

  const sendLink = useFetch;
  console.log(userSession);

  async function handleSubmit(e) {
    e.preventDefault(e);

    const body = {
      email: e.currentTarget.email.value,
    };

    const res = await sendLink("POST", "/api/user/passwordreset", body);
    console.log(res);

    // if (res.status === 200) {
    //   setMsg({ message: "An email has been sent to your mailbox" });
    //   console.log(res);
    // } else {
    //   setMsg({ message: await res.text(), isError: true });
    // }
  }
  const getUserSession = () => {
    if (userSession) {
      showToast("success", "Alredy logged in.");
      router.push("/");
    }
  };
  useEffect(() => {
    // getSession().then((session) => {
    //   // console.log(session);
    //   if (session) {
    //     showToast("success", "Alredy logged in.");
    //     router.push("/");
    //   } else {
    //     setLoading(false);
    //   }
    // });
    getUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);

  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>

      <main className="flex flex-row justify-center">
        <section className="modal rounded border-2 border-gray-500 bg-slate-900 ">
          <div className="mx-auto flex bg-gray-800 p-6 ">
            <div className="px-6 py-6 md:px-8 md:py-0">
              <h2 className="text-lg font-bold text-gray-200">
                Enter email you sign up with.
              </h2>

              <p className="mt-2 text-sm text-gray-300">
                An email will be sent to your personal email address. Just
                follow the instruction .
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row overflow-hidden rounded-lg border p-1 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40  dark:focus-within:border-blue-300 Psm:flex-col">
                <input
                  id="email"
                  className="bg-white px-6 py-2 text-gray-200 placeholder-gray-300 outline-none focus:placeholder-transparent dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:placeholder-transparent"
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
