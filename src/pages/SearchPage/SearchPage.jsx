import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Cards from '../../components/Cards/Cards'
import './SearchPage.css'

const SearchPage = () => {
  const {name} = useParams()
  const {products} = useSelector(state => state)
  const [data, setData] = useState([])
  useEffect(()=>{
    const nameMayus = name.toUpperCase()
    const productSearch = products.filter(product => product.title.toUpperCase().startsWith(nameMayus))
    setData(productSearch);
  },[name, products])


  return (
    <div className='search'>
      {
        data.map(res=>{
          return <Cards
          id={res.id}
          key={res.id}
          title={res.title} 
          productImgs={res.productImgs}
          price={parseFloat(res.price)}
          category={res.category.name}
          />
        })
      }
    </div>
  )
}

export default SearchPage