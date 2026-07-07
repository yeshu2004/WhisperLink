import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ListAudioMsg from "./ListAudioMsg";
import { API_URL, FRONTEND_URL } from "../constants"

function ListMsg() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-100 py-10">
      <div className="mx-auto max-w-3xl px-5">
        {isAuthenticated ? <AllMsg /> : <AuthLinks />}
      </div>
    </div>
  );
}

export default ListMsg;

function AuthLinks() {
  return (
    <div className="rounded-2xl bg-white p-10 shadow-sm text-center">
      <h1 className="text-3xl font-bold">Anonymous Messages</h1>
      <p className="mt-2 text-zinc-500">
        Sign in to view all anonymous messages.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/register"
          className="rounded-lg bg-black px-5 py-2 text-white hover:bg-zinc-800"
        >
          Register
        </Link>

        <Link
          to="/signin"
          className="rounded-lg border px-5 py-2 hover:bg-zinc-100"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

function AllMsg() {
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function getAllMsg() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/list-msg",
          {
            withCredentials: true,
          }
        );

        setMessages(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    }

    getAllMsg();
  }, []);

  if (isFetching) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-white animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-sm text-zinc-500 hover:text-black"
        >
          ← Back
        </Link>

        <h1 className="text-2xl font-bold">Anonymous Messages</h1>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold">
          Text Messages ({messages.length})
        </h2>

        {messages.length === 0 ? (
          <p className="text-zinc-500">No messages found.</p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50"
              >
                <p className="text-zinc-800">{msg.message}</p>

                <p className="mt-2 text-xs text-zinc-400">
                  — Anonymous
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold">
          🎤 Audio Whispers
        </h2>

        <ListAudioMsg />
      </div>
    </div>
  );
}