import React from 'react'
import './Search.css'
import { BsSearch } from 'react-icons/bs'

const Search = () => {
  return (
    <div className='search_container'>
        <form>
            <input type="text" placeholder='Ingrese una búsqueda...'/>
            <button><BsSearch /></button>
        </form>
    </div>
  )
}

export default Search