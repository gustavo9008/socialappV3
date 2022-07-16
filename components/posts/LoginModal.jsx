import React from "react";
import LoginForm from "../ui/globalUI/LoginForm";

const LoginModal = (props) => {
  return (
    <>
      {/* <button
      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={() => setShowModal(true)}
    >
      Open regular modal
    </button> */}
      {props.showLoginModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto bg-black bg-opacity-70 outline-none focus:outline-none">
            <section className="flex flex-row justify-center">
              <LoginForm
                redirect={false}
                title={"Log in to continue"}
                closeBtn={
                  <button
                    className="float-right ml-auto border-0 p-1 text-3xl font-semibold leading-none"
                    onClick={() => props.setShowLoginModal(false)}
                  >
                    <span className="block w-6 text-gray-400 outline-none hover:text-gray-100 focus:outline-none">
                      ×
                    </span>
                  </button>
                }
              />
            </section>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default LoginModal;
