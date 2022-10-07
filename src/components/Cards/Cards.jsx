import React from 'react'
import { Link } from 'react-router-dom'
import './Cards.css'
import { BsFillCartFill } from 'react-icons/bs'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { getCartThunk } from '../../store/slices/cart.slice'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Cards = ({title, productImgs, id, price, category}) => {
  const dispatch = useDispatch()
  const {cart} = useSelector(state => state)


  const addToCart = (id) => {

    const find = cart.filter(res => res.id === parseInt(id))
    if(find[0]){
      const productReload = {
        id: parseInt(id),
        newQuantity: parseInt(find[0].productsInCart.quantity) + 1
      }
      axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productReload, getConfig())
      .then(()=> {
        dispatch(getCartThunk())
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 1500,
        })
      })
    }
    else{
      const productNew= {
        id: parseInt(id),
        quantity: 1
      }
      axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productNew, getConfig())
      .then(()=> {
        dispatch(getCartThunk())
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 1500,
        })
      })
    }
  }

  return (
    <div className='cards'>
          <Link style={{textDecoration: 'none'}} to={`/product/${id}`}>
            <div className='img_container'>
                <img src={productImgs?.[0]} alt="" className='img_primary'/>
                <img src={productImgs?.[1]} alt="" className='img_secondary'/>
            </div>
            <p style={{color: '#292929'}}>{category}</p>
            <h4 title={title} style={{color: 'var(--color-first)'}}><strong>{title.substring(0,15)}...</strong></h4>
            <p style={{color: '#292929'}}>Price:</p>
            <div className='prices'><strong>${price}.00</strong> <p style={{color: 'var(--color-first)'}}>${price+ 500}.00</p> </div>
            </Link>
            <button onClick={()=>addToCart(id)}><BsFillCartFill /></button>
        </div>
  )
}

export default Cards