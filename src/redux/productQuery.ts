import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Pagination, Product } from "../misc/types";
import { store } from "./store";
import { axiosApi, url } from "../config/axiosApi";

type CategoryData = {
  categories: Category[];
};

export type ProductData = {
  count: number;
  products: Product[];
};

export type SingleProductData = {
  product: Product;
};

export type updateProductData = {
  data: FormData;
  productId: string;
};

const productQueries = createApi({
  //base query for all the api calls inside this createApi
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  tagTypes: ["Products", "Categories"],
  endpoints: (builder) => ({
    fetchProductsByPagination: builder.query<ProductData, Pagination>({
      query: ({
        sort,
        skip,
        limit,
        size,
        color,
        search,
        category,
        priceMin,
        priceMax,
      }) =>
        `/products?sort=${sort}&skip=${skip}&limit=${limit}&size=${size}&color=${color}&search=${search}&category=${category}&priceMin=${priceMin}&priceMax=${priceMax}`,
      providesTags: ["Products"],
    }),

    fetchASingleProduct: builder.query<SingleProductData, string>({
      query: (productId: string) => `/products/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Products", id: productId },
      ],
    }),

    fetchAllCategories: builder.query<CategoryData, void>({
      query: () => `/categories`,
      providesTags: ["Categories"],
    }),

    // mutation
    createProduct: builder.mutation<Product, FormData>({
      query: (newProduct) => {
        const access_token = store.getState().users.access_token as string;

        const headers = {
          Authorization: `Bearer ${access_token}`,
        };

        return {
          url: "/products",
          method: "POST",
          body: newProduct,
          headers,
        };
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<Product, updateProductData>({
      query: (updatedProductData) => {
        const access_token = store.getState().users.access_token as string;

        const headers = {
          Authorization: `Bearer ${access_token}`,
        };

        return {
          url: `/products/${updatedProductData.productId}`,
          method: "PUT",
          body: updatedProductData.data,
          headers,
        };
      },
      invalidatesTags: (result, error, updatedProductData) => [
        { type: "Products", id: updatedProductData.productId },
      ],
    }),

    deleteProduct: builder.mutation<boolean, number>({
      query: (productId) => {
        const admin = store.getState().users.user?.role === "ADMIN";
        if (!admin) {
          throw new Error("User is not authorized to create products");
        }

        return {
          url: `/products/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useFetchProductsByPaginationQuery,
  useFetchASingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchAllCategoriesQuery,
} = productQueries;

export default productQueries;
