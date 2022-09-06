import React, { Component } from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<LandingPage />}>
            
          </Route>

          <Route path="/Login" element={<LoginPage />}>
            
          </Route>

          <Route path="/Register" element={<RegisterPage />}>
            
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;