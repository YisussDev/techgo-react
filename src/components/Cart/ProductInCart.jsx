import axios from 'axios'
import React from 'react'
import './ProductCart.css'
import getConfig from '../../utils/getConfig'
import { getCartThunk } from '../../store/slices/cart.slice'
import { useDispatch } from 'react-redux'

const ProductInCart = ({title, quantity, id}) => {
  const dispatch = useDispatch()

  const deleteProduct = () => {
    axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
    .then(()=> dispatch(getCartThunk()))
  }

  return (
    <div className='product_cart'>
        <div className='product_cart-info'>
            <p title={title}>{title.substring(0,20)}...</p>
            <div>
                <button>-</button> <p>{quantity}</p> <button>+</button>
            </div>

        </div>
        <button onClick={()=>deleteProduct(id)} className='product_cart-delete'></button>
    </div>
  )
}

export default ProductInCart