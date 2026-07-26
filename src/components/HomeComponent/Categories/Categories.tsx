import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { categories } from "../../../data/categories";

const Categories = () => {
  return (
    <section className="bg-stone-50 py-10">
      <div className="mx-auto max-w-7xl px-5">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
              Categories
            </span>

            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              Browse Fresh Categories
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Explore a wide range of fresh products directly from trusted
              farmers across Bangladesh.
            </p>
          </div>

          <Button
            type="default"
            size="large"
            className="flex items-center"
          >
            View All
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;