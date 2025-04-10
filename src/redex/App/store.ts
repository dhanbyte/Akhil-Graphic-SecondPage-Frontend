import { configureStore } from "@reduxjs/toolkit";
import OrderReducer from "../Slices/OrderInputSlice";

export const store = configureStore({
    reducer:{
        order:OrderReducer,

    },
})


export default store;