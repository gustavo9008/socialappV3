import React from "react";
import Profile from "../../../components/user/profile";
import { useSession } from "next-auth/client";
import { getSession } from "next-auth/client";

export default function ProfilePage(props) {
  const [session, loading] = useSession();
  //   console.log(session.user.profile.image.genericPic);

  return (
    <>
      <Profile user={session.user} profile={session.user.profile}></Profile>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
