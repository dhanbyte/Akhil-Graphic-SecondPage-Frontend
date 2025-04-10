import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const OrderFetch = createAsyncThunk("OrderFetch", async () => {

  const response = await fetch(`https://akhil-graphic-part-twobackend.onrender.com/api/order/orderOutput`);

  return response.json();
});
console.log("orderFetchData",OrderFetch);


const OrderSlice = createSlice({
  name: "order",
  initialState: {
    isloading: true,
    data: [],
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OrderFetch.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      })
      .addCase(OrderFetch.pending, (state) => {
        state.isloading = true;
      })
      .addCase(OrderFetch.rejected,(state,action) =>{
        console.log("Error", action.payload);
        
        state.isloading = true;
      })
  },
});

export default OrderSlice.reducer;
