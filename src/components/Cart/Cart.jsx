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
    .catch(error => console.log(error))
  }

  // useEffect(()=>{

  // },[])


  return (
    <div className={`sidebar ${isOpen&&"show"}` }>
        {
          cart[0]?
            (
            <>
            <ul>
            {
              cart.map((res, ind) => <ProductInCart key={res.id} id={res.id} title={res.title} quantity={res.productsInCart?.quantity} />)
            }
            </ul>
            <button className='close_button' onClick={closeSidebar}><FaArrowCircleRight /></button>
            <button className='purchase_button' onClick={purchaseCart}>Purchase</button>
            </>
            )
            :
            (
            <>
            <button className='close_button' onClick={closeSidebar}><FaArrowCircleRight /></button>
            <img className='empty_cart' src="./images/empty-cart.png" alt="" />
            </>
            )
        }
    </div>
  )
}

export default Cart