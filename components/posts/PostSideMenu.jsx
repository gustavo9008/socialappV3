import React from "react";
import CommentSection from "../comments/commentsection";
import { appToastContext } from "context/state";

import parse from "html-react-parser";
import EditPostModal from "./EditPostModal";
import Link from "next/link";
import Button, { useBtnState } from "../ui/Button";
import ProfileColorAvatar from "../ui/ProfileColorAvatar";

export default function PostSideMenu(props) {
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
  const [showPostModal, setShowPostModal] = React.useState(false);
  const [post, setPost] = React.useState({
    _id: props.post._id,
    title: props.post.title,
    userProfile: props.post.userProfile,
    likes: props.post.likes,
  });
  const [svgColor, setSvgColor] = React.useState(
    "hover:fill-sky-500 hover:text-sky-500"
  );
  const [likeSvgColor, setLikeSvgColor] = React.useState(
    "hover:fill-red-500 hover:text-red-500"
  );
  // console.log(post.likes);
  //===== if false bookmark func is to delete func, if true bookmark func is to add bookmark =====
  const [bookFunction, setBookFunction] = React.useState(null);
  //===== if false like func is to unlike post, if true like func is to like post =====
  const [likeFunc, setLikeFunc] = React.useState(null);
  const bookmarkpost = useFetch;
  //===== btn icons for side menu =====
  const bookmarkBtnIcon = (
    <i className={`${btnColor} far fa-bookmark`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-7 w-7 ${svgColor}`}
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
    <>
      <i className={`flex align-bottom`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-7 w-7 ${likeSvgColor}`}
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
      </i>
      <span className={`align-bottom text-sm`}>{post.likes.toString()}</span>
    </>
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
  //===== end of btn icons =====
  //===== func to update reading list on local storage =====
  async function updateLocalStorage(updatedList) {
    // let currentList = localStorage.getItem("reading_list");
    localStorage.setItem("user_lists", JSON.stringify(updatedList));
    // localStorage.setItem("reading_list", JSON.stringify(updatedList));
    return;
  }
  //===== add bookmark  =====
  const addBookmarkHandler = async () => {
    const data = {
      post: post._id,
      postTitle: post.title,
      user: userSession.user.id,
      type: "BOOKMARK_POST",
    };
    const res = await bookmarkpost("PUT", "/api/user/updateuserprofile", data);
    res.data.success === true &&
      res.data.message &&
      (await showToast("success", res.data.message)),
      await updateLocalStorage(res.data.reading_list),
      setSvgColor("fill-sky-500 text-sky-500"),
      setBookFunction(false);
  };
  //===== delete bookmark  =====
  const deleteBookmarkHandler = async () => {
    const data = {
      bookmark: post._id,
      user: userSession.user.id,
      type: "DELETE_BOOKMARK_POST",
    };
    const res = await bookmarkpost("PUT", "/api/user/updateuserprofile", data);

    res.data.success === true &&
      res.data.message &&
      (await showToast("success", res.data.message)),
      await updateLocalStorage(res.data.reading_list),
      setSvgColor("hover:fill-sky-500 hover:text-sky-500"),
      setBookFunction(true);
  };
  //===== like post function =====
  const likePostHandler = async () => {
    const data = {
      post: post._id,
      user: userSession.user.id,
      type: "LIKE_POST",
    };

    const res = await bookmarkpost("PUT", "/api/post/updatepost", data);

    res.statusText === "Created" &&
      res.data.message &&
      (await showToast("success", res.data.message)),
      await updateLocalStorage(res.data.reading_list),
      setLikeSvgColor("fill-red-500 text-red-500"),
      setLikeFunc(false),
      setPost({ ...post, likes: post.likes + 1 });
  };
  //===== unlike post func =====
  const unlikePostHandler = async () => {
    const data = {
      post: post._id,
      user: userSession.user.id,
      type: "UNLIKE_POST",
    };

    const res = await bookmarkpost("PUT", "/api/post/updatepost", data);

    res.statusText === "Created" &&
      res.data.message &&
      (await showToast("success", res.data.message)),
      await updateLocalStorage(res.data.reading_list),
      setLikeSvgColor("hover:fill-red-500 hover:text-red-500"),
      setLikeFunc(true),
      setPost({ ...post, likes: post.likes - 1 });
  };
  //===== useEffect is use to check if post is bookmarked and if post is liked =====
  React.useEffect(() => {
    if (userSession && localStorage.getItem("user_lists") !== "[]") {
      let reading_list = JSON.parse(localStorage.getItem("user_lists"));

      if (reading_list.likesList.some((L) => L.postId === post._id)) {
        setLikeSvgColor("fill-red-500 text-red-500");
        setLikeFunc(false);
      } else {
        setLikeFunc(true);
      }
      if (reading_list.readingList.some((b) => b.postId === post._id)) {
        setSvgColor("fill-sky-500 text-sky-500");
        setBookFunction(false);
      } else {
        setBookFunction(true);
      }
    }
  }, [userSession, post._id, setBtnColor]);
  return (
    <section className="fixed w-12 Psm:bottom-0 ">
      <aside className="flex flex-col gap-4 text-gray-300 Psm:w-screen Psm:flex-row Psm:justify-between Psm:bg-gray-900 Psm:px-8 Psm:py-1">
        {userSession ? (
          <>
            {bookFunction ? (
              <Button
                icon={bookmarkBtnIcon}
                idType={"bookmarkBtn"}
                handleClick={addBookmarkHandler}
                btnType={"CANCEL"}
                className={
                  "flex w-20 items-center justify-between p-2 text-center"
                }
              />
            ) : (
              <Button
                icon={bookmarkBtnIcon}
                idType={"bookmarkBtn"}
                handleClick={deleteBookmarkHandler}
                btnType={"CANCEL"}
                className={
                  "flex w-20 items-center justify-between p-2 text-center"
                }
              />
            )}
            {likeFunc ? (
              <Button
                icon={likeBtnIcon}
                idType={"likeBtn"}
                handleClick={likePostHandler}
                btnType={"CANCEL"}
                className={
                  "flex w-12 flex-col items-center justify-between p-2 text-center Psm:w-20 Psm:flex-row"
                }
              />
            ) : (
              <Button
                icon={likeBtnIcon}
                idType={"unlikeBtn"}
                btnType={"CANCEL"}
                handleClick={unlikePostHandler}
                className={
                  "flex w-12 flex-col items-center justify-between p-2 text-center Psm:w-20 Psm:flex-row"
                }
              />
            )}
          </>
        ) : (
          <>
            <Button
              icon={bookmarkBtnIcon}
              idType={"bookmarkBtn"}
              handleClick={props.setShowLoginModal}
              btnType={"CANCEL"}
              className={
                "flex w-20 items-center justify-between p-2 text-center"
              }
            />
            <Button
              icon={likeBtnIcon}
              idType={"likeBtn"}
              handleClick={props.setShowLoginModal}
              btnType={"CANCEL"}
              className={
                "flex w-12 flex-col items-center justify-between p-2 text-center Psm:w-20 Psm:flex-row"
              }
            />
          </>
        )}

        {userSession && userSession.user.id === post.userProfile.id && (
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
              handleClick={props.setShowPostModal}
              btnType={"CANCEL"}
              idType={"editBtn"}
            />
            {/* <EditPostModal
          showPostModal={showPostModal}
          setShowPostModal={setShowPostModal}
          post={post}
          setPost={setPost}
        /> */}
          </>
        )}
      </aside>
    </section>
  );
}
