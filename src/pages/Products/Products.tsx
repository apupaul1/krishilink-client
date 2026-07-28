import { message } from "antd";
import { useGetProductsQuery } from "../../redux/features/product/productsApi";
import ProductCard from "./ProductCard";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <h1 className="text-7xl">
        L <span className="text-green-500 animate-bounce">O</span> ADING
      </h1>
    );
  }

  if (error) {
    message.error("Something went wrong");
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 my-8">
        <h1 className="text-2xl md:text-4xl text-center">
            All Products ({data?.data.length})
        </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
