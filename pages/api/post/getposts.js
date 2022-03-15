import Post from "../../../models/post";
import Comment from "../../../models/comment";
import Reply from "../../../models/replies";
import dbConnect from "../../../middleware/mongodb";

export default async function findPostHandler(req, res) {
  console.log(req.query);
  await dbConnect();
  async function findTopPosts() {}
  let newpostsLikes;
  let latestPosts;
  try {
    if (req.query.type === "TOP") {
      console.log("Find Top Posts");
      newpostsLikes = await Post.find({})
        .sort({ likes: -1, _id: 1 })
        .select("-body -comments")
        .skip(parseInt(req.query.next))
        .limit(5);
    }
    if (req.query.type === "LATEST") {
      latestPosts = await Post.find({})
        .sort({ created: -1 })
        .select("-body -comments")
        .skip(parseInt(req.query.next))
        .limit(5);
      // console.log(latestPosts);
    }
    const dataPosts = req.query.type === "TOP" ? newpostsLikes : latestPosts;
    // const postsLikes = await Post.find({}, "likes")
    //   .select("-body -comments")
    //   .sort({ likes: -1 });
    //===== recursion function to find all replies =====

    // console.log(newpostsLikes);
    // console.log(postsLikes);

    res.status(200).json({
      success: true,
      data: dataPosts,
      nextPost: parseInt(req.query.next) + 5,
    });
    res.end();
  } catch (error) {
    res.status(201).json({ success: false });
    res.end();
  }
}
