// Authentication Component: Register & Login

// import "../App.css";

// Import the authentification feature
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState, useEffect, Fragment } from "react";
import app from "../firebase-config";

const auth = getAuth(app);
const Authentication = () => {
  // register with email and password
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // login with username and password
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Keep track of the current user
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      alert("Register successful!");
    } catch (error) {
      console.log(error.message);
      alert("Invalid email/password!");
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      alert("Welcome, " + loginEmail + "!");
    } catch (error) {
      console.log(error.message);
      alert("Email or password incorrect!");
    }
  };

  const logout = async () => {
    await signOut(auth);
    alert("You are logged out!");
  };

  return (
    <Fragment>
      <div>
        <h2>Register and Login</h2>

        <input
          placeholder="email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}>Register and Login</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          placeholder="email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}>Log in</button>
      </div>

      <div>
        <label>Current User:</label>
        {/* Show the current logged-in email */}
        {/* User ternary operator to fix the bug that the system breaks 
          if no user in database */}
        {user ? user.email : "No user logged in"}
      </div>
      <div>
        <button onClick={logout}>Log out</button>
      </div>
    </Fragment>
  );
};

export default Authentication;
