import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold " +
        "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50  cursor-pointer " +
        "transition shadow-sm hover:shadow-md " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
