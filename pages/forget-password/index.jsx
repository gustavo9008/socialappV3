import React, { useState, useEffect } from "react";
import Head from "next/head";
import { appToastContext } from "context/state";
import { useRouter } from "next/router";
import { useSearchParams } from "react-router-dom";
import { getSession } from "next-auth/react";

const ForgetPasswordPage = () => {
  const { useFetch, userSession, showToast } =
    React.useContext(appToastContext);
  const router = useRouter();

  const [msg, setMsg] = useState({ message: "", isError: false });
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
      <h2>Forget password</h2>
      {msg.message ? (
        <p
          style={{
            color: msg.isError ? "red" : "#0070f3",
            textAlign: "center",
          }}
        >
          {msg.message}
        </p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <p>Do not worry. Simply enter your email address below.</p>
        <label htmlFor="email">
          <input id="email" type="email" placeholder="Email" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ForgetPasswordPage;
