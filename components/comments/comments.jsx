import React from "react";
import CommentCard from "./CommentCard";
import TextComments from "./textcomments";
// import { CommentContext } from "./commentsection";

export default function Comments(props) {
  // const { postComments } = React.useContext(CommentContext);
  // console.log("comments from comment component");
  // console.log(props.comments);
  return (
    <aside id="commentSection" className="edit-comment-container">
      {props.comments.map((comment) => (
        <TextComments
          key={comment._id}
          comment={comment}
          originalCommentId={comment._id}
        />
      ))}
    </aside>
  );
}
