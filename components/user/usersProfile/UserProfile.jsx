import Link from "next/link";
import React from "react";

// import ReactDOM from "react-dom";

export default function UserProfile(props) {
  // console.log(props.user.profile);
  // const css2obj = (css) => {
  //   const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g,
  //     o = {};
  //   css.replace(r, (m, p, v) => (o[p] = v));
  //   return o;
  // };

  const CommentsReplies = props.comments.concat(props.replies);
  // console.log(CommentsReplies);

  const sortedCommentReplies = CommentsReplies.slice().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // console.log(sortedCommentReplies);

  const btnStyle = {
    background: `conic-gradient(${props.user.profile.image.genericPic[0]}, ${props.user.profile.image.genericPic[1]} , ${props.user.profile.image.genericPic[2]}, ${props.user.profile.image.genericPic[3]}, ${props.user.profile.image.genericPic[4]}, ${props.user.profile.image.genericPic[5]}, ${props.user.profile.image.genericPic[6]}, ${props.user.profile.image.genericPic[7]})`,
  };

  // const spanSyle = css2obj(props.user.genericImage);
  // console.log(spanSyle);
  return (
    <main className="Psm:m-0 profile-container Psm:mt-3 mt-3">
      <header className="Psm:w-full mx-auto mb-2">
        <figure className="Psm:border-l-0 Psm:border-r-0 Psm:rounded-none flex-grow overflow-hidden rounded-md border border-gray-600 bg-gray-800 p-8 md:flex md:p-0">
          <div className="Psm:flex-col flex w-full">
            {!props.user.profile.image.url ? (
              <span
                className="profile-circle-avatar Psm:mx-auto h-32 w-32 rounded-full object-cover md:h-auto md:w-48 md:rounded-none"
                style={btnStyle}
              ></span>
            ) : (
              <img
                className="profile-circle-avatar Psm:mx-auto h-32 w-32 rounded-full object-cover md:h-auto md:w-48 md:rounded-none"
                src={props.user.profile.image.url}
                alt=""
                width="384"
                height="512"
              ></img>
            )}
            <div className="space-y-4 pt-6 text-center md:p-8 md:text-left">
              <figcaption className="font-medium">
                <p className="text-lg font-semibold">{props.user.name}</p>
                <p className="text-md">{props.user.profile.about}</p>

                <aside className="mt-2 flex justify-around text-sm text-gray-400">
                  <span>
                    <i className="profile-card-loc_joined">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </i>
                    Location: {props.user.profile.location}{" "}
                  </span>
                  <span>
                    <i className="profile-card-loc_joined">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                        />
                      </svg>
                    </i>
                    Joined on: {new Date(props.user.createdAt).toDateString()}
                  </span>
                </aside>
                <footer className="m-auto mt-4 flex w-60 justify-around text-xl"></footer>
              </figcaption>
            </div>
          </div>
        </figure>
      </header>
      <section className="mx-auto flex flex-row flex-wrap justify-evenly gap-4">
        {/* post section  */}
        {props.user.profile.posts.length > 0 && (
          <article className="Psm:w-screen profile-post-comment-containers flex flex-auto flex-col flex-wrap self-start ">
            {props.user.profile.posts.map((post) => (
              <div
                className="Psm:rounded-none profile-article-cards Psm:border-l-0 Psm:border-r-0 border border-gray-700 bg-gray-800"
                key={post._id}
              >
                <h3 className="text-lg font-medium">{post.title}</h3>
                <span className="text-sm text-gray-400">
                  {new Date(post.created).toDateString()}
                  <Link href={`/post/${post._id}`}>
                    <a className="text-blue-300"> Read Post</a>
                  </Link>
                </span>
              </div>
            ))}
          </article>
        )}

        {/* comment section */}
        {sortedCommentReplies.length > 0 && (
          <article className="Psm:w-screen profile-post-comment-containers Psm:border-l-0 Psm:border-r-0 Psm:rounded-none mb-4 flex flex-auto flex-col flex-wrap self-start overflow-hidden rounded-md border border-gray-500">
            <h3 className="p-2 pl-6"> Recent Comments</h3>
            {sortedCommentReplies.map((comment) => (
              <Link key={comment._id} href={`${comment.postUrl.address}`}>
                <a
                  key={comment._id}
                  className="w-full overflow-hidden border-b border-gray-900 bg-gray-800 p-4"
                >
                  <h4 className="text-lg font-medium">{comment.comment}</h4>
                  <span className="text-sm text-gray-400">
                    {comment.postUrl.title}
                  </span>
                </a>
              </Link>
            ))}
          </article>
        )}
      </section>
    </main>
  );
}