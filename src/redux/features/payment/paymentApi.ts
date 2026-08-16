import { baseApi } from "../../baseApi";
// import type { IPaymentHistoryResponse } from "./payment.types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getAllPayments: build.query({
      query: (params) => ({
        url: "/payments",
        params
      }),
    }),
  }),
});

export const {useGetAllPaymentsQuery } = paymentApi;
