import React, { Fragment, useState, useEffect } from "react";
import AddCommentForm from "./addcommentform.js";
import Comments from "./comments";
import { CommentsWrapper } from "../../context/state.js";
import { useCommentContext } from "../../context/state.js";

export default function CommentSection(props) {
  const [comments, setComments] = useState(props.post.comments);
  console.log(props.post);
  const updateComponent = (newcomment) => {
    setCommentAdd((oldComments) => [...oldComments, newcomment]);
    console.log("update component func");
  };
  useEffect(() => {
    setComments(props.post.comments);
  }, [comments, props.post.comments]);
  return (
    <CommentsWrapper>
      <Fragment>
        <section className="comments p-4 pb-7">
          <h3 className="mt-10 text-3xl pb-4">Discussion</h3>
          <div className="Psm:pl-1 comment-container">
            <AddCommentForm
              updateComponent={updateComponent}
              postId={props.post._id}
              title={props.post.title}
            />
            {props.post.comments ? (
              <Comments
                comments={props.post.comments}
                title={props.post.title}
              />
            ) : null}
          </div>
        </section>
      </Fragment>
    </CommentsWrapper>
  );
}
