import React, { useState } from "react";
import InputSection from "./components/InputSection";
import ProcessButton from "./components/ProcessButton";
import TrafficSimulation from "./components/TrafficSimulation";

const App = () => {
  const [inputs, setInputs] = useState(Array(4).fill(null));
  const [isSimulating, setIsSimulating] = useState(false);

  const handleInputChange = (index, file) => {
    const newInputs = [...inputs];
    newInputs[index] = file;
    setInputs(newInputs);
  };

  const handleProcess = () => {
    setIsSimulating(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Traffic Management System</h1>
      <InputSection inputs={inputs} onInputChange={handleInputChange} />
      <div className="max-w-md mx-auto mb-8">
        <ProcessButton onClick={handleProcess} disabled={inputs.some((input) => !input)} />
      </div>
      {isSimulating && <TrafficSimulation />}
    </div>
  );
};

export default App;
