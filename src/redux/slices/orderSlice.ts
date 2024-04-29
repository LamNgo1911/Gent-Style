import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderInput, ShippingAddress } from "../../misc/types";
import { axiosApi } from "../../config/axiosApi";

type InitialState = {
  items: Order[];
  order: Order | null;
  count: number;
  loading: boolean;
  error: string | null;
  clientSecret: string | null;
  message: string | null;
  address: ShippingAddress | null;
};

const initialState: InitialState = {
  items: [],
  order: null,
  count: 0,
  loading: false,
  error: null,
  clientSecret: null,
  message: null,
  address: null,
};

type PaymentIntentInputData = {
  userId: string;
  total: number;
};

export const createPaymentIntent = createAsyncThunk<
  string,
  PaymentIntentInputData
>(
  "order/createPaymentIntent",
  async ({ userId, total }, { rejectWithValue }) => {
    try {
      const result = await axiosApi.post(
        "/create-payment-intent",
        { userId, total },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return result.data.clientSecret;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

type NewOrderData = {
  newOrder: Order;
};

type OrderInformation = {
  access_token: string;
  orderInput: OrderInput;
};

export const createNewOrder = createAsyncThunk<NewOrderData, OrderInformation>(
  "order/createNewOrder",
  async (
    { access_token, orderInput }: OrderInformation,
    { rejectWithValue }
  ) => {
    try {
      const result = await axiosApi.post("/orders", orderInput, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

type OrdersData = {
  orders: Order[];
  count: number;
};

export const getAllOrdersByUserId = createAsyncThunk<OrdersData, string>(
  "order/getAllOrdersByUserId",
  async (access_token, { rejectWithValue }) => {
    try {
      const result = await axiosApi.get("orders/users", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.address = action.payload;
    },
  },
  extraReducers(builder) {
    // createPaymentIntent
    builder.addCase(
      createPaymentIntent.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.clientSecret = action.payload as string;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(createPaymentIntent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPaymentIntent.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // createNewOrder
    builder.addCase(
      createNewOrder.fulfilled,
      (state, action: PayloadAction<NewOrderData>) => {
        const order = action.payload.newOrder;
        console.log(order);

        const existingItemIndex = state.items.findIndex(
          (item) => item.id === order.id
        );

        if (existingItemIndex === -1) {
          state.items.push(order);
          state.loading = false;
          state.error = null;
        }
      }
    );
    builder.addCase(createNewOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewOrder.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // get All orders by userId
    builder.addCase(
      getAllOrdersByUserId.fulfilled,
      (state, action: PayloadAction<OrdersData>) => {
        const orders = action.payload.orders;
        state.items = orders;
        state.count = action.payload.count;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getAllOrdersByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllOrdersByUserId.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setMessage, clearMessage, setError, clearError, setAddress } =
  orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;
