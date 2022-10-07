import React from 'react'
import './Search.css'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()

  const searchProduct = e =>{
    e.preventDefault()
    navigate(`/search/${e.target.nameSearch.value}`)
  }

  return (
    <div className='search_container'>
        <form onSubmit={searchProduct}>
            <input type="text" name='nameSearch' placeholder='Ingrese una búsqueda...'/>
            <button><BsSearch /></button>
        </form>
    </div>
  )
}

export default Search