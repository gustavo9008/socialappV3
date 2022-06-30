import React from "react";
// import ReactDOM from "react-dom";
import Link from "next/link";
// import { server } from "../../config/index";
import { appToastContext } from "../../context/state";

export default function Profile(props) {
  const { useFetch } = React.useContext(appToastContext);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  // console.log(props.user.id);
  const getMyProfile = useFetch;
  const [myProfile, setMyProfile] = React.useState({
    dataLoaded: false,
    myProfile: props.user,
  });
  // if (myProfile.profile.posts) {
  //   console.log(myProfile.profile);
  // }
  // const css2obj = (css) => {
  //   const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g,
  //     o = {};
  //   css.replace(r, (m, p, v) => (o[p] = v));
  //   return o;
  // };
  let sortedCommentReplies;
  if (myProfile.dataLoaded) {
    const CommentsReplies = myProfile.myProfile.profile.comments.concat(
      myProfile.myProfile.profile.replies
    );
    // console.log(CommentsReplies);

    sortedCommentReplies = CommentsReplies.slice().sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const btnStyle = {
    backgroundColor: `${props.user.genericImage[0]}`,
    backgroundImage: `linear-gradient(225deg,${props.user.genericImage[0]}, ${props.user.genericImage[1]}, ${props.user.genericImage[2]}, ${props.user.profile.image.genericPic[3]}, ${props.user.profile.image.genericPic[4]}, ${props.user.profile.image.genericPic[5]}`,
  };

  // const MyProfile = async (id) => {
  //   const response = await getMyProfile("GET", `/api/user/${id}`);
  //   // const myProfile = await response.json();
  //   console.log(response);
  // };

  React.useEffect(() => {
    const MyProfile = async (id) => {
      const res = await getMyProfile("GET", `/api/user/${id}`);
      // const myProfile = await response.json();
      // localStorage.setItem(
      //   "reading_list",
      //   JSON.stringify(res.data.account.profile.readingList)
      // );
      // setMyProfile(res.data.account);
      res.data.account &&
        setMyProfile({ dataLoaded: true, myProfile: res.data.account });
    };

    MyProfile(props.user.id);
  }, [props.user.id, getMyProfile]);
  return (
    <main className="profile-container mt-3 Psm:m-0 Psm:mt-3">
      <header className="mx-auto mb-2 Psm:w-full">
        <figure className="relative flex-grow overflow-hidden rounded-md border border-gray-600 bg-gray-800 p-8 Psm:rounded-none Psm:border-l-0 Psm:border-r-0 md:flex md:p-0">
          <Link href="/user/profile/settings">
            <a
              className=" absolute right-1 top-1 rounded bg-indigo-500 p-2  font-medium tracking-tighter text-black hover:bg-indigo-600 Psm:right-0 Psm:top-0"
              aria-label="Edit profile button"
            >
              Edit Profile
            </a>
          </Link>

          <div className="flex w-full Psm:flex-col">
            {!myProfile.myProfile.profile.image.url ? (
              <span
                className="profile-circle-avatar h-32 w-32 rounded-full object-cover Psm:mx-auto md:h-auto md:w-48 md:rounded-none"
                style={btnStyle}
              ></span>
            ) : (
              <img
                className="profile-circle-avatar h-32 w-32 rounded-full object-cover Psm:mx-auto md:h-auto md:w-48 md:rounded-none"
                src={myProfile.myProfile.profile.image.url}
                alt=""
                width="384"
                height="512"
              ></img>
            )}
            <div className="space-y-4 pt-6 text-center md:p-8 md:text-left">
              <figcaption className="font-medium">
                <p>{myProfile.myProfile.name}</p>
                <p className="text-lg font-semibold">
                  {myProfile.myProfile.profile.about}
                </p>

                <aside className="mt-2 flex justify-around gap-2 text-sm text-gray-400 Psm:flex-col">
                  {/* location icon */}
                  <span>
                    <i className="profile-card-loc_joined">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </i>
                    Location: {myProfile.myProfile.profile.location}{" "}
                  </span>
                  {/* join icon */}
                  <span>
                    <i className="profile-card-loc_joined">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                        />
                      </svg>
                    </i>
                    Joined on:{" "}
                    {new Date(myProfile.myProfile.createdAt).toDateString()}
                  </span>
                  {/* personal website icon */}
                  {myProfile.myProfile.profile.links.personalWebsite !== "" && (
                    <span>
                      <i className="profile-card-loc_joined">
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
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </i>
                      <a
                        href={`${myProfile.myProfile.profile.links.personalWebsite}`}
                        target="_blank"
                        className="text-sky-400 hover:text-sky-300"
                      >
                        Personal Website
                      </a>
                    </span>
                  )}
                  {/* Youtube icon*/}
                  {myProfile.myProfile.profile.links.youtube !== "" && (
                    <span>
                      <i className="profile-card-loc_joined">
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
                            d="M5 7H19C19.5523 7 20 7.44771 20 8V16C20 16.5523 19.5523 17 19 17H5C4.44772 17 4 16.5523 4 16V8C4 7.44772 4.44772 7 5 7ZM2 8C2 6.34315 3.34315 5 5 5H19C20.6569 5 22 6.34315 22 8V16C22 17.6569 20.6569 19 19 19H5C3.34315 19 2 17.6569 2 16V8ZM10 9L14 12L10 15V9Z"
                            fill="currentColor"
                          />
                        </svg>
                      </i>
                      <a
                        href={`${myProfile.myProfile.profile.links.youtube}`}
                        target="_blank"
                        className="text-sky-500 hover:text-sky-300"
                      >
                        YouTube
                      </a>
                    </span>
                  )}
                  {/* instagram icon*/}
                  {myProfile.myProfile.profile.links.instagram !== "" && (
                    <span>
                      <i className="profile-card-loc_joined">
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
                            d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
                            fill="currentColor"
                          />
                          <path
                            d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                            fill="currentColor"
                          />
                        </svg>
                      </i>
                      <a
                        href={`${myProfile.myProfile.profile.links.instagram}`}
                        target="_blank"
                        className="text-sky-400 hover:text-sky-300"
                      >
                        Instagram
                      </a>
                    </span>
                  )}
                  {/* twitter icon*/}
                  {myProfile.myProfile.profile.links.twitter !== "" && (
                    <span>
                      <i className="profile-card-loc_joined">
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
                            d="M8 3C9.10457 3 10 3.89543 10 5V8H16C17.1046 8 18 8.89543 18 10C18 11.1046 17.1046 12 16 12H10V14C10 15.6569 11.3431 17 13 17H16C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21H13C9.13401 21 6 17.866 6 14V5C6 3.89543 6.89543 3 8 3Z"
                            fill="currentColor"
                          />
                        </svg>
                      </i>
                      <a
                        href={`${myProfile.myProfile.profile.links.twitter}`}
                        target="_blank"
                        className="text-sky-400 hover:text-sky-300"
                      >
                        Twitter
                      </a>
                    </span>
                  )}
                  {/* Linkedin icon*/}
                  {myProfile.myProfile.profile.links.linkedin !== "" && (
                    <span>
                      <i className="profile-card-loc_joined">
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
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </i>
                      <a
                        href={`${myProfile.myProfile.profile.links.linkedin}`}
                        target="_blank"
                        className="text-sky-400 hover:text-sky-300"
                      >
                        Linkedin
                      </a>
                    </span>
                  )}
                </aside>
                <footer className="m-auto mt-4 flex w-60 justify-around text-xl"></footer>
              </figcaption>
            </div>
          </div>
        </figure>
      </header>{" "}
      <section className="mx-auto flex flex-row flex-wrap justify-evenly gap-4">
        {/* post section  */}
        {myProfile.dataLoaded && myProfile.myProfile.profile.posts.length > 0 && (
          <article className="profile-post-comment-containers flex flex-auto flex-col flex-wrap self-start Psm:w-screen ">
            {myProfile.myProfile.profile.posts.map((post) => (
              <div
                className="profile-article-cards border border-gray-700 bg-gray-800 Psm:rounded-none Psm:border-l-0 Psm:border-r-0"
                key={post._id}
              >
                <h3 className="text-lg font-medium">{post.title}</h3>
                <span className="text-sm text-gray-400">
                  {new Date(post.created).toDateString()}
                  <Link href={`/post/${post._id}`}>
                    <a className="text-sky-300"> Read Post</a>
                  </Link>
                </span>
              </div>
            ))}
          </article>
        )}

        {/* comment section */}
        {myProfile.dataLoaded === true &&
          sortedCommentReplies &&
          sortedCommentReplies.length > 0 && (
            <article className="profile-post-comment-containers mb-4 flex flex-auto flex-col flex-wrap self-start overflow-hidden rounded-md border border-gray-500 Psm:w-screen Psm:rounded-none Psm:border-l-0 Psm:border-r-0">
              <h3 className="p-2 pl-6"> Recent Comments</h3>
              {sortedCommentReplies.map((comment) => (
                <Link key={comment._id} href={`${comment.postUrl.address}`}>
                  <a
                    key={comment._id}
                    className="w-full overflow-hidden border-b border-gray-900 bg-gray-800 p-4"
                  >
                    <h4 className="text-lg font-medium">{comment.comment}</h4>
                    <span className="text-sm text-gray-400">
                      {comment.postUrl.title}
                    </span>
                  </a>
                </Link>
              ))}
            </article>
          )}
      </section>
    </main>
  );
}
