import React from "react";

const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        className={
          "w-full rounded-md border bg-slate-800/60 px-3 py-2 text-sm " +
          "border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 " +
          "placeholder:text-slate-500 " +
          className
        }
        {...props}
      />
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
};

export default Input;
