import React from "react";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcome-page mb-3">
      <div className="motive mb-3">
        <h1>
          ch
          <i>
            <s>N</s>
          </i>
          ce
        </h1>
        <p className="paragraph mb-3">- Get and Give chance for the skill -</p>
      </div>
      <p className="paragraph mb-3">
        You can Hire or Get hired by our website by just registering in it
      </p>
      <h1 className="banner mb-3">Hard work + Smart work = Success</h1>
      <div className="mb-3">
        <NavLink to="/test" className="btn-login mx-2 px-5">
          LogIn
        </NavLink>
        <NavLink to="/signup" className="btn-signup mx-2 px-5">
          Sign Up
        </NavLink>
        <br />
      </div>
      <small className="paragraph mb-3">
        ( This is a demo website similar to the job searching and hiring website
        for portfolio project )
      </small>
    </div>
  );
};

export default WelcomePage;
