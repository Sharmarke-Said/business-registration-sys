import React from "react";

const Input = React.forwardRef(
  ({ type = "text", placeholder, className = "", ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${className}`}
        {...props}
      />
    );
  }
);

export default Input;
