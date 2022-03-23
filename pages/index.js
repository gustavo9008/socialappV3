import {
  useEffect,
  useRef,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";
import Head from "next/head";
// import { MongoClient } from "mongodb";
import { appToastContext } from "context/state";
import Card from "../components/ui/Card";
import AllPost from "../components/posts/allposts";
// import { useCurrentUser } from "@/hooks/index";
import { useHistory } from "react-router-dom";
import { now } from "next-auth/client/_utils";
// import Post from "../models/post";
// // import Comment from "../models/comment";
// // import Reply from "../models/replies";
// import dbConnect from "../middleware/mongodb";

function HomePage(props) {
  console.log("//===== beg =====");
  //===== context imports =====
  const { useFetch, userSession } = useContext(appToastContext);
  const getMorePost = useFetch;
  const loader = useRef(null);
  const observer = useRef();
  const [posts, setPosts] = useState({
    posts: [],
    previousLimit: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [typeSort, setTypeSort] = useState("TOP");
  const [popState, setPopState] = useState(null);
  // const [btnSelected, setBtnSelected] = useState("");
  //===== save last load =====
  const saveLastLoadPost = () => {
    // console.log("running update local storage func");
    // console.log(updatedList);
    let currentList = {
      timestamp: new Date().getTime(),
      type: typeSort,
      posts,
    };

    console.log(currentList);
    localStorage.setItem("postLoaded", JSON.stringify(currentList));
    // localStorage.setItem("reading_list", JSON.stringify(updatedList));
    return;
  };

  //=====  =====
  const transformPosts = useCallback(async (posts) => {
    let transformed = posts.map((posts) => ({
      title: posts.title,
      image: posts.image[0] ? posts.image[0].url : null,
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

  const handleUpdatePost = useCallback(async () => {
    // setIsLoading(true);
    // let checkPopState;
    // window.onpopstate = function (e) {
    //   var checkPopState;
    //   console.log(e);

    //   checkPopState = e.type;
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   // setPopState(e.type);
    //   // checkPopState = e.type;
    //   // console.log(checkPopState);
    // };
    async function getNewPost() {
      const res = await getMorePost(
        "GET",
        `/api/post/getposts?next=${posts.previousLimit}&type=${typeSort}`
      );
      const newUpdatePost = await transformPosts(res.data.data);
      if (res.statusText === "OK") {
        if (res.data.data.length > 1) {
          console.log(res.data.data);
          console.log(posts.previousLimit);
          setPosts((prev) => ({
            posts: [...new Set([...prev.posts, ...newUpdatePost])],
            previousLimit: parseInt(res.data.nextPost),
          }));
        }
        setIsLoading(false);
      }
    }

    let twentyMin = 1200000;
    var fiveMin = 1000 * 60 * 1;
    let loaded = JSON.parse(localStorage.getItem("postLoaded"));
    // console.log(new Date().getTime() - loaded.timestamp < fiveMin);
    // console.log(loaded.timestamp - new Date().getTime() < fiveMin);
    if (new Date().getTime() - loaded?.popState?.timestamp < 3000) {
      if (new Date().getTime() - loaded.timestamp < fiveMin) {
        setTypeSort(loaded.type);
        console.log("setPost is running!");
        console.log(loaded.posts);
        setPosts(loaded.posts);
        setIsLoading(false);
      } else {
        getNewPost();
      }
    } else {
      getNewPost();
    }
  }, [getMorePost, posts.previousLimit, transformPosts, typeSort]);

  const lastBookElementRef = useCallback(
    (node) => {
      console.log("last ref run");
      const transformPosts = async (posts) => {
        let transformed = posts.map((posts) => ({
          title: posts.title,
          image: posts.image[0] ? posts.image[0].url : null,
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
          `/api/post/getposts?next=${posts.previousLimit}&type=${typeSort}`
        );
        // console.log(res);
        const newUpdatePost = await transformPosts(res.data.data);
        if (res.statusText === "OK") {
          if (res.data.data.length > 1) {
            // console.log(res.data.data);
            // console.log(posts.previousLimit);
            setPosts((prev) => ({
              posts: [...new Set([...prev.posts, ...newUpdatePost])],
              previousLimit: parseInt(res.data.nextPost),
            }));
          }
          setIsLoading(false);
        }
      };
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          console.log("observer triggered");
          await handleUpdatePost();
        }
      });
      if (node) observer.current.observe(node);
    },
    [getMorePost, isLoading, posts, typeSort]
  );

  useEffect(() => {
    console.log("//===== useEffect run =====");

    isLoading && handleUpdatePost();
  }, [setIsLoading, isLoading, handleUpdatePost, setPosts]);

  console.log("//===== end =====");
  return (
    <>
      <Head>
        <title>Dev.to</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card>
        <aside className="mb-2 grid grid-cols-2 gap-1 px-4 pb-2">
          <a
            href="#Top"
            onClick={(e) => {
              // e.preventDefault();
              typeSort === "LATEST" &&
                (setTypeSort("TOP"),
                setIsLoading(true),
                setPosts({ posts: [], previousLimit: 0 }));
              return;
            }}
            className={`order-1 row-span-1 w-24 p-2  hover:border-slate-400 ${
              typeSort === "TOP" ? "border-b-4" : "hover:border-b-4"
            }`}
          >
            <span id="Top" className="text-lg font-medium">
              Top
            </span>
          </a>
          <a
            href="#Latest"
            onClick={(e) => {
              // e.preventDefault();
              typeSort === "TOP" &&
                (setTypeSort("LATEST"),
                setIsLoading(true),
                setPosts({ posts: [], previousLimit: 0 }));
              return;
            }}
            className={`order-2 row-span-2 w-24 justify-self-start p-2 hover:border-b-4 hover:border-slate-400 ${
              typeSort === "LATEST" ? "border-b-4" : "hover:border-b-4"
            }`}
          >
            <span id="Latest" className="text-lg font-medium">
              Latest
            </span>
          </a>
        </aside>
        {!isLoading && (
          <>
            <section>
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
                    // <div
                    //   key={posts.posts.length + 1}
                    //   id={posts.posts.length + 1}
                    //   ref={lastBookElementRef}
                    // />
                  );
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
          </>
        )}
        {isLoading && (
          <>
            <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 shadow">
              <div className="flex animate-pulse space-x-4">
                <div className="h-10 w-10 rounded-full bg-slate-700"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-slate-700"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                      <div className="col-span-1 h-2 rounded bg-slate-700"></div>
                    </div>
                    <div className="h-2 rounded bg-slate-700"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div id="emptyDiv" ref={lastBookElementRef} /> */}
          </>
        )}
      </Card>
    </>
  );
}

// export async function getServerSideProps(context) {
//   console.log("server side is running");
//   await dbConnect();

//   // let queryLimit = 5;
//   // console.log(context);
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
