// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { useSelector } from "react-redux";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";

// Import Swiper styles
import "swiper/css";

import "./Home.scss";
import heroImgDarkTheme from "../../assets/cover-image-light.jpg";
import heroImgLightTheme from "../../assets/cover-image-dark.jpg";
import { useTheme } from "../../context/useTheme";
import CategoryCard from "../../components/CategoryCard";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { productData } from "../../components/data/productData";
import { trendingData } from "../../components/data/trendingData";
import TrendingCard from "../../components/TrendingCard";
import { useFetchAllCategoriesQuery } from "../../redux/productQuery";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryCardSkeleton from "../../components/loading/CategoryCardSkeleton";
import ProductCardSkeleton from "../../components/loading/ProductCardSkeleton";

export default function Home() {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const {
    data: categoryListing = [],
    isLoading,
    error,
  } = useFetchAllCategoriesQuery();
  console.log(categoryListing);

  // use fetchAllProductsAsync
  useEffect(() => {
    // logic
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // get products
  const products = useSelector((state: RootState) =>
    state.products.products.slice(1, 5)
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  // const products = [...productData];
  console.log(products);
  const trendingCategories = [...trendingData];

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
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <section className="categories-section">
        {/* Categories */}
        <h1 className="section-title">Categories</h1>
        <div className="swiper-wrapper">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              577: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              993: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="first-swiper"
          >
            {isLoading
              ? // Display skeletons while loading
                Array.from({ length: categoryListing.slice(0, 5).length }).map(
                  (_, i) => (
                    <SwiperSlide key={i}>
                      <CategoryCardSkeleton />
                    </SwiperSlide>
                  )
                )
              : // Display categories once loaded
                categoryListing.slice(0, 5).map((category, i) => (
                  <SwiperSlide key={i}>
                    <CategoryCard
                      id={category.id}
                      image={category?.image}
                      name={category?.name}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>

        {/* Featured products */}
        <h1 className="section-title">Featured products</h1>
        <div className="swiper-wrapper">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Scrollbar, Thumbs]}
            spaceBetween={10}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log("slide change")}
            breakpoints={{
              577: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              993: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="first-swiper"
          >
            {loading
              ? Array.from({ length: products.slice(0, 5).length }).map(
                  (_, i) => (
                    <SwiperSlide key={i}>
                      <ProductCardSkeleton />
                    </SwiperSlide>
                  )
                )
              : products?.map((product, i) => (
                  <SwiperSlide key={i}>
                    <ProductCard
                      id={product?.id}
                      title={product?.title}
                      description={product?.description}
                      price={product?.price}
                      category={product?.category}
                      images={product?.images}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </section>

      {/* advertisement */}
      <section className="advertisement-section">
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

      {/* new arrivals */}
      <section className="new-arrivals-section">
        <h1 className="section-title">New arrivals</h1>
        <div className="swiper-wrapper">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Scrollbar, Thumbs]}
            spaceBetween={10}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log("slide change")}
            breakpoints={{
              577: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              993: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="first-swiper"
          >
            {products?.map((product, i) => (
              <SwiperSlide key={i}>
                <ProductCard
                  id={product?.id}
                  title={product?.title}
                  description={product?.description}
                  price={product?.price}
                  category={product?.category}
                  images={product?.images}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
}
