import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {get, post , del} from '../api_helpers/config'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories', 
  async ( _,{ rejectWithValue }) => {
    try {
      const response = await get('/category/getCategory');
      const data = await response.categoryList;
      return data;
    } catch (error) {
      
        return rejectWithValue(error.message);
      
    }
  }
);
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await post('/category/create', categoryData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, categoryData }, thunkAPI) => {
      try {
          const response = await put(`/category/update/${id}`, categoryData);
          return response;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response);
      }
  }
);


export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async ({ id }, thunkAPI) => {
    try {
      const response = await del(`/category/delete/${id}`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);



const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    categories: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default categorySlice.reducer;
