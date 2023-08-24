import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const PostNewJob = () => {
    const navTo = useNavigate();
    const [state,setState]=useState("");
  const fieldValidationSchema = yup.object({
    company: yup.string().required("Enter name"),
    email: yup.string().required("Enter email"),
    qualification: yup.string().required("Enter qualification"),
    role: yup.string().required("Enter Role"),
    experience: yup.string().required("Enter your experience"),
    skillsRequired: yup.string().required("Enter Required Skills"),
  });
  const {handleChange,handleBlur,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{
        company:'',
        email:'',
        qualification:'',
        role:'',
        skillsRequired:'',
        experience:'',
    },
    validationSchema:fieldValidationSchema,
    onSubmit:async (jobInfo)=>{
        try{
            const response = await fetch(
                "https://chance-backend.vercel.app/post-job",
                {
                  method: "POST",
                  body: JSON.stringify(jobInfo),
                  headers: {
                    "Content-Type": "application/json",
                    "x-auth-token":localStorage["chance-token"],
                    email:localStorage['chance-email']
                  },
                }
              );
              const data = await response.json();
              if(data.message !== "Job posted"){
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
      <h1 className="signup-heading m-3">Post New job</h1>
      <form className="px-5 mb-5" onSubmit={handleSubmit}>
        <input
          className={`form-control ${touched.role && errors.role ? "border-danger border-2" : ""}`}
          id="role"
          type="text"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Role"
        />
        <br />
        <input
          className={`form-control ${touched.company && errors.company ? "border-danger border-2" : ""}`}
          id="company"
          type="text"
          value={values.company}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Company"
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
          placeholder="Qualification"
        />
        <br />
        <input
          className={`form-control ${touched.skillsRequired && errors.skillsRequired ? "border-danger border-2" : ""}`}
          id="skillsRequired"
          type="text"
          value={values.skillsRequired}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Skills Required"
        />
        <br />
        <input
          className={`form-control ${touched.experience && errors.experience ? "border-danger border-2" : ""}`}
          id="experience"
          type="experience"
          value={values.experience}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Experience"
        />
        <br />
        <button type="submit" className="btn-signup mb-3" >
          Post New Job
        </button><br/>
        <span className="text-danger">{state}</span>
      </form>
    </div>
  );
}

export default PostNewJob