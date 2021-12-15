import React from "react";
// import useFetch from "@/hooks/fetch";

export default function Modal(props) {
  const deleteUserAccount = props.delete;
  // console.log(props);
  const deleteAccountRef = React.useRef();
  //   const [showModal, setShowModal] = React.useState(false);

  const deleteAccount = async (e) => {
    console.log(deleteAccountRef.current.value);
    if (deleteAccountRef.current.value) {
      const data = {
        account: props.user._id,
        auth: deleteAccountRef.current.value,
        type: "DELETE_ACCOUNT",
      };

      const res = await deleteUserAccount(
        "DELETE",
        "/api/user/editaccount",
        data
      );
      console.log(res.data);
    }
    // console.log(deleteAccountRef.current.value);
  };
  return (
    <>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
      {props.showModal ? (
        <>
          <div className="justify-center bg-black bg-opacity-70 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="bg-gray-900 border-2 border-gray-500 rounded modal flex flex-col outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-red-700">
                    DELETE ACCOUNT
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Enter Password to delete account.
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm text-white"
                      >
                        Password
                      </label>
                    </div>

                    <input
                      ref={deleteAccountRef}
                      type="password"
                      className="bg-gray-700 focus:bg-gray-900 appearance-none rounded w-full py-2 px-3 text-gray-300 mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-10"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={deleteAccount}
                  >
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
