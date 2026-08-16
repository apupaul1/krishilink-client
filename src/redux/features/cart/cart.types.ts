export interface ICartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: "kg" | "piece" | "dozen" | "gram";
  stock: number;

  farmerEmail: string;
  baseDeliveryCharge: number;

  location: {
    district: string;
    area: string;
    address: string;
  };

  isSelected?: boolean;
}

export interface ICart {
  _id?: string;
  customerEmail: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface IAddToCart {
  productId: string;
  quantity: number;
}

export interface ICartResponse {
  success: boolean;
  message: string;
  data: ICart;
}
