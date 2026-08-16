import {
  Card,
  Empty,
  Tag,
  Table,
  Typography,
  Statistic,
  Row,
  Col,
} from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useGetAllPaymentsQuery } from "../../redux/features/payment/paymentApi";
import { useAppSelector } from "../../redux/hooks";
import type { IPayment } from "../../redux/features/payment/payment.types";
import Loading from "../../components/shared/Loading/Loading";

const { Title, Text } = Typography;

const PaymentHistory = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetAllPaymentsQuery(
    {
      email: user?.email,
    },
    {
      skip: !user?.email,
    },
  );

  const payments: IPayment[] = data?.data ?? [];

  console.log(payments);

  const totalPayments = payments.length;

  const successfulPayments = payments.filter(
    (payment) => payment.status === "paid",
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "failed" || payment.status === "cancelled",
  ).length;

  const totalPaidAmount = payments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const getStatusTag = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Paid
          </Tag>
        );

      case "pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            Pending
          </Tag>
        );

      case "failed":
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Failed
          </Tag>
        );

      case "cancelled":
        return (
          <Tag icon={<CloseCircleOutlined />} color="warning">
            Cancelled
          </Tag>
        );

      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",

      render: (value: string) => (
        <Text strong copyable>
          {value}
        </Text>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",

      render: (amount: number) => (
        <Text strong>৳{amount.toLocaleString()}</Text>
      ),
    },

    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",

      render: (method: string) => (
        <Tag>
          {method === "sslcommerz" ? "SSLCommerz" : method.toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status: string) => getStatusTag(status),
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",

      render: (date: string) =>
        new Date(date).toLocaleString(),
    },
  ];

  if (isError) {
    return (
      <Card>
        <Empty description="Failed to load payment history." />
      </Card>
    );
  }

  if(isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <Title level={2} className="mb-1!">
          Payment History
        </Title>

        <Text type="secondary">
          View and track all your payment transactions.
        </Text>
      </div>

      {/* Summary */}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Payments"
              value={totalPayments}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Successful"
              value={successfulPayments}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Failed / Cancelled"
              value={failedPayments}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Paid"
              value={totalPaidAmount}
              prefix="৳"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      {/* Payment table */}

      <Card title="Transactions" className="overflow-hidden">
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={payments}
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
          }}
          scroll={{
            x: 850,
          }}
          locale={{
            emptyText: <Empty description="No payment history found." />,
          }}
        />
      </Card>
    </div>
  );
};

export default PaymentHistory;
