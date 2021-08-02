import React from 'react';
import 'alpinejs';

export default function ProfileDropdown(props) {
    const dropdown = `
      
    `
    return (
      <div x-data="{ open: false}" className="ml-3 Psm:ml-2 relative">
      <div class="flex items-center">
      <% if(currentUser.profileRegistered === true){props.session      
     <a href="/blogs/new" class="rounded font-medium text-black bg-indigo-500 hover:bg-indigo-600 p-2 Psm:mr-3 mr-1.5 tracking-wide" role="menuitem" aria-label="Post and article or picture">Post</a>          
        }
      <span class="Psm:hidden w-32">Signed in as: <%= currentUser.username %></span>
      <% if(currentUser.profileRegistered === false){%>          
        <a href="/blogs/logout" class="rounded font-medium text-black bg-red-600 hover:bg-red-700 p-2 Psm:mr-3 mr-1.5 tracking-wide" aria-label="Sign out button">Sign
          out</a>
      <%} else {%>
        <button @click="open = true"
        class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        id="user-menu" aria-haspopup="false" aria-label="profile button">
       
       <% if(!currentProfile) {%>
        
        <span class="h-12 w-12 rounded-full generic-noprofile-circle" ></span>
        <% } else { %>
          <%if(!currentProfile.image[0]) {%>
            <span class="h-12 w-12 rounded-full generic-circle"></span>
          <%}else {%>
        <img loading=lazy class="h-12 w-12 rounded-full"
          src="<%= currentProfile.image[0].thumbnail %>"
          alt="">
          <%}%>
          <% } %>
      </button>
      <%}%>
      
    </div>
    <!-- dropdown content -->
    <div x-show="open" @click.away="open = false" x-transition:enter="transition ease-out duration-100"
      x-transiton:enter-start="transform opacity-0 scale-95"
      x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75"
      x-transition:leave-start="transform opacity-100 scale-100"
      x-transition:leave-end="transform opacity-0 scale-95"
      class="origin-top-right absolute right-0 mt-2 mr-4 w-56 rounded-md py-1 bg-gray-900 border-2 border-gray-500 nav-dropdown-content"
      role="menu" aria-orientation="vertical" aria-labelledby="user-menu" style="display: none;">
      <a href="/blogs/profile" class="block h-12 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800 border-b border-gray-500 border-opacity-50" role="menuitem"><%= currentUser.username %></a>
      <a href="/blogs/new" class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800" role="menuitem">Write a
        post</a>
      <a href="/blogs/profile" class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800" role="menuitem">Reading list</a>
      <a href="/blogs/profile/settings" class="block px-4 py-2 font-medium tracking-wider text-gray-300 hover:bg-gray-800"
        role="menuitem">Settings</a>
      <a href="/blogs/logout" class="block h-12 px-4 py-3 font-medium tracking-wider text-gray-300 hover:bg-gray-800 border-t border-gray-500 border-opacity-50" role="menuitem">Sign
        out</a>
    </div>
        </div>
    )
}
