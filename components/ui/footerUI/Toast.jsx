import React, { useState, useEffect } from "react";
import styles from "./Toast.module.css";
import PropTypes from "prop-types";

const Toast = (props) => {
  const { toastList, position, autoDelete, autoDeleteTime } = props;
  // console.log(toastList);
  const [list, setList] = useState(toastList);
  // console.log("toastList", toastList);
  // console.log("list", list);
  let classStyle;
  switch (position) {
    case "bottomRight":
      classStyle = styles.bottomRight;
      break;
    case "bottomLeft":
      classStyle = styles.bottomLeft;
      break;
    case "topLeft":
      classStyle = styles.topLeft;
      break;
    case "topRight":
      classStyle = styles.topRight;
      break;

    default:
      classStyle = styles.bottomRight;
      break;
  }

  const deleteToast = React.useCallback(
    (id) => {
      // console.log(id);
      const index = list.findIndex((e) => e.id === id);
      // console.log(index);
      list.splice(index, 1);
      // console.log(list);
      // const toastListItem = toastList.findIndex((e) => e.id === id);
      // console.log(toastListItem);
      // console.log(toastList);
      // toastList.splice(toastListItem, 1);
      setList([...list]);
    },
    [list, setList]
  );
  //===== set list for toast =====
  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  //===== auto delete toast =====
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);
    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list, deleteToast]);
  //===== delete toast with btn =====

  return (
    <>
      <div
        className={`Psm:w-full Psm:bottom-1 Psm:right-[0px] ${styles.notificationContainer} ${classStyle}`}
      >
        {list.map((toast, i) => (
          <div
            key={i}
            id={toast.id}
            role="alert"
            className={`Psm:ml-[5px] Psm:mr-[5px] flex flex-row items-center justify-between rounded text-white ${classStyle}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <section className="flex flex-row py-4 pl-4">
              {toast.icon}

              <p className="ml-3 font-bold"> {toast.description}</p>
            </section>

            <footer className="px-4">
              <button onClick={() => deleteToast(toast.id)}>X</button>
            </footer>
          </div>
        ))}
      </div>
    </>
  );
};
Toast.defaultProps = {
  position: "bottomRight",
};
Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
};
export default Toast;
