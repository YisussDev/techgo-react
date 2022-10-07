import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SearchPage from './pages/SearchPage/SearchPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Spinner from './components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProductsThunk } from './store/slices/products.slice';
import { setUser } from './store/slices/user.slice';
import { getCartThunk } from './store/slices/cart.slice';

function App() {
  const token = localStorage.getItem('token')
  const {loading} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProductsThunk())
  },[dispatch])

  useEffect(()=>{
    if (token){
      dispatch(setUser(token))
      dispatch(getCartThunk())
    }
  },[dispatch, token])

  return (
    <HashRouter>
      {loading&&<Spinner />}
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/search/:name' element={<SearchPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
