import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { productData } from "../../data/productData";
import { Product, UserRegistration } from "../../misc/types";
import { categoryData } from "../../data/categoryData";
import { LoginInfo } from "../../redux/slices/userSlice";
import { user } from "../../data/userData";

const baseUrl = "https://api.escuelajs.co/api/v1/";

export const productHandler = [
  http.get(`${baseUrl}products`, () => {
    return HttpResponse.json(productData, { status: 200 });
  }),

  http.get(`${baseUrl}products/`, ({ request }) => {
    const url = new URL(request.url);
    const offset = url.searchParams.get("offset");
    const limit = url.searchParams.get("limit");
    const priceMin = url.searchParams.get("priceMin");
    const priceMax = url.searchParams.get("priceMax");
    const categoryId = url.searchParams.get("categoryId");

    if (
      offset === "" &&
      limit === "" &&
      priceMin === "" &&
      priceMax === "" &&
      categoryId === ""
    ) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(productData, { status: 200 });
  }),

  // get single
  http.get(`${baseUrl}products/:productId`, async ({ request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const productId = pathname.split("/").pop();

    if (!productId) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(productData[0], { status: 200 });
  }),

  // get product by cate
  http.get(`${baseUrl}products`, async ({ request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const categoryId = pathname.split("/").pop();

    if (!categoryId) {
      return new HttpResponse(null, { status: 404 });
    }

    const response = await HttpResponse.json(productData, { status: 200 });

    return response;
  }),

  // create
  http.post(`${baseUrl}products`, async ({ request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const productId = pathname.split("/").pop();
    const admin = true; // Simulate admin role
    if (!admin || !productId) {
      return new HttpResponse(null, { status: 404 });
    }

    const createProduct = (await request.json()) as Product;
    return HttpResponse.json(createProduct, { status: 201 });
  }),

  // update
  http.put(`${baseUrl}products/:productId`, async ({ request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const productId = pathname.split("/").pop();
    const admin = true; // Simulate admin role
    if (!admin || !productId) {
      return new HttpResponse(null, { status: 404 });
    }

    const product = (await request.json()) as Product;
    const updateProduct: Product = {
      ...product,
      id: 100,
    };

    if (!updateProduct || !productId) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(updateProduct, { status: 200 });
  }),

  // delete
  http.delete(`${baseUrl}products/:productId`, async ({ request }) => {
    const admin = true; // Simulate admin role
    if (!admin) {
      return new HttpResponse(null, { status: 404 });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;
    const productId = pathname.split("/").pop();
    if (!productId) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(true, { status: 204 });
  }),

  // category
  http.get(`${baseUrl}categories`, () => {
    return HttpResponse.json(categoryData, { status: 200 });
  }),
];

// user reducer
export const userHandler = [
  // login
  http.post(`${baseUrl}auth/profile`, async ({ request }) => {
    const accessToken = (await request.json()) as string;

    if (!accessToken) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(user, { status: 201 });
  }),

  // access token
  http.post(`${baseUrl}auth/login`, async ({ request }) => {
    const loginInfo: LoginInfo = (await request.json()) as LoginInfo;

    if (!loginInfo) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user, { status: 201 });
  }),

  // check email
  http.post(`${baseUrl}users/is-available`, async ({ request }) => {
    const email = (await request.json()) as string;
    if (!email) {
      return new HttpResponse(null, { status: 404 });
    }
    const isAvailableEmail = false;
    return HttpResponse.json(isAvailableEmail, { status: 201 });
  }),

  // register
  http.post(`${baseUrl}"user/register`, async ({ request }) => {
    const userRegistration: UserRegistration =
      (await request.json()) as UserRegistration;

    if (!userRegistration) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user, { status: 201 });
  }),
];

export const productServer = setupServer(...productHandler);
export const userServer = setupServer(...userHandler);
