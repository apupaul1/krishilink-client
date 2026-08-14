import { useNavigate, useParams } from "react-router";
import { useGetSingleProductQuery } from "../../redux/features/product/productsApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  ShoppingCart,
  UserRound,
  Package,
  CircleCheck,
  CircleX,
  Minus,
  Plus,
  Clock3,
  RefreshCw,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  addToCart,
  setCheckoutItems,
} from "../../redux/features/cart/cartSlice";
import { mapProductToCartItem } from "../../utils/cart";
import Loading from "../../components/shared/Loading/Loading";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  if (!id) {
    return <p>Invalid Product ID</p>;
  }

  const { data, isLoading, error } = useGetSingleProductQuery(id);

  console.log(data);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error || !data?.data) {
    return <p>Product not found.</p>;
  }

  const product = data.data;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    const cartItem = mapProductToCartItem(product, quantity);

    dispatch(addToCart(cartItem));
  };

  const handleBuyNow = () => {
    if (!product.isAvailable || product.stock === 0) {
      return;
    }

    const cartItem = mapProductToCartItem(product, quantity);

    dispatch(setCheckoutItems([cartItem]));

    navigate("/checkout");
  };

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white">
            {product.images?.length ? (
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                className="w-full"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex items-center justify-center bg-white">
                      <img
                        src={image}
                        alt={`${product.name}-${index}`}
                        className="w-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <span className="w-fit rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-6 flex items-end gap-2">
              <span className="text-4xl font-bold text-primary">
                ৳ {product.price}
              </span>

              <span className="pb-1 text-lg text-gray-500">
                / {product.unit}
              </span>
            </div>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-2">
              {product.isAvailable ? (
                <>
                  <CircleCheck size={20} className="text-green-600" />
                  <span className="font-medium text-green-600">In Stock</span>
                </>
              ) : (
                <>
                  <CircleX size={20} className="text-red-600" />
                  <span className="font-medium text-red-600">Out of Stock</span>
                </>
              )}
            </div>

            {/* Information */}
            {/* Product Information */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {/* Farmer */}
              <div className="rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                <div className="mb-3 flex items-center gap-2">
                  <UserRound size={18} className="text-primary" />
                  <span className="text-sm text-gray-500">Farmer</span>
                </div>

                <h3 className="font-semibold text-gray-900">
                  {product.farmer.name}
                </h3>
              </div>

              {/* Stock */}
              <div className="rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                <div className="mb-3 flex items-center gap-2">
                  <Package size={18} className="text-primary" />
                  <span className="text-sm text-gray-500">Stock</span>
                </div>

                <h3 className="font-semibold text-gray-900">
                  {product.stock} {product.unit}
                </h3>
              </div>
            </div>

            {/* Meta Information */}
            <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock3 size={18} className="text-primary" />
                  <span className="text-gray-500">Posted</span>
                </div>

                <span className="font-medium text-gray-800">
                  {new Date(product.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw size={18} className="text-primary" />{" "}
                  <span className="text-gray-500">Last Updated</span>
                </div>

                <span className="font-medium text-gray-800">
                  {new Date(product.updatedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-10 flex items-center justify-between">
              <div>
                <p className="mb-2 text-sm text-gray-500">Quantity</p>

                <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="flex h-12 w-14 items-center justify-center border-x border-gray-200 font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    disabled={quantity === product.stock}
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>

                <h2 className="mt-2 text-3xl font-bold text-primary">
                  ৳ {totalPrice.toLocaleString()}{" "}
                </h2>
              </div>
            </div>

            {/* Add To Cart */}
            <div className="mt-8 flex gap-4 flex-col md:flex-row">
              <Button
                type="primary"
                className="w-full p-5!"
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
              >
                <ShoppingCart size={22} />

                {product.isAvailable ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                type="default"
                className="w-full p-5!"
                // disabled={!product.isAvailable}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900">Description</h2>

          <div className="mt-3 h-1 w-20 rounded-full bg-primary" />

          <div className="mt-6">
            <p className="leading-8 text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
