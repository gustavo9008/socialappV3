import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/layout/Footer";
import { appToastContext } from "context/state";
import { ToastWrapper } from "context/state";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { userSession, setUserSession } = React.useContext(appToastContext);

  const { data: session, status } = useSession();
  // const session = data.user;
  // console.log(session);

  React.useEffect(() => {
    if (!userSession) {
      setUserSession(session);
      // console.log(session);
    }
  });

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
