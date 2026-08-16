import { baseApi } from "../../baseApi";
import type {
  ICreateProduct,
  IProduct,
  IProductResponse,
  IProductsResponse,
} from "./product.types";

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
      providesTags: ["Product"],
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
