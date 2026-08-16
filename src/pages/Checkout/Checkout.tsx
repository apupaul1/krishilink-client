import { Button, Empty, Form, Input, message, Radio, Select } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { useEffect, useState } from "react";
import { getAreaOptions, getDistrictOptions } from "../../utils/location";
import {
  useGetCartQuery,
  useRemoveCartItemsMutation,
} from "../../redux/features/cart/cartApi";
import Loading from "../../components/shared/Loading/Loading";

export interface CheckoutFormValues {
  fullName: string;
  phone: string;
  district: string;
  area: string;
  address: string;
  note?: string;
  paymentMethod: "cod" | "sslcommerz";
}

const Checkout = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  const buyNowProductId = searchParams.get("buyNow");

  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetCartQuery(user?.email ?? "", {
    skip: !user?.email,
  });

  const cartItems = cartData?.data?.items ?? [];

  const checkoutItems = buyNowProductId
    ? cartItems.filter((item) => item.productId === buyNowProductId)
    : cartItems.filter((item) => item.isSelected);

  const [removeCartItems, { isLoading: isRemovingCartItems }] =
    useRemoveCartItemsMutation();

  // const checkoutItems =
  //   cartData?.data?.items.filter((item) => item.isSelected) ?? [];

  const [form] = Form.useForm<CheckoutFormValues>();
  const selectedDistrict = Form.useWatch("district", form);
  const paymentMethod = Form.useWatch("paymentMethod", form);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const navigate = useNavigate();

  useEffect(() => {
    const savedAddress = localStorage.getItem("krishilink_shipping_address");

    if (!savedAddress) return;

    try {
      const address = JSON.parse(savedAddress);

      form.setFieldsValue({
        fullName: address.name,
        phone: address.phone,
        district: address.district,
        area: address.area,
        address: address.address,
        note: address.note,
      });
    } catch (error) {
      console.error("Failed to load saved address:", error);
    }
  }, [form]);

  const handlePlaceOrder = async (values: CheckoutFormValues) => {
    try {
      const shippingAddress = {
        name: values.fullName,
        phone: values.phone,
        district: values.district,
        area: values.area,
        address: values.address,
        note: values.note,
      };

      localStorage.setItem(
        "krishilink_shipping_address",
        JSON.stringify(shippingAddress),
      );

      const result = await createOrder({
        products: checkoutItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),

        shippingAddress,

        paymentMethod: values.paymentMethod,
      }).unwrap();

      // -----------------------------
      // SSLCommerz
      // -----------------------------

      if (values.paymentMethod === "sslcommerz") {
        const gatewayPageURL = result.data.payment?.gatewayPageURL;

        if (!gatewayPageURL) {
          throw new Error("Payment gateway URL not found.");
        }

        window.location.href = gatewayPageURL;

        return;
      }

      // -----------------------------
      // COD
      // -----------------------------

      await removeCartItems({
        email: user!.email,
        productIds: checkoutItems.map((item) => item.productId),
      }).unwrap();

      message.success("Order placed successfully!");

      navigate("/dashboard/my-orders");
    } catch (error) {
      console.error(error);

      message.error("Failed to place order. Please try again.");
    }
  };

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const baseDeliveryCharge = Object.values(
    checkoutItems.reduce<Record<string, number>>((acc, item) => {
      if (!acc[item.farmerEmail]) {
        acc[item.farmerEmail] = item.baseDeliveryCharge ?? 50;
      }

      return acc;
    }, {}),
  ).reduce((total, charge) => total + charge, 0);

  const [deliveryCharge, setDeliveryCharge] = useState(baseDeliveryCharge);

  const [isEstimatedDelivery, setIsEstimatedDelivery] = useState(true);

  useEffect(() => {
    setDeliveryCharge(baseDeliveryCharge);
    setIsEstimatedDelivery(true);
  }, [baseDeliveryCharge]);

  const calculateDeliveryCharge = (
    customerDistrict: string,
    customerArea: string,
  ) => {
    const charge = checkoutItems.reduce<Record<string, number>>((acc, item) => {
      const farmerKey = item.farmerEmail;

      if (acc[farmerKey]) return acc;

      let deliveryCharge = item.baseDeliveryCharge ?? 50;

      if (
        item.location.district === customerDistrict &&
        item.location.area === customerArea
      ) {
        deliveryCharge = 50;
      } else if (item.location.district === customerDistrict) {
        deliveryCharge = 70;
      } else {
        deliveryCharge = 100;
      }

      acc[farmerKey] = deliveryCharge;

      return acc;
    }, {});

    return Object.values(charge).reduce((total, charge) => total + charge, 0);
  };

  const totalItems = checkoutItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const total = subtotal + deliveryCharge;

  if (isCartLoading) {
    return <Loading />;
  }

  if (isCartError) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">Failed to load cart.</p>
      </div>
    );
  }

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

            <Form
              layout="vertical"
              id="checkout-form"
              form={form}
              onFinish={handlePlaceOrder}
              onValuesChange={(changedValues) => {
                const { district, area } = changedValues;

                const currentDistrict =
                  district ?? form.getFieldValue("district");
                const currentArea = area ?? form.getFieldValue("area");

                if (!currentDistrict || !currentArea) {
                  setDeliveryCharge(baseDeliveryCharge);
                  setIsEstimatedDelivery(true);
                  return;
                }

                const actualCharge = calculateDeliveryCharge(
                  currentDistrict,
                  currentArea,
                );

                setDeliveryCharge(actualCharge);
                setIsEstimatedDelivery(false);
              }}
            >
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
                    options={getDistrictOptions()}
                    onChange={() => {
                      form.setFieldValue("area", undefined);
                    }}
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
                  <Select
                    placeholder={
                      selectedDistrict
                        ? "Select Area / Upazila"
                        : "Select District First"
                    }
                    disabled={!selectedDistrict}
                    options={getAreaOptions(selectedDistrict)}
                  />
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

                  <Radio value="sslcommerz">SSLCommerz</Radio>
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

              <hr className="border-gray-300" />

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>৳ {subtotal.toLocaleString()}</span>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Delivery</span>

                  <span>৳ {deliveryCharge.toLocaleString()}</span>
                </div>

                {isEstimatedDelivery && (
                  <p className="mt-1 text-right text-xs text-gray-400">
                    Estimated delivery charge
                  </p>
                )}
              </div>

              <hr className="border-gray-300" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span className="text-primary">৳ {total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              form="checkout-form"
              size="large"
              className="mt-8 w-full"
              loading={isLoading}
            >
              {paymentMethod === "sslcommerz"
                ? "Proceed to Payment"
                : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
