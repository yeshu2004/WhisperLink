import axios from "axios";
import { useState, useEffect } from "react";
import { Mic } from "lucide-react";

function ListAudioMsg() {
  const [audioNotes, setAudioNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAudiMsg() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/audio/allWispers",
          { withCredentials: true }
        );
        setAudioNotes(() => res.data);
      } catch (error) {
        console.error("Error fetching audio notes", error);
      } finally {
        setLoading(false);
      }
    }
    getAudiMsg();
  }, []);

  if (loading) {
    return (
      <div className="mt-4 space-y-3 w-full max-w-md">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-16 rounded-xl bg-zinc-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (audioNotes.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-8 text-center w-full max-w-md">
        <Mic className="h-5 w-5 text-zinc-400" strokeWidth={1.5} />
        <p className="text-sm text-zinc-500">No whispers yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 max-h-80 overflow-y-auto space-y-2 w-full max-w-md pr-1">
      {audioNotes.map((note) => (
        <div
  key={note.id}
  className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:bg-white"
>
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
    <Mic size={18} />
  </div>

  <div className="flex-1">
    <audio
      controls
      src={note.url}
      className="w-full"
    />

    <p className="mt-2 text-xs text-zinc-400">
      {new Date(note.createdAt).toLocaleString()}
    </p>
  </div>
</div>
      ))}
    </div>
  );
}

export default ListAudioMsg;