import React from 'react'
import './Register.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGELOADING } from '../../store/slices/loading.slice';

const Register = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state)
  
  
    const submit = data => {
      if (data.email.length >= 5 && data.password.length >= 5 && data.firstName.length >= 5 && data.lastName.length >= 5 && data.phone.length >= 10 ) {
        data.email = data.email.trim();
        data.password = data.password.trim();
        data.firstName = data.firstName.trim();
        data.lastName = data.lastName.trim();
        data.role = 'admin'
        dispatch(CHANGELOADING(true))
        axios.post('https://e-commerce-api.academlo.tech/api/v1/users/', data)
          .then(res => navigate('/') )
          .then(()=> dispatch(CHANGELOADING(false)))
          .catch(err => console.log(err))
      }
      else {
        alert('Debes llenar los datos correctamente. /n Correo válido. /n Numero Telefónico +10 caracteres')
      }
    }
    
  
  
    return (
      <>
      {user && <Navigate to='/' />}
        <div className='login'>
          <div className='form_register'>
            <h3>Register</h3>
            <form onSubmit={handleSubmit(submit)}>
              <label>
                First Name: <br />
                <input type="text" {...register('firstName')} className='input_login' placeholder='Enter your first name...' />
              </label>
              <label>
                Last Name: <br />
                <input type="text" {...register('lastName')} className='input_login' placeholder='Enter your last name...' />
              </label>
              <label>
                Email: <br />
                <input type="email" {...register('email')} className='input_login' placeholder='Enter your email...' />
              </label>
              <label>
                Password: <br />
                <input type="password" {...register('password')} className='input_login' placeholder='Enter your password...' />
              </label>
              <label>
                Phone: <br />
                <input type="number" {...register('phone')} className='input_login' placeholder='Enter your phone...' />
              </label>
              <button type='submit' style={{heigth: '55px'}}>Sign In!</button>
            </form>
            <p>You have an account? <Link to='/login'>Sign in</Link></p> 
          </div>
        </div>
      </>
    )
}

export default Register