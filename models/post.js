import mongoose from "mongoose";
import Comment from "./comment.js";
let Schema = mongoose.Schema;

let ImageSchema = new Schema({
  url: String,
  filename: String,
  type: String,
});
let CommentSchema = new Schema(
  {
    comment: String,
    userProfile: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
      profileImage: String,
      profileGenericPic: Array,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Replies",
      },
    ],
    repliesFound: [],
    postUrl: {
      address: String,
      title: String,
    },
    originalPostId: String,
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

// ImageSchema.virtual('thumbnail').get(function() {
//   return this.url.replace('/upload', '/upload/w_798')
// })
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
// postSchema.path("title").index({ text: true })
// postSchema.path("body").index({ text: true })
// const Post = mongoose.model("Post", postSchema);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
