import React, { useState } from "react";
import InputSection from "./components/InputSection";
import ProcessButton from "./components/ProcessButton";
import TrafficSimulation from "./components/TrafficSimulation";
import axios from "axios";

const App = () => {
    const [inputs, setInputs] = useState(Array(4).fill(null));
    const [isSimulating, setIsSimulating] = useState(false);
    const [vehicleCount,setVehicleCount]=useState([])

    const handleInputChange = (index, file) => {
        const newInputs = [...inputs];
        newInputs[index] = file;
        setInputs(newInputs);
    };

    const handleProcess = async () => {
        console.log(inputs);
        const formData = new FormData();
        inputs.forEach((file) => {
            formData.append("image", file);
        });
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log(response.data);
            setVehicleCount(response.data.vehicle_counts)
            
        } catch (error) {
            console.log(error);
        }
        setIsSimulating(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Traffic Management System
            </h1>
            <InputSection inputs={inputs} onInputChange={handleInputChange} />
            <div className="max-w-md mx-auto mb-8">
                <ProcessButton
                    onClick={handleProcess}
                    disabled={inputs.some((input) => !input)}
                />
            </div>
            {isSimulating && <TrafficSimulation vehicle_data={vehicleCount}/>}
        </div>
    );
};

export default App;
