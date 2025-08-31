import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./Login.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUser(email);
    alert(`Logged in as:" successfully loged!"` );
  };

  const handleSignUp = (name, email) => {
    setIsLoggedIn(true);
    setUser(name, email);
    alert(`Signed up as:  "successfully signed!" `);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser("");
    setIsLogin(true); 
  };


  return (
    <div className="login-container">
      <h1>
        <img src="recipe.png" alt="Logo" />
        My Recipe Book
      </h1>

    
      {!isLoggedIn && (
        <div style={{ marginBottom: "20px" }}>
          {isLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Signup onSignUp={handleSignUp} />
          )}
        </div>
      )}

     
      {isLoggedIn && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Welcome !! Your page is page is logged.{user}
        </p>
      )}

   
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {!isLoggedIn && (
          <>
            <button onClick={() => setIsLogin(true)}>Login</button>
            <button onClick={() => setIsLogin(false)}>Sign Up</button>
            <button
              onClick={() =>
                document.querySelector("form").requestSubmit()
              }
            >
              Submit
            </button>
          </>
        )}
        {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
      </div>
    </div>
  );
}

export default LoginPage;
