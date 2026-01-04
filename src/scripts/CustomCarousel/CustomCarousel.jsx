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
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const dayImages = [Elo, Blue, Cloud, Connect, HP];
  const nightImages = [EloN, BlueN, CloudN, ConnectN, HP];
  const images = useMemo(
    () => (isNight === null ? dayImages : isNight ? nightImages : dayImages),
    [isNight]
  );

  // Sonido solo si fue interacción del usuario
  const playClickSound = () => {
    // Solo si está en mobile, y si el usuario ya interactuó
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio('/Sounds/flick.wav');
        audio.volume = 0.25;
        audio.play().catch(() => {});
      } catch (e) {}
      if (window.navigator && /Android|iPhone|iPad|iPod|Windows Phone/i.test(window.navigator.userAgent)) {
        if ('vibrate' in navigator) navigator.vibrate(10);
      }
    }
  };

  const handleInteraction = () => {
    setIsUserInteracting(true);
    playClickSound();
  };

  const goToRoute = (img) => {
    if (img.includes('elo')) navigate('/Elo');
    else if (img.includes('Bluekai_logo_color')) navigate('/Soluciones_Novasys/oracle-bluekai');
    else if (img.includes('Ocloud')) navigate('/Soluciones_Novasys/oracle-paas');
    else if (img.includes('Amazon_Connect')) navigate('/Amazon_Web_Services/Amazon_Connect');
  };

  return (
    <div className="swiper-carousel-container">
      {isNight === null ? (
        <div className="carousel-loader">Cargando...</div>
      ) : (
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
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
            0: { slidesPerView: 1.1, centeredSlides: true },
            480: { slidesPerView: 1.5, centeredSlides: true },
            720: { slidesPerView: 3 }, // Desde 720px ya se ven 3

          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 3,
            slideShadows: false,
          }}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex);
            // Solo sonar si es interacción real del usuario (no autoplay)
            if (isUserInteracting) {
              playClickSound();
              setIsUserInteracting(false);
            }
          }}
          onTouchStart={handleInteraction}
          onSliderFirstMove={handleInteraction}
          onNavigationPrev={handleInteraction}
          onNavigationNext={handleInteraction}
          onClick={handleInteraction}
          onTap={handleInteraction}
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
      )}
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default SwiperCarousel;
