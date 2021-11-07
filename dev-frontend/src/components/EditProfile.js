import React, { useEffect, useState, useRef } from "react";
import "../styles/EditProfile.css";

function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const companyRef = useRef();
  const websiteRef = useRef();
  const locationRef = useRef();
  const statusRef = useRef();
  const bioRef = useRef();
  const skillsRef = useRef();
  const githubRef = useRef();
  const youtubeRef = useRef();
  const linkedInRef = useRef();
  const instagramRef = useRef();

  useEffect(() => {
    fetch("http://localhost:8080/api/profile", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setProfile(data);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("subit");
    const editProfileData = {
      company: companyRef.current.value,
      website: websiteRef.current.value,
      location: locationRef.current.value,
      status: statusRef.current.value,
      bio: bioRef.current.value,
      github: githubRef.current.value,
      youtube: youtubeRef.current.value,
      linkedIn: linkedInRef.current.value,
      instagram: instagramRef.current.value,
    };
    console.log(editProfileData);
    fetch("http://localhost:8080/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(editProfileData),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => console.log(err));
  };
  console.log("2333");
  console.log(profile);
  return (
    <>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {!isLoading && (
        <form className="editprofile" onSubmit={submitHandler}>
          <div>
            <input
              type="string"
              placeholder="Company"
              defaultValue={profile.company}
              ref={companyRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="Website"
              defaultValue={profile.website}
              ref={websiteRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="Location"
              defaultValue={profile.location}
              ref={locationRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="Status"
              defaultValue={profile.status}
              ref={statusRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="Bio"
              defaultValue={profile.bio}
              ref={bioRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="Github username"
              defaultValue={profile.githubusername}
              ref={githubRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="Enter skills seperated by comma"
              defaultValue={profile.skills}
              ref={skillsRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="Youtube details"
              defaultValue={profile.social.youtube}
              ref={youtubeRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="LinkedIn userlink"
              defaultValue={profile.social.linkedIn}
              ref={linkedInRef}
            />
          </div>
          <div>
            <input
              type="string"
              placeholder="Instagram username"
              defaultValue={profile.social.instagram}
              ref={instagramRef}
            />
          </div>
          <button>Submit</button>
        </form>
      )}
    </>
  );
}

export default EditProfile;
