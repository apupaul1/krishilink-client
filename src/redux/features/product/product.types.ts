import type { UploadFile } from "antd/es/upload/interface";

export interface IProduct {
  _id: string;

  name: string;
  category: string;
  description: string;

  price: number;
  unit: "kg" | "piece" | "dozen" | "gram";
  stock: number;

  images: string[];

  location: {
    district: string;
    area: string;
    address: string;
  };

  farmer: {
    name: string;
    email: string;
  };

  isAvailable: boolean;

  baseDeliveryCharge: number;

  createdAt: string;
  updatedAt: string;
}

export interface IAddProductForm {
  name: string;
  category: string;
  description: string;

  price: number;
  unit: "kg" | "piece" | "dozen" | "gram";
  stock: number;

  images: UploadFile[];

  location: {
    district: string;
    area: string;
    address: string;
  };
}

export interface IProductsResponse {
  success: boolean;
  message: string;
  data: IProduct[];
}

export interface IProductResponse {
  success: boolean;
  message: string;
  data: IProduct;
}

export interface ICreateProduct {
  name: string;
  category: string;
  description: string;

  price: number;
  unit: "kg" | "piece" | "dozen" | "gram";
  stock: number;

  images: string[];

  location: {
    district: string;
    area: string;
    address: string;
  };

  farmer: {
    name: string;
    email: string;
  };
}
