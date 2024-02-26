import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../config/axiosApi";
import { Product } from "../../misc/types";

type InitialState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  wishlist: Product[];
};

const initialState: InitialState = {
  products: [],
  loading: false,
  error: null,
  wishlist: [],
};

export const fetchAllProducts = createAsyncThunk<Product[], void>(
  "fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axiosApi.get("/products");
      const data: Product[] = result.data;
      return data;
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
        (product) => product.id === action.payload.id
      );
      state.wishlist = newWishlist;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
    sortProductsbyPrice(state) {
      const newProductList = [...state.products].sort(
        (a, b) => a.price - b.price
      );
      state.products = newProductList;
    },
  },
  extraReducers: (builder) => {
    // fetchAllProducts
    builder.addCase(
      fetchAllProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
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
export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  sortProductsbyPrice,
} = productSlice.actions;
export default productReducer;
