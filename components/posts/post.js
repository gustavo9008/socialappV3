import React from "react";
import CommentSection from "../comments/commentsection";
// import Image from "next/image";
import parse from "html-react-parser";
import EditPostModal from "./EditPostModal";

function Post(props) {
  const [showPostModal, setShowPostModal] = React.useState(false);
  const [post, setPost] = React.useState(props.post);

  // console.log(props.user);

  return (
    <main className="Psm:m-0 main-container Psm:mt-3 mt-3">
      {props.user && props.user.id === post.userProfile.id && (
        <>
          <button
            onClick={() => setShowPostModal(true)}
            className="block w-20 text-center mb-3 text-black font-medium bg-indigo-500 hover:bg-indigo-600 p-2 mr-1.5 relative"
            href="/blogs/<%= blog._id %>/edit"
          >
            Edit
          </button>
          <EditPostModal
            showPostModal={showPostModal}
            setShowPostModal={setShowPostModal}
            post={post}
            setPost={setPost}
          />
        </>
      )}
      <article className="Psm:w-full Psm:rounded-none Psm:border-none bg-gray-800 rounded-lg border-opacity-50 border border-indigo-900 main-article-card relative overflow-hidden">
        <div className="blog-content">
          <div className="w-full">
            {post.image[0] ? (
              <img
                className="object-cover m-auto"
                src={post.image[0].url}
                alt="this is a picture"
              />
            ) : (
              <img
                className="object-cover m-auto"
                src={post.imageUrl}
                alt="this is a picture"
              />
            )}
          </div>
          <section className="article p-4">
            <div className="article-title">
              <h1 className="text-5xl font-bold tracking-wide pt-4 pb-4">
                {post.title}
              </h1>
            </div>

            <div className="text-article text-base font-normal">
              <div id="postContent">{parse(post.body)}</div>
            </div>
          </section>

          <CommentSection user={props.user} post={post} />
        </div>
      </article>
    </main>
  );
}

export default Post;
