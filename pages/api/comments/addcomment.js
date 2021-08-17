import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
import { getSession } from "next-auth/client";

import Post from "../../../models/post";
import Comment from "../../../models/comment";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";

const postHandler = async (req, res) => {
  if (req.method === "POST") {
    await dbConnect();
    const { comment, userProfile, postUrl, postId } = req.body;
    // console.log(postId);

    const newComment = new Comment({
      comment,
      userProfile,
      postUrl,
    });
    // console.log(newComment);
    // const commentCreated = await newComment.save();

    const post = await Post.findById(postId);
    // console.log(post);
    await post.comments.push(newComment._id);
    await post.save();

    const user = await User.findById(userProfile.user.id);
    await user.profile.comments.push(newComment._id);
    await user.save();
    // console.log(user);
    const commentCreated = await newComment.save();
    // console.log(commentCreated);

    //===== legacy code to add comments ======
    // const { text, author, postUrl } = req.body;
    // console.log(req.body);
    // addComment(req);

    //==========

    res.status(201).json(commentCreated);
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }

  // async function addComment(req) {
  //   const client = await MongoClient.connect(process.env.MONGODB_LOCAL_URI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   const db = client.db(process.env.DB_NAME);
  //   const commentsCollection = db.collection("comments");
  //   const postCollection = db.collection("posts");

  //   const commentPost = await commentsCollection.insertOne({
  //     text: req.body.text,
  //     author: req.body.author,
  //     url: req.body.postUrl,
  //     replies: [],
  //     created: new Date(),
  //   });
  //   // console.log(commentPost.ops);
  //   if (commentPost) {
  //     const addRef = await postCollection.updateOne(
  //       { _id: ObjectId(req.body.postId) },
  //       { $push: { comments: ObjectId(commentPost.insertedId) } }
  //     );
  //     console.log(addRef);
  //   }
  //   client.close();

  //   // res.status(201).json({ message: "comment receive!" });
  //   // console.log(post.comments);
  // }

  res.end();
};

export default postHandler;
