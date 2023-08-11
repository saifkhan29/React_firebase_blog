import "./App.css";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
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
      localStorage.clear("isAuth");
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <HashRouter>
        <nav className="navbar">
          <div className="navbar-brand ms-5 text-white">Blog Mania</div>
          <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
            <ul className="navbar-nav d-flex flex-column flex-md-row me-5">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              {!isAuth ? (
                <li className="nav-item">
                  <Link to="/login">Login</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/createpost">Create Post</Link>
                  </li>
                  <li className="nav-item">
                    <div onClick={signUserOut}>Log out</div>{" "}
                  </li>
                </>
              )}
            </ul>
          </div>
          <button className="navbar-toggle me-3" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />}></Route>
          <Route
            path="/createpost"
            element={<CreatePost isAuth={isAuth} />}
          ></Route>
          <Route
            path="/login"
            element={<Login setIsAuth={setIsAuth} />}
          ></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
