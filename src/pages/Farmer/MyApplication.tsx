import { Button, Card, Descriptions, Empty, Tag, Typography } from "antd";
import { Link } from "react-router";

import { useAppSelector } from "../../redux/hooks";
import { useGetFarmersQuery } from "../../redux/features/farmer/farmerApi";
import Loading from "../../components/shared/Loading/Loading";

const { Title } = Typography;

const MyApplication = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetFarmersQuery({
    email: user?.email!,
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  const application = data?.data[0];

  console.log(application);

  if (!application) {
    return (
      <div className="py-20">
        <Empty description="You haven't submitted any farmer application yet.">
          <Link to="/be-a-farmer">
            <Button type="primary">Become Farmer</Button>
          </Link>
        </Empty>
      </div>
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
          <Title level={2}>My Farmer Application</Title>

          <Tag color={statusColor[application.status]}>
            {application.status.toUpperCase()}
          </Tag>
        </div>

        <Descriptions column={1} bordered>
          <Descriptions.Item label="Phone">
            {application.phone}
          </Descriptions.Item>

          <Descriptions.Item label="NID">{application.nid}</Descriptions.Item>

          <Descriptions.Item label="District">
            {application.district}
          </Descriptions.Item>

          <Descriptions.Item label="Area">{application.area}</Descriptions.Item>

          <Descriptions.Item label="Address">
            {application.address}
          </Descriptions.Item>

          <Descriptions.Item label="Farm Types">
            {application.farmTypes.join(", ")}
          </Descriptions.Item>

          <Descriptions.Item label="Experience">
            {application.experience} Years
          </Descriptions.Item>

          <Descriptions.Item label="About">
            {application.about || "-"}
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-8 flex gap-3">
          {application.status === "pending" && (
            <Button danger>Withdraw Application</Button>
          )}
          {application.status === "approved" && (
            <Link to="/dashboard/my-products">
              <Button type="primary">My Products</Button>
            </Link>
          )}

          {application.status === "rejected" && (
            <Link to="/be-a-rider">
              <Button type="primary">Apply Again</Button>
            </Link>
          )}
        </div>

        {/* </div> */}
      </Card>
    </section>
  );
};

export default MyApplication;
