import React, { useState } from "react";
import BarcodeScannerComponent from "./BarcodeScan"; // Assuming the BarcodeScannerComponent is in a separate file
import "./BarcodeScanApp.css";

function BarcodeScannerApp() {
  const [scannedData, setScannedData] = useState("");
  const [isScanned, setIsScanned] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = (_, result) => {
    if (result) {
      setScannedData(result.getText());
      setError("");
      setIsScanned(true);
    }
  };

  const handleError = (err) => {
    setError(err.message || "An error occurred while scanning.");
  };

  return (
    <div className="app-container">
      <h1>Barcode Scanner App</h1>
      <div className="scanner-container">
        <BarcodeScannerComponent
          onUpdate={handleUpdate}
          onError={handleError}
        />
      </div>
      <div className="result-container">
        <h2>Scanned Data:</h2>
        {scannedData && <p className="scanned-data">{scannedData}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default BarcodeScannerApp;
