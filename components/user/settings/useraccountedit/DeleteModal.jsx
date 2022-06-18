import React from "react";
import { appToastContext } from "@/context/state";
import { useSession } from "next-auth/react";

// import useFetch from "@/hooks/fetch";

export default function Modal(props) {
  // const { status } = useSession({
  //   required: true,
  // });
  // console.log(status);
  const { handleLogout, useFetch, showToast } =
    React.useContext(appToastContext);

  const deleteUserAccount = useFetch;
  // console.log(props);
  const deleteAccountRef = React.useRef();
  //   const [showModal, setShowModal] = React.useState(false);

  const deleteAccount = async (e) => {
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
      res.data.success === true &&
        (showToast("success", res.data.message), handleLogout(e));
      res.data.success === false &&
        (console.log(res.data.success), showToast("error", res.data.message));
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
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-70 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="modal flex flex-col rounded border-2 border-gray-500 bg-gray-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-3xl font-semibold text-red-700">
                    DELETE ACCOUNT
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className="text-blueGray-500 my-4 text-lg leading-relaxed">
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
                      className="mb-1 h-10 w-full appearance-none rounded bg-gray-700 py-2 px-3 leading-tight text-gray-300 focus:border-transparent focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-between rounded-b border-t border-solid p-4">
                  <button
                    className="mr-1 mb-1 rounded bg-green-700 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={deleteAccount}
                  >
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
