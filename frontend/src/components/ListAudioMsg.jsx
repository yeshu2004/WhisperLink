import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function ListAudioMsg() {
  const [audioNotes, setAudioNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAudiMsg() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/audio/allWispers",{
            withCredentials: true,
          }
        );
        setAudioNotes(() => res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching audio notes", error);
      } finally {
        setLoading(false);
      }
    }
    getAudiMsg();
  }, []);
  if (loading) {
    return <div className="p-4">Loading....</div>;
  }

  return(
    <div className="mt-4 max-h-80 overflow-y-auto space-y-3 w-fit">
      {audioNotes.map((note) => (
        <div
          key={note.id}
          className="bg-zinc-100 border border-zinc-300 rounded-lg p-2 flex items-center gap-4 shadow-sm"
        >
          <audio
            controls
            src={note.url}
            className="w-full max-w-xs"
          />
          <div className="text-xs text-zinc-500 whitespace-nowrap">
            {new Date(note.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListAudioMsg;
