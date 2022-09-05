import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={About()}>
            <Route />
          </Route>
          <Route path="/users" element={Users()}>
            <Route />
          </Route>
          <Route path="/" element={Home()}>
            <Route />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;