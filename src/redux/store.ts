import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

import productQueries from "./productQuery";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
    users: userSlice,
    [productQueries.reducerPath]: productQueries.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productQueries.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {products: ProductState,...}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
