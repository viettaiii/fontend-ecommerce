import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import LazyImage from "../../components/LazyImage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/category/categorySlice";
function DanhMucNoiBat() {
  console.log("[HOME] danhmucnoibat --- re-render");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const { categories } = useSelector((store) => store.category);
  return (
    <div className="container mt-5 danhmucnoibat">
      <h3 className="text-uppercase text-center mb-4">DANH MỤC NỔI BẬT</h3>
      <Swiper
        spaceBetween={25}
        navigation={true}
        scrollbar={true}
        modules={[Navigation, Autoplay, Scrollbar]}
        autoplay={{ delay: 3000 }}
        breakpoints={{
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
            slidesPerView: 6,
            spaceBetween: 25,
          },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Col className="item">
              <div className="border-1 d-flex flex-column gap-1 align-items-center">
                <LazyImage
                  src={
                    process.env.REACT_APP_BACKEND_URL +
                    "/static/assets/images/category/" +
                    category.image
                  }
                  alt={category.categoryName}
                />
                <span className="mt-2 text-size-16">
                  {category.categoryName}
                </span>
              </div>
            </Col>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default React.memo(DanhMucNoiBat);
