import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import "./Slider.scss";
import ProductCardSkeleton from "../loading/ProductCardSkeleton";
import ProductCard from "../ProductCard";
import { SliderProps } from "../../misc/types";
import CategoryCardSkeleton from "../loading/CategoryCardSkeleton";
import CategoryCard from "../CategoryCard";

export default function Slider({
  title,
  data,
  isLoading,
  slidesPerViewSm,
  slidesPerViewMd,
  slidesPerViewLg,
  showScrollbar,
  showPagination,
}: SliderProps) {
  return (
    <section className="swiper-section">
      <h1 className="swiper-title">{title}</h1>
      <div className="swiper-wrapper">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Thumbs]}
          spaceBetween={10}
          slidesPerView={slidesPerViewSm}
          pagination={showPagination ? { clickable: true } : false}
          scrollbar={showScrollbar ? { draggable: true } : false}
          breakpoints={{
            577: {
              slidesPerView: slidesPerViewMd,
              spaceBetween: 15,
            },
            993: {
              slidesPerView: slidesPerViewLg,
              spaceBetween: 20,
            },
          }}
          className="swiper"
        >
          {isLoading
            ? Array.from({ length: data.slice(0, 5).length }).map((_, i) => (
                <SwiperSlide key={i}>
                  {title === "Categories" ? (
                    <CategoryCardSkeleton />
                  ) : (
                    <ProductCardSkeleton />
                  )}
                </SwiperSlide>
              ))
            : data?.slice(0, 5).map((item, i) => (
                <SwiperSlide key={i}>
                  {"title" in item ? ( // Type assertion for Product
                    <ProductCard
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      price={item.price}
                      category={item.category}
                      images={item.images}
                      product={item}
                    />
                  ) : (
                    // Type assertion for Category
                    <CategoryCard
                      id={item.id}
                      image={item.image}
                      name={item.name}
                    />
                  )}
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}
