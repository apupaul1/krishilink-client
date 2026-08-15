import { Button, Result } from "antd";
import { Link, useSearchParams } from "react-router";
import { useEffect } from "react";

import { clearCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const transactionId =
    searchParams.get("transactionId");

  useEffect(() => {
    // Payment successful
    // তাই cart clear
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Result
      status="success"
      title="Payment Successful!"
      subTitle={
        transactionId
          ? `Transaction ID: ${transactionId}`
          : "Your payment has been completed successfully."
      }
      extra={
        <Link to="/dashboard/my-orders">
          <Button type="primary">
            View My Orders
          </Button>
        </Link>
      }
    />
  );
};

export default PaymentSuccess;