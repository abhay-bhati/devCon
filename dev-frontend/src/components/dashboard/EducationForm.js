import React, { useRef } from "react";
import "../../styles/EducationForm.css";

function EducationForm(props) {
  const schoolRef = useRef();
  const degreeRef = useRef();
  const gradeRef = useRef();
  const locationRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const currentRef = useRef();
  const descriptionRef = useRef();

  const submitHandler = (event) => {
    console.log("gfgfh");
    event.preventDefault();
    const eduData = {
      school: schoolRef.current.value,
      degree: degreeRef.current.value,
      grade: gradeRef.current.value,
      location: locationRef.current.value,
      from: fromRef.current.value,
      to: toRef.current.value,
      current: currentRef.current.value,
      description: descriptionRef.current.value,
    };
    console.log(eduData);
    props.submit(eduData);
  };
  return (
    <form className="educationform" onSubmit={submitHandler}>
      <div>
        <input type="text" placeholder="School" ref={schoolRef} />
      </div>
      <div>
        <input type="text" placeholder="Degree" ref={degreeRef} />
      </div>
      <div>
        <input type="text" placeholder="Grade" ref={gradeRef} />
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
        <label htmlFor="current">Currently working?</label>
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

export default EducationForm;
