import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Dashboard.css";
import Button from "../utilities/Button";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const AuthCtx = useContext(AuthContext);
  console.log(AuthCtx);
  console.log("1");
  useEffect(() => {
    console.log("12223121212122323");
    fetch("http://localhost:8080/api/profile", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        console.log("2");
        if (res.ok) {
          console.log("res ok");
          res.json().then((data) => {
            console.log(data);
            setProfile(data);
            setIsLoading(false);
          });
        } else {
          console.log("3");
          console.log("res not ok");
          res.json().then((data) => console.log(data));
        }
      })
      .catch((err) => {
        console.log("4");
        console.log(err);
      });
  }, []);
  console.log("5");

  return (
    <>
      {isLoading && (
        <p style={{ textAlign: "center", padding: "20px", margin: "20px" }}>
          Loading...
        </p>
      )}
      {!isLoading && (
        <div className="dashboard">
          <h2>Dashboard</h2>
          <h5>
            Welcome,{" "}
            <span style={{ color: " #00b8e6" }}>
              {AuthCtx.isName ? AuthCtx.isUser.name : "User"}{" "}
            </span>
          </h5>
          <div className="dashboard__links">
            <Link to="/my-profile">
              <div>
                <span className="dashboard__links__icon">
                  {<FontAwesomeIcon icon={faUserCircle} />}{" "}
                </span>
                <span className="dashboard__links__text">My Profile</span>
              </div>
            </Link>
            <Link to="/edit-profile">
              <div>
                <span className="dashboard__links__icon">
                  {<FontAwesomeIcon icon={faUserCircle} />}{" "}
                </span>
                <span className="dashboard__links__text">Edit Profile</span>
              </div>
            </Link>
            <Link to="/education">
              <div>
                <span className="dashboard__links__icon">
                  {<FontAwesomeIcon icon={faUserGraduate} />}{" "}
                </span>
                <span className="dashboard__links__text">Add Education</span>
              </div>
            </Link>
            <Link to="/experience">
              <div>
                <span className="dashboard__links__icon">
                  {<FontAwesomeIcon icon={faBriefcase} />}{" "}
                </span>
                <span className="dashboard__links__text">Add Experience</span>
              </div>
            </Link>
          </div>
          <h3
            style={{
              marginLeft: "50px",
              fontSize: "25px",
              fontWeight: "500",
              marginBottom: "25px",
              marginTop: "60px",
            }}
          >
            Experience Credentials
          </h3>
          <div className="dashboard__exp">
            <div className="dashboard__line" />
            <div className="dashboard__exp__head">
              <div>Company</div>
              <div>Title</div>
              <div>Years</div>
              <div></div>
            </div>
            <div className="dashboard__line" />
            {profile.experience.map((element) => (
              <div className="dashboard__exp__row1" key={element._id}>
                <div>{element.company}</div>
                <div>{element.title}</div>
                <div>{element.from}</div>
                <div>
                  <Button
                    text="Delete"
                    style={{
                      backgroundColor: "red",
                      borderRadius: "8px",
                      color: "white",
                      fontWeight: "700",
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="dashboard__line" />
            {/* <div className="dashboard__exp__row2">
          <div>Tech Guy Web Solutions</div>
          <div>Senior Developer</div>
          <div>2018</div>
          <div>
            <Button
              text="Delete"
              style={{
                backgroundColor: "red",
                borderRadius: "8px",
                color: "white",
                fontWeight: "700",
              }}
            />
          </div>
        </div> */}
          </div>

          <h3
            style={{
              marginLeft: "50px",
              fontSize: "25px",
              fontWeight: "500",
              marginBottom: "25px",
              marginTop: "40px",
            }}
          >
            Education Credentials
          </h3>
          <div className="dashboard__edu">
            <div className="dashboard__line" />
            <div className="dashboard__exp__head">
              <div>School</div>
              <div>Degree</div>
              <div>Grade</div>
              <div></div>
            </div>
            <div className="dashboard__line" />
            {profile.education.map((element) => (
              <div className="dashboard__exp__row1" key={element._id}>
                <div>{element.school}</div>
                <div>{element.degree}</div>
                <div>{element.grade}</div>
                <div>
                  <Button
                    text="Delete"
                    style={{
                      backgroundColor: "red",
                      borderRadius: "8px",
                      color: "white",
                      fontWeight: "700",
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="dashboard__line" />
            <div className="dashboard__exp__row2">
              <div>Tech Guy Web Solutions</div>
              <div>Senior Developer</div>
              <div>2018</div>
              <div>
                <Button
                  text="Delete"
                  style={{
                    backgroundColor: "red",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "700",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
