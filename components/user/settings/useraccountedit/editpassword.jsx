import React from "react";

export default function EditPassword(props) {
  const sendAccountData = props.send;
  const oldPasswordRef = React.useRef();
  const newPasswordRef = React.useRef();

  const updateAccountPasswordSubmit = async (e) => {
    e.preventDefault();

    const type = "EDIT_USER_PASSWORD";
    const data = {
      oldPassword: oldPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
      type,
    };

    const res = await sendAccountData("PUT", "/api/user/editaccount", data);
    console.log(res.data);
  };
  return (
    <>
      <section className="settings-card mt-4 p-4">
        <h4 className="headings-style">Edit Password</h4>
        <form action="/blogs/changepassword" method="POST">
          <div className="field">
            <label htmlFor="old-password" className="font-medium">
              Old Password
            </label>
            <input
              ref={oldPasswordRef}
              id="old-password"
              className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
              type="password"
              name="oldPassword"
              placeholder="Password"
            />
          </div>
          <div className="field">
            <label htmlFor="new-password" className="font-medium">
              New Password
            </label>
            <input
              ref={newPasswordRef}
              id="new-password"
              className="text-sm bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
              type="password"
              name="newPassword"
              placeholder="Password"
            />
          </div>
          <button
            onClick={updateAccountPasswordSubmit}
            className="w-full bg-opacity-80 rounded hover:text-white bg-indigo-500 hover:bg-indigo-600 p-2 mt-3 mr-1.5 h-10"
            type="submit"
            aria-label="save new password button"
          >
            Save New Password
          </button>
        </form>
      </section>
    </>
  );
}
