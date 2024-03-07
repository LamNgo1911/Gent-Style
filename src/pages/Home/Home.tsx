import { useSelector } from "react-redux";

import "./Home.scss";
import heroImgDarkTheme from "../../assets/cover-image-light.jpg";
import heroImgLightTheme from "../../assets/cover-image-dark.jpg";
import { useTheme } from "../../context/useTheme";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { productData } from "../../data/productData";
import { trendingData } from "../../data/trendingData";
import TrendingCard from "../../components/TrendingCard";
import { useFetchAllCategoriesQuery } from "../../redux/productQuery";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "../../components/Slider";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import LoadingError from "../../components/LoadingError";

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    data: categoryListing = [],
    isLoading,
    error,
  } = useFetchAllCategoriesQuery();

  // use fetchAllProductsAsync
  useEffect(() => {
    // logic
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // selectors
  const {
    products,
    loading,
    error: productError,
  } = useSelector((state: RootState) => state.products);

  // const products = [...productData];

  const trendingCategories = [...trendingData];

  if (error || productError) {
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
        data={categoryListing}
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
              description={cate.description}
              image={cate.image}
            />
          </div>
        ))}
      </section>

      {/* new arrivals section */}
      <Slider
        title="New arrivals"
        data={products}
        // data={productData}
        isLoading={loading}
        slidesPerViewSm={1}
        slidesPerViewMd={2}
        slidesPerViewLg={3}
        showScrollbar={true}
        showPagination={false}
      />
    </main>
  );
}
