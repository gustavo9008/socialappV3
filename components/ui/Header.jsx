import React from "react";
import { appToastContext } from "context/state";
// import Head from "next/head";
import Link from "next/link";
// import { useSession } from "next-auth/react";

import AlpineWidjet from "@/components/ui/navdropdown";

export default function Header() {
  const { userSession } = React.useContext(appToastContext);
  // console.log(userSession);

  // console.log(session);

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };

  // no user button options
  const noUserBtns = (
    <>
      <Link href="/login">
        <a
          className="mr-1.5 rounded bg-blue-400 p-2 font-medium text-gray-900 antialiased hover:bg-blue-600"
          role="menuitem"
          aria-label="login button"
        >
          Login
        </a>
      </Link>

      <Link href="/signup">
        <a
          className="rounded bg-gray-700 p-2 font-medium hover:bg-gray-600"
          role="menuitem"
          aria-label="create account button"
        >
          Create Account
        </a>
      </Link>
    </>
  );

  // user logged in options
  // const userLoggedIn = (

  // );
  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 z-50 mb-4 w-full border-b-2 border-gray-900 bg-gray-800 text-white"
        role="menubar"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 ">
              <div className="flex">
                <Link href="/">
                  <a
                    className="gen rounded bg-gray-700 p-2 hover:bg-gray-600 hover:text-white"
                    role="menuitem"
                    aria-label="home page button"
                  >
                    <span className="laptop-code">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H5C3.89543 16 3 15.1046 3 14V6ZM5 6H19V14H5V6Z"
                          fill="currentColor"
                        />
                        <path
                          d="M2 18C1.44772 18 1 18.4477 1 19C1 19.5523 1.44772 20 2 20H22C22.5523 20 23 19.5523 23 19C23 18.4477 22.5523 18 22 18H2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>

                    <span className="nav-logo font-medium antialiased">
                      Dev.me
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            {/* {noUserBtns} */}
            {!userSession && noUserBtns}
            {userSession && (
              <div className="Psm:ml-2 relative ml-3 flex">
                <div className="flex items-center">
                  <Link href="/post/newpost">
                    <a
                      className="Psm:mr-3 mr-1.5 rounded bg-indigo-500 p-2 font-medium tracking-wide text-black hover:bg-indigo-600"
                      role="menuitem"
                      aria-label="Post and article or picture"
                    >
                      Post
                    </a>
                  </Link>
                  <AlpineWidjet user={userSession.user} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
