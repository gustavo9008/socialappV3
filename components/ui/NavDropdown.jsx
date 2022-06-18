import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/router";
// import { signOut } from "next-auth/react";
import Link from "next/link";
import { useDetectOutsideClick } from "./useDetectClick";
import { appToastContext } from "context/state";
import ProfileColorAvatar from "./ProfileColorAvatar";

const NavDropdown = (props) => {
  // console.log("redering...");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { showToast, setUserSession, handleLogout } =
    React.useContext(appToastContext);
  // console.log(userSession);
  if (props.user === null) {
    router.push("/");
  }
  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   router.push("/");
  //   // signOut({ callbackUrl: "10.0.0.60:3000/" });
  //   const logoutData = await signOut({
  //     callbackUrl: "/",
  //     redirect: false,
  //   });
  //   console.log(logoutData);
  //   logoutData.url &&
  //     (localStorage.removeItem("user_lists"),
  //     showToast("success", "You have been logged out."),
  //     setUserSession(null));
  // };

  const logoutHandler = async (e) => {
    handleLogout(e);
    showToast("success", "You have been logged out.");
  };

  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  // const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    startTransition(() => {
      setIsActive(!isActive);
    });
  };

  // useEffect(() => {
  //   const activeMenu = {
  //     state: false,
  //     showMenu: function showMenu() {
  //       // console.log(this.state);
  //       activeMenu.state &&
  //         (menuDrop.classList.remove("inactive"),
  //         menuDrop.classList.add("active"));
  //       !activeMenu.state &&
  //         (menuDrop.classList.remove("active"),
  //         menuDrop.classList.add("inactive"));
  //     },
  //   };
  //   let menuDrop = document.getElementById("dropdownMenu");
  //   let btnDrop = document.getElementById("user-menu");

  //   const toggleMenu = (e) => {
  //     e.stopPropagation();
  //     activeMenu.state = !activeMenu.state;
  //     if (!activeMenu.state) {
  //       activeMenu.showMenu(e);
  //       window.removeEventListener("click", toggleMenu, true);
  //     }
  //   };
  //   btnDrop.addEventListener("click", (e) => {
  //     // e.preventDefault();
  //     // e.stopPropagation();
  //     if (
  //       dropdownRef.current !== null &&
  //       !dropdownRef.current.contains(e.target)
  //     ) {
  //       activeMenu.state = !activeMenu.state;
  //     }

  //     activeMenu.showMenu(e);
  //     if (activeMenu.state) {
  //       window.addEventListener("click", toggleMenu, true);
  //     }
  //   });
  // }, [dropdownRef]);

  return (
    <>
      <div id="dropdownbtn">
        <div className="flex items-center">
          <p>
            <span className="w-32 px-4 Psm:hidden">
              Signed in as: {props.user ? props.user.name : null}
            </span>
          </p>

          <button
            onClick={toggleMenu}
            className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu"
            aria-haspopup="false"
            aria-label="profile button"
          >
            <ProfileColorAvatar
              type={"LOGGED_USER_CIRCLE_AVATAR"}
              profile={props.user.profile.image}
            />
            {/* {picbtn} */}
          </button>
        </div>
        <div
          ref={dropdownRef}
          id="dropdownMenu"
          className={`${
            isActive ? "active" : "inactive"
          } menu nav-dropdown-content absolute right-0 mt-2 w-56 origin-top-right rounded-md border-2 border-gray-500 bg-gray-900 py-1`}
        >
          <div onClick={toggleMenu}>
            <Link href="/user/profile">
              <a
                className="block h-12 border-b border-gray-500 border-opacity-50 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                role="menuitem"
                aria-label="login button"
              >
                {props.user ? props.user.name : null}
              </a>
            </Link>
            <Link href="/post/newpost">
              <a
                className="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                role="menuitem"
              >
                Write a post
              </a>
            </Link>
            <Link href="/user/readinglist">
              <a
                className="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                role="menuitem"
              >
                Reading List
              </a>
            </Link>

            <Link href="/user/profile/settings">
              <a
                className="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                role="menuitem"
              >
                Settings
              </a>
            </Link>

            <a
              onClick={logoutHandler}
              id="logoutbtn"
              className="block h-12 border-t border-gray-500 border-opacity-50 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
              role="menuitem"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavDropdown;
