import { Button, message, Tag } from "antd";
// import { Avatar } from "antd";

import {
  HeartOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useAppDispatch } from "../../../redux/hooks";
import { mapProductToCartItem } from "../../../utils/cart";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import type { IProduct } from "../../../redux/features/product/product.types";

interface ProductCardProps {
  product: IProduct;
}

const FeaturedProductCard = ({ product }: ProductCardProps) => {


  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const cartItem = mapProductToCartItem(product);

    dispatch(addToCart(cartItem));

    message.success("Added to cart");
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Category */}
        <Tag
          color="green"
          className="absolute! left-4 top-4 rounded-full px-3 py-1"
        >
          {product.category}
        </Tag>

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 backdrop-blur">
          <StarFilled className="text-amber-500" />
          {/* <span className="text-sm font-semibold">{product.rating}</span> */}
        </div>

        {/* Wishlist */}
        <button className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-red-50">
          <HeartOutlined />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>

          <div className="mt-2 flex items-center gap-2 text-gray-500">
            {/* <Avatar size={26}>{product.farmer[0]}</Avatar> */}

            <span className="text-sm">{product.farmer.name}</span>
          </div>

          <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
            <EnvironmentOutlined />
            {/* {product.district} */}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-green-600">৳{product.price}</p>
            <span className="text-gray-500">per {product.unit}</span>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {product.stock} Available
          </span>
        </div>

        {/* Button */}
        <Button
          type="primary"
          size="large"
          block
          icon={<ShoppingCartOutlined />}
          disabled={!product.isAvailable}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
