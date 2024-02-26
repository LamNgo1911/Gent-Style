import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../misc/types";
import { store } from "./store";

const productQueries = createApi({
  //base query for all the api calls inside this createApi
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/products",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    /** a hook is created from dispatch, async thunk action -> return data, error, loading*/
    fetchASingleProduct: builder.query<Product, number>({
      query: (productId: number) => `${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Products", id: productId },
      ],
    }),

    fetchProductsbyCategories: builder.query<Product, number>({
      query: (categoryId: number) => `/?category=${categoryId}`,
      providesTags: ["Products"],
    }),

    // mutation
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => {
        const admin = store.getState().users.user?.role === "admin";
        if (!admin) {
          throw new Error("User is not authorized to create products");
        }

        return {
          url: "",
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
          url: `${updatedProduct.id}`,
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
          url: `${productId}`,
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
} = productQueries;

export default productQueries;
