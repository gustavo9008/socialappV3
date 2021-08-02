import React from "react";
import CommentsSection from "../comments/commentsection";
// import Image from "next/image";
import parse from "html-react-parser";

function Post(props) {
  // console.log(props);
  return (
    <main className="Psm:m-0 main-container Psm:mt-3 mt-3">
      <article className="Psm:w-full Psm:rounded-none Psm:border-none bg-gray-800 rounded-lg border-opacity-50 border border-indigo-900 main-article-card relative overflow-hidden">
        <div className="blog-content">
          <div className="w-full">
            {props.post.image ? (
              <img
                className="object-cover m-auto"
                src={props.post.image}
                alt="this is a picture"
              />
            ) : (
              <img
                className="object-cover m-auto"
                src={props.post.imageUrl}
                alt="this is a picture"
              />
            )}
          </div>
          <section className="article p-4">
            <div className="article-title">
              <h1 className="text-5xl font-bold tracking-wide pt-4 pb-4">
                {props.post.title}
              </h1>
            </div>

            <div className="text-article text-base font-normal">
              <div>{parse(props.post.body)}</div>
            </div>
          </section>

          <CommentsSection post={props.post} />
        </div>
      </article>
    </main>
  );
}

export default Post;
