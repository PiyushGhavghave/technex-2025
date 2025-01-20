import React, { useState, useEffect } from "react";
import TrafficLight from "./TrafficLight";

const TrafficSimulation = ({ vehicle_data }) => {
  const calculateTimer = (count) => {
    if (count < 5) return 10;
    if (count < 10) return 20;
    if (count < 15) return 30;
    if (count < 20) return 50;
    if (count < 30) return 70;
    return 90;
  };

  const [activeLightIndex, setActiveLightIndex] = useState(0); // Active light (0: top, 1: right, 2: bottom, 3: left)
  const [lightTimers, setLightTimers] = useState(() =>
    vehicle_data.map((count) => calculateTimer(count))
  );
  const [currentTimer, setCurrentTimer] = useState(lightTimers[0]); // Timer for the active light

  const [laneOneTimer, setlaneOneTimer] = useState(0)
  const [laneTwoTimer, setlaneTwoTimer] = useState(lightTimers[0])
  const [laneThreeTimer, setlaneThreeTimer] = useState(lightTimers[0]+lightTimers[1])
  const [laneFourTimer, setlaneFourTimer] = useState(lightTimers[0]+lightTimers[1]+lightTimers[2])

  useEffect(() => {
    const interval = setInterval(() => {
      if(laneOneTimer > 0 ){
        setlaneOneTimer((prev) => prev - 1);
      }
      if(laneTwoTimer > 0){
        setlaneTwoTimer((prev) => prev - 1);
      }
      if(laneThreeTimer > 0 ){
        setlaneThreeTimer((prev) => prev - 1);
      }
      if(laneFourTimer > 0){
        setlaneFourTimer((prev) => prev - 1);
      }
      
      if (currentTimer > 0) {
        setCurrentTimer((prev) => prev - 1);
      } else {
        // Move to the next light
        setActiveLightIndex((prevIndex) => (prevIndex + 1) % 4);
        setCurrentTimer(lightTimers[(activeLightIndex + 1) % 4]); // Update timer for the next light
      }
    }, 1000);

    return () => clearInterval(interval); 
  }, [currentTimer, lightTimers, activeLightIndex]);

  useEffect(() => {
    // Recalculate timers dynamically if `vehicle_data` changes
    setLightTimers(vehicle_data.map((count) => calculateTimer(count)));
  }, [vehicle_data]);

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
      <TrafficLight
        position="top"
        timer={activeLightIndex === 0 ? currentTimer : laneOneTimer}
        isGreen={activeLightIndex === 0}
      />
      <TrafficLight
        position="right"
        timer={activeLightIndex === 1 ? currentTimer : laneTwoTimer}
        isGreen={activeLightIndex === 1}
      />
      <TrafficLight
        position="bottom"
        timer={activeLightIndex === 2 ? currentTimer : laneThreeTimer}
        isGreen={activeLightIndex === 2}
      />
      <TrafficLight
        position="left"
        timer={activeLightIndex === 3 ? currentTimer : laneFourTimer}
        isGreen={activeLightIndex === 3}
      />
    </div>
  );
};

export default TrafficSimulation;
