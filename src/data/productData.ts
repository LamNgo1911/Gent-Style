import { Size } from "../misc/types";

export const productData = [
  {
    id: "123456789",
    name: "Sample Product",
    price: 29.99,
    description: "This is a sample product description.",
    category: {
      id: "987654321",
      name: "Sample Category",
      image: "category-image.jpg",
    },
    variants: [
      {
        color: "Red",
        size: Size.M,
        stock: 10,
      },
      {
        color: "Blue",
        size: Size.L,
        stock: 5,
      },
    ],
    images: ["product-image1.jpg", "product-image2.jpg"],
  },
  {
    id: "123456789123",
    name: "Sample Product",
    price: 29.99,
    description: "This is a sample product description.",
    category: {
      id: "987654321",
      name: "Sample Category",
      image: "category-image.jpg",
    },
    variants: [
      {
        color: "Red",
        size: Size.M,
        stock: 10,
      },
      {
        color: "Blue",
        size: Size.L,
        stock: 5,
      },
    ],
    images: ["product-image1.jpg", "product-image2.jpg"],
  },
];
