import React from "react";

const TrafficLight = ({ position, timer }) => {
  const isGreen = timer > 15;

  const positionClasses = {
    top: "top-0 right-1/2 transform translate-x-full -translate-y-1/2",
    right: "right-0 top-1/2 transform translate-x-1/2 translate-y-full",
    bottom: "bottom-0 left-1/2 transform -translate-x-full translate-y-1/2",
    left: "left-0 bottom-1/2 transform -translate-x-1/2 -translate-y-full",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} w-8 h-16 bg-gray-800 rounded flex flex-col justify-around items-center z-10`}
    >
      <div className={`w-6 h-6 rounded-full ${isGreen ? "bg-gray-500" : "bg-red-500"}`}></div>
      <div className={`w-6 h-6 rounded-full ${isGreen ? "bg-green-500" : "bg-gray-500"}`}></div>
      <div className="text-white text-xs">{timer}</div>
    </div>
  );
};

export default TrafficLight;
