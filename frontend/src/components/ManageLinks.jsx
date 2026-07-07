import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Copy, Check, Link2 } from "lucide-react";
import { API_URL, FRONTEND_URL } from "../constants";

function ManageLinks() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-100">
      {isAuthenticated ? <ViewLinks /> : <AuthLinks />}
    </div>
  );
}

export default ManageLinks;

function AuthLinks() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold">WhisperLink</h1>

        <p className="mt-3 text-zinc-500">
          Please sign in to manage your Whisper Links.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            to="/register"
            className="flex-1 rounded-xl bg-black py-3 text-center text-white hover:opacity-90"
          >
            Register
          </Link>

          <Link
            to="/signin"
            className="flex-1 rounded-xl border border-zinc-300 py-3 text-center hover:bg-zinc-100"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

function ViewLinks() {
  const [user, setUser] = useState("");
  const [links, setLinks] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    async function getUrls() {
      try {
        const res = await axios.get(API_URL, {
          withCredentials: true,
        });

        setLinks(res.data.links);
        setUser(res.data.user.username);
      } catch (err) {
        console.error(err);
        setError("Failed to load your links.");
      } finally {
        setFetching(false);
      }
    }

    getUrls();
  }, []);

  const copyLink = (linkId, index) => {
    navigator.clipboard.writeText(`${FRONTEND_URL}/${linkId}`);

    setCopiedId(index);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-zinc-500">Loading your links...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      {/* Header */}

      <div className="mb-10 flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <h1 className="text-4xl font-bold">Manage Links</h1>

          <p className="mt-2 text-zinc-500">
            Welcome back{" "}
            <span className="font-semibold text-indigo-600">{user}</span>. Here
            are all your WhisperLinks.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-5 text-red-600">
          {error}
        </div>
      )}

      {!error && (
        <div className="space-y-4">
          {links.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <Link2 size={40} className="mx-auto mb-4 text-zinc-400" />

              <h2 className="text-xl font-semibold">No Whisper Links Yet</h2>

              <p className="mt-2 text-zinc-500">
                Generate your first anonymous link from the dashboard.
              </p>
            </div>
          ) : (
            links.map((link, index) => (
              <div
                key={link._id || index}
                className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Link2 size={18} className="text-indigo-600" />

                      <span className="font-semibold">Link #{index + 1}</span>
                    </div>

                    <p className="break-all text-sm text-zinc-700">
                      {FRONTEND_URL}/{link.linkId}
                    </p>

                    <p className="mt-2 text-xs text-zinc-400">
                      Created on {new Date(link.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => copyLink(link.linkId, index)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100"
                  >
                    {copiedId === index ? (
                      <>
                        <Check size={18} className="text-green-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
