import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CounterProducts = () => {
  const {cart} = useSelector(state => state)
  const [total, setTotal] = useState(0)
  useEffect(()=>{
    let totalPrice=0;
    cart.forEach(item=>{
      totalPrice+=item.price*item.productsInCart.quantity
    })
    setTotal(totalPrice)

  },[cart])

  return (
    <h2 style={{color: 'var(--color-thirty)', textAlign: 'end', padding: '10px 20px'}}><strong>Total: </strong>  ${total}.00</h2>
  )
}

export default CounterProducts