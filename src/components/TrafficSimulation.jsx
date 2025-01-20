import React, { useState, useEffect } from "react";
import TrafficLight from "./TrafficLight";

const TrafficSimulation = () => {
  const [lightTimers, setLightTimers] = useState([30, 30, 30, 30]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLightTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer === 0) {
            // Simulate dynamic adjustment based on traffic
            return Math.floor(Math.random() * 20) + 20;
          }
          return timer - 1;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl h-[32rem] mx-auto mt-8 bg-gray-200 border border-gray-300">
      {/* Vertical road */}
      <div className="absolute left-1/2 top-0 bottom-0 w-32 bg-gray-600 transform -translate-x-1/2">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 transform -translate-x-1/2"></div>
      </div>
      {/* Horizontal road */}
      <div className="absolute top-1/2 left-0 right-0 h-32 bg-gray-600 transform -translate-y-1/2">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 transform -translate-y-1/2"></div>
      </div>
      {/* Traffic lights */}
      <TrafficLight position="top" timer={lightTimers[0]} />
      <TrafficLight position="right" timer={lightTimers[1]} />
      <TrafficLight position="bottom" timer={lightTimers[2]} />
      <TrafficLight position="left" timer={lightTimers[3]} />
    </div>
  );
};

export default TrafficSimulation;
