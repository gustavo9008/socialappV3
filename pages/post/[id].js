import Post from "../../components/posts/post";
import { useRouter } from "next/router";
import { server } from "../../config/index";
import { useSession, getSession } from "next-auth/react";
// import useSWR from "swr";
// import fetcher from "middleware/fetch/fetch";

// import { MongoClient, ObjectID } from "mongodb";

function SinglePost(props) {
  const { data: session, status } = useSession();
  // console.log(session);
  return (
    <>
      {session && <Post user={session.user} post={props.post} />}
      {!session && <Post post={props.post} />}
    </>
  );
}

export async function getServerSideProps(context) {
  const postId = context.params.id;

  const response = await fetch(`${server}/api/post/${postId}`);

  const post = await response.json();

  // console.log(post);

  const comments = await post.comments;

  return {
    props: {
      post: post.data,
      session: await getSession(context),
    },
  };
}

export default SinglePost;
