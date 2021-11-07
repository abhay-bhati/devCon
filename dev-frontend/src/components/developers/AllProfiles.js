import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import "../../styles/AllProfiles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function AllProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8080/api/profile/developers")
      .then((res) => {
        if (res.ok) {
          console.log("res ok");
          res.json().then((data) => {
            console.log(data);
            setProfiles(data);
            setIsLoading(false);
          });
        } else {
          console.log("res not ok");
          res.json().then((data) => {
            console.log(data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(profiles);
  return (
    <div className="allprofiles">
      {isLoading && (
        <div
          style={{
            margin: "30px auto",
            marginBottom: "1000px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faSpinner} style={{ fontSize: "30px" }} />
        </div>
      )}
      {!isLoading &&
        profiles.map((element) => (
          <Profile key={element._id} id={element._id} profile={element} />
        ))}
    </div>
  );
}

export default AllProfiles;
