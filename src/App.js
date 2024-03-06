import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";
import AudioTimeline from "./components/AudioTimeline";

function App() {
  const [tracks, setTracks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    let newTracks = acceptedFiles.map((file) => ({
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    newTracks = newTracks.filter((file) => {
      return file.type.includes("audio");
    });
    if (!newTracks.length) {
      setErrorMessage("Upload a valid audio file");
    }
    setTracks([...tracks, ...newTracks]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "audio/*",
  });
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <div className="App">
      <h1>Audio Pill Player</h1>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} accept="audio/*" />
        <p>Drag and drop some audio files here, or click to select files</p>
      </div>
      {errorMessage && (
        <div className="error-toast">
          <p>{errorMessage}</p>
        </div>
      )}
      <AudioTimeline tracks={tracks} setTracks={setTracks} />
    </div>
  );
}

export default App;
