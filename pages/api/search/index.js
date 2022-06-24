import Post from "../../../models/post";
import User from "../../../models/user"
import Comment from "../../../models/comment";
import Reply from "../../../models/replies";
import dbConnect from "../../../middleware/mongodb";

export default async function findPostHandler(req, res) {
    console.log(req.query.request);

    await dbConnect();
    const { postId } = req.query;

    try {
        // const postResults = await Post.find({ $text: { $search: req.query.request } })
        // const userResults = await User.find({ $text: { $search: req.query.request } })
        const results = await Post.aggregate([{
            $search: {
                index: 'title_body_text',
                text: {
                    query: req.query.request,
                    path: {
                        'wildcard': '*'
                    }
                }
            }
        }])
        console.log(results);
        // console.log(postResults);
        // console.log(userResults);

        res.status(200).json({ success: true, results: results });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
}