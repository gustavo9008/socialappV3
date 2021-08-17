import Post from "../../components/posts/post";
import { server } from "../../config/index";
// import { MongoClient, ObjectID } from "mongodb";

function SinglePost(props) {
  // console.log(props);
  return <Post post={props.post} />;
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
    },
  };
}

export default SinglePost;
