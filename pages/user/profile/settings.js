import React, { useState } from "react";
import Settings from "../../../components/user/settings/profiledit/settings";
import AccountPicture from "@/components/user/settings/profiledit/accountpicture";
import Account from "@/components/user/settings/useraccountedit/account";
import { useSession, getSession } from "next-auth/react";
import { appToastContext } from "context/state";
import { useRouter } from "next/router";

export default function ProfilePage(props) {
  const router = useRouter();

  const { userSession } = React.useContext(appToastContext);
  console.log(userSession);
  const { data: session, status } = useSession();
  console.log(session);
  const [showProfile, setShowProfile] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  // if (userSession === null) {
  //   router.push("/");
  // }

  const showProfileSetting = (e) => {
    e.preventDefault();
    if (showProfile) {
      return;
    }
    setShowAccount(!showAccount);
    setShowProfile(!showProfile);
  };
  const showAcccountSetting = (e) => {
    e.preventDefault();
    if (showAccount) {
      return;
    }
    setShowProfile(!showProfile);
    setShowAccount(!showAccount);
  };
  // console.log(session);

  // React.useEffect(() => {
  //   if (userSession === null) {
  //     router.push("/");
  //   }
  // }, [router, userSession]);
  return (
    <>
      <main className="Psm:flex-col mx-auto flex max-w-screen-md">
        <div className="Psm:w-72 h-full w-48 px-4 py-8">
          <div className="Psm:flex-row mt-6 flex flex-1 flex-col justify-between">
            <nav className="Psm:flex Psm:flex-row Psm:m-auto">
              <div>
                <a
                  onClick={showProfileSetting}
                  className="mt-5 flex transform items-center rounded-md px-4 py-2 text-gray-400 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700"
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
                  onClick={showAcccountSetting}
                  className="mt-5 flex transform items-center rounded-md px-4 py-2 text-gray-400 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700"
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
              <Settings
                user={session.user || null}
                profile={session.user.profile || null}
              />
              <AccountPicture
                user={session.user || null}
                profile={session.user.profile || null}
              />
            </aside>
          </>
        )}
        {showAccount && <Account user={session.user} />}
      </main>
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
