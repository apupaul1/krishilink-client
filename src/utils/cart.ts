import type { ICartItem } from "../redux/features/cart/cartSlice";
import type { IProduct } from "../redux/features/product/product.types";

export const mapProductToCartItem = (
  product: IProduct,
  quantity: number = 1,
): ICartItem => ({
  productId: product._id,
  name: product.name,
  image: product.images[0] ?? "",
  price: product.price,
  quantity,
  unit: product.unit,
  stock: product.stock,

  farmerEmail: product.farmer.email,
  baseDeliveryCharge: product.baseDeliveryCharge,

  location: {
    district: product.location.district,
    area: product.location.area,
    address: product.location.district
  },

  isSelected: true,
});
