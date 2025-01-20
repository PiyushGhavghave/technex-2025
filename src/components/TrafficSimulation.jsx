import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TrafficLight from "./TrafficLight";

const RenderCarsleft = ({ count }) => {
  const carDivs = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="w-4 h-6">
      <img src="greencar-removebg-preview.png" alt={`Car ${index + 1}`} className="w-full h-full object-cover" />
    </div>
  ));

  return (
    <div className="grid grid-rows-3 grid-flow-col w-40 gap-1 ml-20">
      {carDivs}
    </div>
  );
};

const RenderCarsRighht = ({ count }) => {
    const carDivs = Array.from({ length: count }).map((_, index) => (
        <div key={index} className=" w-4 h-6">
        <img src="redcar-removebg-preview.png" alt={`Car ${index + 1}`} className="w-full h-full object-cover" />
      </div>
    ));
  
    return (
      <div className="grid grid-rows-3 grid-flow-col-dense gap-1 ml-[450px] mr-36">
        {carDivs}
      </div>
    );
  };

const RenderCarsRighhtAnimated = ({ count }) => {
    const carDivs = Array.from({ length: count }).map((_, index) => {
      return (
        <motion.div
          key={index}
          className="w-4 h-6"
          animate={{ x: -800 }} // Moves all cars to the left by 400px
          transition={{ duration: 5 }}
        >
          <img
            src="redcar-removebg-preview.png"
            alt={`Car ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      );
    });
  
    return (
      <div className="grid grid-rows-3 grid-flow-col-dense gap-1 ml-[450px] mr-36">
        {carDivs}
      </div>
    );
  };
  

const RenderCardBottom = ({ count }) => {
  const carDivs = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="w-4 h-6">
      <img src="whitecar-removebg-preview.png" alt={`Car ${index + 1}`} className="w-full h-full object-cover" />
    </div>
  ));

  return (
    <div className="grid grid-cols-3 grid-flow-row h-auto gap-1 mr-24 mt-10">
      {carDivs}
    </div>
  );
};

const RenderCarsTop = ({ count }) => {
  const carDivs = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="w-4 h-6">
      <img src="yellocar-removebg-preview.png" alt={`Car ${index + 1}`} className="w-full h-full object-cover" />
    </div>
  ));

  return (
    <div className="grid grid-cols-3 grid-flow-row h-auto gap-1 ml-24 mt-10">
      {carDivs}
    </div>
  );
};

const TrafficSimulation = (props) => {
  const [lightTimers, setLightTimers] = useState([30, 30, 30, 30]);

const vehicle_data=props.vehicle_data
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
      <div className="absolute left-1/2 top-0 bottom-0 w-40 bg-gray-600 transform -translate-x-1/2">
        {/* cars top */}
        <RenderCarsTop count={10} />

        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 transform -translate-x-1/2"></div>
        <RenderCardBottom count={20} />
      </div>

      {/* Horizontal road */}
      <div className="absolute top-1/2 left-0 right-0 h-40 bg-gray-600 transform -translate-y-1/2">
        {/* Cars left */}
        <RenderCarsleft count={20} />
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 transform -translate-y-1/2"></div>
        <RenderCarsRighht count={20} />
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
