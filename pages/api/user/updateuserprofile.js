import { getServerSession } from "next-auth/next";
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Post from "../../../models/post";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";

const updateUserProfileHandler = async (req, res) => {
  //===== create one post functionk =====
  const updateProfile = async (session) => {
    if (req.method === "PUT") {
      await dbConnect();
      const user = await User.findById(req.body.user);
      //===== for update user profile info =====
      user._id.toString() === session.user.id &&
        req.body.type === "UPDATE_PROFILE" &&
        (await updateUserProfile());
      //===== for bookmarking post =====
      user._id.toString() === session.user.id &&
        req.body.type === "BOOKMARK_POST" &&
        (await bookmarkPost());
      //===== for deleting bookmark =====
      user._id.toString() === session.user.id &&
        req.body.type === "DELETE_BOOKMARK_POST" &&
        (await deleteBookmarkPost());

      // if (user._id.toString() === session.user.id) {

      //   //===== end of user check =====
      // }

      //===== bookmark post func =====
      async function bookmarkPost() {
        const bookmark = {
          postId: req.body.post,
          title: req.body.postTitle,
        };
        user.profile.readingList.push(bookmark);
        user.save();

        let updatedBookmark = user.profile.readingList;

        res.status(201).json({
          success: true,
          message: "Post has been bookmark.",
          reading_list: {
            user: user.name,
            readingList: user.profile.readingList || "",
            likesList: user.profile.likesList || "",
          },
        });
      }
      //===== delete bookmark =====
      async function deleteBookmarkPost() {
        const delBook = await user.profile.readingList.filter(
          (bookId) => bookId.postId !== req.body.bookmark
        );

        user.profile.readingList = delBook;
        await user.save();

        let updatedBookmark = user.profile.readingList;

        res.status(201).json({
          success: true,
          message: "Bookmark has been removed.",
          reading_list: {
            user: user.name,
            readingList: user.profile.readingList || "",
            likesList: user.profile.likesList || "",
          },
        });
      }

      //===== update info in user profile =====
      async function updateUserProfile() {
        const { about, location, links } = req.body;
        user.profile.about = about;
        user.profile.location = location;
        user.profile.links = links;
        await user.save();

        res.status(201).json({ success: true, message: "Profile has been update." });
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
    session && (await updateProfile(session)) && (res.end());
    // await updateProfile(session);
  } else {
    // Not Signed in
    res.status(401).json({ message: "oh no you must be logged in" });
    res.end();
  }

};

export default updateUserProfileHandler;
