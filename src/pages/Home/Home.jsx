import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cards from "../../components/Cards/Cards"
import Filters from "../../components/Filters/Filters.jsx"
import { CHANGELOADING } from "../../store/slices/loading.slice"
import './Home.css'


const Home = () => {
  const dispatch = useDispatch()
  const {products}= useSelector(state => state)
  const [data, setData] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(()=>{
    setData(products)
  },[products])
  useEffect(()=>{
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
    .then(res => setCategories(res.data.data.categories))
    .catch(error => console.log(error))
  },[])

  const sendFilter = categoryname => {
    dispatch(CHANGELOADING(true))
    const newFiltered = products.filter(product => product.category.name === categoryname);
    setData(newFiltered)
    setTimeout(()=> {
      dispatch(CHANGELOADING(false))
    }, 1000)
  }
  const allProducts = () => {
    dispatch(CHANGELOADING(true))
    setData(products)
    setTimeout(()=> {
      dispatch(CHANGELOADING(false))
    }, 1000)
  }
  

  return (
    <div className="home">
      <Filters categories={categories} sendFilter={sendFilter} allProducts={allProducts} />
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

export default Home