import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Navbar from "./components/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <Navbar onLogout={handleLogout} />

      <Dashboard />
      <Inventory />
    </>
  );
}

export default App;
