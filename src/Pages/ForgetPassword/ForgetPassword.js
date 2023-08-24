import { useFormik } from 'formik';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const ForgetPassword = () => {
    const navTo = useNavigate();
    const [state,setState]=useState("");
  const fieldValidationSchema = yup.object({
    email: yup.string().required("Enter email")
  });
  const {handleChange,handleBlur,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{
        email:''
    },
    validationSchema:fieldValidationSchema,
    onSubmit:async (info)=>{
        try{
            const response = await fetch(
                "https://chance-backend.vercel.app/forgetpassword",
                {
                  method: "PUT",
                  body: JSON.stringify(info),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              console.log(data)
              if(data.message !== "Check you mail for reset link success"){
                setState(data.message);
              }
              else{
                setState(data.message);
                localStorage.setItem("chance-token", data.token);
                localStorage.setItem("chance-email", data.email);
                navTo('/mail');
              }
        }
        catch(error){
            console.log(error)
        }
    }
  })
  return (
    <div>
      <h1 className="Login-heading m-3">Forget Password</h1>
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
        <button type="submit" className="btn-signup mb-3" >
          Next
        </button><br/>
        <small className="mb-3">
            I dont't have an account - <NavLink to={'/signup'}>SignUp</NavLink>
        </small><br/>
        <span className="text-danger">{state}</span>
      </form>
    </div>
  );
}

export default ForgetPassword;