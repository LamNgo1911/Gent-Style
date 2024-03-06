import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { productData } from "../../data/productData";
import { Product } from "../../misc/types";
import { categoryData } from "../../data/categoryData";
import { LoginInfo } from "../../redux/slices/userSlice";
import { user } from "../../data/userData";

export const productHandler = [
  // fetch all products async thunk in product reducer
  http.get("https://api.escuelajs.co/api/v1/products", () => {
    return HttpResponse.json(productData, { status: 200 });
  }),

  // fetch products pagination in product query
  http.get("https://api.escuelajs.co/api/v1/products/", ({ request }) => {
    const url = new URL(request.url);
    const offset = url.searchParams.get("offset");
    const limit = url.searchParams.get("limit");
    const priceMin = url.searchParams.get("priceMin");
    const priceMax = url.searchParams.get("priceMax");
    const categoryId = url.searchParams.get("categoryId");

    if (!offset && !limit && !priceMin && !priceMax && !categoryId) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(productData, { status: 200 });
  }),

  //   fetch single product in product query
  http.get(
    "https://api.escuelajs.co/api/v1/products/:productId",
    async ({ request }) => {
      const productId = new URL(request.url).searchParams.get("productId");

      if (!productId) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(true, { status: 204 });
    }
  ),

  //   fetch products by categories in product query
  http.get("https://api.escuelajs.co/api/v1/products/", async ({ request }) => {
    const categoryId = new URL(request.url).searchParams.get("categoryId");

    if (!categoryId) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(productData, { status: 200 });
  }),

  // create product in product query
  http.post("https://api.escuelajs.co/api/v1/products", async ({ request }) => {
    const product = (await request.json()) as Product;
    const createdProduct: Product = {
      ...product,
      id: 100,
    };
    return HttpResponse.json(createdProduct, { status: 201 });
  }),

  //   update product in product query
  http.post("https://api.escuelajs.co/api/v1/products", async ({ request }) => {
    const product = (await request.json()) as Product;
    const createdProduct: Product = {
      ...product,
      id: 100,
    };
    return HttpResponse.json(createdProduct, { status: 201 });
  }),

  // delete product in product query
  http.delete(
    "https://api.escuelajs.co/api/v1/products/:productId",
    async ({ request }) => {
      const productId = new URL(request.url).searchParams.get("productId");
      if (!productId) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(true, { status: 204 });
    }
  ),
];

export const categoryHanlder = [
  // fetch all categories in product query
  http.get("https://api.escuelajs.co/api/v1/categories", () => {
    return HttpResponse.json(categoryData, { status: 200 });
  }),
];

export const userHandler = [
  // fetch login in user reducer
  http.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async ({ request }) => {
      const loginInfo: LoginInfo = (await request.json()) as LoginInfo;

      if (!loginInfo) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(user, { status: 201 });
    }
  ),

  // fetch checking existedEmail in user reducer
  http.post(
    "https://api.escuelajs.co/api/v1/users/is-available",
    async ({ request }) => {
      const email = (await request.json()) as string;
      if (!email) {
        return new HttpResponse(null, { status: 404 });
      }
      const isAvailableEmail = false;
      return HttpResponse.json(isAvailableEmail, { status: 201 });
    }
  ),
];

export const productServer = setupServer(...productHandler);
export const categoriesServer = setupServer(...categoryHanlder);
export const userServer = setupServer(...userHandler);
