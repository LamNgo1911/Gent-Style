import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartItemInput } from "../../misc/types";
import { axiosApi } from "../../config/axiosApi";

type InitialState = {
  items: CartItem[];
  count: number;
  total: number;
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  items: [],
  count: 0,
  total: 0,
  loading: false,
  error: null,
};

type NewCartItemData = {
  newCartItem: CartItem;
};

type CartItemInformation = {
  access_token: string;
  cartItemInput: CartItemInput;
};

export const createNewCartItem = createAsyncThunk<
  NewCartItemData,
  CartItemInformation
>(
  "cart/createNewCartItem",
  async (
    { access_token, cartItemInput }: CartItemInformation,
    { rejectWithValue }
  ) => {
    try {
      const result = await axiosApi.post("/cartItems", cartItemInput, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

type CartItemsData = {
  cartItems: CartItem[];
  count: number;
};

export const getAllCartItemsByUserId = createAsyncThunk<CartItemsData, string>(
  "cart/getAllCartItemsByUserId",
  async (access_token, { rejectWithValue }) => {
    try {
      const result = await axiosApi.get("/cartItems", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

type UpdateCartItemInformation = {
  access_token: string;
  cartItemId: string;
  updateInfo: Partial<CartItemInput>;
};

type UpdateCartItemData = {
  cartItem: CartItem;
};

export const updateCartItem = createAsyncThunk<
  UpdateCartItemData,
  UpdateCartItemInformation
>(
  "cart/updateCartItem",
  async ({ access_token, cartItemId, updateInfo }, { rejectWithValue }) => {
    try {
      const result = await axiosApi.put(
        `/cartItems/${cartItemId}`,
        updateInfo,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

type DeleteCartItemInformation = {
  access_token: string;
  cartItemId: string;
};

type DeleteCartItemData = {
  cartItem: CartItem;
};

export const deleteCartItem = createAsyncThunk<
  DeleteCartItemData,
  DeleteCartItemInformation
>(
  "cart/deleteCartItem",
  async ({ cartItemId, access_token }, { rejectWithValue }) => {
    try {
      const result = await axiosApi.delete(`/cartItems/${cartItemId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  // createNewCartItem
  extraReducers(builder) {
    builder.addCase(
      createNewCartItem.fulfilled,
      (state, action: PayloadAction<NewCartItemData>) => {
        const cartItem = action.payload.newCartItem;
        state.loading = false;
        state.error = null;

        const existingItemIndex = state.items.findIndex(
          (item) =>
            item.id === cartItem.id &&
            item.color === cartItem.color &&
            item.size === cartItem.size
        );

        if (existingItemIndex !== -1) {
          const existingItem = state.items[existingItemIndex];
          const newQuantity = existingItem.quantity + 1;
          state.items[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
          };
          state.total += cartItem.product.price * newQuantity;
        } else {
          state.items.push(cartItem);
          state.total += cartItem.product.price;
        }
      }
    );
    builder.addCase(createNewCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewCartItem.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // getAllCartItemsByUserId
    builder.addCase(
      getAllCartItemsByUserId.fulfilled,
      (state, action: PayloadAction<CartItemsData>) => {
        const cartItems = action.payload.cartItems;
        state.items = cartItems;
        state.count = action.payload.count;
        state.loading = false;
        state.error = null;

        state.total = cartItems.reduce(
          (total, cartItem) =>
            total + cartItem.product.price * cartItem.quantity,
          0
        );
      }
    );
    builder.addCase(getAllCartItemsByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCartItemsByUserId.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // updateCartItem
    builder.addCase(
      updateCartItem.fulfilled,
      (state, action: PayloadAction<UpdateCartItemData>) => {
        const cartItem = action.payload.cartItem;
        const existingItem = state.items.find(
          (item) =>
            item.id === cartItem.id &&
            item.color === cartItem.color &&
            item.size &&
            cartItem.size
        );

        if (existingItem) {
          const quantityDifference = cartItem.quantity - existingItem.quantity;
          existingItem.quantity = cartItem.quantity;
          state.total += existingItem.product.price * quantityDifference;
        }

        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // deleteCartItem
    builder.addCase(
      deleteCartItem.fulfilled,
      (state, action: PayloadAction<DeleteCartItemData>) => {
        const cartItem = action.payload.cartItem;
        const existingItemIndex = state.items.findIndex(
          (item) =>
            item.id === cartItem.id &&
            item.color === cartItem.color &&
            item.size &&
            cartItem.size
        );

        if (existingItemIndex !== -1) {
          const existingItem = state.items[existingItemIndex];
          state.items.splice(existingItemIndex, 1);
          state.total -= existingItem.product.price * existingItem.quantity;
        }
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const cartReducer = cartSlice.reducer;
export default cartReducer;
