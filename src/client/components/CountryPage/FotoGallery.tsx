import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import { useHttp } from '../../hooks/http.hook';
import i18next from 'i18next';
import { Raiting } from '../Rating/Rating';
const baseUrl = process.env.PATH_LOCAL + '/assets/county';
export interface IImg {
  name_ru: string;
  name_by: string;
  name_en: string;
  description_ru: string;
  description_by: string;
  description_en: string;
  path: string;
  _id: string;
}

interface IProps {
  alpha2: string;
}

function SampleNextArrow({ className, style, onClick }: any) {
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
}

function SamplePrevArrow({ className, style, onClick }: any) {
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
}

export const FotoGallery: React.FC<IProps> = (props: IProps) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [images, setImages] = useState<IImg[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
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
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    infinite: true,
    beforeChange: (next: number, current: number) => {
      setCurrentSlide(() => current);
    },
  };

  const getImages = useCallback(async () => {
    try {
      if (props.alpha2) {
        const data = await request('/api/image/all/ru', 'POST', { alpha2: props.alpha2 });
        setImages(data);
      }
    } catch (e) {}
  }, [props.alpha2]);

  useEffect(() => {
    getImages();
  }, [props.alpha2]);

  return (
    <>
      <div className="foto-galery">
        <div className="slider-wrapper">
          <Slider {...settingsMain} asNavFor={nav2} ref={(slider) => setSlider1(slider)}>
            {images.map((el: any, i) => (
              <div className="slick-slide card-slide" key={i}>
                <img className="card-slide-img" src={`${baseUrl}/${props.alpha2}/${el.path}`} alt={`${el.name_en}`} />
                <div className="text-slide">
                  <h2 className="slick-slide-title">{el[`name_${i18next.language}`]}</h2>
                  <label className="slick-slide-label">{el[`description_${i18next.language}`]}</label>
                </div>
              </div>
            ))}
          </Slider>
          <div className="thumbnail-slider-wrap">
            <Slider {...settingsThumbs} asNavFor={nav1} ref={(slider) => setSlider2(slider)}>
              {images.map((el: any) => (
                <div className="slick-slide" key={el.name_ru}>
                  <img src={`${baseUrl}/${props.alpha2}/${el.path}`} width="200px" alt={`${el.name_en}`} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Raiting slide={images[currentSlide]} />
    </>
  );
};
