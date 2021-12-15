import { getSession } from "next-auth/react";

import Post from "../../../models/post";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";

const updateUserProfileHandler = async (req, res) => {
  //===== create one post functionk =====
  const updateUser = async (session) => {
    if (req.method === "PUT") {
      // console.log(req.body);
      await dbConnect();
      const user = await User.findById(session.user.id);
      // console.log(req.body);
      if (user._id == session.user.id) {
        // console.log("user does match found user");
        console.log(user._id, session.user.id);
        console.log(req.body);
        const { about, location, links } = req.body;
        console.log(about);
        const updatedProfile = {
          about: about,
          location: location,
          links,
        };

        user.profile.about = about;
        user.profile.location = location;
        user.profile.links = links;
        await user.save();

        // console.log(updatedProfile);

        //===== end of user check =====
      }

      //===== connect db function =====
      //   await dbConnect();

      //===== old code for connecting db =====
      //Connect with database
      // const client = await MongoClient.connect(process.env.MONGODB_LOCAL_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // });
      // const db = client.db(process.env.DB_NAME);
      // const postsCollection = db.collection("posts");
      //Check existing
      // const checkExisting = await postsCollection.findOne({ email: email });
      //Send error response if duplicate user is found
      // if (checkExisting) {
      //   res.status(422).json({ message: "User already exists" });
      //   client.close();
      //   return;
      // }
      //===== update user profile =====
      //Hash password
      // const newPost = new Post({
      //   title,
      //   image: [],
      //   imageUrl: image,
      //   body: content,
      //   userProfile: {
      //     user: {
      //       id: session.user.id,
      //       name: session.user.name,
      //     },
      //     profile: {
      //       id: session.user.profile._id,
      //       image: session.user.image,
      //       genericPic: session.user.genericImage,
      //     },
      //   },
      // });

      // const user = await User.findById(session.user.id);
      // await user.profile.posts.push(newPost._id);
      // await user.save();

      // const postCreated = await newPost.save();
      //Send success response
      res.status(201).json({ message: "Your new post has been created!!" });
      //Close DB connection
      // client.close();
    } else {
      //Response for other than POST method
      res.status(500).json({ message: "Route not valid" });
    }
  };

  //===== check if user is log in =====
  const session = await getSession({ req });
  if (session) {
    // Signed in
    await updateUser(session);
  } else {
    // Not Signed in
    res.status(401).json({ message: "oh no you must be logged in" });
  }
  res.end();
};

export default updateUserProfileHandler;
