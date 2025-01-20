import React from "react";

const ProcessButton = ({ onClick, disabled }) => {
  return (
    <button
      className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      Process
    </button>
  );
};

export default ProcessButton;
