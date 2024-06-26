import React from "react";
import "./signup.css";

function Details() {
  function handleSubmit() {}
  function handleChange() {}
  return (
    <div className="maincont">
      <div className="heading">Enter your details</div>
      <div className="sub">
        Enter your details to finish creating your account
      </div>
      <div className="sign-up-container">
        <form onSubmit={handleSubmit}>
          <label className="label">
            <div>Name</div>
            <input
              name="name"
              type="text"
              placeholder="Tatya Vinchu"
              className="email-input"
              onChange={handleChange}
            />
          </label>
          <label>
            <div className="label">Username</div>
            <input
              name="username"
              type="text"
              placeholder="zapatlela"
              className="email-input"
              onChange={handleChange}
            />
          </label>
          <label>
            <div className="label">Date of Birth</div>
            <input
              name="dob"
              type="date"
              placeholder="13/06/2002"
              className="email-input"
              onChange={handleChange}
            />
          </label>
          <label>
            <div className="label">Institute Name</div>
            <input
              name="institutename"
              type="text"
              placeholder="NIT, Trichy"
              className="email-input"
              onChange={handleChange}
            />
          </label>
          <label>
            <div className="label">Passing Year</div>
            <input
              name="institutename"
              type="Number"
              placeholder="2025"
              className="email-input"
              onChange={handleChange}
            />
          </label>
          <button className="sign-up-button">Finish</button>
        </form>
      </div>
    </div>
  );
}

export default Details;
