import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import React from "react";

// MY IMPORTS
import ProductItem from "../Product/productItem";
function ListProductSlide({
  products = [],
  spaceBetween,
  slidesPerView,
  navigation,
  scrollbar,
  delay,
  breakpoints = {
    100: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  },
  hiddenSold = false,
  hiddenDesc = false,
  cart = false,
  title,
}) {
  console.log("[COMP] ListProductSlide - re-render" + title);
  return (
    <Swiper
      spaceBetween={spaceBetween || 10}
      slidesPerView={slidesPerView || 4}
      navigation={navigation || true}
      scrollbar={scrollbar || true}
      modules={[Navigation, Autoplay, Scrollbar]}
      autoplay={{ delay: delay || 1000 * 60 * 20 }}
      breakpoints={breakpoints ? breakpoints : {}}
      className="list-product-slide"
    >
      {products.map((product, index) => (
        <SwiperSlide>
          <ProductItem
            product={product}
            hiddenSold={hiddenSold}
            hiddenDesc={hiddenDesc}
            cart={cart}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default React.memo(ListProductSlide);
