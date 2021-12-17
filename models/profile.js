import mongoose from "mongoose";
let Schema = mongoose.Schema;

// let ImageSchema = new mongoose.Schema(
//     {
//       url: String,
//       filename: String,
//       genericPic: [String],
//     }
//   );
// ImageSchema.virtual('thumbnail').get(function() {
//   return this.url.replace('/upload', '/upload/w_48,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35')
// })

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
      replyId: String,
    },
  ],
});

export default mongoose.models.Profile ||
  mongoose.model("Profile", profileSchema);

// let Profile = mongoose.model("Profile", profileSchema);

// module.exports = Profile;
