import React from "react";
import ExperienceForm from "./ExperienceForm";

function Experience() {
  const submitHandler = (val) => {
    console.log("s;dfsdf");
    console.log(val);
    fetch("http://localhost:8080/api/profile/experience", {
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
      <ExperienceForm submit={submitHandler} />
    </div>
  );
}

export default Experience;
