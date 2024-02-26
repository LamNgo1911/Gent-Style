import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";

// import Swiper core and required modules
import { Navigation, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/thumbs";

import { Product } from "../../misc/typesInRedux";
import "./ProductCard.scss";

export default function ProductCard({
  id,
  title,
  description,
  price,
  category,
  images,
}: Product) {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  const handleSwiperChange = (swiper: SwiperClass) => {
    if (!thumbsSwiper) return; // Guard against null value
    // Your logic here
    setThumbsSwiper(swiper);
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          className="second-swiper"
        >
          {images?.map((image, i) => (
            <SwiperSlide key={i}>
              <img src={image} alt={title} className="main-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="thumbnail-container">
        <Swiper
          modules={[Navigation, Thumbs]}
          slidesPerView={images?.length}
          className="second-swiper thumbnail-swiper"
          onSwiper={(swiper: SwiperCore) => handleSwiperChange(swiper)}
        >
          {images?.map((image, i) => (
            <SwiperSlide key={i}>
              <img src={image} alt={title} className="circle-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price}</p>
      </div>
      <div className="wishlist-icon">
        <i className="fas fa-heart"></i>
      </div>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
}
