import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../config/axiosApi";
import { Product } from "../../misc/types";
import { ProductData } from "../productQuery";

type InitialState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  wishlist: Product[];
  count: number;
};

const initialState: InitialState = {
  products: [],
  loading: false,
  error: null,
  wishlist: [],
  count: 0,
};

export const fetchAllProducts = createAsyncThunk<ProductData, void>(
  "fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axiosApi.get("/products");

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Product>) {
      const isExistingProduct = state.wishlist.includes(action.payload);
      !isExistingProduct && state.wishlist.push(action.payload);
    },
    removeFromWishlist(state, action: PayloadAction<Product>) {
      const newWishlist = state.wishlist.filter(
        (product) => product.id !== action.payload.id
      );
      state.wishlist = newWishlist;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
  extraReducers: (builder) => {
    // fetchAllProducts
    builder.addCase(
      fetchAllProducts.fulfilled,
      (state, action: PayloadAction<ProductData>) => {
        state.products = action.payload.products;
        state.count = action.payload.count;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const productReducer = productSlice.reducer;
export const { addToWishlist, removeFromWishlist, clearWishlist } =
  productSlice.actions;
export default productReducer;
