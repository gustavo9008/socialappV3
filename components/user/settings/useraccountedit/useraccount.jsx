import React, { useRef } from "react";

export default function UserAccount(props) {
  // console.log(props);
  const sendAccountData = props.send;
  const newNameRef = useRef();
  const newEmailRef = useRef();
  // console.log(sendAccountData);

  const updateAccountSubmit = async (e) => {
    e.preventDefault();
    const type = `EDIT_USER_ACCOUNT`;
    const data = {
      newName: newNameRef.current.value,
      newEmail: newEmailRef.current.value,
      type,
    };

    const res = await sendAccountData("PUT", "/api/user/editaccount", data);
    console.log(res.data);
  };

  return (
    <>
      <section className="settings-card mt-4 p-4">
        <h4 className="headings-style">Edit User Account</h4>
        <form action="/blogs/changeuser?_method=PUT" method="POST">
          <div className="field">
            <p className="font-medium">
              {" "}
              Current Name: <span>{props.user.name}</span>
            </p>
            <label htmlFor="name" className="font-medium">
              New Name
            </label>
            <input
              ref={newNameRef}
              id="name"
              className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
              type="text"
              name="name"
            />
          </div>
          <div className="field">
            <p className="font-medium">
              {" "}
              Current Email: <span>{props.user.email}</span>
            </p>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              ref={newEmailRef}
              id="email"
              className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
              type="email"
              name="email"
            />
          </div>

          <button
            onClick={updateAccountSubmit}
            className="w-full bg-opacity-80 rounded hover:text-white bg-indigo-500 hover:bg-indigo-600 p-2 mt-3 mr-1.5 h-10"
            type="submit"
            aria-roledescription="update user info"
          >
            Update User
          </button>
        </form>
      </section>
    </>
  );
}
