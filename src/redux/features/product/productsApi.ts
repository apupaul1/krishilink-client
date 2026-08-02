import { baseApi } from "../../baseApi";
import type { IProduct } from "./product.types";

interface IProductsResponse {
  success: boolean;
  message: string;
  data: IProduct[];
}

interface IProductResponse {
  success: boolean;
  message: string;
  data: IProduct;
}

export interface ICreateProduct {
  name: string;
  category: string;
  description: string;

  price: number;
  unit: "kg" | "piece" | "dozen" | "gram";
  stock: number;

  images: string[];

  location: {
    district: string;
    area: string;
    address: string;
  };

  farmer: {
    name: string;
    email: string;
  };
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IProductsResponse, string | undefined>({
      query: (email) => ({
        url: "/products",
        params: email ? { email } : {},
      }),
      providesTags: ["Product"],
    }),

    getFeaturedProducts: build.query<IProductsResponse, void>({
      query: () => ({
        url: "/products/featured",
      }),
      providesTags: ["Product"],
    }),

    getSingleProduct: build.query<IProductResponse, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
      }),
    }),

    createProduct: build.mutation<IProductResponse, ICreateProduct>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: build.mutation<
      IProductResponse,
      {
        id: string;
        body: Partial<IProduct>;
      }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: build.mutation<IProductResponse, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFeaturedProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
