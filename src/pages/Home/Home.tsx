import { useSelector } from "react-redux";
import { useEffect } from "react";

import "./Home.scss";
import heroImgDarkTheme from "../../assets/cover-image-light.jpg";
import heroImgLightTheme from "../../assets/cover-image-dark.jpg";
import { useTheme } from "../../context/useTheme";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import { AppDispatch, RootState, useAppDispatch } from "../../redux/store";
import { trendingData } from "../../data/trendingData";
import TrendingCard from "../../components/TrendingCard";
import {
  useFetchAllCategoriesQuery,
  useFetchProductsByPaginationQuery,
} from "../../redux/productQuery";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "../../components/Slider";
import { useNavigate } from "react-router-dom";
import LoadingError from "../../components/LoadingError";
import { Category, Product } from "../../misc/types";

export default function Home() {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    data: categoryListing,
    isLoading,
    error,
  } = useFetchAllCategoriesQuery();

  // selectors
  const { loading, error: productError } = useSelector(
    (state: RootState) => state.products
  );

  const products: Product[] = useSelector(
    (state: RootState) => state.products.products
  );

  // Todo: use fetchAllProductsAsync
  useEffect(() => {
    const getProducts = async () => {
      // logic
      const productData = await dispatch(fetchAllProducts());
    };
    getProducts();
  }, [dispatch]);

  const {
    data: RelevantProducts,
    isLoading: isLoadingRelevantProducts,
    error: errorRelevantProducts,
  } = useFetchProductsByPaginationQuery({
    sort: "Latest added",
    skip: 0,
    limit: 10,
    size: "",
    color: "",
    search: "",
    category: "",
    priceMin: 0,
    priceMax: 999,
  });

  const trendingCategories = [...trendingData];

  if (error || productError || errorRelevantProducts) {
    return <LoadingError />;
  }

  return (
    <main className={`home ${theme}`}>
      <section className="hero-section">
        {/* Hero banner */}
        <div className="hero-banner">
          <img
            className="hero-image"
            src={theme === "light-theme" ? heroImgLightTheme : heroImgDarkTheme}
            alt="Hero"
          />
          <div className="hero-content">
            <h1>Welcome to Men's Style</h1>
            <p>Discover the latest trends in men's fashion.</p>
            <button
              className={`hero-button ${
                theme === "dark-theme" ? "btn-dark-theme" : "btn-light-theme"
              }`}
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Categories section*/}
      <Slider
        title="Categories"
        data={categoryListing?.categories as Category[]}
        isLoading={isLoading}
        slidesPerViewSm={1}
        slidesPerViewMd={2}
        slidesPerViewLg={3}
        showScrollbar={false}
        showPagination={true}
      />

      {/* Featured products section*/}
      <Slider
        title="Featured products"
        data={products}
        // data={productData}
        isLoading={loading}
        slidesPerViewSm={1}
        slidesPerViewMd={2}
        slidesPerViewLg={3}
        showScrollbar={true}
        showPagination={false}
      />

      {/* advertisement */}
      <section
        className="advertisement-section"
        onClick={() => navigate("/sale")}
      >
        <h2 className="advertisement-title">UP TO 30% OFF FRESH FINDS</h2>
        <p className="advertisement-infor">
          Limited time only. Selected styles marked down as shown
        </p>
      </section>

      {/* trending section */}
      <section className="trending-section">
        {trendingCategories?.map((cate, i) => (
          <div key={i}>
            <TrendingCard
              id={cate?.id}
              title={cate.title}
              category={cate.category}
              description={cate.description}
              image={cate.image}
            />
          </div>
        ))}
      </section>

      {/* new arrivals section */}
      <Slider
        title="New arrivals"
        data={RelevantProducts?.products as Product[]}
        // data={productData}
        isLoading={isLoadingRelevantProducts}
        slidesPerViewSm={1}
        slidesPerViewMd={2}
        slidesPerViewLg={3}
        showScrollbar={true}
        showPagination={false}
      />
    </main>
  );
}
