import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../../misc/types";

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.total += product.price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === productId
      );
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.items.splice(existingItemIndex, 1);
        state.total -= existingItem.price * existingItem.quantity;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.total += existingItem.price * quantityDifference;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});
const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartReducer;
