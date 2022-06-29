import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileColorAvatar from "../ui/ProfileColorAvatar";

const AllPosts = React.forwardRef(function Post(props, ref) {
  const router = useRouter();

  // console.log(props);

  const linkHandleClick = (e) => {
    e.preventDefault();
    props.saveLastLoadPost();
    let url = e.currentTarget.attributes.href.nodeValue;
    let title = props.posts.title;
    router.push(url);
  };

  const userLinkHandle = (e) => {};

  useEffect(() => {
    const clickableElements = document.querySelectorAll(".clickable");

    clickableElements.forEach((ele) =>
      ele.addEventListener("click", (e) => {
        // console.log(e.originalTarget.pathname);
        e.preventDefault();
        e.stopPropagation();
        router.push(e.originalTarget.pathname);
      })
    );
  }, []);

  return (
    <article
      ref={ref}
      href={"/post/" + props.posts.id}
      onClick={linkHandleClick}
      id={`${props.id}`}
      className="link-card homepage-card card cursor-pointer bg-gray-800 Psm:mb-2 Psm:w-full Psm:rounded-none Psm:border-l-0 Psm:border-r-0 Psm:border-t Psm:border-b Psm:border-indigo-900 Psm:shadow-none"
    >
      <figure className="aspect-w-4 aspect-h-2 mb-2">
        {props.posts.image ? (
          <Image
            className="object-cover"
            src={props.posts.image}
            layout="fill"
            alt="this is a picture"
            priority="true"
            placeholder="blur"
            blurDataURL={props.posts.image}
          />
        ) : (
          <Image
            className="object-cover"
            src={props.posts.imageUrl}
            layout="fill"
            alt="this is a picture"
            placeholder="blur"
            blurDataURL={props.posts.imageUrl}
          />
        )}
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
              <span className="text-sm text-gray-300">
                <Link href={"/user/" + props.posts.userProfile.id}>
                  <a className="clickable"> {props.posts.userProfile.name} </a>
                </Link>
              </span>
              <span className="text-xs text-gray-400">
                {props.posts.created}
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
              <span> {props.posts.likes}</span>
            </span>
          </aside>
        </div>
        <Link href={"/post/" + props.posts.id}>
          <a
            id=""
            className="article-link my-0 ml-12 text-xl tracking-wide text-gray-300 Psm:ml-0"
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
