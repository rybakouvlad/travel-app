import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import { useHttp } from '../hooks/http.hook';

const baseUrl = 'http://127.0.0.1:3333/assets/county';
export interface IImg {
  name_ru: string;
  name_by: string;
  name_en: string;
  description_ru: string;
  description_by: string;
  description_en: string;
  path: string;
}

function SampleNextArrow({ className, style, onClick }: any) {
  return <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick} />;
}

export const FotoGallery = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [images, setImages] = useState<IImg[]>([]);
  const { request } = useHttp();
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    infinite: true,
  };

  const getImages = useCallback(async () => {
    try {
      const data = await request('/api/image/all/ru', 'POST', { country: '604880d45c16d44b900d460a' });
      setImages(data);
    } catch (e) {}
  }, []);

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="foto-galery">
      <div className="slider-wrapper">
        <Slider {...settingsMain} asNavFor={nav2} ref={(slider) => setSlider1(slider)}>
          {images.map((el, i) => (
            <div className="slick-slide card-slide" key={i}>
              <img className="card-slide-img" src={`${baseUrl}/pl/${el.path}`} alt={`${el.name_en}`} />
              <div className="text-slide">
                <h2 className="slick-slide-title">{el.name_en}</h2>
                <label className="slick-slide-label">{el.description_en}</label>
              </div>
            </div>
          ))}
        </Slider>
        <div className="thumbnail-slider-wrap">
          <Slider {...settingsThumbs} asNavFor={nav1} ref={(slider) => setSlider2(slider)}>
            {images.map((el) => (
              <div className="slick-slide" key={el.name_ru}>
                <img src={`${baseUrl}/pl/${el.path}`} width="200px" alt={`${el.name_en}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
