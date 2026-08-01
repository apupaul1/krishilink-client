import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button, Checkbox, Empty, message } from "antd";
import { Link, useNavigate } from "react-router";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setCheckoutItems,
  toggleSelectAll,
  toggleSelection,
} from "../../redux/features/cart/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  const dispatch = useAppDispatch();

  const selectedItems = cartItems.filter((item) => item.isSelected);

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const deliveryCharge = subtotal >= 1000 ? 0 : 60;

  const total = subtotal + deliveryCharge;

  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.isSelected);

  const selectedCount = selectedItems.length;

  const navigate = useNavigate();

  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);

    if (selectedItems.length === 0) {
      message.warning("Please select at least one product.");
      return;
    }

    dispatch(setCheckoutItems(selectedItems));

    navigate("/checkout");
  };

  if (!cartItems.length) {
    return (
      <section className="py-20">
        <div className="mx-auto flex max-w-7xl justify-center px-4">
          <Empty
            description={<span className="text-base">Your cart is empty.</span>}
          >
            <Link to="/products">
              <Button type="primary">Continue Shopping</Button>
            </Link>
          </Empty>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h1 className=" text-4xl font-bold mb-4">Shopping Cart</h1>

          <Checkbox
            className="text-md!"
            checked={allSelected}
            onChange={() => dispatch(toggleSelectAll())}
          >
            Select All ({selectedCount}/{cartItems.length} selected)
          </Checkbox>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <Checkbox
                    checked={item.isSelected}
                    onChange={() => dispatch(toggleSelection(item.productId))}
                  />
                  {/* Product Image */}
                  <div className="h-28 w-28 overflow-hidden rounded-xl border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-gray-500">
                      ৳ {item.price.toLocaleString()} / {item.unit}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.productId))}
                      disabled={item.quantity === 1}
                      className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item.productId))}
                      disabled={item.quantity >= item.stock}
                      className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>

                    <h3 className="mt-2 text-xl font-bold text-primary">
                      ৳ {(item.price * item.quantity).toLocaleString()}
                    </h3>
                  </div>

                  {/* Remove */}
                  <Button
                    danger
                    type="text"
                    icon={<Trash2 size={18} />}
                    onClick={() => dispatch(removeFromCart(item.productId))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>
              <p className="mb-6 mt-1 text-sm text-gray-500">
                {totalItems} item{totalItems !== 1 ? "s" : ""} selected
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium">
                    ৳ {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Delivery</span>

                  <span className="font-medium">
                    {deliveryCharge === 0 ? "Free" : `৳ ${deliveryCharge}`}
                  </span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>

                  <span className="text-2xl font-bold text-primary">
                    ৳ {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                className="mt-8 w-full"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
