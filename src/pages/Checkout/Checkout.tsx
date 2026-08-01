import { Button, Empty, Form, Input, Radio, Select } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router";

const Checkout = () => {
  const districtOptions = [
    { label: "Dhaka", value: "Dhaka" },
    { label: "Chattogram", value: "Chattogram" },
    { label: "Khulna", value: "Khulna" },
    { label: "Rajshahi", value: "Rajshahi" },
    { label: "Sylhet", value: "Sylhet" },
    { label: "Barishal", value: "Barishal" },
    { label: "Rangpur", value: "Rangpur" },
    { label: "Mymensingh", value: "Mymensingh" },
  ];

  // const cartItems = useAppSelector((state) => state.cart.items);

  // const selectedItems = cartItems.filter((item) => item.isSelected);

  const checkoutItems = useAppSelector(
  (state) => state.cart.checkoutItems
);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = checkoutItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const deliveryCharge = subtotal >= 1000 ? 0 : 60;

  const total = subtotal + deliveryCharge;

  if (checkoutItems.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto flex max-w-7xl justify-center px-4">
          <Empty description="No products selected for checkout.">
            <Link to="/cart">
              <Button type="primary">Back to Cart</Button>
            </Link>
          </Empty>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Delivery Form */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">Delivery Information</h2>

            <Form layout="vertical">
              <div className="grid gap-4 md:grid-cols-2">
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your full name",
                    },
                  ]}
                >
                  <Input size="large" placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                    {
                      pattern: /^01[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi phone number",
                    },
                  ]}
                >
                  <Input size="large" placeholder="01XXXXXXXXX" />
                </Form.Item>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Form.Item
                  label="District"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Please select your district",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select District"
                    options={districtOptions}
                  />
                </Form.Item>

                <Form.Item
                  label="Area / Upazila"
                  name="area"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your area",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Mirpur, Savar..." />
                </Form.Item>
              </div>

              <Form.Item
                label="Village / Road / House No."
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your address",
                  },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="House 12, Road 5, Section 10..."
                />
              </Form.Item>

              <Form.Item label="Delivery Instructions (Optional)" name="note">
                <Input.TextArea
                  rows={3}
                  placeholder="Call before delivery, leave at the gate..."
                />
              </Form.Item>

              <h2 className="mb-6 text-2xl font-bold">Payment Method</h2>

              <Form.Item
                name="paymentMethod"
                initialValue="cod"
                rules={[
                  {
                    required: true,
                    message: "Please select a payment method",
                  },
                ]}
              >
                <Radio.Group className="flex flex-col gap-4">
                  <Radio value="cod">Cash on Delivery</Radio>

                  <Radio value="sslcommerz" disabled>
                    SSLCommerz (Coming Soon)
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <p className="mt-1 mb-6 text-sm text-gray-500">
              {totalItems} item{totalItems !== 1 ? "s" : ""} selected
            </p>

            <div className="space-y-4">
              {checkoutItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>

                      <p className="text-sm text-gray-500">
                        ৳ {item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold">
                    ৳ {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              <hr />

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>৳ {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>

                <span>
                  {deliveryCharge === 0 ? "Free" : `৳ ${deliveryCharge}`}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span className="text-primary">৳ {total.toLocaleString()}</span>
              </div>
            </div>

            <Button type="primary" size="large" className="mt-8 w-full">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
