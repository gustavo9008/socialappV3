import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileColorAvatar from "../ui/globalUI/ProfileColorAvatar";
import VideoPlayer from "../ui/VideoPlayer";

const AllPosts = React.forwardRef(function Post(props, ref) {
  const router = useRouter();
  const playerRef = React.useRef(null);

  const linkHandleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      e.target.nodeName === "VIDEO" ||
      (e.target.nodeName === "SPAN") === true
    )
      return;

    props.saveLastLoadPost();
    let url = e.currentTarget.attributes.href.nodeValue;
    let title = props.posts.title;
    router.push(url);
  };

  const userLinkHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.pathname);
    router.push(e.target.pathname);
  };
  // console.log(post.image[0].url);
  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    aspectRatio: "16:8",
    sources: [
      {
        src: props.posts?.image?.url,
      },
    ],
  };

  // const handlePlayerReady = (player) => {
  //   playerRef.current = player;

  //   // You can handle player events here, for example:
  //   player.on("waiting", () => {
  //     videojs.log("player is waiting");
  //   });

  //   player.on("dispose", () => {
  //     console.log("player will dispose");
  //     videojs.log("player will dispose");
  //   });
  // };

  // useEffect(() => {
  //   const clickableElements = document.querySelectorAll(".clickable");

  //   clickableElements.forEach((ele) =>
  //     ele.addEventListener("click", (e) => {
  //       // console.log(e.originalTarget.pathname);
  //       e.preventDefault();
  //       e.stopPropagation();
  //       router.push(e.originalTarget.pathname);
  //     })
  //   );
  // }, []);

  return (
    <article
      ref={ref}
      href={"/post/" + props.posts.id}
      onClick={linkHandleClick}
      id={`${props.id}`}
      className="link-card homepage-card card cursor-pointer bg-neutral-100  dark:bg-gray-800 Psm:w-full Psm:rounded-none Psm:border-l-0 Psm:border-r-0 Psm:border-t Psm:border-b Psm:border-gray-400 Psm:shadow-none Psm:dark:border-indigo-900"
    >
      <figure className="aspect-w-4 aspect-h-2 mb-2">
        {props.posts?.image?.type?.includes("video") ? (
          // <video
          //   className={`w-full`}
          //   src={props.posts.image.url}
          //   type={props.posts.image.type}
          //   controls
          //   id="outputVideo"
          //   muted
          // >
          // </video>
          <VideoPlayer options={videoJsOptions} />
        ) : props.posts.image ? (
          <img
            id="img"
            className="m-auto object-cover"
            src={props.posts.image.url}
            alt="picture"
          />
        ) : (
          <img
            id="img"
            className="m-auto object-cover"
            src={props.posts.imageUrl}
            alt="picture"
          />
        )}
        {/* {props.posts.image ? (
          <Image
            className="object-cover"
            src={props.posts.image.url}
            layout="fill"
            alt="picture"
            priority="true"
            placeholder="blur"
            blurDataURL={props.posts.image}
          />
        ) : (
          <Image
            className="object-cover"
            src={props.posts.imageUrl}
            layout="fill"
            priority="true"
            alt="picture"
            placeholder="blur"
            blurDataURL={props.posts.imageUrl}
          />
        )} */}
      </figure>
      <section className="px-4 py-2">
        <div className="user-container mb-2 flex justify-between">
          <aside className="flex flex-row">
            <ProfileColorAvatar
              type={"CIRCLE_AVATAR_POST"}
              profile={props.posts.userProfile}
            />
            {/* {!props.posts.userProfile.profileImage && (
            <div className="user-profile-image">
              <span
                className="block h-12 w-12 rounded-full"
                style={{
                  background: `linear-gradient(225deg, ${props.posts.userProfile.profileGenericPic[0]}, ${props.posts.userProfile.profileGenericPic[1]}, ${props.posts.userProfile.profileGenericPic[2]}, ${props.posts.userProfile.profileGenericPic[3]}, ${props.posts.userProfile.profileGenericPic[4]}, ${props.posts.userProfile.profileGenericPic[5]})`,
                }}
              ></span>
            </div>
          )}
          {props.posts.userProfile.profileImage && (
            <span className="user-profile-image">
              {" "}
              <img
                loading="lazy"
                className="h-12 w-12 rounded-full"
                src={props.posts.userProfile.profileImage}
                alt=""
              />
            </span>
          )} */}
            <div className="author-container">
              <ul className="text-sm text-gray-900 dark:text-gray-300">
                {/* <Link
                  legacyBehavior
                  href={"/user/" + props.posts.userProfile.id}
                > */}
                <a
                  onClick={userLinkHandle}
                  href={"/user/" + props.posts.userProfile.id}
                  className="clickable"
                >
                  {" "}
                  {props.posts.userProfile.name}{" "}
                </a>
                {/* </Link> */}
              </ul>
              <ul className="text-xs text-gray-600 dark:text-gray-400">
                {props.posts.created}
              </ul>
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
              <span> {props.posts.likes}</span>
            </span>
          </aside>
        </div>
        <Link legacyBehavior href={"/post/" + props.posts.id}>
          <a
            id=""
            className="article-link my-0 ml-12 text-xl tracking-wide Psm:ml-0"
            aria-label="article title"
          >
            {props.posts.title}
          </a>
        </Link>
      </section>
    </article>
  );
});

export default AllPosts;
