import React, { useEffect, useState } from 'react'
import './Purchases.css'

const CardHistory = ({products, date}) => {
    const [newDate, setNewDate] = useState(new Date(date))
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

    useEffect(() => {
        const dateNew = new Date(date)
        setNewDate(dateNew)
    },[date])

  return (
    <div className='card_history'>
        <h2>{months[newDate.getMonth()]} {newDate.getDate()}, {newDate.getFullYear()}</h2>
        <ul>
            {
                products.map(product => 
                     <li className='list_product' key={product.id}>
                        <div className='info_product'>
                            <p>{product.title.substring(0,20)}...</p>
                            <p>{product.productsInCart.quantity}</p>
                            <p>${product.productsInCart.quantity*product.price}.00</p>
                        </div>
                     </li> )
            }
        </ul>

    </div>
  )
}

export default CardHistory