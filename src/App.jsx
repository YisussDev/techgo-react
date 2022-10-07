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
import User from './pages/User/User';
import Register from './pages/Register/Register';
import Footer from './components/Footer/Footer';

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
        <Route path='/register' element={<Register />} />
        <Route path='/user' element={<User />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/search/:name' element={<SearchPage />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
