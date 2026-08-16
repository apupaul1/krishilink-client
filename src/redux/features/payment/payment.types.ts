export interface IPayment {
  _id: string;
  transactionId: string;
  customerEmail: string;
  amount: number;
  paymentMethod: "sslcommerz";
  status: "pending" | "paid" | "failed" | "cancelled";
  orderIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentHistoryResponse {
  success: boolean;
  message: string;
  data: IPayment[];
}
