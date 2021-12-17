import React, { useState, useEffect } from "react";
import styles from "./Toast.module.css";
import PropTypes from "prop-types";

const Toast = (props) => {
  const { toastList, position, autoDelete, autoDeleteTime } = props;
  const [list, setList] = useState(toastList);
  // console.log(styles.position);
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
  }, [toastList, autoDelete, autoDeleteTime, list]);
  //===== delete toast with btn =====
  const deleteToast = (id) => {
    const index = list.findIndex((e) => e.id === id);
    list.splice(index, 1);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  return (
    <>
      <div className={`${styles.notificationContainer} ${classStyle}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`${styles.notification} ${styles.toast} ${classStyle}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div className={`${styles.notificationImage}`}>
              <img src={toast.icon.src} alt="" />
            </div>
            <div>
              <p className={`${styles.notificationTitle}`}>{toast.title}</p>
              <p className={`${styles.notificationMessage}`}>
                {toast.description}
              </p>
            </div>
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
