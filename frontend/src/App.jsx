import RegisterForm from "./components/RegisterForms";
import SigninForm from "./components/SignInForms";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import ListMsg from "./components/ListMsg";

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState({});
  const [links, setLinks] = useState([]);
  const [generatedLink, setGeneratedLink] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setLinks(res.data.links || []);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  async function generateURL() {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/url/generate",
        {},
        { withCredentials: true }
      );
      setGeneratedLink(res.data.generate_url);
      setLinks((prev) => [...prev, { generatedLink: res.data.generate_url }]);
    } catch (err) {
      console.error("Error generating url:", err);
    }
  }

  return (
    <div className="p-4">
      {isAuthenticated ? (
        <button
          className="cursor-pointer underline"
          onClick={() => {
            logout();
            window.location.reload(); 
          }}
        >
          Logout
        </button>
      ) : (
        <div className="flex items-center gap-5 underline">
          <Link to="/register">Register</Link>
          <Link to="/signin">SignIn</Link>
        </div>
      )}

      <div>
        {isAuthenticated ? (
          <>
            <h1 className="text-xl py-2">
              Hi <span className="text-blue-500">{user.username}</span>, welcome
              to Wisper!
            </h1>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <h5>Create your unique wisperURL:</h5>
                <button
                  onClick={generateURL}
                  className="underline cursor-pointer"
                >
                  Generate URL
                </button>
              </div>

              {generatedLink && (
                <div className="flex items-center gap-2 pt-2">
                  <h4>Generated URL:</h4>
                  <div className="url text-red-500">{generatedLink}</div>
                </div>
              )}
            </div>

            <div className="pt-5">
              <h3>Your URLs:</h3>
              {links.length > 0 ? (
                links.map((link, id) => (
                  <div key={id}>
                    <h2>{link.generatedLink}</h2>
                  </div>
                ))
              ) : (
                <p>No URLs yet.</p>
              )}
            </div>

            <ListMsg/>
          </>
        ) : (
          <>
            <div>
              <h1>Please register/login to use.</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
