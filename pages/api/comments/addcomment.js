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
    // console.log(newReply._id.toString());
    // console.log("this is from addReplayComment 2");

    //===== reply search test =====
    // const replySearch = await Comment.findById(newReply._id.toString());

    // console.log(replySearch);
    res.status(201).json(replyCreated);
  }

  async function updateComment() {
    const typeOfEdit = req.body.action === "ADD_REPLY" ? Reply : Comment;
    console.log(req.body);
    const commentToUpdate = await typeOfEdit.findById(req.body.commentId);
    commentToUpdate.comment = req.body.comment;
    commentToUpdate.save();
    console.log(commentToUpdate);
    res.status(200).json({
      message: "Comment has been updated.",
      updatedComment: commentToUpdate,
    });
  }
  //===== deletes comment from either the comments collections or reply collections =====
  async function deleteComment(session) {
    console.log("hello from delete func");
    console.log(session.user);
    const typeOfEdit = req.body.action === "ADD_REPLY" ? Reply : Comment;

    // if (req.body.action !== "ADD_REPLY") {
    // }

    if (req.body.action === "ADD_REPLY") {
      const userProfileUpdate = await User.findByIdAndUpdate(
        session.user.id,
        { $pull: { "profile.commentReplies": req.body.commentId } },
        { safe: true, multi: true }
      );
      console.log(userProfileUpdate);
    }

    if (req.body.action !== "ADD_REPLY") {
      //===== deletes comment id from post id =====
      const postUpdate = await Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { comments: req.body.commentId } },
        { safe: true, multi: true }
      );
      console.log(postUpdate);
      //===== deletes comment id from user profile comments array =====
      const userProfileUpdate = await User.findByIdAndUpdate(
        session.user.id,
        { $pull: { "profile.comments": req.body.commentId } },
        { safe: true, multi: true }
      );
      console.log(userProfileUpdate);
    }

    //===== deletes any replies with og id is the reply deleted id =====
    const repliesDeleted = await Reply.deleteMany({
      originalCommentId: req.body.commentId,
    });
    console.log(repliesDeleted);

    const commentToDelete = await typeOfEdit.findByIdAndDelete(
      req.body.commentId
    );
    console.log(commentToDelete);

    // console.log(req.body);

    res.status(200).json({
      message: "Comment has been DELETED.",
    });
  }

  // }
  const checkSession = async () => {
    console.log(req.body.type);
    const session = await getSession({ req });
    // console.log(session);
    if (session) {
      //===== add reply to comment =====
      req.body.type === "REPLY_COMMENT" &&
        (await addReplyComment(session)) &&
        res.end();
      //===== add comment to post =====
      req.body.type === "ADD_COMMENT" &&
        (await addComment(session)) &&
        res.end();
      //===== add reply to reply comments =====
      req.body.type === "ADD_REPLY" && (await addReply(session)) && res.end();
      //===== edits any type of comment =====
      req.body.type === "EDIT_COMMENT" &&
        (await updateComment(session)) &&
        res.end();
      //===== deletes comment =====
      req.body.type === "DELETE_COMMENT" &&
        (await deleteComment(session)) &&
        res.end();
    }
    // session && (await addComment(session)) && res.end();
    !session &&
      res.status(200).json({ message: "oh no you must be logged in" }) &&
      res.end();
  };
  switch (req.method) {
    case "POST":
      checkSession();
      break;
    case "PUT":
      checkSession();
      break;
    case "DELETE":
      checkSession();
      break;
    default:
      res.status(500).json({ message: "Route not valid" });
      res.end();
      break;
  }
  // req.method === "POST" && checkSession();
  // req.method !== "POST" &&
  //   res.status(200).json({ message: "Route not valid" }) &&
  //   res.end();

  // res.end();
};

export default postHandler;
