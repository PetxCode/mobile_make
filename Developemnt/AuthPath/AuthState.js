import React, { createContext, useState, useEffect, Children } from "react";
import App from "../../App";
import { app } from "../../base";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [current, setCurrent] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (email, password) => {
    await app.auth().createUserWithEmailAndPassword(email, password);
  };

  const signIn = async (email, password) => {
    await app.auth().signInWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    await app.auth().signOut();
  };

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrent(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ current, signIn, signUp, signOut, setCurrent }}
    >
      {children}
    </AuthContext.Provider>
  );
};
