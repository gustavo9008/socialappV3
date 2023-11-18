import nextConnect from "next-connect";
import multer from "multer";
import { getServerSession } from "next-auth/next";
import { authOptions } from 'pages/api/auth/[...nextauth]';

import Post from "../../../models/post";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";

import { storage, cloudinary } from "middleware/cloudinary/index";

const upload = multer({ storage });

const handler = nextConnect();

handler.put(upload.array("file"), async (req, res) => {
  //===== function updates image or color  =====
  async function saveImage(session) {
    if (req.body.oldFileName) {
      await cloudinary.uploader.destroy(req.body.oldFileName);
    }
    await dbConnect();
    const user = await User.findById(session.user.id);

    //===== updates user profile picture =====
    const updateUserProfilePic = async () => {
      const image = req.files.map((newImage) => ({
        url: newImage.path,
        filename: newImage.filename,
      }));
      await changePostImage(image);

      user.profile.image.url = image[0].url;
      user.profile.image.filename = image[0].filename;
      await user.save();
    };

    //===== updates color =====
    const updateUserColorPic = async () => {
      const newColorArray = JSON.parse(req.body.newColor);
      await changePostImage(newColorArray);
      user.profile.image.genericPic = newColorArray;
      user.profile.image.url = "";
      user.profile.image.filename = "";
      await user.save();
    };

    //===== updates post profile picture =====
    const changePostImage = async (imageColor) => {
      //=== finds every blog from user and updates pic/color ===
      let postsLength = Object.keys(user.profile.posts);

      for (let i = 0; i < postsLength.length; i++) {
        Post.findById(user.profile.posts[i]).then((post) => {
          if (req.files[0]) {
            post.userProfile.profileImage = imageColor[0].url;
          }
          if (req.body.newColor) {
            post.userProfile.profileImage = "";

            post.userProfile.profileGenericPic = imageColor;
          }
          post.save();
        }).catch((err) => {
          console.log(err);
        });
      }
    };


    if (req.files[0]) {
      updateUserProfilePic();
    }
    if (req.body.newColor) {
      updateUserColorPic();
    }


    res.status(201).json({ success: true, message: "Picture updated." });
  }
  //===== check if user is log in =====
  const session = await getServerSession(req, res, authOptions);


  if (session) {
    // Signed in
    await saveImage(session);
  } else {
    // Not Signed in
    res.status(201).json({ success: false, message: "oh no you must be logged in" });
  }
  res.end();
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
