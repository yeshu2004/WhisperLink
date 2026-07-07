import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Mic,
  Square,
  Upload,
  RotateCcw,
  Loader2,
} from "lucide-react";

function AudioRecorder({ owner, ownerId, linkName }) {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [uploading, setUploading] = useState(false);

  const audioChunksRef = useRef([]);

  useEffect(() => {
    let interval;

    if (recording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recorder = new MediaRecorder(stream);

      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/mp4",
        });

        setAudioBlob(blob);
        setTimer(0);

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();

      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const uploadToS3 = async () => {
    try {
      setUploading(true);

      const res = await axios.get(
        "http://localhost:8000/api/audio/generate-upload-url",
        {
          params: {
            owner,
            ownerId,
            linkName,
          },
        }
      );

      const { url } = res.data;

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "audio/mp4",
        },
        body: audioBlob,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      alert("Whisper shared successfully!");

      setAudioBlob(null);
      setTimer(0);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setTimer(0);
  };

  return (
    <div className="flex flex-col items-center">

      {/* Timer */}

      <h1 className="mb-6 font-mono text-5xl font-bold tracking-widest text-zinc-800">
        {formatTime(timer)}
      </h1>

      {/* Recording Button */}

      {!recording && !audioBlob && (
        <>
          <button
            onClick={startRecording}
            className="group flex h-28 w-28 items-center justify-center rounded-full bg-red-500 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-red-600"
          >
            <Mic
              size={38}
              className="group-hover:scale-110 transition"
            />
          </button>

          <p className="mt-5 text-sm text-zinc-500">
            Tap the microphone to start recording.
          </p>
        </>
      )}

      {/* Recording */}

      {recording && (
        <>
          <button
            onClick={stopRecording}
            className="flex h-28 w-28 animate-pulse items-center justify-center rounded-full bg-black text-white shadow-xl transition hover:scale-105"
          >
            <Square fill="white" size={34} />
          </button>

          <p className="mt-5 font-medium text-red-500">
            Recording...
          </p>
        </>
      )}

      {/* Preview */}

      {audioBlob && (
        <div className="mt-10 w-full max-w-lg rounded-2xl border border-zinc-200 bg-zinc-50 p-6">

          <h3 className="mb-4 text-lg font-semibold">
            Preview Recording
          </h3>

          <audio
            controls
            src={URL.createObjectURL(audioBlob)}
            className="w-full"
          />

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={uploadToS3}
              disabled={uploading}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Share Whisper
                </>
              )}
            </button>

            <button
              onClick={resetRecording}
              disabled={uploading}
              className="flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 transition hover:bg-zinc-100"
            >
              <RotateCcw size={18} />
              Record Again
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;