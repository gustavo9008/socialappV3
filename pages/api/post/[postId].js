// import connectDB from "../../../middleware/mongodb";
import { MongoClient } from "mongodb";
import { ObjectId } from "bson";

import Post from "../../../models/post";
import Comment from "../../../models/comment";
import Reply from "../../../models/replies";
import dbConnect from "../../../middleware/mongodb";
// import mongoose from "mongoose";

// import Post from "../../../models/post";
// import {useRouter} from 'next/router';

export default async function findPostHandler(req, res) {
  await dbConnect();
  const { postId } = req.query;
  // console.log(req.query);

  try {
    const post = await Post.findById(postId).populate({
      path: "comments",
      options: { sort: { created: -1 } },
    });
    //===== recursion function to find all replies =====
    async function deepIterator(comment) {
      let commentReplies = comment;
      for (const key in commentReplies) {
        if (commentReplies[key].replies !== undefined) {
          // console.log(commentReplies[key].replies);
          for (const com in commentReplies[key].replies) {
            // console.log(commentReplies[key].replies[com].toString());
            const commentReply = await Reply.findById(
              commentReplies[key].replies[com].toString()
            );
            // if (commentReply === null) {
            //   commentReplies[key].replies.spice(
            //     commentReplies[key].replies[com]
            //   );
            //   console.log(commentReplies[key].replies);
            // }
            if (commentReply !== null) {
              commentReplies[key].repliesFound.push(commentReply);
            }
            // commentReplies[key].repliesFound.push(commentReply);
          }
          if (commentReplies[key].repliesFound !== undefined) {
            // console.log("if is undefined is running");
            await deepIterator(commentReplies[key].repliesFound);
          }
        }
      }

      return commentReplies;
    }
    // console.log(post.comments);
    if (post.comments !== undefined) {
      const allReplies = await deepIterator(post.comments);
      // const newReplies = await allReplies.repliesFound;
      // console.log(allReplies);
      post.comments = await allReplies;
      // console.log(post.comments);
    }
    res.status(200).json({ success: true, post });
    res.end()
  } catch (error) {
    // console.log(error);
    res.status(404);
    res.end()
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
