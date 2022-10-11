import React from 'react'
import './Login.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGELOADING } from '../../store/slices/loading.slice';
import { setUser } from '../../store/slices/user.slice';
import Swal from 'sweetalert2'

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
        .then(res =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged Successfully',
            showConfirmButton: false,
            timer: 1500,
          })
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('user', res.data.data?.user?.firstName + ' ' + res.data.data?.user?.lastName)
        })
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
              <input type="text" {...register('email')} autoComplete='off' className='input_login' placeholder='Enter your email...' />
            </label>
            <label htmlFor="">
              Password: <br />
              <input type="password" {...register('password')} autoComplete='off' className='input_login' placeholder='Enter your password...' />
            </label><br />
            <button type='submit'>Sign In!</button>
          </form>
          Not Registered? <Link to='/register'>Sign up</Link>
        </div>
      </div>
    </>
  )
}

export default Login