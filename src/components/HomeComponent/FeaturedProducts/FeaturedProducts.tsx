  import { Button, Typography } from "antd";
  import { ArrowRightOutlined } from "@ant-design/icons";
  import FeaturedProductCard from "./FeaturedProductCard";
  import { useGetFeaturedProductsQuery } from "../../../redux/features/product/productsApi";
  import Loading from "../../shared/Loading/Loading";

  const { Title, Paragraph } = Typography;

  const FeaturedProducts = () => {

    const { data, isLoading } = useGetFeaturedProductsQuery();

    const products = data?.data ?? [];

    if(isLoading) {
      return <Loading></Loading>
    }

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
            {products.map((product) => (
              <FeaturedProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default FeaturedProducts;
