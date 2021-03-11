import React from 'react';
import { Carousel } from 'react-bootstrap';
// import { useHttp } from '../hooks/http.hook';

const baseUrl = 'http://127.0.0.1:3333/assets/county';

// interface IImg {
//   name_ru: string;
//   name_by: string;
//   name_en: string;
//   description_ru: string;
//   description_by: string;
//   description_en: string;
//   path: string;
// }

export const FotoGallery: React.FC = () => {
//   const [images, setImages] = useState<IImg[]>([]);

//   const { request } = useHttp();
//   const getImages = useCallback(async () => {
//     try {
//       const data = await request('/api/image/all/ru', 'POST', { country: '604880d45c16d44b900d460a' });
//       setImages(data);
//       console.log(data);
//       console.log(images);
//     } catch (e) {}
//   }, []);

//   useEffect(() => {
//     getImages();
//   }, []);
  console.log('GALLERY');
  return (
    <Carousel fade>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={`${baseUrl}/de/1.jpg`} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img className="d-block w-100" src={`${baseUrl}/de/2.jpg`} alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={`${baseUrl}/de/3.jpg`} alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
