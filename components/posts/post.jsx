import React from "react";
import CommentSection from "../comments/commentsection";
// import Image from "next/image";
import parse from "html-react-parser";
import EditPostModal from "./EditPostModal";
import Link from "next/link";
import Button from "../ui/Button";

function Post(props) {
  const [showPostModal, setShowPostModal] = React.useState(false);
  const [post, setPost] = React.useState(props.post);
  const bookmarkBtnIcon = (
    <i className="far fa-bookmark hover:text-sky-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </i>
  );
  const likeBtnIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
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
    </svg>
  );

  const editBtnIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
  console.log(post);

  let newDate = new Date(post.created);

  console.log(newDate.toDateString());

  return (
    <main className="Psm:m-0 main-container Psm:mt-3 Psm:flex-col-reverse mt-3 flex flex-row">
      <section className="Psm:bottom-0 fixed  w-12 ">
        <aside className="Psm:flex-row Psm:justify-between Psm:w-screen Psm:px-8 Psm:py-1 Psm:bg-gray-900 flex flex-col gap-4 text-gray-300">
          <>
            <Button
              icon={bookmarkBtnIcon}
              idType={"bookmarkBtn"}
              className={"w-12 p-2 text-center"}
            />
            <Button
              icon={likeBtnIcon}
              idType={"likeBtn"}
              className={"w-12 p-2 text-center"}
            />
          </>

          {props.user && props.user.id === post.userProfile.id && (
            <>
              {/* <button
              onClick={() => setShowPostModal(true)}
              className="w-13 relative mb-3 mr-1.5 blockp-2 text-center font-medium text-black hover:bg-indigo-600"
              href="/blogs/<%= blog._id %>/edit"
            >
              Edit
            </button> */}
              <Button
                className={"w-12 p-2 text-center"}
                icon={editBtnIcon}
                handleClick={setShowPostModal}
                btnType={"CANCEL"}
                idType={"editBtn"}
              />
              <EditPostModal
                showPostModal={showPostModal}
                setShowPostModal={setShowPostModal}
                post={post}
                setPost={setPost}
              />
            </>
          )}
        </aside>
      </section>

      <article className="Psm:w-full Psm:rounded-none Psm:border-none main-article-card overflow-hidden rounded-lg border border-indigo-900 border-opacity-50 bg-gray-800">
        {/* //===== bookmark btn ===== */}

        <div className="blog-content">
          <div className="w-full">
            {post.image[0] ? (
              <img
                className="m-auto object-cover"
                src={post.image[0].url}
                alt="this is a picture"
              />
            ) : (
              <img
                className="m-auto object-cover"
                src={post.imageUrl}
                alt="this is a picture"
              />
            )}
          </div>

          <aside className="article-info flex justify-between p-4">
            <h2 className="flex items-center">
              {!post.userProfile.profileImage && (
                <div className="user-profile-image pr-2">
                  <span
                    className="block h-10 w-10 rounded-full"
                    style={{
                      background: `conic-gradient(${post.userProfile.profileGenericPic[0]}, ${post.userProfile.profileGenericPic[1]}, ${post.userProfile.profileGenericPic[2]}, ${post.userProfile.profileGenericPic[3]}, ${post.userProfile.profileGenericPic[4]}, ${post.userProfile.profileGenericPic[5]}, ${post.userProfile.profileGenericPic[6]}, ${post.userProfile.profileGenericPic[7]})`,
                    }}
                  ></span>
                </div>
              )}
              {post.userProfile.profileImage && (
                <span className="user-profile-image pr-2">
                  {" "}
                  <img
                    loading="lazy"
                    className="h-10 w-10 rounded-full"
                    src={props.posts.userProfile.profileImage}
                    alt=""
                  />
                </span>
              )}
              <div className="flex flex-col">
                <Link href={"/user/" + post.userProfile.id}>
                  <a className="clickable"> {post.userProfile.name} </a>
                </Link>
                <span className=" pt-1 text-center text-xs text-gray-400">
                  Posted on {new Date(post.created).toDateString()}
                </span>
              </div>
            </h2>
            <p>
              <span className="ml-2 text-blue-300">
                <a href="#commentSection">
                  {post.comments.length}{" "}
                  {post.comments.length <= 1 ? "Comment" : "Comments"}
                </a>
              </span>
            </p>
          </aside>

          <section className="article p-4">
            <div className="article-title">
              <h1 className="pt-4 pb-4 text-5xl font-bold tracking-wide">
                {post.title}
              </h1>
            </div>

            <div className="text-article text-base font-normal">
              <div id="postContent">{parse(post.body)}</div>
            </div>
          </section>

          <CommentSection user={props.user} post={post} />
        </div>
      </article>
    </main>
  );
}

export default Post;
