import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Send, MessageCircle, Mic } from "lucide-react";
import AudioRecorder from "./AudioRecorder";

function GeneratedLinkPage() {
  const { linkName } = useParams();

  const [message, setMessage] = useState("");
  const [owner, setOwner] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/link/${linkName}`
        );

        setOwner(res.data.username);
        setOwnerId(res.data._id);
      } catch (err) {
        console.error("Error fetching link data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [linkName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      setSending(true);

      const res = await axios.post(
        `http://localhost:8000/api/send-msg/${linkName}`,
        { message }
      );

      alert(res.data.message);
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
        <div className="text-lg text-zinc-500 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 py-12">
      <div className="mx-auto max-w-3xl px-5">

        {/* Header */}

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-zinc-900">
            Anonymous Whisper
          </h1>

          <p className="mt-3 text-zinc-500">
            Send a completely anonymous message to
          </p>

          <div className="mt-5 inline-flex items-center rounded-full bg-indigo-100 px-5 py-2">
            <span className="font-semibold text-indigo-700">
              @{owner}
            </span>
          </div>
        </div>

        {/* TEXT CARD */}

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-indigo-100 p-3">
              <MessageCircle
                className="text-indigo-600"
                size={20}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Text Whisper
              </h2>

              <p className="text-sm text-zinc-500">
                Leave an anonymous message.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <textarea
              rows={6}
              placeholder="Write something kind..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              className="w-full resize-none rounded-2xl border border-zinc-300 p-4 outline-none transition focus:border-indigo-500"
              required
            />

            <button
              disabled={sending}
              className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} />

              {sending
                ? "Sending..."
                : "Send Anonymously"}
            </button>
          </form>
        </div>

        {/* AUDIO CARD */}

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
              <Mic
                className="text-red-500"
                size={20}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Voice Whisper
              </h2>

              <p className="text-sm text-zinc-500">
                Record and send your voice anonymously.
              </p>
            </div>
          </div>

          {owner && ownerId && (
            <AudioRecorder
              owner={owner}
              ownerId={ownerId}
              linkName={linkName}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default GeneratedLinkPage;