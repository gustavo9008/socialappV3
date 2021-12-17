import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useDetectOutsideClick } from "./useDetectClick";

const AlpineWidjet = (props) => {
  // console.log(props.user);
  const handleLogout = async () => {
    signOut({ callbackUrl: "10.0.0.60:3000/" });
  };

  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const toggleMenu = () => setIsActive(!isActive);
  //===== color button =====
  const btncolorPic = (
    <span
      className="h-12 w-12 rounded-full"
      style={{
        backgroundColor: `${props.user.genericImage[0]}`,
        backgroundImage: `linear-gradient(225deg, ${props.user.genericImage[0]} 0%, ${props.user.genericImage[1]} 50%, ${props.user.genericImage[2]} 100%)`,
      }}
    ></span>
  );
  //===== image button =====
  const imagebtn = (
    <img
      loading="lazy"
      className="h-12 w-12 rounded-full"
      src={props.user.profile.image.url}
      alt=""
    />
  );
  //===== picks between image or color  =====
  const picbtn = props.user.profile.image.url ? imagebtn : btncolorPic;

  // const AlpineDropdownBtn = `
  //   <div id="dropdownbtn" x-data="{ open: false}">
  //     <div class="flex items-center">
  //       <p>
  //         <span class="Psm:hidden px-4 w-32">
  //           Signed in as: ${props.user ? props.user.name : null}
  //         </span>
  //       </p>

  //       <button
  //         @click="open = true"
  //         class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
  //         id="user-menu"
  //         aria-haspopup="false"
  //         aria-label="profile button"
  //       >
  //        ${picbtn}
  //       </button>
  //     </div>
  //     <div
  //       x-show="open"
  //       @click.away="open = false"
  //       x-transition:enter="transition ease-out duration-100"
  //       x-transiton:enter-start="transform opacity-0 scale-95"
  //       x-transition:enter-end="transform opacity-100 scale-100"
  //       x-transition:leave="transition ease-in duration-75"
  //       x-transition:leave-start="transform opacity-100 scale-100"
  //       x-transition:leave-end="transform opacity-0 scale-95"
  //       class="origin-top-right absolute right-0 mt-2 mr-4 w-56 rounded-md py-1 bg-gray-900 border-2 border-gray-500 nav-dropdown-content"
  //       role="menu"
  //       aria-orientation="vertical"
  //       aria-labelledby="user-menu"
  //       style="display: none;"
  //     >
  //     <a
  //     href="/user/profile"
  //     class="block h-12 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800 border-b border-gray-500 border-opacity-50"
  //     role="menuitem"
  //     aria-label="login button"
  //   >
  //     ${props.user ? props.user.name : null}
  //   </a>
  //       <a
  //         href="/blogs/new"
  //         class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
  //         role="menuitem"
  //       >
  //         Write a post
  //       </a>
  //       <a
  //         href="/blogs/profile"
  //         class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
  //         role="menuitem"
  //       >
  //         Reading list
  //       </a>
  //       <a
  //         href="/user/profile/settings"
  //         class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
  //         role="menuitem"
  //       >
  //         Settings
  //       </a>

  //       <a
  //         id="logoutbtn"
  //         class="block h-12 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800 border-t border-gray-500 border-opacity-50"
  //         role="menuitem"
  //       >
  //         Sign out
  //       </a>
  //     </div>
  //   </div>
  // `;

  // useEffect(() => {
  //   const handleLogout = async () => {
  //     signOut({ callbackUrl: "10.0.0.60:3000/" });
  //   };
  //   const logoutbtn = document.getElementById("logoutbtn");
  //   logoutbtn.addEventListener("click", function () {
  //     handleLogout();
  //     console.log(logoutbtn);
  //   });
  // }, [AlpineDropdownBtn]);

  return (
    <>
      <div id="dropdownbtn">
        <div className="flex items-center">
          <p>
            <span className="Psm:hidden px-4 w-32">
              Signed in as: {props.user ? props.user.name : null}
            </span>
          </p>

          <button
            onClick={toggleMenu}
            className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu"
            aria-haspopup="false"
            aria-label="profile button"
          >
            {picbtn}
          </button>
        </div>
        <div
          ref={dropdownRef}
          className={`menu ${
            isActive ? "active" : "inactive"
          } origin-top-right absolute right-0 mt-2 w-56 rounded-md py-1 bg-gray-900 border-2 border-gray-500 nav-dropdown-content`}
        >
          <div onClick={toggleMenu}>
            <Link href="/user/profile">
              <a
                className="block h-12 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800 border-b border-gray-500 border-opacity-50"
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
            <Link href="/user/profile">
              <a
                className="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
                role="menuitem"
              >
                Reading list
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
              className="block h-12 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800 border-t border-gray-500 border-opacity-50"
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
