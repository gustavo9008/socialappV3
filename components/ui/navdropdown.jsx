import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useDetectOutsideClick } from "./useDetectClick";
import { appToastContext } from "context/state";
import ProfileColorAvatar from "./ProfileColorAvatar";

const AlpineWidjet = (props) => {
  const router = useRouter();
  const { showToast, setUserSession } = React.useContext(appToastContext);
  // console.log(userSession);
  if (props.user === null) {
    router.push("/");
  }
  const handleLogout = async (e) => {
    e.preventDefault();
    router.push("/");
    // signOut({ callbackUrl: "10.0.0.60:3000/" });
    const logoutData = await signOut({
      callbackUrl: "10.0.0.60:3000/",
      redirect: false,
    });
    console.log(logoutData);
    logoutData.url &&
      (localStorage.removeItem("user_lists"),
      showToast("success", "You have been logged out."),
      setUserSession(null));
  };

  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const toggleMenu = () => setIsActive(!isActive);
  // //===== color button =====
  // const btncolorPic = (
  //   <span
  //     className="h-12 w-12 rounded-full"
  //     style={{
  //       background: `linear-gradient(225deg,${userSession.user.genericImage[0]}, ${userSession.user.genericImage[1]}, ${userSession.user.genericImage[2]}, ${userSession.user.genericImage[3]}, ${userSession.user.genericImage[4]}, ${userSession.user.genericImage[5]})`,
  //     }}
  //   ></span>
  // );
  // //===== image button =====
  // const imagebtn = (
  //   <img
  //     loading="lazy"
  //     className="h-12 w-12 rounded-full"
  //     src={props.user.profile.image.url}
  //     alt=""
  //   />
  // );
  // //===== picks between image or color  =====
  // const picbtn = props.user.profile.image.url ? imagebtn : btncolorPic;

  return (
    <>
      <div id="dropdownbtn">
        <div className="flex items-center">
          <p>
            <span className="Psm:hidden w-32 px-4">
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
          className={`menu ${
            isActive ? "active" : "inactive"
          } nav-dropdown-content absolute right-0 mt-2 w-56 origin-top-right rounded-md border-2 border-gray-500 bg-gray-900 py-1`}
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

            <Link href="/user/profile/settings">
              <a
                className="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                role="menuitem"
              >
                Settings
              </a>
            </Link>

            <a
              onClick={handleLogout}
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

export default AlpineWidjet;
