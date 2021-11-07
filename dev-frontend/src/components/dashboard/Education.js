import React from "react";
import EducationForm from "./EducationForm";

function Education() {
  const submitHandler = (val) => {
    console.log("s;dfsdf");
    console.log(val);
    fetch("http://localhost:8080/api/profile/education", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <EducationForm submit={submitHandler} />
    </div>
  );
}

export default Education;
