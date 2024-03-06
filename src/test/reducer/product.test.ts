import { render, screen, waitFor } from "@testing-library/react";
import { productServer } from "../shared/mockServer";
import { newStore } from "../../redux/store";
import {
  addToWishlist,
  fetchAllProducts,
  removeFromWishlist,
} from "../../redux/slices/productSlice";
import { productData } from "../../data/productData";
import { Product } from "../../misc/types";

let store = newStore();

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

beforeEach(() => {
  store = newStore();
});

const initialState = {
  products: [],
  loading: false,
  error: null,
  wishlist: [],
};

describe("Product reducer", () => {
  test("should return initial state", () => {
    expect(store.getState().products.products).toHaveLength(0);
  });

  test("should fetch all products from API", async () => {
    await store.dispatch(fetchAllProducts());
    await waitFor(() => {
      expect(store.getState().products.products.length).toBeGreaterThanOrEqual(
        0
      );
      expect(store.getState().products.error).toBeNull();
    });
  });

  test("should add a product to the wishlist", async () => {
    const product: Product = productData[0];
    store.dispatch(addToWishlist(product));
    expect(store.getState().products.wishlist).toContainEqual(product);
  });

  test("should remove a product from the wishlist", () => {
    const product: Product = productData[0];
    store.dispatch(addToWishlist(product));

    store.dispatch(removeFromWishlist(product));
    console.log(product);
    expect(store.getState().products.wishlist).not.toContainEqual(product);
  });
});
