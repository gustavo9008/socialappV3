import React from "react";
import PropTypes from "prop-types";

// export const stopBtnAnimate = (idTag) => {
//   document.querySelector(`#${idTag}`).classList.remove("animate-spin");
//   document.querySelector(`#${idTag}`).style.display = "none";
// };
export function useBtnState(initState, initLabel, initColor, initVisibility) {
  const [btnDisabled, setBtnDisabled] = React.useState(initState);
  const [label, setLabel] = React.useState(initLabel);
  const [btnColor, setBtnColor] = React.useState(initColor);
  const [btnVisibility, setBtnVisibility] = React.useState(initVisibility);

  const stopBtnAnimate = React.useCallback((idTag) => {
    document.querySelector(`#${idTag}`).classList.remove("animate-spin");
    document.querySelector(`#${idTag}`).style.display = "none";
  }, []);

  return [
    btnDisabled,
    setBtnDisabled,
    stopBtnAnimate,
    label,
    setLabel,
    btnColor,
    setBtnColor,
    btnVisibility,
    setBtnVisibility,
  ];
}

// let stateOjb = {};

const Button = (props) => {
  const { className, label, handleClick, disabled, idTag, btnType, icon } =
    props;
  const [btnDisabled, setBtnDisabled] = React.useState(true);

  function btnAnimate() {
    document.querySelector(`#${idTag}`).classList.add("animate-spin");
    document.querySelector(`#${idTag}`).style.display = "inline-block";
    // document.querySelector("#postText").style.display = "none";
    // document.querySelector("#postingText").style.display = "inline";
  }

  const handleBtnClick = (e) => {
    e.preventDefault();
    if (btnType !== "CANCEL") {
      btnAnimate();
    }

    handleClick(e);
  };

  return (
    <>
      <button
        disabled={disabled}
        className={`${className}`}
        onClick={handleBtnClick}
      >
        {icon && icon}
        {btnType !== "CANCEL" && (
          <svg
            id={idTag}
            className="-ml-1 mr-3 h-5 w-5 text-white"
            viewBox="0 0 24 24"
            style={{ display: "none" }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        <span id="postingText">{label}</span>

        {/* <span id="postText">{label}</span> */}
      </button>
    </>
  );
};

// Button.propTypes = {
//   label: PropTypes.string.isRequired,
//   className: PropTypes.string.isRequired,
//   handleClick: PropTypes.func,
//   disabled: PropTypes.bool,
//   idTag: PropTypes.string.isRequired,
// };

export default Button;
