import mongoose from "mongoose";
let Schema = mongoose.Schema;

// let replySchema = new Schema({
//   reply: String,
//   userProfile: {
//     user: {
//       id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//       name: String,
//     },
//     profile: {
//       id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Profile",
//       },
//       image: String,
//       genericPic: [String, String, String],
//     },
//   },
//   replies: [
//     {
//       replyComment: String,
//       userProfile: {
//         user: {
//           id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//           },
//           name: String,
//         },
//         profile: {
//           id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Profile",
//           },
//           image: String,
//           genericPic: [String, String, String],
//         },
//       },
//       replyUrl: {
//         address: String,
//         title: String,
//       },
//       author: {
//         id: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },
//         username: String,
//       },
//       created: { type: Date, default: Date.now },
//     },
//   ],
//   replUrl: {
//     address: String,
//     title: String,
//   },
//   created: { type: Date, default: Date.now },
// });

let commentSchema = new Schema({
  comment: String,
  userProfile: {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
    },
    profile: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
      image: String,
      genericPic: [String, String, String],
    },
  },
  replies: [],
  postUrl: {
    address: String,
    title: String,
  },
  created: { type: Date, default: Date.now },
});

// let Comment = mongoose.model("Comment", commentSchema);

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
// module.exports = Comment;
