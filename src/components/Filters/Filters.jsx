import React, { useState } from 'react'
import { FaFilter, FaDollarSign, FaTags, FaArrowDown } from 'react-icons/fa';
import './Filters.css'


const Filters = ({ categories, sendFilter, allProducts, sendPriceFilter }) => {
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [priceOpen, setPriceOpen] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [priceInitial, setPriceInitial] = useState(10)

    const changeMin = e => {
        const value = parseInt(e.target.value)
        setPriceInitial(value)
    }
    const submitPrice = e => {
        setFiltersOpen(!filtersOpen)
         window.scroll(0,0)
        sendPriceFilter(e)
    }

    return (
        <div className={`filter_options ${filtersOpen && 'open'}`}>
            <button className='button_filter' onClick={() => setFiltersOpen(!filtersOpen)}>
                <FaFilter /> Filters
            </button>
            <div className={`price_option ${priceOpen && 'open'}`}>
                <button onClick={() => setPriceOpen(!priceOpen)}><FaDollarSign /> Price <span style={{ position: 'absolute', right: '10px', rotate: `${priceOpen ? ('180deg') : ('0deg')}`, transition: 'all .4s' }}><FaArrowDown /></span></button>
                <form onSubmit={submitPrice}>
                    <span>Min</span><br /><input type="number" defaultValue={priceInitial} onChange={changeMin} name="min" id="" /><br />
                    <span>Max</span><br /><input type="number" min={priceInitial} defaultValue={priceInitial} name="max" id="" /><br />
                    <button type='submit'>Filter!</button>
                </form>
            </div>
            <div className={`category_option ${categoryOpen && 'open'}`}>
                <button onClick={() => setCategoryOpen(!categoryOpen)}><FaTags /> Category <span style={{ position: 'absolute', right: '10px', rotate: `${categoryOpen ? ('180deg') : ('0deg')}`, transition: 'all .4s' }}><FaArrowDown /></span></button>
                <ul>
                    <li onClick={() => allProducts()}>All Products</li>
                    {categories.map(res => (
                        <li onClick={() => {sendFilter(res.name); setFiltersOpen(!filtersOpen); window.scroll(0,0)}} key={res.id}>{res.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Filters