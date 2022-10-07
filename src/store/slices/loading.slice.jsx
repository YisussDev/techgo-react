import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        CHANGELOADING: (state, action)=>{
            return action.payload
        }
    }
})

export const { CHANGELOADING } = loadingSlice.actions;

export default loadingSlice.reducer;
