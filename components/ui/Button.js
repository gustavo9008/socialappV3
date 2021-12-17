import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const { label, className, handleClick } = props;
  return (
    <>
      <button className={`mr-4 ml-4 my-4 ${className}`} onClick={handleClick}>
        {label}
      </button>
    </>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default Button;
