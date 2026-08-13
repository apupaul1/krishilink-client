import { baseApi } from "../../baseApi";
import type { ICreateOrder, IOrderResponse } from "./order.types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<IOrderResponse, ICreateOrder>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    getAllOrders: build.query({
      query: (params) => ({
        url: "/orders",
        params,
      }),
      providesTags: ["Order"],
    }),

    updateOrderStatus: build.mutation({
      query: ({ orderId, status }: { orderId: string; status: string }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: {
          status,
        },
      }),

      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
