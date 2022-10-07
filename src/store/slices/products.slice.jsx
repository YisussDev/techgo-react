import { createSlice } from '@reduxjs/toolkit';
import { CHANGELOADING } from './loading.slice';
import axios from 'axios';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action)=>{
            const products = action.payload
            return products
        }

    }
})
export const getProductsThunk = () => (dispatch) => {
    dispatch(CHANGELOADING(true));
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(CHANGELOADING(false)));
  };

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
