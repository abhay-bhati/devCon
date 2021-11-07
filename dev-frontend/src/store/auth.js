import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const authHandler = (value) => {
    console.log("auth handler");
    setToken(value);
  };

  const userHandler = (user) => {
    console.log("user handler");
    setUser(user);
  };

  const defValues = {
    isAuthenticated: !!token,
    setIsAuthenticated: authHandler,
    isUser: user,
    setIsUser: userHandler,
  };
  return (
    <AuthContext.Provider value={defValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
