import { baseApi } from "../../baseApi";

interface IInitiatePaymentResponse {
  success: boolean;

  data: {
    transactionId: string;
    paymentId: string;
    amount: number;
    gatewayPageURL: string;
  };
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initiatePayment: build.mutation<
      IInitiatePaymentResponse,
      {
        orderIds: string[];
      }
    >({
      query: (body) => ({
        url: "/payments/initiate",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi;
