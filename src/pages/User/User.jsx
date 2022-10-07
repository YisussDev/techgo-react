import React from 'react'
import { Navigate } from 'react-router-dom'
import './User.css'

const User = () => {
    const user = localStorage.getItem('user')
  return (
    <>
    {!user && <Navigate to='/login' />}
        <div className='user'>
            <div className='user_card'>
                <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="" />
                <h3>{user}</h3>
            </div>
        </div>
    </>
  )
}

export default User