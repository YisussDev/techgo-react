import { FaPhoneAlt, FaEnvelope, FaFacebook, FaLinkedin, FaShoppingBag, FaShoppingCart, FaUser } from 'react-icons/fa';
import { BsXCircleFill } from 'react-icons/bs';
import Cart from '../Cart/Cart';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGELOADING } from '../../store/slices/loading.slice';
import { setUser } from '../../store/slices/user.slice';
import Swal from 'sweetalert2'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)
  const [isOpen, setIsOpen] = useState (false)
  const closeSidebar = () => {
    setIsOpen (false)
  }
  const openSidebar = () => {
    if(user){
      setIsOpen (true)
    }
    else{
      alert('Inicia sesión para utilizar el carrito :)')
    }
  }
  const toHome = () => {
    dispatch(CHANGELOADING(true))
    navigate('/')
    setTimeout(()=>{
      dispatch(CHANGELOADING(false))
    }, 500)
  }
  const closeSesion = () => {
    dispatch(CHANGELOADING(true))
    dispatch(setUser(''))
    localStorage.clear()
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Session Closed',
      showConfirmButton: false,
      timer: 1500,
    })
    setTimeout(()=>{
      dispatch(CHANGELOADING(false))
    },500)
  }
  return (
    <div className='nav_container'>
      <header className='infoNav'>
        <div className='contact'><FaPhoneAlt />3042487457 <FaEnvelope />jesuspaguay30@gmail.com </div>
        <div className='contact'><FaFacebook />TechGo! <FaLinkedin />TechGo!</div>
      </header>
      <nav className='Nav'>
        <div className='logo_container' onClick={toHome}>
          <img src="./images/logo.png" alt="" />
        </div>
        <Search  />
        <div className='controls_nav'>
          {
          !user?
              <div title='Login' className='button_sidebar' onClick={()=> navigate('/login')}>
                <FaUser />
              </div>
              :
              <div title='Profile' className='button_sidebar' style={{color: 'green'}} onClick={()=> navigate('/user')}>
                <FaUser />
              </div>
          }
          <div title='Purchases' className='button_sidebar'>
            <FaShoppingBag />
          </div>
          <div title='Cart' className='button_sidebar' onClick={openSidebar}>
            <FaShoppingCart />
          </div>
          {user && <div title='Logout' onClick={closeSesion} className='button_sidebar close_sesion' style={{color: 'var(--color-thirty)'}}>
                      <BsXCircleFill />
                  </div>
          }
        </div>
        
      </nav>
      <Cart isOpen={isOpen} closeSidebar={closeSidebar} />
    </div>
  )
}

export default NavBar