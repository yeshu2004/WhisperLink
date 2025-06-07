import { useState, useRef, useEffect } from "react";
import axios from "axios";

function AudioRecorder({ owner }) {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/mp4" });
      setAudioBlob(blob);
      setTimer(0);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const uploadToS3 = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/audio/generate-upload-url",
        { owner }
      );

      // eslint-disable-next-line no-unused-vars
      const { url, key } = res.data;

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "audio/mp4" },
        body: audioBlob,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed with status ${uploadRes.status}`);
      }

      alert("Upload successful!");
      setAudioBlob(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert(`Upload failed: ${err.message || "Unknown error"}`);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setTimer(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] bg-black text-white w-1/2">
      <div className="mb-6 text-2xl font-mono">{formatTime(timer)}</div>

      {!recording && !audioBlob && (
        <button
          onClick={startRecording}
          className="bg-red-600 w-20 h-20 rounded-full shadow-lg animate-pulse hover:scale-105 transition"
        >
          <div className="w-4 h-4 mx-auto my-auto rounded-full bg-white mt-6"></div>
        </button>
      )}

      {recording && (
        <button
          onClick={stopRecording}
          className="w-20 h-20 bg-white text-red-600 rounded-full shadow-xl hover:scale-105 transition flex items-center justify-center"
        >
          ⏹
        </button>
      )}

      <p className="mt-4 text-gray-400">
        {recording
          ? "Recording..."
          : audioBlob
          ? "Here's your recording"
          : "Tap to record"}
      </p>

      {audioBlob && (
        <div className="mt-6 text-center flex flex-col items-center justify-center">
          <audio
            controls
            src={URL.createObjectURL(audioBlob)}
            className="w-64 mt-2 rounded-lg"
          />
          <div className="mt-4 flex items-center gap-4 justify-center">
            <button
              onClick={uploadToS3}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Share Anonymously
            </button>
            <button
              onClick={resetRecording}
              className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
            >
              Record Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
