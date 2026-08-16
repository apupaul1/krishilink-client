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
      invalidatesTags: ["Order", "Product"],
    }),

    getAllOrders: build.query({
      query: (params) => ({
        url: "/orders",
        params,
      }),
      providesTags: ["Order", "Rider"],
    }),

    assignRider: build.mutation({
      query: ({
        orderId,
        riderEmail,
      }: {
        orderId: string;
        riderEmail: string;
      }) => ({
        url: `/orders/${orderId}/assign-rider`,
        method: "PATCH",
        body: {
          riderEmail,
        },
      }),

      invalidatesTags: ["Order", "Rider"],
    }),

    updateOrderStatus: build.mutation({
      query: ({ orderId, status }: { orderId: string; status: string }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: {
          status,
        },
      }),

      invalidatesTags: ["Order", "Product"],
    }),

    rejectRider: build.mutation({
      query: (orderId: string) => ({
        url: `/orders/${orderId}/reject-rider`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useAssignRiderMutation,
  useRejectRiderMutation
} = orderApi;
