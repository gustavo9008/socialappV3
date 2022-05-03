import mongoose from "mongoose";
import Comment from "./comment.js";
let Schema = mongoose.Schema;

let ImageSchema = new Schema({
  url: String,
  filename: String,
});

// ImageSchema.virtual('thumbnail').get(function() {
//   return this.url.replace('/upload', '/upload/w_798')
// })
console.log("post model imported");
let postSchema = new Schema(
  {
    likes: { type: Number },
    commentCount: { type: Number },
    title: { type: String },
    imageUrl: { type: String },
    image: [ImageSchema],
    body: { type: String },
    userProfile: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
      profileImage: String,
      profileGenericPic: Array,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
// const Post = mongoose.model("Post", postSchema);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
