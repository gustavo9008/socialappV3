import { useState } from "react";

export function usePostsState(initPosts, initLimit, initLoading, initType) {
  const [posts, setPosts] = useState({
    posts: initPosts,
    previousLimit: initLimit,
    isLoading: initLoading,
    typeSort: initType,
    timestamp: new Date().getTime(),
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
