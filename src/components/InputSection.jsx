import React from "react";

const InputSection = ({ inputs, onInputChange }) => {
    
  const handleFileChange = (index, event) => {
    const file = event.target.files ? event.target.files[0] : null;
    onInputChange(index, file);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {inputs.map((input, index) => (
        <div key={index} className="flex flex-col">
          <label htmlFor={`input-${index}`} className="mb-2 font-semibold">
            Lane {index + 1} Input:
          </label>
          <input
            type="file"
            id={`input-${index}`}
            onChange={(e) => handleFileChange(index, e)}
            accept="image/*,video/*"
            className="border border-gray-300 rounded p-2"
          />
          {input && <p className="mt-2 text-sm text-gray-600">{input.name}</p>}
        </div>
      ))}
    </div>
  );
};

export default InputSection;
