import { Button, Result } from "antd";
import { Link } from "react-router";

const PaymentFail = () => {
  return (
    <Result
      status="error"
      title="Payment Failed"
      subTitle="Your payment could not be completed."
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

export default PaymentFail;