import { Empty, Tag, Timeline, Typography } from "antd";
import { CheckCircle2, Clock3 } from "lucide-react";
import { useParams } from "react-router";

import { useGetTrackingLogsQuery } from "../../redux/features/tracking/trackingApi";
import Loading from "../../components/shared/Loading/Loading";

const { Title, Text } = Typography;

const statusLabel: Record<string, string> = {
  pending: "Order Placed",
  preparing: "Preparing",
  ready_for_pickup: "Ready for Pickup",
  waiting_for_rider_acceptance: "Waiting for Rider",
  rider_assigned: "Rider Assigned",
  picked_up: "Picked Up",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const Tracking = () => {
  const { trackingId } = useParams();

  const { data, isLoading } = useGetTrackingLogsQuery(trackingId!, {
    skip: !trackingId,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const logs = data?.data ?? [];

  if (!logs.length) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-4xl">
          <Empty description="Tracking information not found." />
        </div>
      </section>
    );
  }

  const currentStatus = logs[logs.length - 1].status;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="mb-1!">
            Track Your Order
          </Title>

          <Text type="secondary">
            Tracking ID:{" "}
            <span className="font-mono font-semibold">{trackingId}</span>
          </Text>
        </div>

        {/* Current Status */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm text-gray-500">Current Status</p>

          <div className="flex items-center gap-3">
            <Tag color="blue">
              {statusLabel[currentStatus] || currentStatus}
            </Tag>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Title level={4}>Order Tracking</Title>

          <Timeline
            className="mt-6"
            items={logs.map((log, index) => ({
              color:
                log.status === "cancelled"
                  ? "red"
                  : index === logs.length - 1
                    ? "green"
                    : "blue",

              dot:
                index === logs.length - 1 ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <Clock3 size={18} />
                ),

              children: (
                <div className="pb-5">
                  <p className="font-semibold">
                    {statusLabel[log.status] || log.details}
                  </p>

                  <p className="mt-1 text-sm capitalize text-gray-500">
                    {log.details}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
};

export default Tracking;
