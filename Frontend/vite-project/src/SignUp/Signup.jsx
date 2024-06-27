import React from "react";
import "./signup.css";

function SignUp() {
    
  return (
    <div className="maincont">
      <div className="heading">Create an account</div>
      <div className="sub">Enter your details to proceed further</div>
      <div className="sign-up-container">
        <form onSubmit={handleSubmit}>
          <label  className="label">
            <div>Email Id:</div>
            <input
              name="email"
              type="email"
              placeholder="Zapatlela@marathi.com"
              className="email-input"
              onChange={handleChange}
            />
          </label>
          <label>
          <div className="label">Password</div>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="email-input"
              onChange={handleChange}
            />
          </label>
          <label>
          <div  className="label">Confirm Password</div>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="email-input"
              onChange={handleChange}
            />
          </label>
          <button className="sign-up-button">Sign up with email</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
