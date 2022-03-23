import React from "react";
import Toast from "../ui/Toast";

import styles from "../ui/Footer.module.css";
import { appToastContext } from "context/state";

// const BUTTON_PROPS = [
//   {
//     id: 1,
//     type: "success",
//     className: styles.success,
//     label: "Success",
//   },
//   {
//     id: 2,
//     type: "danger",
//     className: styles.danger,
//     label: "Danger",
//   },
//   {
//     id: 3,
//     type: "info",
//     className: styles.info,
//     label: "Info",
//   },
//   {
//     id: 4,
//     type: "warning",
//     className: styles.warning,
//     label: "Warning",
//   },
// ];

export default function Footer(props) {
  const { list } = React.useContext(appToastContext);
  // console.log(list);
  // const [list, setList] = React.useState([]);
  const [position, setPosition] = React.useState();
  let toastProperties = null;
  // const selectPosition = (event) => {
  //   setPosition(event.target.value);
  //   setList([]);
  // };
  // const testList = [
  //   {
  //     id: 1,
  //     title: "Success",
  //     description: "This is a success toast component",
  //     backgroundColor: "#5cb85c",
  //     icon: checkIcon,
  //   },
  //   {
  //     id: 2,
  //     title: "Error",
  //     description: "This is an error toast component",
  //     backgroundColor: "#d9534f",
  //     icon: errorIcon,
  //   },
  //   {
  //     id: 3,
  //     title: "Info",
  //     description: "This is an info toast component",
  //     backgroundColor: "#5bc0de",
  //     icon: infoIcon,
  //   },
  //   {
  //     id: 4,
  //     title: "Warning",
  //     description: "This is a warning toast component",
  //     backgroundColor: "#f0ad4e",
  //     icon: warningIcon,
  //   },
  // ];
  // const showToast = (type) => {
  //   const id = Math.floor(Math.random() * 100 + 1);
  //   switch (type) {
  //     case "success":
  //       toastProperties = {
  //         id,
  //         title: "Success",
  //         description: "This is a success toast component",
  //         backgroundColor: "#5cb85c",
  //         icon: checkIcon,
  //       };
  //       break;
  //     case "danger":
  //       toastProperties = {
  //         id,
  //         title: "Error",
  //         description: "This is an error toast component",
  //         backgroundColor: "#d9534f",
  //         icon: errorIcon,
  //       };
  //       break;
  //     case "info":
  //       toastProperties = {
  //         id,
  //         title: "Info",
  //         description: "This is an info toast component",
  //         backgroundColor: "#5bc0de",
  //         icon: infoIcon,
  //       };
  //       break;
  //     case "warning":
  //       toastProperties = {
  //         id,
  //         title: "Error",
  //         description: "This is a warning toast component",
  //         backgroundColor: "#f0ad4e",
  //         icon: warningIcon,
  //       };
  //       break;
  //     default:
  //       setList([]);
  //   }
  //   setList([...list, toastProperties]);
  // };
  return (
    <footer className={`${styles.app}`}>
      <section className="">
        <div className="mx-auto max-w-screen-xl space-y-8 overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base leading-6 text-gray-400">
            © 2021 Created by Gustavo Ayala. All rights reserved.
          </p>
        </div>
      </section>
      <div>
        {/* <p>React Toast Component</p>
        <div className={`${styles.toastButtons}`}>
          {BUTTON_PROPS.map((e) => (
            <Button
              key={e.id}
              className={e.className}
              label={e.label}
              handleClick={() => showToast(e.type)}
            />
          ))}
        </div>
        <div className={`${styles.select}`}>
          <select
            name="position"
            value={position}
            onChange={selectPosition}
            className={`${styles.positionSelect}`}
          >
            <option>Select Position</option>
            <option value="topRight">Top Right</option>
            <option value="topLeft">Top Left</option>
            <option value="bottomLeft">Bottom Left</option>
            <option value="bottomRight">Bottom Right</option>
          </select>
        </div> */}

        <Toast
          toastList={list}
          position={"bottomRight"}
          autoDelete={true}
          autoDeleteTime={4000}
        />
      </div>
    </footer>
  );
}
