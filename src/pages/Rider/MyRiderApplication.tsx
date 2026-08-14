import { Button, Card, Descriptions, Empty, Tag, Typography } from "antd";
import { Link } from "react-router";

import { useAppSelector } from "../../redux/hooks";
import { useGetRidersQuery } from "../../redux/features/rider/riderApi";
import Loading from "../../components/shared/Loading/Loading";

const { Title } = Typography;

const MyRiderApplication = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetRidersQuery({
    email: user?.email!,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const application = data?.data[0];

  if (!application) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center p-6">
        <Empty description="You haven't submitted a rider application yet.">
          <Link to="/be-a-rider">
            <Button type="primary">Become a Rider</Button>
          </Link>
        </Empty>
      </section>
    );
  }

  const statusColor = {
    pending: "gold",
    approved: "green",
    rejected: "red",
  };

  return (
    <section className="mx-auto max-w-7xl p-6">
      <Card>
        <div className="mb-8 flex items-center justify-between">
          <Title level={2}>My Rider Application</Title>
          <Tag
            color={statusColor[application.status]}
            className="w-fit px-3 py-1"
          >
            {application.status.toUpperCase()}
          </Tag>
        </div>

        <Descriptions column={1} bordered>
          <Descriptions.Item label="Rider Name">
            {application.name}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {application.email}
          </Descriptions.Item>

          <Descriptions.Item label="District">
            {application.district}
          </Descriptions.Item>

          <Descriptions.Item label="Address">
            {application.address}
          </Descriptions.Item>

          <Descriptions.Item label="Driving License">
            <a
              href={application.drivingLicense}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Driving License
            </a>
          </Descriptions.Item>

          <Descriptions.Item label="NID">
            <a
              href={application.nid}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View NID
            </a>
          </Descriptions.Item>

          <Descriptions.Item label="Bike">{application.bike}</Descriptions.Item>

          <Descriptions.Item label="Applied On">
            {new Date(application.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-8 flex gap-3">
          {application.status === "pending" && (
            <Button danger>Withdraw Application</Button>
          )}
          {application.status === "approved" && (
            <Link to="/dashboard/my-deliveries">
              <Button type="primary">My Deliveries</Button>
            </Link>
          )}
          {application.status === "rejected" && (
            <Link to="/be-a-rider">
              <Button type="primary">Apply Again</Button>
            </Link>
          )}
        </div>
      </Card>
    </section>
  );
};

export default MyRiderApplication;
