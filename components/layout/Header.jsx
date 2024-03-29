import React from "react";
import { appToastContext } from "context/state";
// import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
// import { useSession } from "next-auth/react";

import NavDropdown from "@/components/ui/headerUI/NavDropdown";
import SearchBar from "../ui/headerUI/SearchBar";

export default function Header() {
  const router = useRouter();
  const { userSession, createPostBtn, setCreatePostBtn } =
    React.useContext(appToastContext);

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };

  // no user button options
  const noUserBtns = (
    <aside className="flex flex-row gap-2">
      <Link legacyBehavior href="/login">
        <a
          className="rounded  bg-blue-600 p-2 font-semibold tracking-wide text-white antialiased hover:bg-blue-500 dark:bg-blue-400"
          role="menuitem"
          aria-label="login button"
        >
          Login
        </a>
      </Link>

      <Link legacyBehavior href="/signup">
        <a
          className="rounded bg-purple-600 p-2 font-semibold tracking-wide text-white hover:bg-purple-500 dark:bg-purple-400"
          role="menuitem"
          aria-label="create account button"
        >
          Create Account
        </a>
      </Link>
    </aside>
  );

  // user logged in options
  // const userLoggedIn = (

  // );
  React.useEffect(() => {
    if (router.pathname !== "/post/newpost") {
      setCreatePostBtn(true);
    }
  }, [router]);
  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 z-50 mb-4 w-full border-b-2 border-gray-300 bg-white  dark:border-gray-900 dark:bg-gray-800"
        role="menubar"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 ">
              <div className="flex">
                <Link legacyBehavior href="/">
                  <a
                    className="gen rounded bg-gray-800 p-2 font-semibold text-white hover:bg-gray-600 dark:bg-gray-700"
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

                    <span className="dark:nav-logo pl-2 tracking-wide antialiased">
                      Dev.me
                    </span>
                  </a>
                </Link>
                <SearchBar />
              </div>
            </div>
            {/* {noUserBtns} */}
            {!userSession && noUserBtns}
            {userSession && (
              <div className="relative ml-3 flex Psm:ml-2">
                <div className="flex items-center">
                  {createPostBtn && (
                    <Link legacyBehavior href="/post/newpost">
                      <a
                        className="mr-1.5 rounded bg-indigo-500 p-2 font-semibold tracking-wide text-white hover:bg-indigo-600 Psm:mr-3"
                        role="menuitem"
                        aria-label="Post and article or picture"
                      >
                        Post
                      </a>
                    </Link>
                  )}
                  <NavDropdown user={userSession.user} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
