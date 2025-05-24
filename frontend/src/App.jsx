import RegisterForm from "./components/RegisterForms";
import SigninForm from "./components/SignInForms";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout } = useAuth();
  console.log(isAuthenticated)
  return (
    <>
      <div className="p-4">
        {isAuthenticated ? (
          <button className="cursor-pointer underline" onClick={logout}>Logout</button>
        ) : (
          <div className="flex items-center gap-5 underline">
            <Link to="/register">Register</Link>
            <Link to="/signin">SignIn</Link>
          </div>
        )}
        <h1 className="text-xl py-2">Hi welcome to Wisper!</h1>
      </div>
    </>
  );
}

export default App;
