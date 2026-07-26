import { Avatar, Button, Tag } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";
import type { Crop } from "../../../types";

interface CropCardProps {
  crop: Crop;
}

const CropCard = ({ crop }: CropCardProps) => {


  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={crop.image}
          alt={crop.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Category */}
        <Tag
          color="green"
          className="absolute! left-4 top-4 rounded-full px-3 py-1"
        >
          {crop.category}
        </Tag>

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 backdrop-blur">
          <StarFilled className="text-amber-500"/>
          <span className="text-sm font-semibold">{crop.rating}</span>
        </div>

        {/* Wishlist */}
        <button className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-red-50">
          <HeartOutlined />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>

          <div className="mt-2 flex items-center gap-2 text-gray-500">
            <Avatar size={26}>{crop.farmer[0]}</Avatar>

            <span className="text-sm">{crop.farmer}</span>
          </div>

          <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
            <EnvironmentOutlined />
            {crop.district}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-green-600">
              ৳{crop.price}
            </p>
            <span className="text-gray-500">per {crop.unit}</span>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {crop.stock} Available
          </span>
        </div>

        {/* Button */}
        <Button
          type="primary"
          size="large"
          block
          icon={<ShoppingCartOutlined />}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CropCard;