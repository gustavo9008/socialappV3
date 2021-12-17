import mongoose from "mongoose";
let Schema = mongoose.Schema;

const profileSchema = new Schema({
  about: String,
  image: {
    url: String,
    filename: String,
    genericPic: [],
  },
  location: String,
  links: {
    personalWebsite: String,
    instagram: String,
    twitter: String,
    youtube: String,
    linkedin: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  readingList: [
    {
      blog_id: String,
      url: String,
      title: String,
      created: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  commentReplies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Replies",
    },
  ],
});

const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profile: profileSchema,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

// const User = mongoose.model("User", userSchema);

// module.exports = User;
