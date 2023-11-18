// import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { storage, cloudinary } from "middleware/cloudinary";

import Post from "../../../models/post";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";

const updateProfileImageHandler = async (req, res) => {
  //===== create one post functionk =====
  const updateProfilePic = async (session) => {
    if (req.method === "PUT") {
      const upload = multer({ storage });
      const image = upload.array(req.body.profileImage);
      await dbConnect();
      const user = await User.findById(session.user.id);
      if (user._id == session.user.id) {

        // const updatedProfile = {
        //   about: about,
        //   location: location,
        //   links,
        // };

        // user.profile.about = about;
        // user.profile.location = location;
        // user.profile.links = links;
        // await user.save();

        //===== end of user check =====
      }
      //Send success response
      res.status(201).json({ message: "Color/Picture has been updated." });
      //Close DB connection
      // client.close();
    } else {
      //Response for other than POST method
      res.status(500).json({ message: "Route not valid" });
    }
  };

  //===== check if user is log in =====
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);


  if (session) {
    // Signed in
    await updateProfilePic(session);
  } else {
    // Not Signed in
    res.status(401).json({ message: "oh no you must be logged in" });
  }
  res.end();
};
export const config = {
  api: {
    bodyParser: false,
  },
};

export default updateProfileImageHandler;
