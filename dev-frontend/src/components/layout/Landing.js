import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Landing.css";
import Button from "../utilities/Button";

function Landing() {
  const history = useHistory();
  const landingSignupClickHandler = () => {
    console.log("signupclick");
    history.push("/register");
  };
  const landingLoginClickHandler = () => {
    console.log("loginclick");
    history.push("/login");
  };
  return (
    <div className="landing">
      <h1>Developer Connector</h1>
      <p>Create profile and interact with other developers</p>
      <div className="landing__signup">
        <Button
          text="SignUp"
          style={{
            backgroundColor: "#80aaff",
            borderRadius: "8px",
            margin: "10px",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "2px 4px 4px black",
            cursor: "pointer",
          }}
          onClick={landingSignupClickHandler}
        ></Button>
        <Button
          text="Login"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            margin: "10px",
            color: "gray",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "2px 4px 4px black",
            cursor: "pointer",
          }}
          onClick={landingLoginClickHandler}
        ></Button>
      </div>
    </div>
  );
}

export default Landing;
