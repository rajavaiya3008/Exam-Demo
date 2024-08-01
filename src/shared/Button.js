import React from "react";

const btnStyle = 'bg-[#7747ff] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center'


const Button = ({ children,onSubmit,disable,cusStyle,customStyle,type }) => {
  return (
    <button
      onClick={onSubmit}
      disabled={disable}
      type={type}
      className={`${customStyle?`${customStyle}`:`${btnStyle}`} ${
        disable && "opacity-50 cursor-not-allowed"
      } ${cusStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
