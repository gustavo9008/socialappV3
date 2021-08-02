import React from "react";
import CommentCard from "../ui/commentcard";
import TextComments from "./textcomments";

export default function Comments(props) {
  //   console.log(props.comments);
  return (
    <aside id="commentSection" className="edit-comment-container">
      {props.comments.map((comment) => (
        <TextComments key={comment._id} comment={comment} />
      ))}
    </aside>
  );
}
