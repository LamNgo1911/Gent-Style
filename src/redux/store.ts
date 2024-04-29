import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import { useDispatch } from "react-redux";
import productQueries from "./productQuery";

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
    users: userSlice,
    orders: orderReducer,
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

store.subscribe(() => {
  const currentState = store.getState();
  const userInformation = currentState.users.user;
  const token = currentState.users.access_token;
  // store user
  localStorage.setItem("userInformation", JSON.stringify(userInformation));
  // store token
  localStorage.setItem("token", JSON.stringify(token));
});

export const newStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      carts: cartReducer,
      users: userSlice,
      orderReducer,
      [productQueries.reducerPath]: productQueries.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productQueries.middleware),
  });
};
