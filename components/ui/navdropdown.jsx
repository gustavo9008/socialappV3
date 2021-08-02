import React, { useEffect } from "react";
import { signOut } from "next-auth/client";

const AlpineWidjet = (props) => {
  // const handleLogout = async () => {
  //   await fetch("/api/auth", {
  //     method: "DELETE",
  //   });
  //   mutate(null);
  // };

  const AlpineDropdownBtn = `

<div id="dropdownbtn" x-data="{ open: false}"> 
<div class="flex items-center">
  <p>
  <span class="Psm:hidden px-4 w-32">
      Signed in as: ${props.user ? props.user.name : null}
    </span>
  </p>
    
    <button @click="open = true"
      class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      id="user-menu"
      aria-haspopup="false"
      aria-label="profile button"
    >
      <span class="h-12 w-12 rounded-full generic-noprofile-circle"></span>
    </button>
  </div>
  <div
  x-show="open" @click.away="open = false" x-transition:enter="transition ease-out duration-100"
    x-transiton:enter-start="transform opacity-0 scale-95"
    x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75"
    x-transition:leave-start="transform opacity-100 scale-100"
    x-transition:leave-end="transform opacity-0 scale-95"
    class="origin-top-right absolute right-0 mt-2 mr-4 w-56 rounded-md py-1 bg-gray-900 border-2 border-gray-500 nav-dropdown-content"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="user-menu"
    style="display: none;"
  >
    <a
      href="/blogs/profile"
      class="block h-12 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800 border-b border-gray-500 border-opacity-50"
      role="menuitem"
    >
      ${props.user ? props.user.name : null}
    </a>
    <a
      href="/blogs/new"
      class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
      role="menuitem"
    >
      Write a post
    </a>
    <a
      href="/blogs/profile"
      class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
      role="menuitem"
    >
      Reading list
    </a>
    <a
      href="/blogs/profile/settings"
      class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
      role="menuitem"
    >
      Settings
    </a>

    

    <a
    id="logoutbtn"
      class="block h-12 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800 border-t border-gray-500 border-opacity-50"
      role="menuitem"
    >
      Sign out
    </a>
  </div>
  </div>
`;

  useEffect(() => {
    const handleLogout = async () => {
      signOut();
    };
    const logoutbtn = document.getElementById("logoutbtn");
    logoutbtn.addEventListener("click", function () {
      handleLogout();
      console.log(logoutbtn);
    });
  }, [AlpineDropdownBtn]);

  return (
    <div
      className="flex items-center"
      dangerouslySetInnerHTML={{ __html: AlpineDropdownBtn }}
    ></div>
  );
};

export default AlpineWidjet;
