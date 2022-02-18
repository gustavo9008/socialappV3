import { getSession } from "next-auth/react";
// import { getCsrfToken } from "next-auth/react";
// import { getToken } from "next-auth/jwt";
import { compare, hash } from "bcryptjs";
import Post from "../../../models/post";
import User from "../../../models/user";
import Comment from "../../../models/comment";
import dbConnect from "../../../middleware/mongodb";
import Reply from "../../../models/replies";
// import useFetch from "../../../hooks/fetch";
// import { server } from "../../../config/index";

// const secret = process.env.SECRET;

const updateuseraccounthandler = async (req, res) => {
  // const sendNewUser = useFetch;

  //===== create one post functionk =====
  const updateAccount = async (session) => {
    //===== search user account =====
    await dbConnect();
    console.log(req.body);
    const user = await User.findById(session.user.id);
    // const sendNewUser = user.name;
    // console.log(userName);

    const editUserAccount = async () => {
      // console.log(req.body.newName, req.body.newEmail);
      console.log("edit user account function");
      let updatedUser = {
        name: req.body.newName,
        email: req.body.newEmail,
      };
      // console.log(user);
      user.name = updatedUser.name;
      user.email = updatedUser.email;
      user
        .save()
        .then((savedUser) => {
          console.log("this is savedUser callback");
          // console.log(savedUser)
          //===== check and updates post user name =====
          if (user.profile.posts) {
            let postsLength = Object.keys(user.profile.posts);
            // console.log(postsLength);
            //===== loop to update post username =====
            for (let i = 0; i < postsLength.length; i++) {
              Post.findById(user.profile.posts[i], (err, post) => {
                if (err) {
                  return;
                }

                post.userProfile.name = savedUser.name;
                post.save();
              });
            }
          }
          //===== loop to update commment username =====
          if (user.profile.comments) {
            // console.log("inside change comment username loop");

            let commentLength = Object.keys(user.profile.comments);
            // console.log(commentLength);
            for (let i = 0; i < commentLength.length; i++) {
              Comment.findById(user.profile.comments[i], (err, comment) => {
                if (err) {
                  return;
                }
                // if (comment.replies) {
                //   deepIterator(comment.replies, savedUser.name);
                // }
                // console.log(comment);
                if (comment !== null) {
                  comment.userProfile.name = savedUser.name;
                  comment.save();
                }
              });
            }
          }
          if (user.profile.commentReplies) {
            // console.log("inside change replies username loop");
            let repliesLength = Object.keys(user.profile.commentReplies);
            // console.log(repliesLength);
            for (let i = 0; i < repliesLength.length; i++) {
              // console.log(user.profile.commentReplies[i]);
              Reply.findById(user.profile.commentReplies[i], (err, reply) => {
                if (err) {
                  console.log(err);
                }
                // console.log(reply);
                if (reply !== null) {
                  reply.userProfile.name = savedUser.name;
                  reply.save();
                }

                // console.log("inside change reply loop");
                // console.log(reply._id);
              });
            }
          }
          // console.log(savedUser);
          // res.status(201).json({ message: "your account has been updated" });
        })
        .catch((err) => {
          console.log("inside catch error");
          console.log(err);
          if (err.keyPattern.name) {
            console.log(err);
            res
              .status(200)
              .json({ type: "error", message: "Username exists already!" });
            res.end();
          }
          if (err.keyPattern.email) {
            console.log(err);
            res.status(200).json({
              type: "error",
              message: "User with email already exists!",
            });
            res.end();
          }
          if (err) {
            console.log(err);
            res.status(200).json({
              type: "error",
              message: "Something went wrong, try again later",
            });
            // res.end();
          }
          res.end();
        });

      // await updateUserToken();
      res.status(201).json({ message: "your account has been updated" });
      res.end();
    };
    //===== edit user password funtion =====
    const editUserPassword = async (session) => {
      const { oldPassword, newPassword } = req.body;
      const passwordMatch = await compare(oldPassword, user.password);
      if (!passwordMatch) {
        res.status(200).json({
          error: { message: "The current password you entered is incorrect." },
        });
      }
      if (passwordMatch) {
        const password = await hash(newPassword, 10);
        user.password = password;
        user.save();
        console.log("account password has been update");
        res.status(201).json({ message: "Your password has been update." });
      }

      // res.end();
    };
    //===== check what kind of edit must be performed =====
    // console.log(user._id.toString() === session.user.id.toString());
    //===== check if is user account edit =====
    // async function updateUserToken() {
    //   // const csrfToken = await getCsrfToken({ req });
    //   // console.log(csrfToken);
    // }

    user._id.toString() === session.user.id.toString() &&
      req.body.type === "EDIT_USER_ACCOUNT" &&
      (await editUserAccount());
    //===== check if is passsword edit =====
    user._id.toString() === session.user.id.toString() &&
      req.body.type === "EDIT_USER_PASSWORD" &&
      (await editUserPassword(session));
  };
  const deleteAccount = async (session) => {
    await dbConnect();
    const user = await User.findById(session.user.id);
    // const userName = user.name;
    // console.log(userName);
    // console.log(req.body);

    const deleteEverything = async () => {
      // console.log(req.body);
      const commentDeleted = await Comment.deleteMany({
        "userProfile.id": user._id,
      });
      console.log(commentDeleted);
      const repliesDeleted = await Reply.deleteMany({
        "userProfile.id": user._id,
      });
      console.log(repliesDeleted);
      const postsDeleted = await Post.deleteMany({
        "userProfile.id": user._id,
      });
      console.log(postsDeleted);
      // if(user.profile.image.filename){

      // }
      const userDelete = await User.findByIdAndDelete(session.user.id);
      console.log(userDelete);
      res.status(201).json({ message: "your account has been delete" });
      res.end();
    };
    // const checkPass = await compare(req.body.auth, user.password);
    // console.log(await compare(req.body.auth, user.password));
    // console.log(checkPass);
    (await compare(req.body.auth, user.password)) &&
      req.body.type === "DELETE_ACCOUNT" &&
      deleteEverything(session);

    (await compare(req.body.auth, user.password)) === false &&
      res.status(203).json({ message: "incorect password" });
    res.end();
  };
  //===== checks if user is logged in  =====
  const checkSession = async () => {
    const session = await getSession({ req });
    // const csrfToken = await getCsrfToken({ req });
    // console.log(session);
    session && (await updateAccount(session));
    !session &&
      res.status(401).json({ message: "oh no you must be logged in" });
    res.end();
  };
  const checkDeleteSession = async () => {
    const session = await getSession({ req });

    // console.log(session);
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
      checkSession();
      break;
    case "DELETE":
      //...
      checkDeleteSession();
      break;
    default:
      res.status(500).json({ message: "Route not valid!" });
      res.end();
      break;
  }

  //===== check if user is log in =====
};

export default updateuseraccounthandler;
