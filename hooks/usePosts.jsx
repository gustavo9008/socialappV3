import { useState } from "react";

export function usePostsState(initPosts, initLimit, initLoading, initType, initStamp) {
  const [posts, setPosts] = useState({
    posts: initPosts,
    previousLimit: initLimit,
    isLoading: initLoading,
    typeSort: initType,
    timestamp: initStamp,
  });
  const saveLastLoadPost = () => {
    let currentList = {
      timestamp: new Date().getTime(),
      type: posts.typeSort,
      posts,
    };
    localStorage.setItem("postLoaded", JSON.stringify(currentList));
    // localStorage.setItem("reading_list", JSON.stringify(updatedList));
    return;
  };
  // console.log(posts);

  return [posts, setPosts, saveLastLoadPost];
}
