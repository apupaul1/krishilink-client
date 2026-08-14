import { Form, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productsApi";

import type {
  IAddProductForm,
  IProduct,
} from "../../redux/features/product/product.types";

import { uploadImage } from "../../utils/uploadImage";
import ProductForm from "../../components/shared/ProductForm/ProductForm";
import Loading from "../../components/shared/Loading/Loading";

const EditProduct = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { data, isLoading } = useGetSingleProductQuery(id!);

  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.data) {
      const product: IProduct = data.data;
      setExistingImages(product.images);
    }
  }, [data, form]);

  const handleRemoveImage = (url: string) => {
    setExistingImages((prev) => prev.filter((image) => image !== url));
  };

  const onFinish = async (values: IAddProductForm) => {
    let uploadedUrls: string[] = [];

    if (values.images?.length) {
      uploadedUrls = await Promise.all(
        values.images.map((file) => uploadImage(file.originFileObj as File)),
      );
    }

    const finalImages = [...existingImages, ...uploadedUrls];

    if (finalImages.length === 0) {
      message.error("At least one product image is required.");
      return;
    }

    await updateProduct({
      id: id!,
      body: {
        name: values.name,
        category: values.category,
        description: values.description,
        unit: values.unit,
        stock: values.stock,
        price: values.price,
        location: values.location,

        images: finalImages,
      },
    }).unwrap();

    message.success("Product updated successfully");

    navigate("/my-products");
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <ProductForm
      mode="edit"
      loading={updating}
      initialValues={data?.data}
      existingImages={existingImages}
      onRemoveImage={handleRemoveImage}
      onSubmit={onFinish}
    />
  );
};

export default EditProduct;
