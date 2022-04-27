import React from "react";

import Head from "next/head";

import LoginForm from "@/components/ui/LoginForm";

export default function LoginPage({ csrfToken }) {
  return (
    <>
      <Head>
        <title>Dev.to Sign in</title>
      </Head>

      <section className="login-form">
        <div className="login-form-card flex w-full items-center justify-center">
          <LoginForm title={"Log in"} redirect={true} />
        </div>
      </section>
    </>
  );
}

// export default LoginPage;
