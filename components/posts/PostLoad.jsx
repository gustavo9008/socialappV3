import React from "react";
import CommentSection from "../comments/commentsection";
import { appToastContext } from "context/state";

import parse from "html-react-parser";
import EditPostModal from "./EditPostModal";
import Link from "next/link";
import Button, { useBtnState } from "../ui/Button";
import ProfileColorAvatar from "../ui/ProfileColorAvatar";
import PostSideMenu from "./PostSideMenu";

function Post(props) {
  //===== context imports =====
  const { useFetch, userSession, showToast } =
    React.useContext(appToastContext);
  //===== btn imports =====
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
    btnVisibility,
    setBtnVisibility,
  ] = useBtnState(false, "", "", "");
  //===== state variables =====
  const getOnePost = useFetch;
  const [showPostModal, setShowPostModal] = React.useState(false);
  const [post, setPost] = React.useState(props.post);

  const handleUpdatePost = useCallback(async () => {
    const res = await getOnePost(
      "GET",
      `/api/post/getposts?next=${previousLimit}`
    );
    console.log(res);
    const newUpdatePost = await transformPosts(res.data.data);
    if (res.statusText === "OK") {
      setPost(res.data.data);
      setPreviousLimit(parseInt(res.data.nextPost));
      setLoading(false);
    }
  }, [setPost, getOnePost]);

  useEffect(() => {
    handleUpdatePost();
  }, [handleUpdatePost]);

  return (
    <main className="Psm:m-0 main-container Psm:mt-3 Psm:flex-col-reverse mt-3 flex flex-row">
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
              <ProfileColorAvatar
                type={"CIRCLE_AVATAR_POST"}
                profile={post.userProfile}
              />

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
      <PostSideMenu post={post} setShowPostModal={setShowPostModal} />

      {props.user && props.user.id === post.userProfile.id && (
        <>
          <EditPostModal
            showPostModal={showPostModal}
            setShowPostModal={setShowPostModal}
            post={post}
            setPost={setPost}
          />
        </>
      )}
    </main>
  );
}

export default Post;
