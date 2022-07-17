import React from "react";
import Profile from "../../../components/user/profile";
// import { useSession, getSession } from "next-auth/react";
// import user from "@/models/user";
import Spinner from "@/components/ui/loaders/Spinner";
import { appToastContext } from "@/context/state";


export default function ProfilePage(props) {
  const {
    userSession,
  } = React.useContext(appToastContext);
  return (
    <>
      {userSession ? (
        <>
          <Profile user={userSession.user} profile={userSession.user.profile}></Profile>
        </>
      ) : (
        <Spinner></Spinner>

      )
      }
    </>


  );
}

// export async function getServerSideProps(ctx) {
//   console.log("server side run...");
//   const userSession = await getSession(ctx);
//   console.log("userSession", userSession);
//   return {
//     props: {
//       session: userSession,
//     },
//   };
// }
