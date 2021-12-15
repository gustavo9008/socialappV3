import { getSession } from "next-auth/react";

import Post from "../../../models/post";
import Reply from "../../../models/replies";
import Comment from "../../../models/comment";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";

const postHandler = async (req, res) => {
  async function addComment() {
    await dbConnect();
    const { comment, userProfile, postUrl, postId } = req.body;
    console.log(req.body.type);

    const newComment = new Comment({
      comment,
      userProfile,
      postUrl,
      originalPostId: postId,
    });
    // console.log(newComment);
    // const commentCreated = await newComment.save();

    const post = await Post.findById(postId);
    // console.log(post);
    await post.comments.push(newComment._id);
    await post.save();

    const user = await User.findById(userProfile.id);
    await user.profile.comments.push(newComment._id);
    await user.save();
    // console.log(user);

    const commentCreated = await newComment.save();
    const postComments = await Post.findById(postId).populate({
      path: "comments",
      options: { sort: { created: -1 } },
    });

    // console.log(postComments);
    // console.log(commentCreated);

    //===== legacy code to add comments ======
    // const { text, author, postUrl } = req.body;
    // console.log(req.body);
    // addComment(req);

    //==========

    res.status(201).json(postComments.comments);
  }

  async function addReplyComment() {
    const { reply, userProfile, postUrl, postId, commentId } = req.body;
    console.log(req.body.type);
    const comment = await Comment.findById(commentId);
    const newReply = new Reply({
      comment: reply,
      userProfile,
      postUrl,
      originalCommentId: commentId,
      originalPostId: postId,
    });
    await comment.replies.push(newReply._id);
    await comment.save();
    const user = await User.findById(userProfile.id);
    await user.profile.commentReplies.push(newReply._id);
    await user.save();
    const replyCreated = await newReply.save();
    console.log(newReply._id.toString());
    console.log("this is from addReplayComment 1");

    //===== reply search test =====
    // const replySearch = await Comment.findById(newReply._id.toString());

    // console.log(replySearch);
    res.status(201).json(replyCreated);
  }
  async function addReply() {
    const { reply, userProfile, postUrl, postId, commentId } = req.body;
    console.log(req.body.type);
    const originalReply = await Reply.findById(commentId);
    const newReply = new Reply({
      comment: reply,
      userProfile,
      postUrl,
      originalCommentId: commentId,
      originalPostId: postId,
    });
    originalReply.replies.push(newReply._id);
    originalReply.save();
    const user = await User.findById(userProfile.id);
    await user.profile.commentReplies.push(newReply._id);
    await user.save();
    const replyCreated = await newReply.save();
    console.log(newReply._id.toString());
    console.log("this is from addReplayComment 2");

    //===== reply search test =====
    // const replySearch = await Comment.findById(newReply._id.toString());

    // console.log(replySearch);
    res.status(201).json(replyCreated);
  }

  // }
  const checkSession = async () => {
    console.log(req.body.type);
    const session = await getSession({ req });
    // console.log(session);
    if (session) {
      req.body.type === "REPLY_COMMENT" &&
        (await addReplyComment(session)) &&
        res.end();
      req.body.type === "ADD_COMMENT" &&
        (await addComment(session)) &&
        res.end();
      req.body.type === "ADD_REPLY" && (await addReply(session)) && res.end();
    }
    // session && (await addComment(session)) && res.end();
    !session &&
      res.status(200).json({ message: "oh no you must be logged in" }) &&
      res.end();
  };

  req.method === "POST" && checkSession();
  req.method !== "POST" &&
    res.status(200).json({ message: "Route not valid" }) &&
    res.end();

  // res.end();
};

export default postHandler;
