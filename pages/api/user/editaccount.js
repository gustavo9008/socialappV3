import { getServerSession } from "next-auth/next";
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { compare, hash } from "bcryptjs";
import Post from "../../../models/post";
import User from "../../../models/user";
import Comment from "../../../models/comment";
import dbConnect from "../../../middleware/mongodb";
import Reply from "../../../models/replies";
import { cloudinary } from "../../../middleware/cloudinary/postStorage";
// import useFetch from "../../../hooks/fetch";
// import { server } from "../../../config/index";

// const secret = process.env.SECRET;

const updateuseraccounthandler = async (req, res) => {
  // const sendNewUser = useFetch;

  //===== create one post function =====
  const updateAccount = async (session) => {
    //===== search user account =====
    await dbConnect();
    const user = await User.findById(session.user.id);
    const editUserAccount = async () => {
      let updatedUser = {
        name: req.body.newName,
        email: req.body.newEmail,
      };
      user.name = updatedUser.name;
      user.email = updatedUser.email;
      await user
        .save()
        .then((savedUser) => {
          //===== check and updates post user name =====
          if (user.profile.posts) {
            let postsLength = Object.keys(user.profile.posts);
            //===== loop to update post username =====
            for (let i = 0; i < postsLength.length; i++) {

              Post.findById(user.profile.posts[i]).then((post) => {
                // console.log(post);

                post.userProfile.name = savedUser.name;
                post.save();
              }).catch((err) => {
                console.log(err);
                // if (err) {
                //   return;
                // }
              });
            }
          }
          //===== loop to update commment username =====
          if (user.profile.comments) {

            let commentLength = Object.keys(user.profile.comments);
            for (let i = 0; i < commentLength.length; i++) {
              Comment.findById(user.profile.comments[i]).then((comment) => {
                if (comment !== null) {
                  comment.userProfile.name = savedUser.name;
                  comment.save();
                }
              }).catch((err) => {
                console.log(err);
              });
            }
          }
          if (user.profile.commentReplies) {
            let repliesLength = Object.keys(user.profile.commentReplies);
            for (let i = 0; i < repliesLength.length; i++) {
              Reply.findById(user.profile.commentReplies[i]).then((reply) => {
                if (reply !== null) {
                  reply.userProfile.name = savedUser.name;
                  reply.save();
                }
              }).catch((err) => {
                if (err) {
                  res.status(201).json({ type: "false", message: "Something went wrong try again later." });
                }
              });
            }
          }

        }).then(() => {
          res.status(201).json({ type: "success", message: "your account has been updated" });
          res.end();
        })
        .catch((err) => {
          console.log(err);
          if (err.keyPattern.name) {
            res
              .status(200)
              .json({ type: "error", message: "Username exists already!" });
            res.end();
          }
          if (err.keyPattern.email) {
            res.status(200).json({
              type: "error",
              message: "User with email already exists!",
            });
            res.end();
          }
        });
    };
    //===== edit user password funtion =====
    const editUserPassword = async (session) => {
      const { oldPassword, newPassword } = req.body;
      const passwordMatch = await compare(oldPassword, user.password);
      if (!passwordMatch) {
        res.status(200).json({
          error: true,
          errorMessage: { message: "The current password you entered is incorrect." },
        });
      }
      if (passwordMatch) {
        const password = await hash(newPassword, 10);
        user.password = password;
        user.save();
        res.status(201).json({ message: "Your password has been updated." });
      }

      // res.end();
    };
    //===== check what kind of edit must be performed =====


    user._id.toString() === session.user.id.toString() &&
      req.body.type === "EDIT_USER_ACCOUNT" &&
      (await editUserAccount());
    //===== check if is passsword edit =====
    user._id.toString() === session.user.id.toString() &&
      req.body.type === "EDIT_USER_PASSWORD" &&
      (await editUserPassword(session));
  };
  //===== delete account func =====
  const deleteAccount = async (session) => {
    await dbConnect();
    const user = await User.findById(session.user.id);

    const deleteEverything = async () => {
      // database delete comment, reply, replies comments and user
      if (user.profile.posts.length > 0) {
        user.profile.posts.forEach(async (postId) => {
          const userPost = await Post.findOneAndDelete({ _id: postId }).lean();
          if (userPost !== null && userPost?.image[0]) {

            const deletedImage = await cloudinary.uploader.destroy(userPost.image[0].filename);
          }

          const postCommentsDelete = await Comment.deleteMany({ "originalPostId": userPost._id });
          const portRepliesDelete = await Reply.deleteMany({ "originalPostId": userPost._id });

        });
      }
      // delete all comments with user id provided
      const commentDeleted = await Comment.deleteMany({
        "userProfile.id": user._id,
      });
      // delete all replies with user id provided
      const repliesDeleted = await Reply.deleteMany({
        "userProfile.id": user._id,
      });

      const userDelete = await User.findByIdAndDelete(session.user.id);


      if (userDelete.profile.image.filename !== "") {
        const deletedUserImage = await cloudinary.uploader.destroy(userDelete.profile.image.filename);
      }
      res.status(201).json({ success: true, message: "Your account has been deleted" });
      // res.end();
    };
    // checks for what type of edit need to be perform
    (await compare(req.body.auth, user.password)) &&
      req.body.type === "DELETE_ACCOUNT" &&
      (await deleteEverything(session));

    (await compare(req.body.auth, user.password)) === false &&
      res.status(203).json({ success: false, message: "Incorect password." });
    res.end();
  };
  //===== checks if user is logged in  =====
  const checkSession = async () => {
    const session = await getServerSession(req, res, authOptions);

    session && (await updateAccount(session));
    !session &&
      res.status(401).json({ message: "oh no you must be logged in" });
    res.end();
  };
  const checkDeleteSession = async () => {
    const session = await getServerSession(req, res, authOptions);

    session && (await deleteAccount(session));
    !session &&
      res.status(401).json({ message: "oh no you must be logged in" });
    res.end();
  };
  //===== check if request is put than runs functions =====

  //===== switch method =====
  switch (req.method) {
    case "PUT":
      //...
      await checkSession();
      break;
    case "DELETE":
      //...
      await checkDeleteSession();
      break;
    default:
      res.status(500).json({ message: "Route not valid!" });
      res.end();
      break;
  }

  //===== check if user is log in =====
};

export default updateuseraccounthandler;
