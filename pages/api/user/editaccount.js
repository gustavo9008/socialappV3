import { getSession } from "next-auth/client";
import { compare, hash } from "bcryptjs";
import Post from "../../../models/post";
import User from "../../../models/user";
import Comment from "../../../models/comment";
import dbConnect from "../../../middleware/mongodb";
import Reply from "../../../models/replies";

const updateuseraccounthandler = async (req, res) => {
  //===== create one post functionk =====
  const updateAccount = async (session) => {
    //===== recursion function =====
    // function deepIterator(target, savedUser) {
    //   // console.log(target);
    //   if (typeof target === "object") {
    //     for (const key in target) {
    //       target[key].userProfile.name = savedUser;
    //       console.log(target[key].userProfile);

    //       if (target[key].replies) {
    //         deepIterator(target[key].replies);
    //       }
    //     }
    //   }
    // }
    //===== search user account =====
    await dbConnect();
    const user = await User.findById(session.user.id);
    const userName = user.name;
    console.log(userName);

    const editUserAccount = () => {
      console.log(req.body.type);
      console.log(req.body.newName, req.body.newEmail);
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
                comment.userProfile.name = savedUser.name;
                comment.save();
              });
            }
          }
          if (user.profile.commentReplies) {
            // console.log("inside change replies username loop");
            let repliesLength = Object.keys(user.profile.commentReplies);
            // console.log(repliesLength);
            for (let i = 0; i < repliesLength.length; i++) {
              console.log(user.profile.commentReplies[i]);
              Reply.findById(user.profile.commentReplies[i], (err, reply) => {
                if (err) {
                  console.log(err);
                }
                reply.userProfile.name = savedUser.name;
                reply.save();
                // console.log("inside change reply loop");
                // console.log(reply._id);
              });
            }
          }
          // console.log(savedUser);
          res.status(201).json({ message: "your account has been updated" });
        })
        .catch((err) => {
          console.log("this is err callback");
          if (err.keyPattern.name) {
            console.log(err);
            res.status(200).json({ message: "Username exists already!" });
            res.end();
          }
          if (err.keyPattern.email) {
            console.log(err);
            res
              .status(200)
              .json({ message: "User with email already exists!" });
            res.end();
          }
          // if (err) {
          //   console.log(err);
          //   res
          //     .status(200)
          //     .json({ message: "Something went wrong, try again later" });
          //   // res.end();
          // }
        });
    };
    //===== edit user password funtion =====
    const editUserPassword = async (session) => {
      const { oldPassword, newPassword } = req.body;
      const passwordMatch = await compare(oldPassword, user.password);
      if (!passwordMatch) {
        res.status(401).json({
          error: { message: "The old password you entered is incorrect." },
        });
      }
      if (passwordMatch) {
        const password = await hash(newPassword, 10);
        user.password = password;
        user.save();
        res.status(201).json({ message: "Your password has been update." });
      }

      res.end();
    };
    //===== check what kind of edit must be performed =====
    // console.log(user._id.toString() === session.user.id.toString());
    //===== check if is user account edit =====
    user._id.toString() === session.user.id.toString() &&
      req.body.type === "EDIT_USER_ACCOUNT" &&
      editUserAccount();
    //===== check if is passsword edit =====
    user._id.toString() === session.user.id.toString() &&
      req.body.type === "EDIT_USER_PASSWORD" &&
      editUserPassword(session);
    //===== check if delete req =====
    user._id.toString() === session.user.id.toString() &&
      req.body.type === "DELETE_ACCOUNT" &&
      deleteAccount(session);

    // if (user._id == session.user.id) {
    //   if ((req.body.type = `EDIT_USER_ACCOUNT`)) {
    //     // console.log(req.body.type);
    //     console.log(req.body);
    //     console.log(user);
    //   }

    //   // console.log(updatedProfile);

    //   //===== end of user check =====
    // }

    //Send success response
    // res.status(201).json({ message: "your account has been found" });
    //Close DB connection
    // client.close();
  };
  //===== checks if user is logged in  =====
  const checkSession = async () => {
    const session = await getSession({ req });
    // console.log(session);
    session && (await updateAccount(session));
    !session &&
      res.status(401).json({ message: "oh no you must be logged in" });
  };
  //===== check if request is put than runs functions =====

  req.method === "PUT" && checkSession();
  req.method !== "PUT" && res.status(500).json({ message: "Route not valid" });

  // if (req.method === "PUT") {
  //   if (session) {
  //     // Signed in
  //     await updateAccount(session);
  //   } else {
  //     // Not Signed in
  //     res.status(401).json({ message: "oh no you must be logged in" });
  //   }
  // } else {
  //   //Response for other than POST method
  //   res.status(500).json({ message: "Route not valid" });
  // }

  //===== check if user is log in =====
};

export default updateuseraccounthandler;
