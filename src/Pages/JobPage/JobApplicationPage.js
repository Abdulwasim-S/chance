import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const JobApplicationPage = () => {
    const navTo = useNavigate();
    const [state,setState]=useState("");
  const fieldValidationSchema = yup.object({
    email: yup.string().required("Enter email"),
    message: yup.string().required("Enter Message")
  });
  const {handleChange,handleBlur,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{
        email:'',
        message:''
    },
    validationSchema:fieldValidationSchema,
    onSubmit:async (applicationInfo)=>{
        try{
            console.log(localStorage["chance-application-mail"])
            const response = await fetch(
                "https://chance-backend.vercel.app/send-mail",
                {
                  method: "POST",
                  body: JSON.stringify(applicationInfo),
                  headers: {
                    "Content-Type": "application/json",
                    "chance-application-mail":localStorage["chance-application-mail"]
                  },
                }
              );
              const data = await response.json();
              console.log(data)
              if(data.message !== "Applied"){
                setState(data.message);
              }
              else{
                setState(data.message);
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
        <textarea
          className={`form-control ${touched.message && errors.message ? "border-danger border-2" : ""}`}
          id="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="message"
        />
        <br />
        <button type="submit" className="btn-signup mb-3" >
          Apply
        </button><br/>
        <span className="text-danger">{state}</span>
      </form>
    </div>
  );
}

export default JobApplicationPage