import { ArrowRight } from "lucide-react";
import type { Category } from "../../../types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = category.icon;

  return (
    <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 transition-transform duration-300 group-hover:rotate-12">
          <Icon size={30} />
        </div>

        <ArrowRight
          size={20}
          className="text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-600"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {category.name}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {category.productCount} Products
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;