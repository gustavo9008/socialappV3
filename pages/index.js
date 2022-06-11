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
import Card from "../components/ui/Card";
import AllPost from "../components/posts/allposts";
import { useRouter } from "next/router";
import Spinner from "@/components/ui/Spinner";

// import Post from "../models/post";
// import Comment from "../models/comment";
// import Reply from "../models/replies";
// import dbConnect from "../middleware/mongodb";

function HomePage(props) {
  //===== context imports =====
  const router = useRouter();
  const { useFetch, posts, setPosts, saveLastLoadPost } = useContext(appToastContext);
  const getMorePost = useFetch;
  // const loader = useRef(null);
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

  const handleUpdatePost = useCallback(
    async (type) => {
      async function getNewPost(type) {

        const res = await getMorePost(
          "GET",
          `/api/post/getposts?next=${0}&type=${type ?? "LATEST"}`
        );
        const newUpdatePost = await transformPosts(res.data.data);
        if (res.data.success === true) {
          if (res.data.data.length > 0) {
            // console.log(res.data);
            setPosts((prev) => ({
              posts: [...new Set([...newUpdatePost])],
              previousLimit: parseInt(res.data.nextPost),
              isLoading: false,
              typeSort: type ?? "LATEST",
            }));
          }
        }
      }

      let twentyMin = 1200000;
      var fiveMin = 1000 * 60 * 1;
      let loaded = JSON.parse(localStorage.getItem("postLoaded"));
      // console.log(loaded);
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
      // console.log("book run");
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
        // console.log("update post has been triggered");
        // setIsLoading(true);
        const res = await getMorePost(
          "GET",
          `/api/post/getposts?next=${posts.previousLimit}&type=${posts.typeSort ?? "LATEST"
          }`
        );
        const newUpdatePost = await transformPosts(res.data.data);
        if (res.data.success === true) {
          if (res.data.data.length > 0) {
            setPosts((prev) => ({
              posts: [...new Set([...prev.posts, ...newUpdatePost])],
              previousLimit: parseInt(res.data.nextPost),
              isLoading: false,
              typeSort: posts.typeSort,
            }));
          }
          // setIsLoading(false);
        }
      };
      if (posts.isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
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
    posts.isLoading && handleUpdatePost();
  }, [posts, handleUpdatePost, setPosts, router]);

  return (
    <>
      <Head>
        <title>Dev.me</title>
        <meta name="description" content="Generic Social App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card>
        <aside className="mb-2 grid grid-cols-2 gap-1 px-4 pb-2">

          <a

            onClick={(e) => {
              // e.preventDefault();
              posts.typeSort === "TOP" && handleUpdatePost("LATEST");
              return;
            }}
            className={`order-1 row-span-1 w-24 justify-self-start p-2 hover:border-b-4 hover:border-slate-400 cursor-pointer ${posts.typeSort === "LATEST" ? "border-b-4" : "hover:border-b-4"
              }`}
          >
            <span id="Latest" className="text-lg font-medium">
              Latest
            </span>
          </a>
          <a

            onClick={(e) => {
              // e.preventDefault();
              posts.typeSort === "LATEST" && handleUpdatePost("TOP");
              return;
            }}
            className={`order-2 row-span-2 w-24 p-2  hover:border-slate-400 cursor-pointer ${posts.typeSort === "TOP" ? "border-b-4" : "hover:border-b-4"
              }`}
          >
            <span id="Top" className="text-lg font-medium">
              Top
            </span>
          </a>
        </aside>

        <>
          {posts.isLoading ? (
            <Spinner />

          ) : (
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
          )}
        </>
      </Card>
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
