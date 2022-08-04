import React from 'react';
import Button from '../../components/button/Button';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import Tilt from 'react-parallax-tilt';

import 'swiper/css';
import './slider.scss' ;


const Slider = props => {
    SwiperCore.use([Autoplay]);
  return (
    <div className="slider">
        <Swiper
            slidesPerView={1}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
        >
        {
            props.data.slice(0,3).map((item , index) => (
                <SwiperSlide key={index}>
                <div className="slider-item">
                    <div className="slider-item__info">
                        <div className="slider-item__info-title">
                            {item.title}
                        </div>
                        <div className="slider-item__info-des">
                            {item.description}
                        </div>
                        <Link to={`/detail/${item.slug}`}>
                            <Button 
                                animation = {true} 
                                icon = {<FiShoppingCart />}
                            >
                                View more
                            </Button>
                        </Link>
                        
                    </div>
                    <div className="slider-item__img">
                        <Tilt>
                            <img src={item.images2.url} alt="" />      
                        </Tilt>       
                    </div>
    
                </div>
                </SwiperSlide>

            ))
        }
        </Swiper>

        

    </div>

  )
}

export default Slider