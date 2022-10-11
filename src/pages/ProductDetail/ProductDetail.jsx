import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetail.css'
import { BiPlus, BiMinus, BiCart } from 'react-icons/bi'
import { CHANGELOADING } from '../../store/slices/loading.slice'
import { useDispatch, useSelector } from 'react-redux'
import getConfig from '../../utils/getConfig'
import { getCartThunk } from '../../store/slices/cart.slice'
import Swal from 'sweetalert2'



const ProducDetail = () => {
  const dispatch = useDispatch()
  const [data, setData]= useState([])
  const [imagePosition, setImagePosition] = useState(0)
  const [itemSelected, setItemSelected] = useState(1)
  const {cart} = useSelector(state => state)
  const {id} = useParams()

  useEffect(()=>{
    window.scroll(0,0)
    dispatch(CHANGELOADING(true))
    axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
    .then(res => setData(res.data.data.product))
    .catch(error => console.log(error))
  },[id,dispatch])

  const plusItem = () => {
    setItemSelected(itemSelected+1)
  }
  const minusItem = () => {
    if(itemSelected > 1){
      setItemSelected(itemSelected-1)
    }
  }
  const nextImage = () => {
    if(imagePosition < 2){
      setImagePosition(imagePosition+1)
    }
  }
  const prevImage = () => {
    if(imagePosition > 0){
      setImagePosition(imagePosition-1)
    }
  }
  const buttonSelected = {
    border: '2px solid var(--color-thirty)',
    borderRadius: '10px'
  }
  const buttonUnSelected = {
    border: '2px solid white',
    borderRadius: '10px'
  }
  const purchaseProduct = () => {
    const find = cart.filter(res => res.id === parseInt(id))
    if(find[0]){
      const productReload = {
        id: parseInt(id),
        newQuantity: parseInt(find[0].productsInCart.quantity) + itemSelected
      }
      axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productReload, getConfig())
      .then(()=>{
        dispatch(getCartThunk())
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 1500,
        })
      })
    }
    else{
      const productNew= {
        id: parseInt(id),
        quantity: itemSelected
      }
      axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productNew, getConfig())
      .then(()=> {
        dispatch(getCartThunk())
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 1500,
        })
      })
    }
  }
  

  return (
    <div className='product_detail'>
    
      <div className='detail'>
        <div className='detail_carrousel'>
          <button className='previous_button' onClick={prevImage}>-</button>
          <button className='next_button' onClick={nextImage}>+</button>
          <div className='container_img'>
            <ul style={{transform: `translateX(-${300*imagePosition}px)`}}>
              <li><img src={data.productImgs?.[0]} alt="" /></li>
              <li><img src={data.productImgs?.[1]} alt="" /></li>
              <li><img src={data.productImgs?.[2]} alt="" /></li>
            </ul>
          </div>
          <div className='thumb_png'>
              <div onClick={()=> setImagePosition(0)} style={imagePosition===0?(buttonSelected):(buttonUnSelected)}><img onLoad={()=> dispatch(CHANGELOADING(false))} src={data.productImgs?.[0]} alt="" /></div>
              <div onClick={()=> setImagePosition(1)} style={imagePosition===1?(buttonSelected):(buttonUnSelected)}><img src={data.productImgs?.[1]} alt="" /></div>
              <div onClick={()=> setImagePosition(2)} style={imagePosition===2?(buttonSelected):(buttonUnSelected)}><img src={data.productImgs?.[2]} alt="" /></div>
          </div>
        </div>
        <div className='detail_info'>
          <h1><strong>{data.title}</strong></h1>
          <p>{data.description}</p>
          <div>
            <div>
              Price <br />
              <div className='price'>$ {parseFloat(data.price)*itemSelected}</div>
            </div>
            <div>
              Quantity <br />
              <div className='button_quantity'>
                <button onClick={minusItem}><BiMinus /></button> <div>{itemSelected} </div><button onClick={plusItem}><BiPlus /></button>
              </div>
            </div>
          </div>
          <button onClick={purchaseProduct}><strong>Add to cart <BiCart /></strong></button>
        </div>
      </div>
    </div>
  )
}

export default ProducDetail