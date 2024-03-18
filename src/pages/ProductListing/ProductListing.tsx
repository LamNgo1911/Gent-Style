import { useEffect, useRef, useState } from "react";

import "./ProductListing.scss";
import ProductCard from "../../components/ProductCard";
import { useMediaQueries } from "../../hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import ProductCardSkeleton from "../../components/loading/ProductCardSkeleton";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import FilterBigScreen from "./FilterBigScreen";
import { productData } from "../../data/productData";
import FilterSmallScreen from "./FilterSmallScreen";
import ReactPaginate from "react-paginate";
import { useFetchProductsByPaginationQuery } from "../../redux/productQuery";
import { useTheme } from "../../context/useTheme";
import { useFilter } from "../../context/useFilter";
import LoadingError from "../../components/LoadingError";

export default function ProductListing() {
  const dispatch = useAppDispatch();
  const { isBigScreen } = useMediaQueries();
  const { theme } = useTheme();

  const limit = 8;
  const [offset, setOffset] = useState(0);
  const { categoryId, priceRange, getCategoryName, setCategoryId } =
    useFilter();

  const {
    data: productsByPagination,
    isLoading,
    error,
  } = useFetchProductsByPaginationQuery({
    offset,
    limit,
    categoryId: Number(categoryId),
    priceMin: Number(priceRange[0]),
    priceMax: Number(priceRange[1]),
  });

  // selectors
  const {
    products,
    loading,
    error: productError,
  } = useSelector((state: RootState) => state.products);

  // use fetchAllProductsAsync
  useEffect(() => {
    // logic
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // reset category
  useEffect(() => {
    setCategoryId("");
  }, []);

  // const products = [...productData];

  const pageCount = Math.ceil(products?.length / limit);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * limit;
    setOffset(newOffset);
  };

  // handle error
  if (error || productError) {
    return <LoadingError />;
  }

  return (
    <main className={`productListing`}>
      <h1 className="product-title">{getCategoryName()}</h1>

      {isBigScreen ? <FilterBigScreen /> : <FilterSmallScreen />}

      {/* product section */}
      <section className="product-section">
        <h3>{products?.length || 0} style(s) found</h3>

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
                  product={product}
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
