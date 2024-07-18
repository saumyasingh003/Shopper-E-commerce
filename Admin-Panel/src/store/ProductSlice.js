import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {get, post, put , del} from '../api_helpers/config'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async ( _,{ rejectWithValue }) => {
    try {
      const response = await get('/product/getProduct');
      const data = await response.product;
      return data;
    } catch (error) {
     
        return rejectWithValue(error.message);
      
    }
  }
);
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await post('/product/create', productData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, thunkAPI) => {
      try {
          const response = await put(`/product/update/${id}`, productData);
          return response;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response);
      }
  }
);


export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ id }, thunkAPI) => {
    try {
      const response = await del(`/product/delete/${id}`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);


const productSlice = createSlice({ 
  name: "product",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
}
})


export default productSlice.reducer;
