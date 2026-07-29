import { Button } from "antd";
import { Eye, ShoppingCart } from "lucide-react";
import type { IProduct } from "../../redux/features/product/product.types";
import { Link } from "react-router";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, category, price, unit, images, farmer, isAvailable } = product;

  return (
    <div
      className="
      group
      overflow-hidden
      rounded-xl
      border
      border-slate-200
      bg-white
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
    "
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="
          w-full
          h-64
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
        "
        />

        {/* Category */}
        <div
          className="
          absolute
          left-4
          top-4
          rounded-full
          bg-white/90
          px-4
          py-1.5
          text-xs
          font-semibold
          text-emerald-700
          backdrop-blur-md
        "
        >
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        <div className="flex justify-between">
          {/* Name */}
          <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900">
            {name}
          </h3>
          <div>
            <span
              className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                isAvailable
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-600"
              }
            `}
            >
              {isAvailable ? "Available" : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* Price */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-600">
            ৳ {price} <span className="text-xl text-slate-500">/ {unit}</span>
          </h2>
        </div>

        {/* Farmer */}
        <div className="flex items-center gap-3">
          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-emerald-100
            font-semibold
            text-emerald-700
          "
          >
            {farmer.name.charAt(0)}
          </div>

          <div>
            <p className="text-xs text-slate-500">Farmer</p>

            <h4 className="font-medium text-slate-800">{farmer.name}</h4>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link to={`/products/${product._id}`}>
            <Button size="large" icon={<Eye size={18} />} block>
              View Details
            </Button>
          </Link>
          <Button type="primary" size="large" icon={<ShoppingCart size={18} />}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
