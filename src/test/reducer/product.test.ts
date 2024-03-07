import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { productServer } from "../shared/mockServer";
import { newStore } from "../../redux/store";
import {
  addToWishlist,
  fetchAllProducts,
  removeFromWishlist,
} from "../../redux/slices/productSlice";
import { productData } from "../../data/productData";
import { Product } from "../../misc/types";
import productQueries, {
  useFetchASingleProductQuery,
  useFetchProductsByPaginationQuery,
  useFetchProductsByCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../redux/productQuery";
import TestProvider from "../shared/TestProvider";

let store = newStore();

beforeAll(() => {
  productServer.listen();
});

afterEach(() => {
  productServer.resetHandlers();
});

afterAll(() => productServer.close());

beforeAll(() => {
  store = newStore();
});

describe("Product reducer", () => {
  // product reducer test
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
    expect(store.getState().products.wishlist).not.toContainEqual(product);
  });

  // product query tests
  test("fetchProductsByPaginationQuery should return products", async () => {
    const offset = 5;
    const limit = 10;
    const priceMin = 1;
    const priceMax = 2;
    const categoryId = 1;

    const { result } = renderHook(
      () =>
        useFetchProductsByPaginationQuery({
          offset,
          limit,
          priceMin,
          priceMax,
          categoryId,
        }),
      { wrapper: TestProvider }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(productData);
  });

  test("fetchASingleProductQuery should return a single product", async () => {
    const productId = 1;
    const { result } = renderHook(
      () => useFetchASingleProductQuery(productId),
      { wrapper: TestProvider }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(productData[0]);
  });

  test("fetchProductsByCategoriesQuery should return products by categories", async () => {
    const categoryId = 1;
    const { result } = renderHook(
      () => useFetchProductsByCategoriesQuery(categoryId),
      { wrapper: TestProvider }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(productData);
  });

  test("createProductMutation should create a new product", async () => {
    const { result } = renderHook(() => useCreateProductMutation(), {
      wrapper: TestProvider,
    });

    const [mutate, mutationResult] = result.current;

    await waitFor(() => {
      expect(mutationResult).toBeDefined();
    });
  });

  test("updateProductMutation should update an existing product", async () => {
    const { result } = renderHook(() => useUpdateProductMutation(), {
      wrapper: TestProvider,
    });

    const [mutate, mutationResult] = result.current;

    await waitFor(() => {
      expect(mutationResult).toBeDefined();
    });
  });

  test("deleteProductMutation should delete a product", async () => {
    const { result } = renderHook(() => useDeleteProductMutation(), {
      wrapper: TestProvider,
    });

    const [mutate, mutationResult] = result.current;

    await waitFor(() => {
      expect(mutationResult).toBeDefined();
    });
  });
});
