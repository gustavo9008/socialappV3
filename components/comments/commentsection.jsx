import React, { Fragment, useState, useEffect } from "react";
import AddCommentForm from "./addcommentform.jsx";
import Comments from "./comments";
// import { CommentsWrapper } from "../../context/state.js";
// import { useCommentContext } from "../../context/state.js";

export const CommentContext = React.createContext();

export default function CommentSection(props) {
  // async function depth(comment) {
  //   let commentReplies = comment;
  //   for (const key in commentReplies) {
  //     if (commentReplies[key].replies !== undefined) {
  //       for (const com in commentReplies[key].replies) {
  //         console.log(commentReplies[key].replies[com].toString());

  //         commentReplies[key].repliesFound.push(commentReply);
  //       }
  //       if (commentReplies[key].repliesFound !== undefined) {
  //         await deepIterator(commentReplies[key].repliesFound);
  //       }
  //     }
  //   }

  //   return commentReplies;
  // }
  // const commentDepth = depth(props.comments);
  // console.log(commentDepth);

  const user = props.user ? props.user : false;
  const [userSession] = useState({ user: user });
  const [postComments, setPostComments] = useState(props.post.comments);
  // console.log(postComments);
  const title = props.post.title;
  const postId = props.post._id;

  // console.log(props.user);
  // const [comments, setComments] = useState(props.post.comments);
  // console.log(postComments);
  // const updateComponent = (newcomment) => {
  //   setCommentAdd((oldComments) => [...oldComments, newcomment]);
  //   console.log("update component func");
  // };
  // useEffect(() => {
  //   setPostComments(postComments);
  // }, [postComments]);
  return (
    <CommentContext.Provider
      value={{ userSession, postComments, setPostComments, title, postId }}
    >
      <section className="comments p-4 pb-14">
        <h3 className="mt-10 text-3xl pb-4">Discussion</h3>
        <div className="">
          <AddCommentForm postId={props.post._id} title={props.post.title} />
          {postComments ? (
            <Comments user={userSession} comments={postComments} />
          ) : null}
        </div>
      </section>
    </CommentContext.Provider>
  );
}
