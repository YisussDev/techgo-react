import React from 'react'
import './Cart.css'
import { FaArrowCircleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ProductInCart from './ProductInCart';
import axios from 'axios';
import CounterProducts from './CounterProducts';
import getConfig from '../../utils/getConfig'
import { getCartThunk } from '../../store/slices/cart.slice';

const Cart = ({isOpen, closeSidebar}) => {
  const dispatch = useDispatch()
  const {cart} = useSelector(state => state)

  const purchaseCart = () => {
    axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases',{},getConfig())
    .then(() => dispatch(getCartThunk()))
    .catch(error => console.log(error))
  }

  return (
    <div className={`sidebar ${isOpen&&"show"}` }>
        {
          cart[0]?
            (
            <>
            <ul>
            {
              cart.map((res) => <ProductInCart category={res.brand} price={res.price} key={res.id} id={res.id} title={res.title} quantity={res.productsInCart?.quantity} />)
            }
            </ul>
            <button className='close_button' onClick={closeSidebar}><FaArrowCircleRight /></button>
            <CounterProducts />
            <button className='purchase_button' onClick={purchaseCart}>Purchase</button>
            </>
            )
            :
            (
            <>
            <button className='close_button' onClick={closeSidebar}><FaArrowCircleRight /></button>
            <img className='empty_cart' src="./images/empty-cart.png" alt="" />
            <h2>Oops! Your Cart is Empty!</h2>
            </>
            )
        }
    </div>
  )
}

export default Cart