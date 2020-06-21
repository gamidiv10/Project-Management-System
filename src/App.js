import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import history from "./services/history";
import Routes from "./Routes/index";
import "./App.scss";
import Navigationbar from "./Components/Navbar/Navbar";
import userContext from "./Context/userContext";

function App() {
  const [isNavbar, setIsNavbar] = useState(true);
  const [user, setUser] = useState("user");

  useEffect(() => {
    if (window.location.pathname === "/error") {
      setIsNavbar(false);
    }
  }, []);

  return (
    <Router history={history}>
      <userContext.Provider value={{ user, setUser }}>
        {isNavbar ? <Navigationbar /> : ""}
        <Routes />
      </userContext.Provider>
    </Router>
  );
}

export default App;
