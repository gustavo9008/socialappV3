import React from "react";
import { useSession } from "next-auth/react";
import useFetch from "@/hooks/fetch";
import checkIcon from "../styles/assets/check.svg";
import errorIcon from "../styles/assets/error.svg";
import infoIcon from "../styles/assets/info.svg";
import warningIcon from "../styles/assets/warning.svg";

export const appToastContext = React.createContext(null);

export function ToastWrapper(props) {
  // const { data: session, status } = useSession();
  console.log("toast is running");
  const [list, setList] = React.useState([]);
  const [userSession, setUserSession] = React.useState(null);
  const [statusAuth, setStatusAuth] = React.useState(null);
  // console.log(userSession);
  const setTokenRefreshInterval = props.setRefreshInterval;

  let toastProperties = null;
  // React.useEffect(() => {
  //   setUserSession(session);
  //   console.log(userSession);
  // }, [session, userSession]);

  const showToast = (type, description) => {
    const id = Math.floor(Math.random() * 100 + 1);
    // console.log(id);
    switch (type) {
      case "success":
        toastProperties = {
          id,
          title: "Success",
          description: description,
          backgroundColor: "#16A34A",
          icon: (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
        break;
      case "error":
        toastProperties = {
          id,
          title: "Error",
          description: description,
          backgroundColor: "#DC2626",
          icon: (
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
        break;
      case "info":
        toastProperties = {
          id,
          title: "Info",
          description: description,
          backgroundColor: "#5bc0de",
          icon: infoIcon,
        };
        break;
      case "warning":
        toastProperties = {
          id,
          title: "Warning",
          description: description,
          backgroundColor: "#f0ad4e",
          icon: warningIcon,
        };
        break;
      default:
        setList([]);
    }
    setList([...list, toastProperties]);
  };

  return (
    <appToastContext.Provider
      value={{
        list,
        showToast,
        useFetch,
        userSession,
        setUserSession,
        setTokenRefreshInterval,
        statusAuth,
        setStatusAuth,
      }}
    >
      {props.children}
    </appToastContext.Provider>
  );
}
