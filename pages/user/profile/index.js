import React from "react";
import Profile from "../../../components/user/profile";
import { useSession, getSession } from "next-auth/react";

export default function ProfilePage(props) {
  const { data: session, status } = useSession();
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
