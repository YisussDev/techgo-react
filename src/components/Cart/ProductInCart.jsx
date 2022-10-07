import React from 'react'
import './ProductCart.css'

const ProductInCart = ({title, quantity}) => {
  return (
    <div className='product_cart'>
        <div className='product_cart-info'>
            <p title={title}>{title.substring(0,20)}...</p>
            <div>
                <button>-</button> <p>{quantity}</p> <button>+</button>
            </div>

        </div>
        <button className='product_cart-delete'>

        </button>
    </div>
  )
}

export default ProductInCart