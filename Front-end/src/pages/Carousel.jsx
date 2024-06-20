// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFlip,
  EffectCards,
  EffectCube,
  EffectCreative,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay } from "swiper/modules";
import "swiper/css/effect-flip";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";

// Import images using ES6 import syntax
import img2 from "../components/assets/img2.png";
import img3 from "../components/assets/img3.png";
import img4 from "../components/assets/img4.png";

export default function Carousel() {
  return (
    <Swiper
      modules={[
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        Autoplay,
        EffectFlip,
        EffectCards,
        EffectCube,
        EffectCreative,
        EffectCoverflow,
      ]}
      spaceBetween={0}
      slidesPerView={1}
      effect={"creative"}
      autoplay={{ delay: 3000 }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
      }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img className="lg:h-[50vh] h-[30vh] w-screen " src={img2} alt="img2" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="lg:h-[50vh] w-screen h-[30vh]" src={img3} alt="img3" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="lg:h-[50vh] w-screen h-[30vh]" src={img4} alt="img4" />
      </SwiperSlide>
      
    </Swiper>
  );
}
