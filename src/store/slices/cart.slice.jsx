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
        }

    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(CHANGELOADING(true));
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
      .then((res) => dispatch(setCart(res.data.data.cart.products)))
      .catch((err) => console.log(err))
      .finally(() => dispatch(CHANGELOADING(false)));
  };

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
