import axios from 'axios'
import React from 'react'
import './ProductCart.css'
import getConfig from '../../utils/getConfig'
import { getCartThunk } from '../../store/slices/cart.slice'
import { useDispatch } from 'react-redux'
import { BsTrash } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { FaPlus, FaMinus } from 'react-icons/fa'


const ProductInCart = ({title, quantity, id, price, category}) => {
  const dispatch = useDispatch()

  const deleteProduct = () => {
    axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
    .then(()=> {
      dispatch(getCartThunk())
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Product',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  const updateProductMinus = (id) => {
    const productUpdate = {
      id: id,
      newQuantity: quantity-1
    }
    if(quantity > 1){
      axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productUpdate, getConfig())
      .then(()=>{
        dispatch(getCartThunk())
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated Product',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
    else{
      axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
      .then(()=> {
        dispatch(getCartThunk())
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deleted Product',
          showConfirmButton: false,
          timer: 1500,
        })
      })
    }
  }
  const updateProductPlus = (id) => {
    const productUpdate = {
      id: id,
      newQuantity: quantity+1
    }
      axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productUpdate, getConfig())
      .then(()=>{
        dispatch(getCartThunk())
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated Product',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }


  return (
    <div className='product_cart'>
        <div className='product_cart-info'>
            <p title={title}>{title.substring(0,20)}...</p>
            <p>{category}</p>
            <p><strong style={{color: 'var(--color-thirty)'}}>Price Total: </strong> ${quantity*price}.00</p>
            <div>
                <button onClick={()=>updateProductMinus(id)}><FaMinus /></button> <p>{quantity}</p> <button onClick={()=>updateProductPlus(id)}><FaPlus /></button>
            </div>

        </div>
        <button onClick={()=>deleteProduct(id)} className='product_cart-delete'><BsTrash /></button>
    </div>
  )
}

export default ProductInCart