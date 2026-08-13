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
    _id: string;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
  };
}
