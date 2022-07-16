import './App.css';
import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {auth} from './firebase-config';

function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });
    }, [])

  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword(
        auth, 
        registerEmail, 
        registerPassword
        );
        console.log(user);
        alert("Register successful!");
    }catch(error){
      console.log(error.message);
      alert("Invalid email/password!");
    }
  };

  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
        );
        console.log(user);
    }catch(error){
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">

        <h1>
          Tech Incubator
        </h1>

        <div>
          <h2>register</h2>

          <input placeholder='email...' 
            onChange={(event)=>{
              setRegisterEmail(event.target.value);
            }}
          />

          <input placeholder='password...' 
            onChange={(event)=>{
              setRegisterPassword(event.target.value);
            }}
          />

          <button onClick={register}>create user</button>
        </div>

        <div>
          <h2>login</h2>
          <input placeholder='email...'
            onChange={(event)=>{
              setLoginEmail(event.target.value);
            }}
          />
          <input placeholder='password...' 
            onChange={(event)=>{
              setLoginPassword(event.target.value);
            }}
          />
          <button onClick={login}>log in</button>
        </div>
        <br/>

        <div>
          <h4>User Logged In:</h4>
          {/* show user email */}
          {/* if no email, don't do anything */}
          {user ? user.email : "no user logged in"}
        </div>

        <div>
          <button onClick={logout}>sign out</button>
        </div>
    </div>
  );
}

export default App;
