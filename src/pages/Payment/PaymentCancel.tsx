import { Button, Result } from "antd";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <Result
      status="warning"
      title="Payment Cancelled"
      subTitle="You cancelled the payment process."
      extra={
        <Link to="/dashboard/my-orders">
          <Button type="primary">
            Back to My Orders
          </Button>
        </Link>
      }
    />
  );
};

export default PaymentCancel;