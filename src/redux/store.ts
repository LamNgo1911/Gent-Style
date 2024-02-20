import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    // products: productReducer,
    // carts: cartReducer,
    users: userSlice,
  },
  // middleware
  //   middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productQueries.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {products: ProductState,...}
export type AppDispatch = typeof store.dispatch;
