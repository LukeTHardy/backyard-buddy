import { useState, useEffect } from "react";

export const CustomFileInput = ({ label, onChange, existingFileName }) => {
  const [fileName, setFileName] = useState(
    existingFileName || "No file chosen"
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : existingFileName || "No file chosen");
    onChange(file); // Pass the selected file to the parent component if needed
  };

  useEffect(() => {
    // Update the file name if the existing file name changes
    setFileName(existingFileName || "No file chosen");
  }, [existingFileName]);

  return (
    <div className="custom-file-input">
      <label>{label}</label>
      <div className="file-input-container">
        <input type="file" id={label} onChange={handleFileChange} />
        <span>{fileName}</span>
        <button>Browse</button>
      </div>
    </div>
  );
};
