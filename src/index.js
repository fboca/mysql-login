import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthenticationPage from "./views/login";
import RegistrationPage from './views/signup';
import Home from './views/home';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('login-app')
);