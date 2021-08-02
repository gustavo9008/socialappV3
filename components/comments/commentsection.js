import React, { Fragment } from "react";
import AddCommentForm from "./addcommentform.js";
import Comments from "./comments";

export default function comments(props) {
  return (
    <Fragment>
      <section className="comments p-4 pb-7">
        <h3 className="mt-10 text-3xl pb-4">Discussion</h3>
        <div className="Psm:pl-1 comment-container">
          <AddCommentForm />
          {props.post.comments ? (
            <Comments comments={props.post.comments} />
          ) : null}
        </div>
      </section>
    </Fragment>
  );
}
