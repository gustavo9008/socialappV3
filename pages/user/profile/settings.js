import React, { Suspense, useState, useRef } from "react";
import dynamic from 'next/dynamic';
// import Head from "next/head";
// import Settings from "../../../components/user/settings/profiledit/settings";
// import AccountPicture from "@/components/user/settings/profiledit/accountpicture";
// import Account from "@/components/user/settings/useraccountedit/AccountIndex";
import { useSession, getSession } from "next-auth/react";
import { appToastContext } from "context/state";
import { useRouter } from "next/router";
import Spinner from "@/components/ui/loaders/Spinner";
import Head from "next/head";
// import profile from "@/models/profile";

const Settings = dynamic(() => import("../../../components/user/settings/profiledit/settings"), {
  suspense: true
});

const AccountPicture = dynamic(() => import("@/components/user/settings/profiledit/accountpicture"), { suspense: true });
const Account = dynamic(() => import("@/components/user/settings/useraccountedit/AccountIndex"), { suspense: true });


// const Settings = dynamic(() =>
//   import("../../../components/user/settings/profiledit/settings").then((mod) => mod.Settings), { ssr: false }
// )


export default function ProfilePage(props) {
  const router = useRouter();

  const { userSession, setUserSession, useFetch } = React.useContext(appToastContext);
  const updateUser = useFetch;
  const [showProfile, setShowProfile] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  const profileBtnRef = useRef();
  const settingBtnRef = useRef();
  const updateSession = async () => {
    const resSession = await updateUser(
      "GET",
      "/api/auth/session?updateUserSession=true"
    );
    resSession.status === 200 && setUserSession(resSession.data);

  }

  const showProfileSetting = (e) => {
    e.preventDefault();
    if (showProfile) {
      return;
    }
    // profileBtnRef.current.classList.add("bg-gray-200", "text-gray-700");
    // settingBtnRef.current.classList.remove("bg-gray-200", "text-gray-700");
    setShowAccount(!showAccount);
    setShowProfile(!showProfile);
  };
  const showAcccountSetting = (e) => {
    e.preventDefault();
    if (showAccount) {
      return;
    }
    // profileBtnRef.current.classList.remove("bg-gray-200", "text-gray-700");
    // settingBtnRef.current.classList.add("bg-gray-200", "text-gray-700");
    setShowProfile(!showProfile);
    setShowAccount(!showAccount);
  };
  // React.useEffect(() => {
  //   userSession !== null && showProfile && profileBtnRef.current.classList.add("bg-gray-200", "text-gray-700");
  //   userSession !== null && showAccount && settingBtnRef.current.classList.remove("bg-gray-200", "text-gray-700");
  // }, [userSession]);
  return (
    <>
      <Head>
        <title>Edit your profile</title>
        <meta name="description" content="Dev.to edit profile" />
        {/* <link rel="icon" href="/laptop.ico" /> */}
      </Head>

      {userSession !== null ? (
        <main className="mx-auto flex max-w-screen-md Psm:flex-col">
          <div className="w-48 Psm:w-full">
            <div className="flex flex-1 items-center flex-col justify-between Psm:flex-row">
              <nav className="Psm:m-auto gap-4 Psm:flex Psm:flex-row">
                <div>
                  <a
                    ref={profileBtnRef}
                    onClick={showProfileSetting}
                    className={`${showProfile && (`bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-700`)} ${!showProfile && (` dark:text-gray-100 hover:text-gray-100 hover:bg-gray-800 hover:dark:text-gray-900`)} mt-5 flex transform items-center rounded-md px-4 py-2 transition-colors duration-200 hover:dark:bg-gray-100  cursor-pointer`}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="mx-4 font-medium">Profile</span>
                  </a>
                </div>

                <div>
                  <a
                    ref={settingBtnRef}
                    onClick={showAcccountSetting}
                    className={`${showAccount && (`bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-700`)} ${!showAccount && (` dark:text-gray-100 hover:text-gray-100 hover:bg-gray-800 hover:dark:text-gray-900`)} mt-5 flex transform items-center rounded-md px-4 py-2 transition-colors duration-200 hover:dark:bg-gray-100  cursor-pointer`}
                    href="#"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="mx-4 font-medium">Settings</span>
                  </a>
                </div>

                <hr className="my-6 dark:border-gray-600" />
              </nav>
            </div>
          </div>
          {showProfile && (
            <>
              <aside>
                <Suspense fallback={<Spinner marginTop={"mt-10"} />}>
                  <Settings
                    user={userSession.user || null}
                    profile={userSession.user.profile || null}
                    updateSession={updateSession}

                  />
                  <AccountPicture
                    user={userSession.user || null}
                    profile={userSession.user.profile || null}
                    updateSession={updateSession}
                  />
                </Suspense>


              </aside>
            </>
          )}
          <Suspense fallback={<Spinner marginTop={"mt-10"} />}>
            {showAccount && <Account user={userSession.user} updateSession={updateSession} useAxiosFetch={useFetch} />}


          </Suspense>
        </main>
      ) : (
        <Spinner />
      )}

      {/* <Spinner marginTop={"mt-10"} /> */}

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
