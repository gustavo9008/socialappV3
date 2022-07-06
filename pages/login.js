import React from "react";

import Head from "next/head";

import LoginForm from "@/components/ui/LoginForm";
import Card from "@/components/ui/Container";

export default function LoginPage({ csrfToken }) {
  return (
    <>
      <Head>
        <title>Dev.to Sign in</title>
      </Head>


      <Card>
        <div className="login-form-card h-[85vh] Psm:h-[80vh] flex w-full items-center justify-center">
          <LoginForm title={"Log in"} redirect={true} />
        </div>
      </Card>


    </>
  );
}

// export default LoginPage;
