import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth()

  async function loginUser(e){
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login",{username, password}, {withCredentials: true})
      console.log("Login response token:", response.data.token);
      login(response.data.token);
      setUsername("");
      setPassword("");
      navigate("/"); 
    } catch (error) {
      console.log(error)
    }
  } 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={loginUser} className="flex flex-col gap-3 max-w-[350px] bg-white p-5 rounded-2xl w-full shadow-md">
        <p className="text-[28px] text-[royalblue] font-semibold tracking-[-1px] relative flex items-center pl-8">
          Signin
          <span className="absolute left-0 w-[18px] h-[18px] bg-[royalblue] rounded-full" />
          <span className="absolute left-0 w-[18px] h-[18px] bg-[royalblue] rounded-full animate-ping opacity-70" />
        </p>
        <input
          type="text"
          placeholder="username"
          required
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none"
        />
        <button
          type="submit"
          className="bg-[royalblue] hover:bg-blue-700 text-white text-[16px] py-2 rounded-lg transition-colors duration-300"
        >
          Submit
        </button>

        <p className="text-sm text-gray-600 text-center">
          New to our platform?{" "}
          <Link to="/register" className="text-[royalblue] hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SigninForm;
