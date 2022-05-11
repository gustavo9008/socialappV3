import React from "react";
import Modal from "@/components/ui/Modal";

export default function DeleteAccount(props) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <section
        className="settings-delete-card mt-4 p-4"
        aria-roledescription="delete account"
      >
        <h4 className="headings-style text-red-500">Danger Zone!!</h4>
        <form action="/blogs/deleteaccount" method="POST">
          <div className="field">
            <p className="">Delete Account</p>
            <ul>
              <li className="pb-2">Deleting your account will:</li>
              <li className="pl-4 pb-2">
                Delete all your post, Delete all your comments and it will
                delete your profile
              </li>
            </ul>
          </div>
        </form>
        <div>
          <button
            onClick={() => setShowModal(true)}
            id="loginModal"
            className="rounded w-20 hover:text-white bg-red-700 hover:bg-red-800 p-2"
            aria-roledescription="pop-up delete button"
          >
            Delete
          </button>
          <Modal
            delete={props.delete}
            user={props.user}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </section>
    </>
  );
}
