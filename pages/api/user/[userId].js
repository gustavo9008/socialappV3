import Post from "../../../models/post";
import User from "../../../models/user";
import Comment from "../../../models/comment";
import dbConnect from "../../../middleware/mongodb";
import Reply from "../../../models/replies";

const finduserhandler = async (req, res) => {
  // console.log(req);
  console.log("this is the find user handler");
  //===== create one post functionk =====
  const findAccount = async (req) => {
    const { userId } = req.query;
    //===== search user account =====
    await dbConnect();
    // console.log(req.body);

    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "profile.posts",
        select: { title: 1, created: 1 },
        options: { sort: { created: -1 } },
      })
      .populate({
        path: "profile.comments",
        options: { sort: { created: -1 } },
      })
      .populate({
        path: "profile.replies",
        options: { sort: { created: -1 } },
      })
      .lean();
    // delete user.password;
    // console.log(user);
    res.status(200).json({ message: "found account", account: user });
    res.end();
  };

  // user._id.toString() === session.user.id.toString() &&
  //   req.body.type === "EDIT_USER_ACCOUNT" &&
  //   (await editUserAccount());
  // //===== check if is passsword edit =====
  // user._id.toString() === session.user.id.toString() &&
  //   req.body.type === "EDIT_USER_PASSWORD" &&
  //   (await editUserPassword(session));

  //===== check if request is put than runs functions =====

  //===== switch method =====
  switch (req.method) {
    case "GET":
      //...
      findAccount(req);
      break;
    default:
      res.status(500).json({ message: "Route not valid!" });
      res.end();
      break;
  }

  //===== check if user is log in =====
};

export default finduserhandler;
