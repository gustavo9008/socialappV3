import React from "react";

export default function useBtnState(initState) {
  const [btnDisabled, setBtnDisabled] = React.useState(initState);

  const stopBtnAnimate = (idTag) => {
    document.querySelector(`#${idTag}`).classList.remove("animate-spin");
    document.querySelector(`#${idTag}`).style.display = "none";
  };

  return [btnDisabled, setBtnDisabled, stopBtnAnimate];
}
