import React from 'react'
import './Login.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGELOADING } from '../../store/slices/loading.slice';
import { setUser } from '../../store/slices/user.slice';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(state => state)


  const submit = data => {
    if (data.email.length > 5 && data.password.length > 5) {
      data.email = data.email.trim();
      data.password = data.password.trim();
      dispatch(CHANGELOADING(true))
      axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
        .then(res => localStorage.setItem('token', res.data.data.token))
        .then(()=> dispatch(setUser(localStorage.getItem('token'))))
        .then(()=> navigate('/'))
        .then(()=> dispatch(CHANGELOADING(false)))
        .catch(err => console.log(err))
    }
    else {
      alert('rellena los campos plis')
    }
  }
  


  return (
    <>
    {user && <Navigate to='/' />}
      <div className='login'>
        <div className='form_login'>
          <h3>Welcome! <br />Enter your email and <br />your password to continue</h3>
          <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="">
              Email: <br />
              <input type="text" {...register('email')} className='input_login' placeholder='Enter your email...' />
            </label>
            <label htmlFor="">
              Password: <br />
              <input type="text" {...register('password')} className='input_login' placeholder='Enter your password...' />
            </label><br />
            <button type='submit'>Sign In!</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login