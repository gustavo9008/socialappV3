import nodemailer from "nodemailer";
// import bcrypt from "bcryptjs";
import { hash } from "bcryptjs";

import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";

const forgetpassword = async (req, res) => {
  await dbConnect();

  //===== create one post functionk =====
  const resetPassword = async () => {
    async function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-~.";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    const randomId = await makeid(30);
    //===== search user account =====
    // await dbConnect();

    // const user = await User.findById(userId)
    //   .select("-password")
    //   .populate({
    //     path: "profile.posts",
    //     select: { title: 1, created: 1 },
    //     options: { sort: { created: -1 } },
    //   })
    //   .populate({
    //     path: "profile.comments",
    //     options: { sort: { created: -1 } },
    //   })
    //   .populate({
    //     path: "profile.replies",
    //     options: { sort: { created: -1 } },
    //   })
    //   .lean();

    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user === null) {
      res.status(200).json({ success: false, message: "No user with that email found :(" });
      res.end();
      return;
    }
    user.resetPasswordToken = randomId;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    let smtpTransport = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_SECRET,
      },
    });
    let mailOptions = {
      to: user.email,
      from: "dev.to@outlook.com",
      subject: "dev.me Password Reset",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://" +
        req.headers.host +
        "/forget-password/" +
        randomId +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    const sendEMail = await smtpTransport.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email has been sent." });
    res.end();
  };

  const createNewPassword = async () => {
    const { password, token } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (user) {
      user.password = await hash(password, 12);
      user.resetPasswordToken = "";
      user.resetPasswordExpires = null;
      await user.save();
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Password has been change, You can now log in.",
      });
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
    case "POST":
      //...
      resetPassword();
      break;
    case "PUT":
      //...
      createNewPassword();
      break;
    default:
      res.status(500).json({ message: "Route not valid!" });
      res.end();
      break;
  }

  //===== check if user is log in =====
};

export default forgetpassword;
