import mongoose from "mongoose";
let Schema = mongoose.Schema;

let replySchema = new Schema({
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
  originalCommentId: String,
  originalPostId: String,
  created: { type: Date, default: Date.now },
});

// let Comment = mongoose.model("Comment", commentSchema);

export default mongoose.models.Reply || mongoose.model("Reply", replySchema);
