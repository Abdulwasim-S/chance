import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";

const SignUpPage = () => {
    const navTo = useNavigate();
    const [state,setState]=useState("");
  const fieldValidationSchema = yup.object({
    name: yup.string().required("Enter name"),
    email: yup.string().required("Enter email"),
    qualification: yup.string().required("Enter qualification"),
    password: yup.string().required("Enter password with min of 8 char").min(8)
  });
  const {handleChange,handleBlur,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{
        name:'',
        email:'',
        qualification:'',
        password:''
    },
    validationSchema:fieldValidationSchema,
    onSubmit:async (signUpInfo)=>{
        try{
          setState("Please wait...")
            const response = await fetch(
                "https://chance-backend.vercel.app/signup",
                {
                  method: "POST",
                  body: JSON.stringify(signUpInfo),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              if(data.message !== "New User Added"){
                setState(data.message);
              }
              else{
                setState(data.message);
                navTo('/login');
              }
        }
        catch(error){
            console.log(error)
        }
    }
  })
  return (
    <div>
      <h1 className="signup-heading m-3">SignUp</h1>
      <form className="px-5 mb-5" onSubmit={handleSubmit}>
        <input
          className={`form-control ${touched.name && errors.name ? "border-danger border-2" : ""}`}
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="name"
        />
        <br />
        <input
          className={`form-control ${touched.email && errors.email ? "border-danger border-2" : ""}`}
          id="email"
          type="text"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="email"
        />
        <br />
        <input
          className={`form-control ${touched.qualification && errors.qualification ? "border-danger border-2" : ""}`}
          id="qualification"
          type="text"
          value={values.qualification}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="qualification"
        />
        <br />
        <input
          className={`form-control ${touched.password && errors.password ? "border-danger border-2" : ""}`}
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="password"
        />
        <br />
        <span className="text-danger">{state}</span><br/>
        <button type="submit" className="btn-signup mb-3" >
          Create Account
        </button><br/>
        <small className="mb-3">
            Already have an account - <NavLink to={'/login'}>Login</NavLink>
        </small>
      </form>
    </div>
  );
};

export default SignUpPage;
