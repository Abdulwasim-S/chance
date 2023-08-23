import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const ResetPasswordPage = () => {
    const navTo = useNavigate();
    const [state,setState]=useState("");
  const fieldValidationSchema = yup.object({
    confirm_password: yup.string().required("Confirm Password"),
    password: yup.string().required("Enter password")
  });
  const {handleChange,handleBlur,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{
        confirm_password:'',
        password:''
    },
    validationSchema:fieldValidationSchema,
    onSubmit:async (passwordInfo)=>{
        try{
            const response = await fetch(
                "https://chance-backend.vercel.app/resetpassword",
                {
                  method: "PUT",
                  body: JSON.stringify(passwordInfo),
                  headers: {
                    "Content-Type": "application/json",
                    "x-auth-token":localStorage["chance-token"],
                    email:localStorage['chance-email']
                  },
                }
              );
              const data = await response.json();
              console.log(data)
              if(data.message !== "password updated"){
                setState(data.message);
              }
              else{
                setState(data.message);
                localStorage.setItem("chance-token", data.token);
                localStorage.setItem("chance-email", data.email);
                navTo('/');
              }
        }
        catch(error){
            console.log(error)
        }
    }
  })
  return (
    <div>
      <h1 className="Login-heading m-3">Password reset</h1>
      <form className="px-5 mb-5" onSubmit={handleSubmit}>
        <input
          className={`form-control ${touched.password && errors.password ? "border-danger border-2" : ""}`}
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter new password"
        />
        <br />
        <input
          className={`form-control ${touched.confirm_password && errors.confirm_password ? "border-danger border-2" : ""}`}
          id="confirm_password"
          type="password"
          value={values.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="confirm password"
        />
        <br />
        <button type="submit" className="btn-signup mb-3" >
          Reset Password
        </button><br/>
        <span className="text-danger">{state}</span>
      </form>
    </div>
  );
}

export default ResetPasswordPage
