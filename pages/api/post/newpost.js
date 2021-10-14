import { getSession } from "next-auth/client";
// import { MongoClient } from "mongodb";

import Post from "../../../models/post";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";

const postHandler = async (req, res) => {
  //===== create one post functionk =====
  const createNewPost = async (session) => {
    if (req.method === "POST") {
      await dbConnect();
      const { title, image, content } = req.body;

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
      //Hash password
      const newPost = new Post({
        title,
        image: [],
        imageUrl: image,
        body: content,
        userProfile: {
          id: session.user.id,
          name: session.user.name,
          profileImage: session.user.profile.image.url,
          profileGenericPic: session.user.genericImage,
        },
      });

      const user = await User.findById(session.user.id);
      await user.profile.posts.push(newPost._id);
      await user.save();

      const postCreated = await newPost.save();
      //Send success response
      res
        .status(201)
        .json({ message: "Yay! Your new post has been created!!" });
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
    console.log(session.user);
    await createNewPost(session);
  } else {
    // Not Signed in
    res.status(401).json({ message: "oh no you must be logged in" });
  }
  res.end();
};

export default postHandler;
