import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Link2,
  LogOut,
  Copy,
  Mail,
  Settings,
  Sparkles,
} from "lucide-react";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-100">
      {isAuthenticated ? <Dashboard /> : <AuthLinks />}
    </div>
  );
}

export default App;

function AuthLinks() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm">

        <h1 className="text-4xl font-bold">
          WhisperLink
        </h1>

        <p className="mt-3 text-zinc-500">
          Create your anonymous profile and receive text or voice whispers.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            to="/register"
            className="flex-1 rounded-xl bg-black py-3 text-center text-white transition hover:opacity-90"
          >
            Register
          </Link>

          <Link
            to="/signin"
            className="flex-1 rounded-xl border border-zinc-300 py-3 text-center transition hover:bg-zinc-100"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}

function Dashboard() {
  const { logout } = useAuth();

  const [user, setUser] = useState({});
  const [generatedLink, setGeneratedLink] = useState("");

  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          "http://localhost:8000",
          {
            withCredentials: true,
          }
        );

        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    }

    fetchUser();
  }, []);

  async function generateURL() {
    try {
      setIsLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/url/generate",
        {},
        {
          withCredentials: true,
        }
      );

      setGeneratedLink(res.data.generate_url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedLink);
    alert("Copied!");
  };

  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-zinc-500">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">

      {/* Top Bar */}

      <div className="mb-10 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome back,
            <span className="text-indigo-600">
              {" "}
              {user.username}
            </span>
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage your anonymous whispers.
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

      {/* Generate URL */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <Sparkles
              className="text-indigo-600"
              size={22}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Create Whisper Link
            </h2>

            <p className="text-sm text-zinc-500">
              Generate your anonymous sharing link.
            </p>
          </div>

        </div>

        <button
          onClick={generateURL}
          disabled={isLoading}
          className="mt-6 rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {isLoading
            ? "Generating..."
            : "Generate Link"}
        </button>

        {generatedLink && (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <Link2
                  className="text-indigo-600"
                  size={20}
                />

                <p className="break-all text-sm">
                  {generatedLink}
                </p>

              </div>

              <button
                onClick={copyToClipboard}
                className="rounded-lg border px-3 py-2 transition hover:bg-white"
              >
                <Copy size={18} />
              </button>

            </div>

          </div>
        )}

      </div>

      {/* Navigation */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <Link
          to="/allLinks"
          className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <Link2
            size={28}
            className="mb-4 text-indigo-600"
          />

          <h3 className="text-lg font-semibold">
            Manage Links
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            View and manage every WhisperLink you've
            created.
          </p>
        </Link>

        <Link
          to="/messages"
          className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <Mail
            size={28}
            className="mb-4 text-green-600"
          />

          <h3 className="text-lg font-semibold">
            Messages
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Read all anonymous text and voice whispers.
          </p>
        </Link>

      </div>

    </div>
  );
}