import mongoose from "mongoose";
let Schema = mongoose.Schema;

console.log("comment model imported");

const commentSchema = new Schema(
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
);
mongoose.models = {};
let Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

// export default mongoose.models.Comment ||
//   mongoose.model("Comment", commentSchema);
module.exports = Comment;
