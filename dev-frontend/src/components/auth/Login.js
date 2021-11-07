import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../utilities/Button";
import { AuthContext } from "../../store/auth";
import jwt_decode from "jwt-decode";

function Login() {
  const [emailField, setEmailField] = useState(false);
  const [passwordField, setPasswordField] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const alert = document.getElementsByClassName("alert");
  const history = useHistory();

  const AuthCtx = useContext(AuthContext);
  console.log(AuthCtx);

  const emailChangeHandler = (event) => {
    console.log(event.target.value);
    alert[0].innerHTML = "";
    document.getElementById("emailPara").innerHTML = "";
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (re.test(event.target.value)) {
      setEmailField(event.target.value);
      setEmailIsValid(true);
    } else {
      setEmailField(false);
      setEmailIsValid(false);
    }
  };
  const passwordChangeHandler = (event) => {
    console.log(event.target.value);
    alert[0].innerHTML = "";
    document.getElementById("passwordPara").innerHTML = "";
    if (event.target.value.length > 6) {
      setPasswordField(event.target.value);
      setPasswordIsValid(true);
    } else {
      setPasswordField(false);
      setPasswordIsValid(false);
    }
  };
  const submitHandler = () => {
    console.log("clicked");
    if (!emailIsValid) {
      document.getElementById("emailPara").innerHTML =
        "* Input field is invalid";
    }
    if (!passwordIsValid) {
      document.getElementById("passwordPara").innerHTML =
        "* Input field is invalid";
    }
    if (emailIsValid && passwordIsValid) {
      console.log(emailField, passwordField);
      fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailField,
          password: passwordField,
        }),
      }).then((res) => {
        if (res.ok) {
          console.log("res ok");
          res.json().then((data) => {
            console.log(data);
            console.log("asd;fsadfsadfasd");
            localStorage.setItem("token", data.token);
            const decoded = jwt_decode(data.token);
            console.log(decoded.name);
            localStorage.setItem("user", decoded.name);
            AuthCtx.setIsUser(decoded);
            AuthCtx.setIsAuthenticated(data.token);
            history.replace("/dashboard");
          });
        } else {
          console.log("res not ok");
          res.json().then((data) => {
            console.log(data);
            alert[0].innerHTML = "Email or Password is Incorrect";
          });
        }
      });
    }
  };
  return (
    <div className="register">
      <h2>Login</h2>
      <div className="register__email">
        <p className="alert"></p>
        <input
          style={{ borderColor: emailField ? "green" : "rgb(214, 210, 210)" }}
          type="text"
          id="login-email"
          placeholder="Email"
          onChange={emailChangeHandler}
        />
        <p
          id="emailPara"
          style={{
            color: "red",
            fontSize: "12px",
            marginTop: "0px",
            width: "60%",
            marginLeft: "80px",
            textAlign: "start",
            marginBottom: "20px",
          }}
        />
      </div>
      <div className="register__password">
        <input
          style={{
            borderColor: passwordField ? "green" : "rgb(214, 210, 210)",
          }}
          type="password"
          id="login-password"
          placeholder="Password"
          onChange={passwordChangeHandler}
        />
        <p
          id="passwordPara"
          style={{
            color: "red",
            fontSize: "12px",
            marginTop: "0px",
            width: "60%",
            marginLeft: "80px",
            textAlign: "start",
            marginBottom: "20px",
          }}
        />
      </div>
      <Button
        text="Submit"
        style={{
          width: "20%",
          padding: "15px 10px",
          fontSize: "16px",
          fontWeight: "500",
          color: "white",
          marginTop: "20px",
          borderRadius: "7px",
          backgroundColor: "#4d79ff",
          boxShadow: "4px 4px 10px gray",
          cursor: "pointer",
        }}
        onClick={submitHandler}
      />
    </div>
  );
}

export default Login;
