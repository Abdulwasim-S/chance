import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const JobPage = () => {
  const [datas, setData] = useState([]);
  const navTo = useNavigate();
  useEffect(() => {
    try {
      async function getData() {
        const response = await fetch("https://chance-backend.vercel.app/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage["chance-token"],
            email: localStorage["chance-email"],
          },
        });
        const data = await response.json();
        setData(data.jobs);
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function searchFilter(filterKey){
    var boxes=document.getElementsByClassName('filter-card');
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      if (((box.id).toLowerCase()).includes(filterKey)) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    }
  }
  const application=(email)=>{
    localStorage.setItem("chance-application-mail",email);
    navTo("/apply");

  }
  return (
    <div className="mt-3 mb-3">
      <div className="mx-5 mb-3 mt-3 row">
        <input
          type="text"
          className="col-md-5 searchbar mb-2"
          placeholder="Search Job..."
          onChange={(e)=>searchFilter((e.target.value).toLowerCase())}
        />
        <span type="text" className="col-md-2 mb-2" />
        <NavLink className="col-md-5 btn-post-job" to={"/post-new-job"}>
          Post New Job
        </NavLink>
      </div>
      <hr/>
      {datas.length === 0 && <h1>No Jobs Found</h1>}
      {datas.length !== 0 && <h1>Jobs List</h1>}
      <div className="jobs-row row m-3">
        {datas.length > 0 &&
          datas.map((ele, idx) => (
            <div className="filter-card col-md-4 col-sm-6 my-3" id={(ele.role+ele.skillsRequired+ele.qualification)}>
              <div class="card">
                <div class="card-body text-start px-5">
                  <h5 class="card-title">Role : {ele.role}</h5>
                  <p class="card-text">Company Name : {ele.company}</p>
                  <p class="card-text">Skills : {ele.skillsRequired}</p>
                  <p class="card-text">Qualification : {ele.qualification}</p>
                  <p class="card-text">Experience : {ele.experience}</p>
                  <p class="card-text">MM/DD/YY : {ele.date}</p>
                  <button className="btn-signup" onClick={()=>application(ele.email)}>Apply</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobPage;
