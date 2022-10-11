import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Purchases.css'
import getConfig from '../../utils/getConfig'
import CardHistory from './CardHistory'
import { Navigate } from 'react-router-dom'

const Purchases = () => {
  const [data, setData] = useState([])
  const { user } = useSelector(state => state)
  useEffect(()=>{
    if(user){
      axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases/', getConfig())
      .then(res => setData(res.data.data.purchases))
      .catch(err => console.error(err))
    }
  },[user])

  return (
    <>
    {!user&& <Navigate to='/' />}
      <div className='purchases'>
        <div className='purchases_container'>
          {
            data.map((item, index) => {
              return <CardHistory products={item.cart.products} key={item.id} date={item.createdAt} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default Purchases