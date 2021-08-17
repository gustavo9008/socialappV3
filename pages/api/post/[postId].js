// import connectDB from "../../../middleware/mongodb";
import { MongoClient } from "mongodb";
import { ObjectId } from "bson";

import Post from "../../../models/post";
import Comment from "../../../models/comment";
import dbConnect from "../../../middleware/mongodb";
import mongoose from "mongoose";

// import Post from "../../../models/post";
// import {useRouter} from 'next/router';

export default async function findPostHandler(req, res) {
  await dbConnect();

  // const router = useRouter();

  // console.log(req.query.postId);
  const { postId } = req.query;
  // console.log(postId);
  try {
    const post = await Post.findById(postId).populate({
      path: "comments",
      options: { sort: { created: -1 } },
    });
    // if (!post) {
    //   return res.status(400).json({ success: false });
    // }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  // res.end(`Post: ${pid}`)
  // const postId = context.params.id;

  // const client = await MongoClient.connect(process.env.MONGODB_LOCAL_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  // const db = client.db(process.env.DB_NAME);
  // const commentsCollection = db.collection("comments");
  // const blogsCollection = db.collection("blogs");

  // const post = await blogsCollection.findOne({ _id: ObjectId(postId) });
  // // console.log(post);
  // if (post.comments) {
  //   const commentIds = post.comments.map((commentids) => {
  //     return commentids;
  //   });
  //   // console.log(commentIds)
  //   let postComments = await commentsCollection
  //     .find({ _id: { $in: commentIds } })
  //     .toArray();

  //   post.comments = postComments.map((comments) => {
  //     let comment = {
  //       _id: comments._id.toString(),
  //       text: comments.text,
  //       profile: comments.profile,
  //       url: {
  //         address: comments.url.address,
  //         title: comments.url.title,
  //       },
  //       author: {
  //         id: comments.author.id.toString(),
  //         username: comments.author.username,
  //       },
  //       created: comments.created.toDateString(),
  //     };
  //     comment.replies = comments.replies.map((replies) => {
  //       let commentReplies = {
  //         _id: replies._id.toString(),
  //         text: replies.text,
  //         profile: replies.profile,
  //         url: replies.url.address,
  //         author: {
  //           id: replies.author.id.toString(),
  //           username: replies.author.username,
  //         },
  //         created: replies.created.toDateString(),
  //       };
  //       return commentReplies;
  //     });
  //     return comment;
  //   });
  // }
}

// findPostHandler;
