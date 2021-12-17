import React, { useState } from "react";
import useFetch from "@/hooks/fetch";
import checkIcon from "../styles/assets/check.svg";
import errorIcon from "../styles/assets/error.svg";
import infoIcon from "../styles/assets/info.svg";
import warningIcon from "../styles/assets/warning.svg";

export const appToastContext = React.createContext(null);

export function ToastWrapper(props) {
  const [list, setList] = React.useState([]);

  let toastProperties = null;

  const showToast = (type, description) => {
    const id = Math.floor(Math.random() * 100 + 1);
    switch (type) {
      case "success":
        toastProperties = {
          id,
          title: "Success",
          description: description,
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "error":
        toastProperties = {
          id,
          title: "Error",
          description: description,
          backgroundColor: "#d9534f",
          icon: errorIcon,
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
    <appToastContext.Provider value={{ list, setList, showToast, useFetch }}>
      {props.children}
    </appToastContext.Provider>
  );
}
