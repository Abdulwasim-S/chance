import React, { useState } from 'react';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

const LoginPage = () => {
    const navTo = useNavigate();
    const [state,setState]=useState("");
  const fieldValidationSchema = yup.object({
    email: yup.string().required("Enter email"),
    password: yup.string().required("Enter password")
  });
  const {handleChange,handleBlur,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{
        email:'',
        password:''
    },
    validationSchema:fieldValidationSchema,
    onSubmit:async (logInInfo)=>{
        try{
          setState("Please wait...")
            const response = await fetch(
                "https://chance-backend.vercel.app/login",
                {
                  method: "POST",
                  body: JSON.stringify(logInInfo),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              console.log(data)
              if(data.message !== "login success"){
                setState(data.message);
              }
              else{
                setState(data.message);
                localStorage.setItem("chance-token", data.token);
                localStorage.setItem("chance-email", data.email);
                navTo('/jobs');
              }
        }
        catch(error){
            console.log(error)
        }
    }
  })
  return (
    <div>
      <h1 className="Login-heading m-3">LogIn</h1>
      <form className="px-5 mb-5" onSubmit={handleSubmit}>
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
          Login
        </button><br/>
        <small className="mb-3">
            I dont't have an account - <NavLink to={'/signup'}>SignUp</NavLink>
        </small><br/>
        <small className="mb-3">
            Forget Password - <NavLink to={'/forget-password'}>Click Here</NavLink>
        </small>
      </form>
    </div>
  );
}

export default LoginPage