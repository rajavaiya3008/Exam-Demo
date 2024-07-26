import React from "react";

const btnStyle = 'bg-[#7747ff] mx-auto px-6 py-2 rounded text-white text-sm font-normal flex justify-center'


const Button = ({ children,onSubmit,disable,style,customStyle }) => {
  return (
    <button
      onClick={onSubmit}
      disabled={disable}
      className={`${customStyle?`${customStyle}`:`${btnStyle}`} ${
        disable && "opacity-50 cursor-not-allowed"
      } ${style}`}
    >
      {children}
    </button>
  );
};

export default Button;
