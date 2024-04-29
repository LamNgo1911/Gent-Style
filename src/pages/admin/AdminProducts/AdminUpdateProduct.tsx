import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

import { RootState } from "../../../redux/store";
import {
  useFetchASingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/productQuery";
import "./AdminProducts.scss";
import { useEffect } from "react";

type Variant = {
  color: string;
  size: string;
  stock: number;
};

export type ProductInput = {
  name: string;
  price: number;
  description: string;
  category: string;
  variants: Variant[];
  images: File[];
};

type SingleProductProps = {
  productId: string;
  setOpenUpdateProduct: (key: boolean) => void;
};

export default function AdminUpdateProduct({
  productId,
  setOpenUpdateProduct,
}: SingleProductProps) {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.products);

  const {
    data: singleProductData,
    isLoading: singleProductLoading,
    error: singleProductError,
  } = useFetchASingleProductQuery(productId);

  console.log(productId, singleProductData);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductInput>({
    defaultValues: {
      name: singleProductData?.product?.name || "",
      price: singleProductData?.product?.price || 0,
      description: singleProductData?.product?.description || "",
      category: singleProductData?.product?.category?.id || "",
      variants: singleProductData?.product?.variants || [],
    },
  });

  useEffect(() => {
    // Update form values when singleProductData changes
    if (singleProductData?.product) {
      const { name, price, description, category, variants } =
        singleProductData?.product;
      reset({
        name: name || "",
        price: price || 0,
        description: description || "",
        category: category?.id || "",
        variants: variants || [],
      });
    }
  }, [singleProductData, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [updateProductMutation, { isLoading, error: createProductError }] =
    useUpdateProductMutation(); // Destructure the mutation function and isLoading flag
  const onSubmit = async (data: ProductInput) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("description", data.description);
      formData.append("category", data.category);

      data.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][color]`, variant.color);
        formData.append(`variants[${index}][size]`, variant.size);
        formData.append(`variants[${index}][stock]`, variant.stock.toString());
      });

      if (data.images) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      }
      console.log("Form Data:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      await updateProductMutation({
        data: formData,
        productId: singleProductData?.product?.id as string,
      });
      alert("Product created successfully!");
    } catch (error) {
      // Handle the error
      alert("Sth went Wrong. Please try it again");
    }
  };

  return (
    <div className="create-product">
      <div className="create-product-wrapper">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label>Name:</label>
            <input type="text" {...register("name", { required: true })} />
            {errors.name && (
              <span className="error">This field is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <label>Price:</label>
            <input type="text" {...register("price", { required: true })} />
            {errors.price && (
              <span className="error">This field is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <label>Description:</label>
            <input
              type="text"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="error">This field is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <label>Category:</label>
            <input type="text" {...register("category", { required: true })} />
            {errors.category && (
              <span className="error">This field is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <label>Variants:</label>
            {fields.map((field, index) => (
              <div key={field.id} className="input-variants-wrapper">
                <label>Color:</label>
                <input
                  type="text"
                  {...register(`variants.${index}.color`, { required: true })}
                />
                {errors.variants?.[index]?.color && (
                  <span className="error">This field is required</span>
                )}

                <label>Size:</label>
                <input
                  type="text"
                  {...register(`variants.${index}.size`, { required: true })}
                />
                {errors.variants?.[index]?.size && (
                  <span className="error">This field is required</span>
                )}

                <label>Stock:</label>
                <input
                  type="text"
                  {...register(`variants.${index}.stock`, {
                    required: true,
                  })}
                />
                {errors.variants?.[index]?.stock && (
                  <span className="error">This field is required</span>
                )}

                <button
                  className="add-variants-btn"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove Variant
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-variants-btn"
              onClick={() => append({ color: "", size: "", stock: 0 })}
            >
              Add Variant
            </button>

            {errors.variants && <span>At least one variant is required</span>}
          </div>
          <div className="input-wrapper">
            <label>Images:</label>
            <input type="file" {...register("images")} multiple />
            {errors.images && <span>This field is required</span>}
          </div>
          <button className="create-product-btn" type="submit">
            Update Product
          </button>
        </form>
      </div>

      <div className="close-btn" onClick={() => setOpenUpdateProduct(false)}>
        <IoMdClose />
      </div>
    </div>
  );
}
