import React, { useEffect } from "react";
import Head from "next/head";
import { appToastContext } from "context/state";
import User from "../../models/user";
import dbConnect from "../../middleware/mongodb";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/router";

const ResetPasswordTokenPage = ({ valid, token }) => {
  const { useFetch, showToast, userSession } =
    React.useContext(appToastContext);
  const sendNewPassword = useFetch;
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      password: event.currentTarget.password.value,
      token,
    };

    const res = await sendNewPassword("PUT", "/api/user/passwordreset", body);

    console.log(res);
    if (res.statusText === "OK") {
      showToast("success", res.data.message);
      router.push("/login");
    }
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
        <title>Change Password</title>
      </Head>

      {/* <h2>Forget password</h2> */}
      <Card>
        {valid ? (
          <>
            <p>Enter your new password.</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="New password"
                />
              </div>
              <button type="submit">Set new password</button>
            </form>
          </>
        ) : (
          <>
            <p className="text-center text-4xl">This link is expired</p>
            <p className="mt-4 text-center">
              <Link href="/forget-password">
                <a className="text-sm font-semibold text-blue-300 hover:text-blue-400">
                  Click here
                </a>
              </Link>{" "}
              to resend new link{" "}
            </p>
          </>
        )}
      </Card>
    </>
  );
};

export async function getServerSideProps(ctx) {
  console.log("Change password page with token");
  const { token } = ctx.query;

  dbConnect();
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  const resetLinkExp = user ? true : false;
  console.log(resetLinkExp);
  // const handler = nc();
  // handler.use(database);
  // await handler.run(ctx.req, ctx.res);
  console.log(token);

  // const tokenDoc = await findTokenByIdAndType(ctx.req.db, ctx.query.token, 'passwordReset');

  return { props: { token, valid: resetLinkExp } };
}

export default ResetPasswordTokenPage;
