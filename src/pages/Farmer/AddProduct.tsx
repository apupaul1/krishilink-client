import { message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useAppSelector } from "../../redux/hooks";
import { uploadImage } from "../../utils/uploadImage";
import type { IAddProductForm } from "../../redux/features/product/product.types";
import {
  useCreateProductMutation,
  type ICreateProduct,
} from "../../redux/features/product/productsApi";
import ProductForm from "../../components/shared/ProductForm/ProductForm";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [createProduct] = useCreateProductMutation();

  const navigate = useNavigate();

  const onSubmit = async (values: IAddProductForm) => {
    try {
      const files = values.images as UploadFile[];

      const imageUrls = await Promise.all(
        files.map((file) => uploadImage(file.originFileObj as File)),
      );

      if (!user?.displayName || !user?.email) {
        message.error("Unable to identify farmer.");
        return;
      }

      const productData: ICreateProduct = {
        name: values.name,
        category: values.category,
        description: values.description,

        price: values.price,
        unit: values.unit,
        stock: values.stock,

        images: imageUrls,

        location: values.location,

        farmer: {
          name: user?.displayName,
          email: user?.email,
        },
      };
      await createProduct(productData).unwrap();

      message.success("Product added successfully");

      navigate("/my-products");
    } catch (error) {
      console.error(error);
      message.error("Something Went Wrong. Please Try Again");
    }
  };

  return <ProductForm mode="create" onSubmit={onSubmit}></ProductForm>;
};

export default AddProduct;
