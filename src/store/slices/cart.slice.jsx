import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig'
import { CHANGELOADING } from './loading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) =>{
            return action.payload
        },
        restoreCart: (state, action) =>{
            return []
        }

    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(CHANGELOADING(true));
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
      .then((res) => dispatch(setCart(res.data.data.cart.products)))
      .catch(() => dispatch(restoreCart()))
      .finally(() => dispatch(CHANGELOADING(false)))
  };

export const { setCart, restoreCart } = cartSlice.actions;

export default cartSlice.reducer;
