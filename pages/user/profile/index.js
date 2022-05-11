import React from "react";
import Profile from "../../../components/user/profile";
import { useSession, getSession } from "next-auth/react";

export default function ProfilePage(props) {
  const { data: session, status } = useSession();
  return (
    <>
    {session ? (
       <>
      <Profile user={session.user} profile={session.user.profile}></Profile>
    </>
    ) : (
      <div className="flex flex-row justify-center">
              {" "}
              <svg
                className="-ml-1 mr-3 h-20 w-20 animate-spin text-white"
                viewBox="0 0 24 24"
                style={{ display: "block" }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
    )
    }
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
