import { baseApi } from "../../baseApi";
import type { IProduct } from "./product.types";

interface IProductsResponse {
  success: boolean;
  message: string;
  data: IProduct[];
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IProductsResponse, void>({
      query: () => ({
        url: "/products",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
