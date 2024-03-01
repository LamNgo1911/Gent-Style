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
import ReactPaginate from "react-paginate";
import { useFetchProductsByPaginationQuery } from "../../redux/productQuery";
import { useTheme } from "../../context/useTheme";

export default function ProductListing() {
  const dispatch = useAppDispatch();
  const { isBigScreen } = useMediaQueries();
  const { theme } = useTheme();

  const limit = 8;
  const [offset, setOffset] = useState(0);

  const {
    data: productsByPagination,
    isLoading,
    error,
  } = useFetchProductsByPaginationQuery({ offset, limit });
  const loading = useSelector((state: RootState) => state.products.loading);

  // use fetchAllProductsAsync
  useEffect(() => {
    // logic
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // const products = [...productData];
  // get products
  const products = useSelector((state: RootState) => state.products.products);

  const pageCount = Math.ceil(products?.length / limit);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * limit;
    console.log(
      `User requested page number ${
        event.selected + 1
      }, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  };

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
            : productsByPagination?.map((product, i) => (
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
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={`pagination-container ${theme}`}
          activeClassName="active-page"
        />
      </section>
    </main>
  );
}
