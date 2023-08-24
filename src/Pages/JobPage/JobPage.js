import React from 'react'
import { NavLink } from 'react-router-dom';

const JobPage = () => {
  return (
    <div className='mt-3 mb-3'>
        <input type='text' className=''/>
        <NavLink className='btn-post-job mt-3 mb-3' to={'/post-new-job'}>Post New Job</NavLink>
        <NavLink className='btn-post-job mt-3 mb-3' to={'/post-new-job'}>Post New Job</NavLink>
    </div>
  )
}

export default JobPage;