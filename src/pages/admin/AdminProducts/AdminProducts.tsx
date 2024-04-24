import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { RootState } from "../../../redux/store";
import { useCreateProductMutation } from "../../../redux/productQuery";

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

export default function AdminProducts() {
  const dispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.products);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [createProductMutation, { isLoading, error: createProductError }] =
    useCreateProductMutation(); // Destructure the mutation function and isLoading flag
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
      await createProductMutation(formData);
      alert("Product created successfully!");
    } catch (error) {
      // Handle the error
      alert("Sth went Wrong. Please try it again");
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>Price:</label>
          <input type="text" {...register("price", { required: true })} />
          {errors.price && <span>This field is required</span>}
        </div>
        <div>
          <label>Description:</label>
          <input type="text" {...register("description", { required: true })} />
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <label>Category:</label>
          <input type="text" {...register("category", { required: true })} />
          {errors.category && <span>This field is required</span>}
        </div>
        <div>
          <label>Variants:</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <label>Color:</label>
              <input
                type="text"
                {...register(`variants.${index}.color`, { required: true })}
              />
              {errors.variants?.[index]?.color && (
                <span>This field is required</span>
              )}

              <label>Size:</label>
              <input
                type="text"
                {...register(`variants.${index}.size`, { required: true })}
              />
              {errors.variants?.[index]?.size && (
                <span>This field is required</span>
              )}

              <label>Stock:</label>
              <input
                type="text"
                {...register(`variants.${index}.stock`, {
                  required: true,
                })}
              />
              {errors.variants?.[index]?.stock && (
                <span>This field is required</span>
              )}

              <button type="button" onClick={() => remove(index)}>
                Remove Variant
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ color: "", size: "", stock: 0 })}
          >
            Add Variant
          </button>

          {errors.variants && <span>At least one variant is required</span>}
        </div>
        <div>
          <label>Images:</label>
          <input type="file" {...register("images")} multiple />
          {errors.images && <span>This field is required</span>}
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
