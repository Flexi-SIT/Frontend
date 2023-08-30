import React, { useState } from "react";
import BarcodeScannerComponent from "./BarcodeScan"; // Assuming the BarcodeScannerComponent is in a separate file

function BarcodeScannerApp() {
  const [scannedData, setScannedData] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = (_, result) => {
    if (result) {
      setScannedData(result.getText());
      setError("");
    }
  };

  const handleError = (err) => {
    setError(err.message || "An error occurred while scanning.");
  };

  return (
    <div>
      <h1>Barcode Scanner App</h1>
      <BarcodeScannerComponent
        onUpdate={handleUpdate}
        onError={handleError}
      />
      <div>
        <h2>Scanned Data:</h2>
        {scannedData && <p>{scannedData}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default BarcodeScannerApp;
