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

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IProductsResponse, void>({
      query: () => ({
        url: "/products",
      }),
      providesTags: ["Product"],
    }),

    getSingleProduct: build.query<IProductResponse, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
      }),
    }),

    createProduct: build.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: build.mutation({
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
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
