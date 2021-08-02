import React from "react";

import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";

import AlpineWidjet from "./ui/navdropdown";

export default function Layout({ children }) {
  const [session, loading] = useSession();

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
          className="rounded font-medium text-gray-900 antialiased bg-blue-400 hover:bg-blue-600 p-2 mr-1.5"
          role="menuitem"
          aria-label="login button"
        >
          Login
        </a>
      </Link>

      <Link href="/signup">
        <a
          className="rounded font-medium bg-gray-700 hover:bg-gray-600 p-2"
          href="/blogs/register"
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
      <Head>
        <script
          defer
          src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
        ></script>
      </Head>
      <nav
        id="navbar"
        className="bg-gray-800 text-white sticky top-0 z-50 border-b-2 border-gray-900"
        role="menubar"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex ">
              <div className="flex">
                <Link href="/">
                  <a
                    className="rounded bg-gray-700 gen hover:text-white hover:bg-gray-600 p-2"
                    role="menuitem"
                    aria-label="home page button"
                  >
                    <i className="fas fa-laptop-code"></i>{" "}
                    <span className="nav-logo font-medium antialiased">
                      Dev.me
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            {/* {noUserBtns} */}
            {!session ? (
              noUserBtns
            ) : (
              <div className="flex ml-3 Psm:ml-2 relative">
                <div className="flex items-center">
                  <Link href="/post/newpost">
                    <a
                      className="rounded font-medium text-black bg-indigo-500 hover:bg-indigo-600 p-2 Psm:mr-3 mr-1.5 tracking-wide"
                      role="menuitem"
                      aria-label="Post and article or picture"
                    >
                      Post
                    </a>
                  </Link>
                  <AlpineWidjet user={session.user} />
                </div>
              </div>

              // <a
              //   onClick={handleLogout}
              //   className="rounded font-medium text-black bg-red-600 hover:bg-red-700 p-2 Psm:mr-3 mr-1.5 tracking-wide"
              //   aria-label="Sign out button"
              // >
              //   Sign out
              // </a>
            )}
            {/* {session.user && (
              <a
                onClick={handleLogout}
                className="rounded font-medium text-black bg-red-600 hover:bg-red-700 p-2 Psm:mr-3 mr-1.5 tracking-wide"
                aria-label="Sign out button"
              >
                Sign out
              </a>
            )} */}
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </>
  );
}
