// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
import "swiper/css";

import "./Home.scss";
import heroImgDarkTheme from "../../assets/cover-image-light.jpg";
import heroImgLightTheme from "../../assets/cover-image-dark.jpg";
import { useTheme } from "../../context/useTheme";
import CategoryCard from "../../components/CategoryCard";
import { useEffect, useState } from "react";
import { Category, Product } from "../../misc/typesInRedux";
import { axiosApi } from "../../config/axiosApi";
import ProductCard from "../../components/ProductCard";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

export default function Home() {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // fetch categories
    try {
      const fetchCategories = async () => {
        const res = await axiosApi.get("categories");
        // console.log(res.data);
        setCategories(res?.data?.slice(0, 5));
      };
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // use fetchAllProductsAsync
  useEffect(() => {
    // logic
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // get products
  const products = useSelector((state: RootState) =>
    state.products.products.slice(3, 10)
  );
  console.log(products);
  // const handleSwiper = (swiper: SwiperClass) => {
  //   console.log(swiper);
  // };

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
        <h1 className="section__title">Categories</h1>
        <div className="swiper-wrapper">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper: SwiperClass) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
            breakpoints={{
              577: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              993: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {categories?.map((category, i) => (
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
        <h1 className="section__title">Featured products</h1>
        <div className="swiper-wrapper">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Scrollbar]}
            spaceBetween={10}
            slidesPerView={2}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper: SwiperClass) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            breakpoints={{
              577: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              993: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
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

      <section className="testimonials-section">
        {/* Testimonials */}
        {/* Featured brands */}
      </section>

      <section className="latest-arrivals-section">
        {/* Latest arrivals */}
        {/* Sale items */}
      </section>
    </main>
  );
}
