import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Product } from "../misc/types";
import { store } from "./store";

const productQueries = createApi({
  //base query for all the api calls inside this createApi
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/",
  }),
  tagTypes: ["Products", "Categories"],
  endpoints: (builder) => ({
    /** a hook is created from dispatch, async thunk action -> return data, error, loading*/
    fetchASingleProduct: builder.query<Product, number>({
      query: (productId: number) => `products/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Products", id: productId },
      ],
    }),

    fetchProductsbyCategories: builder.query<Product, number>({
      query: (categoryId: number) => `products/?category=${categoryId}`,
      providesTags: ["Products"],
    }),

    fetchAllCategories: builder.query<Category[], void>({
      query: () => `categories`,
      providesTags: ["Categories"],
    }),

    // mutation
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => {
        const admin = store.getState().users.user?.role === "admin";
        if (!admin) {
          throw new Error("User is not authorized to create products");
        }

        return {
          url: "products",
          method: "POST",
          body: newProduct,
        };
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (updatedProduct) => {
        const admin = store.getState().users.user?.role === "admin";
        if (!admin) {
          throw new Error("User is not authorized to create products");
          //  store.getState().products.error === "User is not authorized to create products"
        }

        return {
          url: `products/${updatedProduct.id}`,
          method: "PUT",
          body: updatedProduct,
        };
      },
      invalidatesTags: (result, error, updatedProduct) => [
        { type: "Products", id: updatedProduct.id },
      ],
    }),

    deleteProduct: builder.mutation<boolean, number>({
      query: (productId) => {
        const admin = store.getState().users.user?.role === "admin";
        if (!admin) {
          throw new Error("User is not authorized to create products");
          //   store.getState().products.error === "User is not authorized to create products"
        }

        return {
          url: `products/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useFetchASingleProductQuery,
  useFetchProductsbyCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchAllCategoriesQuery,
} = productQueries;

export default productQueries;
