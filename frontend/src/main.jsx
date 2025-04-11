import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx'
import RegisterForm from './components/RegisterForms.jsx';
import SigninForm from './components/SignInForms.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/signin" element={<SigninForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
