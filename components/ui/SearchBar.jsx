import React, { useState, useRef } from "react";
import { appToastContext } from "@/context/state";
import parse from "html-react-parser";
import ProfileColorAvatar from "@/components/ui/ProfileColorAvatar";
import Link from "next/link";

function SearchBar(props) {
  const { handleLogout, useFetch, showToast } =
    React.useContext(appToastContext);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const searchRef = useRef();

  const displayBar = () => {
    setDisplaySearchBar(!displaySearchBar);
    setSearchResults(null);
  };

  const searchDB = async (e) => {
    async function getResults() {
      console.log("getResult run...");
      const res = await useFetch(
        "GET",
        `/api/search/?request=${searchRef.current.value}`
      );
      console.log(res.data.results.length);
      if (res.data.success === true) {
        res.data.results.length > 0 && setSearchResults(res.data.results);
      }
      return;
    }
    console.log(searchRef.current.value);
    searchRef.current.value.length > 2 && (await getResults());
    // console.log(res);
  };
  return (
    <div className={`relative flex`}>
      <button onClick={displayBar} className="px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      {displaySearchBar ? (
        // <input
        //   className={`form-control m-0
        // block
        // w-full
        // rounded
        // border
        // border-solid
        // border-gray-300 bg-white
        // bg-clip-padding px-3 py-1.5
        // text-base
        // font-normal
        // text-gray-700
        // transition
        // ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none `}
        //   onChange={searchDB}
        //   type="search"
        // />
        <aside className="items-[normal] fixed top-[65px] bottom-0 right-0 left-0 z-50 flex justify-center overflow-x-auto overflow-y-auto bg-black bg-opacity-90 outline-none focus:outline-none">
          <div className="sticky top-0 z-50 mx-auto w-auto max-w-3xl">
            {/*content*/}
            <div className="search-modal flex flex-col overflow-scroll overscroll-x-contain rounded border-2 border-gray-500 bg-gray-900 outline-none focus:outline-none Psm:max-h-1/2">
              {/*header*/}
              <div className=" border-blueGray-200 sticky top-0 z-50 flex items-start justify-between rounded-t border-b border-solid bg-slate-900 p-5">
                <button
                  onClick={displayBar}
                  className="float-right border-0 p-1 text-3xl font-semibold leading-none"
                >
                  <span className="block h-7 w-7 text-2xl text-gray-400 outline-none hover:text-gray-100 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </button>
                <input
                  onKeyDown={(e) => {
                    e.key === "Enter" && searchDB();
                  }}
                  ref={searchRef}
                  className={`form-control m-0
        block
        w-[80%]
        rounded
        border
        border-solid
        border-gray-300 bg-white
        bg-clip-padding px-3 py-1.5
        text-base
        font-normal
        text-gray-700
         focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none `}
                  type="search"
                />
                <button
                  onClick={searchDB}
                  className="text-smtext-white ml-2 rounded-lg border border-blue-700 bg-blue-700 p-2 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              {/*body*/}
              {searchResults !== null && (
                <>
                  <div className="grid grid-cols-1 ">
                    {searchResults.map((post, i) => (
                      <div key={i}>
                        <div id={i} key={i} className="relative flex-auto p-3">
                          <div className="container mx-auto mt-4 Psm:max-w-full">
                            <div className="m-2 transform cursor-pointer rounded-lg border border-gray-400 bg-gray-800 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                              {/* <div className="m-3">
                                <h2 className="mb-2 text-lg">{post.title}</h2>
                                <h3 className="mb-2 text-xs font-light">
                                  {post.userProfile.name}
                                </h3>
                                <div className="truncate font-mono text-sm font-light text-gray-600 transition-all duration-200 hover:text-gray-400">
                                  {parse(post.body)}
                                </div>
                              </div> */}

                              <section className="px-4 py-2">
                                <div className="user-container mb-2 flex justify-between">
                                  <aside className="flex flex-row">
                                    <ProfileColorAvatar
                                      type={"CIRCLE_AVATAR_POST"}
                                      profile={post.userProfile}
                                    />
                                    <div className="author-container">
                                      <span className="text-sm text-gray-300">
                                        <Link
                                          href={"/user/" + post.userProfile.id}
                                        >
                                          <a className="clickable">
                                            {" "}
                                            {post.userProfile.name}{" "}
                                          </a>
                                        </Link>
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {post.created}
                                      </span>
                                    </div>
                                  </aside>

                                  <aside className="text-xs">
                                    <span className="flex flex-row items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={1.25}
                                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                      </svg>{" "}
                                      <span> {post.likes}</span>
                                    </span>
                                  </aside>
                                </div>
                                <Link href={"/post/" + post._id}>
                                  <a
                                    id=""
                                    className="article-link my-0 ml-12 text-xl tracking-wide text-gray-300 Psm:ml-0"
                                    aria-label="article title"
                                  >
                                    {post.title}
                                  </a>
                                </Link>
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SearchBar;
