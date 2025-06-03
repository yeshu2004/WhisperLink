import RegisterForm from "./components/RegisterForms";
import SigninForm from "./components/SignInForms";
import { Link, Links } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import ListMsg from "./components/ListMsg";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="p-4">
      {isAuthenticated ? <Dashboard />: <AuthLinks/>}
    </div>
  );
}

export default App;

function AuthLinks() {
  return (
    <div className="flex items-center gap-5 underline">
      <Link to="/register">Register</Link>
      <Link to="/signin">SignIn</Link>
    </div>
  );
}

function Dashboard() {
  const { logout } = useAuth();
  const [user, setUser] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
       await axios.get("http://localhost:8000", { withCredentials: true }).then((res) => {
        setUser(res.data.user);
        setLinks(res.data.links || []);
      })
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally{
        setIsFetching(()=> false)
      }
    }
    fetchUserData()
  }, []);


  async function generateURL() {
    setIsLoading(() => true);
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
    } finally {
      setIsLoading(() => false);
    }
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        className="cursor-pointer underline"
        onClick={async() => {
          await logout();
        }}
      >
        Logout
      </button>
      <>
        <h1 className="text-xl py-2">
          Hi <span className="text-blue-500">{user.username}</span>, welcome to
          Wisper!
        </h1>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h5>Create your unique wisperURL:</h5>
            <button onClick={generateURL} className="underline cursor-pointer">
              {isLoading ? "Generating..." : "Generate URL"}
            </button>
          </div>

          {generatedLink && (
            <div className="flex items-center gap-2 pt-2">
              <h4>Generated URL:</h4>
              <div className="url text-red-500">{generatedLink}</div>
            </div>
          )}
        </div>

        <div className="py-5">
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

        <Link  to={'/messages'}>View all message</Link>
      </>
    </div>
  );
}
