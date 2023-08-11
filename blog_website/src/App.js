import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear("isAuth")
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          {!isAuth ? 
          <Link to="/login">Login</Link> : 
          <>
          <Link to="/createpost">Create Post</Link>
          <div onClick={signUserOut} >Log out</div> 
          </>
          }
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />}></Route>
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />}></Route>
          <Route
            path="/login"
            element={<Login setIsAuth={setIsAuth} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
