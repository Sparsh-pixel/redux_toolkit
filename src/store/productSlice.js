import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

const initialState = {
  data: [],
  status: StatusCode.IDLE,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      });
  },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

//  Using  asyncthunk middleware for API call

export const getProduct = createAsyncThunk("products/get", async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const result = await data.json();
  return result;
});

// export function getProduct() {
//   return async function getProductThunk(dispatch, getState) {
//     const data = await fetch("https://fakestoreapi.com/products");
//     const result = await data.json();
//     dispatch(fetchProducts(result));
//   };
// }
