import React, { useEffect } from "react";
import Head from "next/head";
import { appToastContext } from "context/state";
import User from "../../models/user";
import dbConnect from "../../middleware/mongodb";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  PasswordCheck,
  usePasswordInputState,
} from "@/components/utils/inputs/PasswordInput";
import Button, { useBtnState } from "@/components/ui/Button";

const ResetPasswordTokenPage = ({ valid, token }) => {
  const [
    newPasswordRef,
    containerWarning,
    repeatPasswordRef,
    repeatPasswordCheck,
  ] = usePasswordInputState();
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
  ] = useBtnState(true, "Update", "bg-slate-700", "block");
  const { useFetch, showToast, userSession } =
    React.useContext(appToastContext);
  const sendNewPassword = useFetch;
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      password: newPasswordRef.current.value,
      token,
    };
    console.log(body);
    newPasswordRef.current.value.length !== 0 && resetUserPassword();
    async function resetUserPassword() {
      const res = await sendNewPassword("PUT", "/api/user/passwordreset", body);

      console.log(res);
      if (res.statusText === "OK") {
        showToast("success", res.data.message);
        router.push("/login");
      }
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
            <main className="flex flex-row justify-center">
              <section className="modal rounded border-2 border-gray-500 bg-slate-900 p-8">
                <PasswordCheck
                  newPasswordRef={newPasswordRef}
                  containerWarning={containerWarning}
                  bgColor={"bg-gray-700"}
                  inputLabel={"Enter New Password"}
                  setBtnDisabled={setBtnDisabled}
                  setBtnColor={setBtnColor}
                  repeatPasswordRef={repeatPasswordRef}
                  repeatPasswordCheck={repeatPasswordCheck}
                />
                <Button
                  disabled={btnDisabled}
                  label={`Reset Password`}
                  idTag={`resetPasswordSubmit`}
                  handleClick={handleSubmit}
                  className={`${btnColor} mt-3 mr-1.5 h-10 w-full rounded bg-opacity-80 p-2 hover:text-white`}
                />
              </section>
            </main>
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
