import { useLocation } from "react-router-dom";
import { useFilter } from "../../context/useFilter";
import { useTheme } from "../../context/useTheme";
import "./SearchResults.scss";
import { useEffect, useState } from "react";
import LoadingError from "../../components/LoadingError";
import { useFetchProductsByPaginationQuery } from "../../redux/productQuery";
import ProductCardSkeleton from "../../components/loading/ProductCardSkeleton";
import ProductCard from "../../components/ProductCard";
import ReactPaginate from "react-paginate";
import { Product } from "../../misc/types";

export default function SearchResults() {
  const {
    categoryName,
    priceRange,
    sort,
    size,
    color,
    search,
    setSort,
    setSize,
    setColor,
    setCategoryName,
    setPriceRange,
  } = useFilter();

  const { theme } = useTheme();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [count, setCount] = useState(0);

  const limit = 8;

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when the filters change
  }, [sort, size, color, search, categoryName, priceRange]);

  const skip = (currentPage - 1) * limit;

  const {
    data: productsByPagination,
    isLoading,
    error,
  } = useFetchProductsByPaginationQuery({
    sort,
    skip,
    limit,
    size,
    color,
    search,
    category: categoryName,
    priceMin: Number(priceRange[0]),
    priceMax: Number(priceRange[1]),
  });

  useEffect(() => {
    setCount(productsByPagination?.count as number);
  }, [productsByPagination]);

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo(0, 0);
  };

  // Todo: reset all filter and sort when user navigate to a new page
  useEffect(() => {
    setSort("");
    setSize("");
    setColor("");
    setCategoryName("");
    setPriceRange([0, 999]);
  }, [location]);

  // handle error
  if (error) {
    return <LoadingError />;
  }

  return (
    <main className={`productListing`}>
      <h1 className="product-title">SEARCH RESULTS</h1>

      {search ? (
        <div>
          {/* product section */}
          <section className="product-section">
            <h3>{productsByPagination?.count || 0} style(s) found</h3>

            {/* product list */}
            <div className="product-list">
              {isLoading
                ? Array.from({
                    length: count,
                  })?.map((_, i) => <ProductCardSkeleton key={i} />)
                : productsByPagination?.products?.map((product: Product, i) => (
                    <ProductCard
                      key={i}
                      id={product?.id}
                      name={product?.name}
                      description={product?.description}
                      price={product?.price}
                      category={product?.category}
                      variants={product?.variants}
                      images={product?.images}
                      product={product}
                    />
                  ))}
            </div>
            {Math.ceil(count / limit) > 1 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(count / limit) || 0}
                forcePage={currentPage - 1}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={`pagination-container ${theme}`}
                activeClassName="active-page"
              />
            )}
          </section>
        </div>
      ) : (
        <div className="not-found">
          <p>No items found!</p>
        </div>
      )}
    </main>
  );
}
