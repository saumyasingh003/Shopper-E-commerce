import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import categoryReducer from './CategorySlice'
import productReducer from './ProductSlice'
// import orderReducer from "../reducers/order.reducer";
// import categoryReducer from "../reducers/category.reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    // order: orderReducer,
    category: categoryReducer,
  },
});

export default store;
