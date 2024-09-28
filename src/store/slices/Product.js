import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProductData = createAsyncThunk(
  "product/fetchProductItems",
  async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      return response.json();
    } catch (err) {
      throw err;
    }
  }
);

const slice = createSlice({
  name: "product",
  initialState: {
    list: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = "";
      })
      .addCase(getAllProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

// export const { updateAllProduct, showLoading, showError } = slice.actions;
export default slice.reducer;

export const getCartProduct = (state) => state.Product.list;
export const getProductLoading = (state) => state.Product.loading;
export const getProductError = (state) => state.Product.error;
