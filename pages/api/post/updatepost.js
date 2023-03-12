import { getSession } from "next-auth/react";
import Post from "../../../models/post";
import Reply from "../../../models/replies";
import Comment from "../../../models/comment";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";
import { cloudinary } from "middleware/cloudinary/postStorage";

const updatePostHandler = async (req, res) => {
  await dbConnect();

  // updates post
  async function updatePost(session) {
    const { post: updatePost, postId } = req.body;
    // console.log(req.body);
    const post = await Post.findById(postId);
    // console.log(post.userProfile.id.toString() === session.user.id);
    if (post.userProfile.id.toString() === session.user.id) {
      // console.log("you are the owner of this post");
      post.title = updatePost.title;
      post.body = updatePost.content;

      await post.save();
    }
    // const user = await User.findById(session.id);
    // console.log(user);

    res
      .status(201)
      .json({ success: true, message: "Post has been updated.", post });
  }
  //=====  // deletes one single post =====

  async function deletePost(session) {
    const postCreator = await User.findById(session.user.id);

    const repliesDeleted = await Reply.deleteMany({
      originalPostId: req.body.postId,
    });
    const commentsDeleted = await Comment.deleteMany({
      originalPostId: req.body.postId,
    });

    const postRefdelete = postCreator.profile.posts.indexOf(req.body.postId);

    if (postRefdelete > -1) {
      postCreator.profile.posts.splice(postRefdelete, 1);
    }

    if (req.body.imageToDelete !== null) {
      cloudinary.uploader.destroy(req.body.imageToDelete);
    }
    // console.log(postCreator.profile.posts);
    await postCreator.save();

    // console.log(commentsDeleted, repliesDeleted);

    const postDelete = await Post.findByIdAndDelete(req.body.postId);
    postDelete &&
      res
        .status(200)
        .json({ message: "Post has been deleted.", deleted: true });

    !postDelete &&
      res.status(404).json({
        message: "Post was not able to be deleted, pleaes try again later..",
        deleted: false,
      });
    // console.log(postDelete);
    // // console.log("hello from the delete post function");
    // res.status(200).json({ message: "Post has been deleted.", deleted: true });
  }

  async function likePost(session) {
    const post = await Post.findById(req.body.post);
    post.likes = (post.likes ? post.likes : 0) + 1;
    await post.save();

    const user = await User.findById(session.user.id);
    !user.profile.likesList && (user.profile.likesList = []);
    user.profile.likesList.push({
      postId: post._id,
      title: post.title,
    });
    await user.save();
    // console.log(req.body);
    res.status(201).json({
      success: true,
      message: "Post has been liked.",
      reading_list: {
        user: user.name,
        readingList: user.profile.readingList || "",
        likesList: user.profile.likesList || "",
      },
    });
  }
  async function unlikePost(session) {
    const post = await Post.findById(req.body.post);
    post.likes = (post.likes ? post.likes : 0) - 1;
    await post.save();

    const user = await User.findById(session.user.id);
    const removeLike = await user.profile.likesList.filter(
      (like) => like.postId !== req.body.post
    );
    !user.profile.likesList && (user.profile.likesList = []);
    user.profile.likesList = removeLike;
    await user.save();
    // console.log(req.body);
    res.status(201).json({
      success: true,
      message: "Post has been unliked.",
      reading_list: {
        user: user.name,
        readingList: user.profile.readingList || "",
        likesList: user.profile.likesList || "",
      },
    });
  }

  // check if user is logged in
  const checkSession = async () => {
    // console.log(req.body);
    const session = await getSession({ req });
    // console.log(session);
    if (session) {
      req.body.type === "UPDATE_POST" &&
        (await updatePost(session)) &&
        res.end();
      req.body.type === "DELETE_POST" &&
        (await deletePost(session)) &&
        res.end();
      req.body.type === "LIKE_POST" && (await likePost(session)) && res.end();
      req.body.type === "UNLIKE_POST" &&
        (await unlikePost(session)) &&
        res.end();
      // // req.body.type === "ADD_COMMENT" &&
      //   (await addComment(session)) &&
      //   res.end();
      // req.body.type === "ADD_REPLY" && (await addReply(session)) && res.end();
      // res.status(201).json({ message: "update post route" });
    }
    // session && (await addComment(session)) && res.end();
    !session &&
      res.status(200).json({ message: "oh no you must be logged in" }) &&
      res.end();
  };

  switch (req.method) {
    case "PUT":
      //...
      await checkSession();
      break;
    case "DELETE":
      //...
      await checkSession();
      break;
    default:
      res.status(500).json({ message: "Route not valid" });
      res.end();
  }
  // res.end();
};

export default updatePostHandler;
