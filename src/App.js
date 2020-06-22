import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import history from "./services/history";
import Routes from "./Routes/index";
import "./App.scss";
import Navigationbar from "./Components/Navbar/Navbar";
import userContext from "./Context/userContext";
import tasksItemsContext from "./Context/tasksItemsContext";

function App() {
  const [isNavbar, setIsNavbar] = useState(true);
  const [user, setUser] = useState("user");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (window.location.pathname === "/error") {
      setIsNavbar(false);
    }
  }, []);

  return (
    <Router history={history}>
      <userContext.Provider value={{ user, setUser }}>
        <tasksItemsContext.Provider value={{ tasks, setTasks }}>
          {isNavbar ? <Navigationbar /> : ""}
          <Routes />
        </tasksItemsContext.Provider>
      </userContext.Provider>
    </Router>
  );
}

export default App;
