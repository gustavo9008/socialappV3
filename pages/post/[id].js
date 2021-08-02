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

  const comments = await post.comments;

  return {
    props: {
      post: {
        title: post.title,
        body: post.body,
        image: post.image[0] ? post.image[0].url : null,
        imageUrl: post.imageUrl ? post.imageUrl : null,
        id: post._id,
        created: post.created,
        comments: comments ? comments : null,
      },
    },
  };
}

export default SinglePost;
