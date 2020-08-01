import React, { useEffect, useState } from "react";
import * as firebase from "firebase";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(localStorage.getItem(user));
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
