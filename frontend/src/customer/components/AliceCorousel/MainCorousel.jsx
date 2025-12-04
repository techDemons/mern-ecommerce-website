import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { homeProductData } from './CarouselData';

const MainCorousel = () => {
    const items = homeProductData.map((item)=><img className='cursor-pointer' role='presentation' src={item.image}/>);
  return (
    
    <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1800}
        infinite
    />

  )
}

export default MainCorousel