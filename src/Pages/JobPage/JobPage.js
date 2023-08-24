import React from 'react'
import { NavLink } from 'react-router-dom';

const JobPage = () => {
  return (
    <div>
        <NavLink className='btn-post-job' to={'/post-new-job'}>Post New Job</NavLink>
    </div>
  )
}

export default JobPage;