// import connectDB from "../../../middleware/mongodb";
import { MongoClient, ObjectID } from "mongodb";
// import Post from "../../../models/post";
// import {useRouter} from 'next/router';

const handler = async (req, res) => {
  // const router = useRouter();

  // console.log(req.query.postId);
  const { postId } = req.query;
  // console.log(pid);
  // res.end(`Post: ${pid}`)
  // const postId = context.params.id;

  const client = await MongoClient.connect(
    "mongodb://localhost/restful_blog_appv3",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = client.db();
  const commentsCollection = db.collection("comments");
  const blogsCollection = db.collection("blogs");

  const post = await blogsCollection.findOne(ObjectID(postId));
  console.log(post);
  if (post.comments) {
    const commentIds = post.comments.map((commentids) => {
      return commentids;
    });

    let postComments = await commentsCollection
      .find({ _id: { $in: commentIds } })
      .toArray();

    post.comments = postComments.map((comments) => {
      let comment = {
        _id: comments._id.toString(),
        text: comments.text,
        profile: comments.profile,
        url: {
          address: comments.url.address,
          title: comments.url.title,
        },
        author: {
          id: comments.author.id.toString(),
          username: comments.author.username,
        },
        created: comments.created.toDateString(),
      };
      comment.replies = comments.replies.map((replies) => {
        let commentReplies = {
          _id: replies._id.toString(),
          text: replies.text,
          profile: replies.profile,
          url: replies.url.address,
          author: {
            id: replies.author.id.toString(),
            username: replies.author.username,
          },
          created: replies.created.toDateString(),
        };
        return commentReplies;
      });
      return comment;
    });
  }

  // console.log(post.comments);

  res.status(201).json(post);
};

export default handler;
