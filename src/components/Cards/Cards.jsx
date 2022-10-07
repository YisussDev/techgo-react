import React from 'react'
import { Link } from 'react-router-dom'
import './Cards.css'
import { BsFillCartFill } from 'react-icons/bs'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { getCartThunk } from '../../store/slices/cart.slice'
import { useDispatch } from 'react-redux'

const Cards = ({title, productImgs, id, price, category}) => {
  const dispatch = useDispatch()


  const addToCart = (data) => {
    const product = {
      id: data,
      quantity: 1
    }

      axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())
      .then(res => dispatch(getCartThunk()))
      .catch(res => {
        if(res.response.status === 400){
          alert('ya existe')
        }
      }

        )
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