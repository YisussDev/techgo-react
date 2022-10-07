import React from 'react'
import './Cart.css'
import { FaArrowCircleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ProductInCart from './ProductInCart';
import axios from 'axios';
import getConfig from '../../utils/getConfig'
import { getCartThunk } from '../../store/slices/cart.slice';

const Cart = ({isOpen, closeSidebar}) => {
  const dispatch = useDispatch()
  const {cart} = useSelector(state => state)

  const purchaseCart = () => {
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases',{},getConfig())
    .then(() => dispatch(getCartThunk()))
    .then(() => window.location.reload())
    .catch(error => console.log(error))
  }

  // useEffect(()=>{

  // },[])


  return (
    <div className={`sidebar ${isOpen&&"show"}` }>
        <ul>
            {
              cart.map((res, ind) => <ProductInCart key={ind} title={res.title} quantity={res.productsInCart?.quantity} />)
            }
        </ul>
        <button className='close_button' onClick={closeSidebar}><FaArrowCircleRight /></button>
        <button className='purchase_button' onClick={purchaseCart}>Purchase</button>
    </div>
  )
}

export default Cart