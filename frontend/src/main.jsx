import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx'
import RegisterForm from './components/RegisterForms.jsx';
import SigninForm from './components/SigninForms';
import { AuthProvider } from './context/AuthContext.jsx';
import GeneratedLinkPage from './components/GeneratedLinkPage.jsx';
import ListMsg from './components/ListMsg.jsx';
import ManageLinks from './components/ManageLinks.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/:linkName" element={<GeneratedLinkPage />} />
        <Route path="/messages" element={<ListMsg />} />
        <Route path="/allLinks" element={<ManageLinks />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
