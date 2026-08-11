import { baseApi } from "../../baseApi";
import type { ICreateOrder, IOrderResponse } from "./order.types";


export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<
      IOrderResponse,
      ICreateOrder
    >({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
} = orderApi;