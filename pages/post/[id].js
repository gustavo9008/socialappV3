import React from "react";
import Post from "../../components/posts/post";
import { useRouter } from "next/router";
import { server } from "../../config/index";
import { useSession, getSession } from "next-auth/react";
import { appToastContext } from "../../context/state";
// import useSWR from "swr";
// import fetcher from "middleware/fetch/fetch";

// import { MongoClient, ObjectID } from "mongodb";

function SinglePost(props) {
  const { userSession } = React.useContext(appToastContext);

  // console.log(userSession);
  return (
    <>
      {userSession && <Post user={userSession.user} post={props.post} />}
      {!userSession && <Post post={props.post} />}
    </>
  );
}

export async function getServerSideProps(context) {
  const postId = context.params.id;

  const response = await fetch(`${server}/api/post/${postId}`);

  const post = await response.json();

  console.log(post.data);

  const comments = await post.comments;

  return {
    props: {
      post: post.data,
    },
  };
}

export default SinglePost;
