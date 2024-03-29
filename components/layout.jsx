import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { appToastContext } from "context/state";
// import { ToastWrapper } from "context/state";
import { useSession } from "next-auth/react";
// import user from "models/user";

export default function Layout({ children }) {
  // console.log("redering...");
  const { userSession, setUserSession, setTokenRefreshInterval } =
    React.useContext(appToastContext);
  // console.log(children);

  const { data: session, status } = useSession();
  // console.log(status);

  // const session = data.user;

  React.useEffect(() => {
    // console.log(status);

    if (status === "authenticated" && userSession === null) {
      // console.log(session);
      // console.log(userSession);

      // session.user.updated === userSession
      setUserSession(session);
    }
    // if (userSession?.user.updated !== session?.user.updated) {
    //   console.log("updated does not match");
    //   // if (!localStorage.getItem("reading_list")) {
    //   //   console.log(localStorage.getItem("reading_list") === "[]");
    //   //   console.log(localStorage.getItem("reading_list"));
    //   //   // console.log(JSON.parse(localStorage.getItem("reading_list")).length);
    //   // }
    //   // console.log("setting user session");
    //   setUserSession(session);
    //   // console.log(session);
    // }
  }, [session, setUserSession, status, userSession]);

  return (
    <>
      <Header />
      {children}

      <Footer />
    </>
  );
}
