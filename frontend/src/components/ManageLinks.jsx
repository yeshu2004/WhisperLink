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
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    async function getUrls() {
      try {
        const res = await axios.get("http://localhost:8000", {
          withCredentials: true,
        });
        console.log(res.data)
        setLinks(res.data.links);
        setUser(res.data.user.username);
      } catch (err) {
        console.error("Error fetching links:", err);
        setError("Failed to load links. Please try again later.");
      } finally {
        setFetching(false);
      }
    }

    getUrls();
  }, []);

   const deleteLink = async (id) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:8000/api/delete/links/${id}`, {
        withCredentials: true,
      });
      setLinks((prev) => prev.filter((link) => link._id !== id));
    } catch (err) {
      console.error("Failed to delete link", err);
      alert("Error deleting link. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

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
                    <h2>
                      {id + 1}) {link.generatedLink}
                    </h2>
                    <div className="flex items-center gap-5">
                    <h3 className="text-sm text-gray-400 italic">
                      createdAt ~ {new Date(link.createdAt).toLocaleString()}
                    </h3>
                    <button
                      onClick={() => deleteLink(link._id)}
                      disabled={deletingId === link._id}
                      className={`px-2 py-1 rounded text-white text-sm ${
                        deletingId === link._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {deletingId === link._id ? "Deleting..." : "Delete"}
                    </button>
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
