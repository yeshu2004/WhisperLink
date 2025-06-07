import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ManageLinks() {
  const { isAuthenticated } = useAuth();
  return <div className="p-4">{isAuthenticated ? <ViewLinks /> : <AuthLinks />}</div>;
}

export default ManageLinks;

function AuthLinks() {
  return (
    <div className="flex items-center gap-5 underline">
      <Link to="/register">Register</Link>
      <Link to="/signin">SignIn</Link>
    </div>
  );
}

function ViewLinks() {
  const [user, setUser] = useState("");
  const [links, setLinks] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null); // Track which link was copied

  useEffect(() => {
    async function getUrls() {
      try {
        const res = await axios.get("http://localhost:8000", {
          withCredentials: true,
        });
        setLinks(res.data.links);
        setUser(res.data.user.username);
      } catch (err) {
        console.error(err)
        setError("Failed to load links. Please try again later.");
      } finally {
        setFetching(false);
      }
    }
    getUrls();
  }, []);

  if (fetching) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="">
      <Link to={"/"} className="underline text-sm">
        Back to home
      </Link>

      <div className="py-5">
        {error && (
          <div className="text-red-500 border border-red-300 bg-red-100 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {!error && (
          <>
            <h2 className="text-lg">
              Hi <span className="text-blue-500">{user}</span>, let's manage
              your wispers links...
            </h2>
            <div>
              <h3 className="pt-2">Genrated wispers links:</h3>
              {links.length > 0 ? (
                links.map((link, id) => (
                  <div key={id} className="py-1">
                    <div className="flex items-center gap-2">
                      <h2>
                        {id + 1}) http://localhost:5173/{link.linkId}
                      </h2>
                      <div className="flex items-center gap-0">
                        <button
                          className="ml-2 px-2 py-1 text-xs bg-blue-100 rounded hover:bg-blue-200 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(`http://localhost:5173/${link.linkId}`);
                            setCopiedId(id);
                            setTimeout(() => setCopiedId(null), 1500);
                          }}
                        >
                          Copy
                        </button>
                      {copiedId === id && (
                        <span className="ml-2 text-green-600 text-xs">Copied!</span>
                      )}
                      </div>

                    </div>
                    <div className="flex items-center gap-5">
                      <h3 className="text-sm text-gray-400 italic">
                        createdAt ~ {new Date(link.createdAt).toLocaleString()}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <p>No URLs yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
