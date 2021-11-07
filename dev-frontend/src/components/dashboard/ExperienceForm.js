import React, { useRef } from "react";
import "../../styles/EducationForm.css";

function ExperienceForm(props) {
  const companyRef = useRef();
  const titleRef = useRef();
  const locationRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const currentRef = useRef();
  const descriptionRef = useRef();

  const submitHandler = (event) => {
    console.log("gfgfh");
    event.preventDefault();
    const expData = {
      company: companyRef.current.value,
      title: titleRef.current.value,
      location: locationRef.current.value,
      from: fromRef.current.value,
      to: toRef.current.value,
      current: currentRef.current.value,
      description: descriptionRef.current.value,
    };
    console.log(expData);
    props.submit(expData);
  };
  return (
    <form className="educationform" onSubmit={submitHandler}>
      <div>
        <input type="text" placeholder="Company" ref={companyRef} />
      </div>
      <div>
        <input type="text" placeholder="Title" ref={titleRef} />
      </div>
      <div>
        <input type="location" placeholder="Location" ref={locationRef} />
      </div>
      <div>
        <input type="date" placeholder="From" ref={fromRef} />
      </div>
      <div>
        <input type="date" placeholder="To" ref={toRef} />
      </div>
      <div className="educationform__current">
        <label htmlFor="current">Currently working</label>
        <select name="current" id="current" ref={currentRef}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <input type="text" placeholder="Description" ref={descriptionRef} />
      </div>
      <button>Submit</button>
    </form>
  );
}

export default ExperienceForm;
