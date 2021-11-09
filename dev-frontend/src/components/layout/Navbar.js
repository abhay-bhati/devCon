import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth";

function Navbar() {
  //   const [user, setUser] = useState("User");
  const AuthCtx = useContext(AuthContext);
  console.log(AuthCtx);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      AuthCtx.setIsUser(localStorage.getItem("user"));
    } else {
      AuthCtx.setIsUser("User");
    }
  }, [AuthCtx]);

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    AuthCtx.setIsAuthenticated(false);
    localStorage.removeItem("user");
    history.replace("/login");
  };
  console.log("11111");
  console.log(AuthCtx.isUser);
  console.log(AuthCtx.isUser);
  return (
    <div className="navbar">
      <div className="navbar__main">
        <Link to="/">
          <div>DevConnector</div>
        </Link>
        <Link to="/developers">
          <div>Developers</div>
        </Link>
      </div>
      {!AuthCtx.isAuthenticated && (
        <div className="navbar__account">
          <Link to="/register">
            <div>Sign Up</div>
          </Link>
          <Link to="/login">
            <div>Login</div>
          </Link>
        </div>
      )}
      {AuthCtx.isAuthenticated && (
        <div className="navbar__account">
          <Link to="/dashboard">
            <div>Dashboard</div>
          </Link>
          <Link to="/posts">
            <div>Post-Feed</div>
          </Link>
          <button onClick={logoutHandler}>Logout</button>
          <div className="navbar__account__user">Hello, {AuthCtx.isUser}</div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
