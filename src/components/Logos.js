import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../styles/Logos.css'

const logo1 = process.env.PUBLIC_URL + '/logo1.jpeg'
const logo2 = process.env.PUBLIC_URL + '/logo2.jpeg'
const logo3 = process.env.PUBLIC_URL + '/logo3.jpeg'
const logo4 = process.env.PUBLIC_URL + '/logo4.jpeg'

function Logos() {
  const logos = [
    { id: 1, src: logo1, alt: 'Brand 1' },
    { id: 2, src: logo2, alt: 'Brand 2' },
    { id: 3, src: logo3, alt: 'Brand 3' },
    { id: 4, src: logo4, alt: 'Brand 4' },
    { id: 5, src: logo1, alt: 'Brand 5' },
    { id: 6, src: logo2, alt: 'Brand 6' },
  ];

  return (
    <div className="logos-section">
      <div className="logos-container">
        <h2 className="category-header-logos">ბრენდები</h2>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          className="logos-swiper"
        >
          {logos.map((logo) => (
            <SwiperSlide key={logo.id}>
              <div className="logo-slide">
                <img src={logo.src} alt={logo.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Logos;