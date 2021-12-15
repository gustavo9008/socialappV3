import React from "react";

export default function EditPost(props) {
  return (
    <main className="edit-card Psm:px-0">
      <div className="ui huge header">
        Edit <span className="font-bold">{props.post.title}</span>
        <form
          id="edit-article-post"
          className=" text-gray-300"
          action="/blogs/<%= blog._id %>?_method=PUT"
          method="POST"
        >
          <div className="field">
            <label>Title</label>
            <input
              className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
              type="text"
              name="blog[title]"
              value={props.post.title}
              required
            />
          </div>
        </form>
      </div>
    </main>
  );
}
