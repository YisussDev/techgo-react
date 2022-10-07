import React, { useState} from 'react'
import { FaFilter, FaDollarSign, FaTags } from 'react-icons/fa';
import './Filters.css'


const Filters = ({categories, sendFilter,allProducts}) => {
    const[filtersOpen, setFiltersOpen] = useState(false)
    const[priceOpen, setPriceOpen] = useState(false)
    const[categoryOpen, setCategoryOpen] = useState(false)
    
    return (
        <div className={`filter_options ${filtersOpen && 'open'}`}>
            <button className='button_filter' onClick={() => setFiltersOpen(!filtersOpen)}>
                <FaFilter /> Filters
            </button>
            <div className={`price_option ${priceOpen && 'open'}`}>
                <button onClick={() => setPriceOpen(!priceOpen)}><FaDollarSign /> Price</button>
                <form action="">
                    <span>From</span><input type="number" name="" id="" />
                </form>
            </div>
            <div className={`category_option ${categoryOpen && 'open'}`}>
                <button onClick={() => setCategoryOpen(!categoryOpen)}><FaTags /> Category</button>
                <ul>
                    <li onClick={()=> allProducts()}>All Products</li>
                    {categories.map(res => (
                        <li onClick={()=>sendFilter(res.name)} key={res.id}>{res.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Filters