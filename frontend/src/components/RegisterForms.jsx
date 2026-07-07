import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        { username, password, email },
      );
      localStorage.setItem("token", response.data.token);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/signin"); // Redirect to dashboard
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      console.log(error);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong.",
      );
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={registerUser}
        className="flex flex-col gap-3 max-w-[350px] bg-white p-5 rounded-2xl w-full shadow-md"
      >
        <p className="text-[28px] text-blue-600 font-semibold tracking-[-1px] relative flex">
          Register
        </p>
        <p className="text-sm text-gray-600">
          Signup now to create your Q&A links!
        </p>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none focus:border-blue-600"
        />
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none focus:border-blue-600"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none focus:border-blue-600"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-[16px] py-2 rounded-lg transition-colors duration-300"
        >
          Submit
        </button>
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
