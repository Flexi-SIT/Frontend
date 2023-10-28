import React, { useState, useEffect } from "react";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException,
  DecodeHintType,
  BarcodeFormat,
} from "@zxing/library";
import "./BarcodeScan.css";

export default function () {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [code, setCode] = useState("");
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [matchingPrn, setMatchingPrn] = useState(null);
  const [loggedInPrn, setLoggedInPrn] = useState(null);
  const hints = new Map();
  const formats = [
    BarcodeFormat.ITF,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_128,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
  ];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  hints.set(DecodeHintType.TRY_HARDER, true);
  const codeReader = new BrowserMultiFormatReader(hints);

  console.log("ZXing code reader initialized");

  useEffect(() => {
    codeReader
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        setupDevices(videoInputDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function setupDevices(videoInputDevices) {
    const sourceSelect = document.getElementById("sourceSelect");

    // selects first device
    setSelectedDeviceId(videoInputDevices[0].deviceId);

    // setup devices dropdown
    if (videoInputDevices.length >= 1) {
      setVideoInputDevices(videoInputDevices);
    }
  }

  function resetClick() {
    codeReader.reset();
    setCode("");
    console.log("Reset.");
  }

  // function sendCodeForMatching(code) {
  //   console.log("QR Code Content:", code);
  //   fetch("http://localhost:3001/api/barcode-scan", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ code }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.matched) {
  //         console.log("Matched with PRN:", data.prn);

  //         setMatchingPrn(data.prn);
  //       } else {
  //         console.log("No matching PRN found");

  //         setMatchingPrn(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //     });
  // }

  console.log("PRN value before useEffect", loggedInPrn);

  useEffect(() => {
    fetch("http://localhost:3001/api/recent-prn")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server response not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const mostRecentPrnFromServer = data.prn;
        console.log("most recent", mostRecentPrnFromServer);
        setLoggedInPrn(mostRecentPrnFromServer);
        console.log("After setting loggedInPrn:", loggedInPrn);
      })
      .catch((error) => {
        console.error("Error fetching PRN from server", error);
      });
  }, [loggedInPrn]);

  console.log("PRN value after function", loggedInPrn);

  function decodeContinuously(selectedDeviceId) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      "video",
      (result, err) => {
        if (result) {
          // properly decoded qr code
          console.log("Found QR code!", result);
          setCode(result.text);
          console.log("Result in decode", loggedInPrn);
          sendCodeForMatching(result.text);
        }

        if (err) {
          setCode("");
          console.error(err);
        }
      }
    );
  }
  useEffect(() => {
    // Call sendCodeForMatching here after loggedInPrn is fetched
    sendCodeForMatching(code);
  }, [loggedInPrn, code]);
  function sendCodeForMatching(code) {
    console.log("QR Code Content:", code);
    console.log("Logged In PRN:", loggedInPrn);

    if (loggedInPrn !== null) {
      if (code === loggedInPrn) {
        console.log("PRN Matched:", code);
        setMatchingPrn(code);
      } else {
        console.log("PRN did not match.");
        setMatchingPrn(null);
      }
    } else {
      console.log("Logged In PRN is null. Waiting for server response...");
    }
  }

  useEffect((deviceId) => {
    decodeContinuously(selectedDeviceId);
    console.log(`Started decode from camera with id ${selectedDeviceId}`);
  }, []);

  return (
    <main class="wrapper">
      <section className="barcode-scan-container" id="demo-content">
        <div id="sourceSelectPanel">
          <label for="sourceSelect">Change video source:</label>
          <select
            id="sourceSelect"
            // eslint-disable-next-line no-undef
            onChange={() => setSelectedDeviceId(sourceSelect.value)}
          >
            {videoInputDevices.map((element) => (
              <option value={element.deviceId}>{element.label}</option>
            ))}
          </select>
        </div>

        <div>
          <video id="video" width="100%" height="720px" />
        </div>

        <label>Result:</label>
        <pre>
          <code id="result">{code}</code>
        </pre>

        <button id="resetButton" onClick={() => resetClick()}>
          Reset
        </button>
        <br />
        <label>Matching PRN: </label>
        <div>{matchingPrn}</div>
      </section>
    </main>
  );
}
