import React, { useState } from "react";
import "../../styles/Register.css";
import Button from "../utilities/Button";

function Register() {
  const [nameField, setNameField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [passwordField, setPasswordField] = useState(false);
  const [cpasswordField, setCpasswordField] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [cpasswordIsValid, setCpasswordIsValid] = useState(false);

  const alert = document.getElementsByClassName("alert");

  const nameChangeHandler = (event) => {
    document.getElementById("namePara").innerHTML = "";
    console.log(event.target.value);
    if (event.target.value.length >= 3) {
      setNameField(event.target.value);
      setNameIsValid(true);
    } else {
      setNameField(false);
      setNameIsValid(false);
    }
  };
  const emailChangeHandler = (event) => {
    document.getElementById("emailPara").innerHTML = "";
    console.log(event.target.value);
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
    alert[0].innerHTML = "";
    document.getElementById("passPara").innerHTML = "";
    console.log(event.target.value);
    if (event.target.value.length > 6) {
      setPasswordField(event.target.value);
      setPasswordIsValid(true);
    } else {
      setPasswordField(false);
      setPasswordIsValid(false);
    }
  };
  const cpasswordChangeHandler = (event) => {
    alert[0].innerHTML = "";
    document.getElementById("cpassPara").innerHTML = "";
    console.log(event.target.value);
    if (event.target.value.length > 6) {
      setCpasswordField(event.target.value);
      setCpasswordIsValid(true);
    } else {
      setCpasswordField(false);
      setCpasswordIsValid(false);
    }
  };
  const submitHandler = () => {
    console.log("submit data");
    console.log(nameField, emailField, passwordField, cpasswordField);

    if (!nameIsValid) {
      document.getElementById("name").style.borderColor = "red";
      const namePara = document.getElementById("namePara");
      namePara.innerHTML = "* Input field is invalid";
    }
    if (!emailIsValid) {
      document.getElementById("email").style.borderColor = "red";
      const emailPara = document.getElementById("emailPara");
      emailPara.innerHTML = "* Input field is invalid";
    }
    if (!passwordIsValid) {
      document.getElementById("password").style.borderColor = "red";
      const passPara = document.getElementById("passPara");
      passPara.innerHTML = "* Input field is invalid";
    }
    if (!cpasswordIsValid) {
      document.getElementById("cpassword").style.borderColor = "red";
      const cpassPara = document.getElementById("cpassPara");
      cpassPara.innerHTML = "* Input field is invalid";
    }
    if (passwordField === cpasswordField) {
      console.log("passwords match");
      if (nameIsValid && emailIsValid && passwordIsValid && cpasswordIsValid) {
        fetch("http://localhost:8080/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameField,
            email: emailField,
            password: passwordField,
          }),
        }).then((res) => {
          if (res.ok) {
            console.log("res ok");
            res.json().then((data) => console.log(data));
          } else {
            console.log("res not ok");
            res.json().then((data) => console.log(data));
          }
        });
      }
    } else {
      alert[0].innerHTML = "Passwords do not match. Try again";
    }
  };

  return (
    <div className="register">
      <h2>Sign Up</h2>
      <p id=""></p>
      <div className="register__name">
        <p className="alert"></p>
        <input
          style={{ borderColor: nameField ? "green" : "rgb(214, 210, 210)" }}
          type="text"
          id="name"
          placeholder="Name"
          onChange={nameChangeHandler}
        />
        <p
          id="namePara"
          style={{
            color: "#ff3333",
            fontSize: "12px",
            marginTop: "0px",
            width: "60%",
            marginLeft: "80px",
            textAlign: "start",
            marginBottom: "20px",
          }}
        />
      </div>
      <div className="register__email">
        <input
          style={{ borderColor: emailField ? "green" : "rgb(214, 210, 210)" }}
          type="text"
          id="email"
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
          id="password"
          placeholder="Password"
          onChange={passwordChangeHandler}
        />
        <p
          id="passPara"
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
      <div className="register__cpassword">
        <input
          style={{
            borderColor: cpasswordField ? "green" : "rgb(214, 210, 210)",
          }}
          type="password"
          id="cpassword"
          placeholder="Confirm Password"
          onChange={cpasswordChangeHandler}
        />
        <p
          id="cpassPara"
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

export default Register;
