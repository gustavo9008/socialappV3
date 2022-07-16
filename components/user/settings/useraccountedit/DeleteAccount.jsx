import React from "react";
import Modal from "@/components/user/settings/useraccountedit/DeleteModal";
import Button, { useBtnState } from "@/components/ui/globalUI/Button";

export default function DeleteAccount(props) {
  const [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
  ] = useBtnState(false, "Delete", "", "block");
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <section
        className="settings-delete-card mt-4 border-2 border-red-800 bg-gray-100 p-4 dark:bg-gray-800"
        aria-roledescription="delete account"
      >
        <h4 className="headings-style text-red-500">Danger Zone!!</h4>
        <form method="POST">
          <div className="field">
            <h2 className="">Delete Account ? </h2>
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
          {/* <button
            onClick={() => setShowModal(true)}
            id="loginModal"
            className="w-20 rounded bg-red-700 p-2 hover:bg-red-800 hover:text-white"
            aria-roledescription="pop-up delete button"
          >
            Delete
          </button> */}
          <Button
            label={label}
            handleClick={() => setShowModal(true)}
            idTag="deleteModal"
            btnType={"CANCEL"}
            className="w-20 rounded bg-red-700 p-2 text-white hover:bg-red-800 "
            aria-roledescription="pop-up delete button"
          />
          <Modal
            delete={props.delete}
            user={props.user}
            showModal={showModal}
            setShowModal={setShowModal}
            useAxiosFetch={props.useAxiosFetch}
          />
        </div>
      </section>
    </>
  );
}
