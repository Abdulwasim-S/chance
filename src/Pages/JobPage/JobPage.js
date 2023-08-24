import React from 'react'
import { NavLink } from 'react-router-dom';

const JobPage = () => {
  return (
    <div className='mt-3 mb-3'>
        <div className='mx-5 mb-3 mt-3 row'>
            <input type='text' className='col-md-5 searchbar mb-2' placeholder='Search Job...'/>
            <span type='text' className='col-md-2 mb-2'/>
            <NavLink className='col-md-5 btn-post-job' to={'/post-new-job'}>Post New Job</NavLink>
        </div>
    </div>
  )
}

export default JobPage;