import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination,Autoplay  } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CustomCarousel.css';

import { useNightMode } from '../../hooks/useNightMode';
import { useNavigate } from 'react-router-dom';

import Elo from '../../img/elo.png';
import Blue from '../../img/Bluekai_logo_color.png';
import Cloud from '../../img/Ocloud.png';
import Connect from '../../img/Amazon_Connect_logo.png';
import HP from '../../img/HP_LOGO.png';

import EloN from '../../img/Nueva carpeta/1x/Elonoche.png';
import BlueN from '../../img/Nueva carpeta/1x/bluekainoche.png';
import CloudN from '../../img/Nueva carpeta/1x/Ocloudnoche.png';
import ConnectN from '../../img/Nueva carpeta/1x/Amazon_Connect_logoNoche.png';

const SwiperCarousel = () => {
  const isNight = useNightMode();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const dayImages = [Elo, Blue, Cloud, Connect, HP];
  const nightImages = [EloN, BlueN, CloudN, ConnectN, HP];
  const images = useMemo(() => (isNight ? nightImages : dayImages), [isNight]);

  const playClickSound = () => {
    const audio = new Audio('/Sounds/flick.wav');
    audio.volume = 0.25;
    audio.play();
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const goToRoute = (img) => {
    if (img.includes('elo')) navigate('/Elo');
    else if (img.includes('Bluekai_logo_color')) navigate('/Soluciones_Novasys/oracle-bluekai');
    else if (img.includes('Ocloud')) navigate('/Soluciones_Novasys/oracle-paas');
    else if (img.includes('Amazon_Connect')) navigate('/Soluciones_AmazonConnect');
  };

  return (
  <div className="swiper-carousel-container">
<Swiper
  modules={[EffectCoverflow, Navigation, Pagination, Autoplay]} // 🔥 añade Autoplay
  autoplay={{
    delay: 2000,         // ⏱️ 0.5 segundos entre slides
    disableOnInteraction: false, // 👈 sigue después de tocar/swipear
    pauseOnMouseEnter: true      // 🖱️ pausa cuando el mouse está encima (opcional)
  }}
  effect="coverflow"
  centeredSlides
  loop
  slidesPerView={3}
  threshold={5}
  touchRatio={1.5}
  navigation
  pagination={{
    clickable: true,
    el: '.swiper-pagination',
  }}
  breakpoints={{
    0: { slidesPerView: 1.3, centeredSlides: true },
    768: { slidesPerView: 3 },
  }}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 120,
    modifier: 3,
    slideShadows: false,
  }}
  onRealIndexChange={(swiper) => {
    setCurrentIndex(swiper.realIndex);
    playClickSound();
  }}
>
  {images.map((img, index) => (
    <SwiperSlide
      key={index}
      className={currentIndex === index ? 'active-slide' : 'faded-slide'}
    >
      <div className="slide-wrapper">
        <img src={img} alt={`slide-${index}`} className="carousel-image" />
        <div className="slide-overlay">
          <button className="overlay-button" onClick={() => goToRoute(img)}>
            Ver más
          </button>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

{/* 🔥 FORZAMOS LA RENDERIZACIÓN AQUÍ */}
<div className="swiper-pagination"></div>



    {/* Aquí van los dots fuera del swiper */}
  </div>
);

};

export default SwiperCarousel;
