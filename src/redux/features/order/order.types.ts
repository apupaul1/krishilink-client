export interface ICreateOrder {
  products: {
    productId: string;
    quantity: number;
  }[];

  shippingAddress: {
    name: string;
    phone: string;
    district: string;
    area: string;
    address: string;
    note?: string;
  };

  paymentMethod: "cod" | "sslcommerz";
}

export interface IOrderResponse {
  success: boolean;
  message: string;

  data: {
    orders: {
      _id: string;
      trackingId: string;
      totalAmount: number;
      paymentMethod: string;
      paymentStatus: string;
      orderStatus: string;
    }[];

    payment?: {
      transactionId: string;
      paymentId?: string;
      amount: number;
      gatewayPageURL: string;
    };
  };
}
