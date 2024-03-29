'use client';

import {
  useEffect,
  useRef,
  useCallback,
  useContext,
  useState,
} from "react";
import Head from "next/head";
// import { MongoClient } from "mongodb";
import { appToastContext } from "context/state";
import Card from "../components/ui/globalUI/Container";
import AllPost from "../components/posts/AllPosts";
import { useRouter } from "next/router";
import Spinner from "@/components/ui/loaders/Spinner";
import CardLoader from "@/components/ui/loaders/CardLoader";


function HomePage(props) {
  //===== context imports =====
  const router = useRouter();
  const { useFetch, posts, setPosts, saveLastLoadPost } = useContext(appToastContext);
  const getMorePost = useFetch;
  const [loadingPosts, setLoadingPosts] = useState(false);
  const observer = useRef();
  // const [posts, setPosts] = useState({
  //   posts: props.posts,
  //   previousLimit: props.limit,
  //   isLoading: true,
  //   typeSort: "TOP",
  // });
  // const [isLoading, setIsLoading] = useState(true);
  // const [typeSort, setTypeSort] = useState("TOP");
  // const [popState, setPopState] = useState(null);
  // const [btnSelected, setBtnSelected] = useState("");
  //===== save last load =====
  // const saveLastLoadPost = () => {
  //   let currentList = {
  //     timestamp: new Date().getTime(),
  //     type: posts.typeSort,
  //     posts,
  //   };
  //   localStorage.setItem("postLoaded", JSON.stringify(currentList));
  //   // localStorage.setItem("reading_list", JSON.stringify(updatedList));
  //   return;
  // };

  // console.log(posts.isLoading);
  //=====  =====
  const transformPosts = useCallback(async (posts) => {
    let transformed = posts.map((posts) => ({
      title: posts.title,
      image: posts.image[0] ? posts.image[0] : null,
      imageUrl: posts.imageUrl ? posts.imageUrl : null,
      id: posts._id.toString(),
      userProfile: {
        id: posts.userProfile.id.toString(),
        name: posts.userProfile.name,
        profileImage: posts.userProfile.profileImage,
        profileGenericPic: posts.userProfile.profileGenericPic,
      },
      created: new Date(posts.created).toDateString(),
      likes: posts.likes.toString(),
    }));
    return transformed;
  }, []);

  const handleUpdatePost = useCallback(
    async (type) => {
      async function getNewPost(type) {

        const res = await getMorePost(
          "GET",
          `/api/post/getposts?next=${0}&type=${type}`
        );
        const newUpdatePost = await transformPosts(res.data.data);
        if (res.data.success === true) {
          if (res.data.data.length > 0) {
            setPosts((prev) => ({
              posts: [...new Set([...newUpdatePost])],
              previousLimit: parseInt(res.data.nextPost),
              isLoading: false,
              typeSort: type,
              timestamp: new Date().getTime(),
            }));
          }
        }
      }

      let twentyMin = 1200000;
      var fiveMin = 1000 * 60 * 1;
      let loaded = JSON.parse(localStorage.getItem("postLoaded"));
      if (new Date().getTime() - loaded?.popState?.timestamp < 3000) {
        if (new Date().getTime() - loaded.timestamp < fiveMin) {


          setPosts(loaded.posts)
        } else {

          getNewPost(loaded.type)
        }
      } else {

        getNewPost(type)
      }
    },
    [getMorePost, transformPosts]
  );

  const lastBookElementRef = useCallback(
    (node) => {
      const transformPosts = async (posts) => {
        let transformed = posts.map((posts) => ({
          title: posts.title,
          image: posts.image[0] ? posts.image[0] : null,
          imageUrl: posts.imageUrl ? posts.imageUrl : null,
          id: posts._id.toString(),
          userProfile: {
            id: posts.userProfile.id.toString(),
            name: posts.userProfile.name,
            profileImage: posts.userProfile.profileImage,
            profileGenericPic: posts.userProfile.profileGenericPic,
          },
          created: new Date(posts.created).toDateString(),
          likes: posts.likes.toString(),
        }));
        return transformed;
      };
      const handleUpdatePost = async () => {
        // setIsLoading(true);
        const res = await getMorePost(
          "GET",
          `/api/post/getposts?next=${posts.previousLimit}&type=${posts.typeSort ?? "LATEST"
          }`
        );
        const newUpdatePost = await transformPosts(res.data.data);
        if (res.data.success === true) {
          setLoadingPosts(false)
          if (res.data.data.length > 0) {
            setPosts((prev) => ({
              posts: [...new Set([...prev.posts, ...newUpdatePost])],
              previousLimit: parseInt(res.data.nextPost),
              isLoading: false,
              typeSort: posts.typeSort,
              timestamp: new Date().getTime(),
            }));
          }
          // setIsLoading(false);
        }
      };
      if (posts.isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          setLoadingPosts(true)
          await handleUpdatePost();
        }
      });
      if (node) observer.current.observe(node);
    },
    [getMorePost, posts]
  );
  // useEffect(() => {
  //   // Always do navigations after the first render
  //   router.push("/#Top", undefined, { shallow: true });
  // }, []);

  useEffect(() => {
    // age state check for posts data 
    if (new Date().getTime() - posts?.timestamp > 1200000) {

      setPosts((prev) => ({
        posts: null,
        previousLimit: null,
        isLoading: true,
        typeSort: posts.typeSort,
        timestamp: new Date().getTime(),
      }));
    }

    // funct for data fetching
    posts.isLoading && handleUpdatePost(posts.typeSort);
  }, [posts, handleUpdatePost, setPosts, router]);

  return (
    <>
      <Head>
        <title>Dev.me</title>
        <meta name="description" content="Generic Social App" />
        <link rel="icon" href="/laptop.ico" />
      </Head>

      <Card>
        <aside className="mb-2 grid grid-cols-2 gap-1 px-4 pb-2">

          <a

            onClick={(e) => {
              // e.preventDefault();
              setPosts((prev) => ({
                posts: null,
                previousLimit: null,
                isLoading: true,
                typeSort: "LATEST",
                timestamp: null,
              }));
              // handleUpdatePost("LATEST");
              // posts.typeSort === "LATEST" && handleUpdatePost("LATEST");
              return;
            }}
            className={`order-1 row-span-1 flex gap-4 justify-self-start p-2 hover:border-b-4 hover:border-slate-400 cursor-pointer w-fit ${posts.typeSort === "LATEST" ? "border-b-4 border-gray-500" : "hover:border-b-4 hover:border-gray-900"
              }`}
          >
            <span id="Latest" className="text-lg font-medium">
              Latest
            </span>
            {
              posts.typeSort === "LATEST" && (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${posts.isLoading && ('animate-spin')} h-6 w-6 top-1 relative`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
              )
            }

          </a>
          <a

            onClick={(e) => {
              // e.preventDefault();
              setPosts((prev) => ({
                posts: null,
                previousLimit: null,
                isLoading: true,
                typeSort: "TOP",
                timestamp: null,
              }));
              // handleUpdatePost("TOP");
              return;
            }}
            className={`order-2 row-span-2 w-fit p-2 flex gap-4 hover:border-slate-400 cursor-pointer ${posts.typeSort === "TOP" ? "border-b-4 border-gray-500" : "hover:border-b-4 hover:border-gray-900"
              }`}
          >
            <span id="Top" className="text-lg font-medium">
              Top
            </span>
            {posts.typeSort === "TOP" && (
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`${posts.isLoading && ('animate-spin ')} h-6 w-6 top-1 relative`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>

            )}

          </a>

        </aside>
        {/* {posts.posts !== null && loadingPosts === true && (

          <div class="loader flex justify-center p-5 rounded-full gap-4 delay-1000">
            <div class="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
            <div class="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
            <div class="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
          </div>

        )} */}

        <>
          {posts.isLoading ? (
            <CardLoader />

          ) : (
            <section className="grid grid-rows-1 gap-5 Psm:gap-3">
              {posts.posts.map((post, i) => {
                if (posts.posts.length === i + 1) {
                  return (

                    <AllPost
                      id={`${post.id}`}
                      ref={lastBookElementRef}
                      posts={post}
                      key={i}
                      saveLastLoadPost={saveLastLoadPost}
                    />






                  )
                } else {
                  return (
                    <AllPost
                      id={`${post.id}`}
                      posts={post}
                      key={i}
                      saveLastLoadPost={saveLastLoadPost}
                    />
                  );
                }
              })}

            </section>
          )}
        </>
      </Card>
      {posts.posts !== null && loadingPosts === true && (

        <div className="loader flex justify-center p-5 mt-4 gap-4 delay-1000">
          <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce"></div>
        </div>

      )}
    </>
  );
}

// export async function getServerSideProps(context) {
//   await dbConnect();

//   // let queryLimit = 5;
//   const postsLikes = await Post.find({})
//     .select("-body -comments")
//     .limit(5)
//     .sort({ likes: -1 });
//   const newpostsLikes = await Post.find({})
//     .select("-body -comments")
//     .skip(5)
//     .limit(5)
//     .sort({ likes: -1 });

//   return {
//     props: {
//       posts: postsLikes.map((posts) => ({
//         title: posts.title,
//         image: posts.image[0] ? posts.image[0].url : null,
//         imageUrl: posts.imageUrl ? posts.imageUrl : null,
//         id: posts._id.toString(),
//         userProfile: {
//           id: posts.userProfile.id.toString(),
//           name: posts.userProfile.name,
//           profileImage: posts.userProfile.profileImage,
//           profileGenericPic: posts.userProfile.profileGenericPic,
//         },
//         created: posts.created.toDateString(),
//         likes: posts.likes.toString(),
//       })),
//       limit: 5,
//     },
//   };
// }

export default HomePage;
