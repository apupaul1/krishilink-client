import { Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import CropCard from "./CropCard";
import { crops } from "../../../data/crops";

const { Title, Paragraph } = Typography;

const FeaturedCrops = () => {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <Title level={2}>Today's Fresh Harvest</Title>

            <Paragraph className="mb-0!">
              Fresh products collected directly from trusted farmers.
            </Paragraph>
          </div>

          <Button
            type="default"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
          >
            View All
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {crops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCrops;