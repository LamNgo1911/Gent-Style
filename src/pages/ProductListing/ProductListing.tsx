import { useEffect, useRef, useState } from "react";

import "./ProductListing.scss";
import ProductCard from "../../components/ProductCard";
import { useMediaQueries } from "../../components/hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import ProductCardSkeleton from "../../components/loading/ProductCardSkeleton";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import FilterBigScreen from "./FilterBigScreen";
import { productData } from "../../components/data/productData";
import FilterSmallScreen from "./FilterSmallScreen";

export default function ProductListing() {
  const dispatch = useAppDispatch();

  const { isBigScreen } = useMediaQueries();

  // get products
  // const products = useSelector((state: RootState) =>
  //   state.products.products.slice(1, 5)
  // );
  const loading = useSelector((state: RootState) => state.products.loading);

  // use fetchAllProductsAsync
  useEffect(() => {
    // logic
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const products = [...productData];

  return (
    <main className={`productListing`}>
      <h1 className="product-title">Category</h1>

      {isBigScreen ? <FilterBigScreen /> : <FilterSmallScreen />}

      {/* product section */}
      <section className="product-section">
        <h3>78 styles found</h3>

        {/* product list */}
        <div className="product-list">
          {loading
            ? Array.from({ length: products?.length })?.map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products?.map((product, i) => (
                <ProductCard
                  key={i}
                  id={product?.id}
                  title={product?.title}
                  description={product?.description}
                  price={product?.price}
                  category={product?.category}
                  images={product?.images}
                />
              ))}
        </div>
      </section>
    </main>
  );
}
