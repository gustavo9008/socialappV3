import { getSession } from "next-auth/react";
import nextConnect from "next-connect";
import multer from "multer";
import sanitizeHtml from "sanitize-html";
// import { MongoClient } from "mongodb";

import Post from "../../../models/post";
import User from "../../../models/user";
import dbConnect from "../../../middleware/mongodb";
import { storage } from "middleware/cloudinary/postStorage";
const upload = multer({ storage });
const handler = nextConnect();

handler.post(upload.single("file"), async (req, res) => {
  //===== create one post function =====
  const createNewPost = async (session) => {
    if (req.method === "POST") {
      const user = await User.findById({ _id: session.user.id });
      await dbConnect();
      const { title, imageUrl, content } = req.body;
      // if (req.file) {
      //   let image = {
      //     url: req.file.path.replace("/upload", "/upload/w_798"),
      //     filename: req.file.filename,
      //   };
      //   // newProcessedPost.image = image;
      // }
      //===== sanitize html content =====
      const cleanContent = async () => {
        let sanitizeContent = sanitizeHtml(content, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            "iframe",
            "img",
          ]),
          allowedAttributes: {
            img: ["src", "alt"],
            iframe: [
              "src",
              "width",
              "height",
              "allow",
              "clipboard-write",
              "encrypted-media",
              "gyroscope",
              "picture-in-picture",
              "allowfullscreen",
            ],
          },
          allowedIframeHostnames: ["www.youtube.com"],
        });
        return sanitizeContent;
      };
      let newContent = await cleanContent();
      //===== post object =====
      let newProcessedPost = {
        title: title,
        body: newContent,
        userProfile: {
          id: session.user.id,
          name: session.user.name,
          profileImage: session.user.profile.image.url,
          profileGenericPic: session.user.genericImage,
        },
        likes: 0,
      };
      if (req.file) {
        let image = {
          url: req.file.mimetype.includes("image") ? req.file.path.replace("upload", "upload/w_798") : req.file.path,
          filename: req.file.filename,
          type: req.file.mimetype
        };
        newProcessedPost.image = image;
      }
      if (req.body.imageUrl) {
        newProcessedPost.imageUrl = req.body.imageUrl;
      }
      const newPost = new Post(newProcessedPost);
      // // const user = await User.findById(session.user.id);
      await user.profile.posts.push(newPost._id);
      await user.save();

      const postCreated = await newPost.save();
      // //Send success response
      res.status(201).json({
        success: true,
        message: "Your new post has been created!!",
        newPostId: newPost._id,
      });
      res.end();
      //Close DB connection
      // client.close();
    } else {
      //Response for other than POST method
      res.status(401).json({ message: "Route not valid" });
      res.end();
    }
  };

  //===== check if user is log in =====
  const session = await getSession({ req });
  if (session) {
    // res.status(201).json({
    //   message: "Your new post has been created!!",

    // });
    // Signed in
    await createNewPost(session);
  } else {
    // Not Signed in
    res.status(401).json({ message: "oh no you must be logged in" });
    res.end();
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
