import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../homeSectionCard/HomeSectionCard';

const HomeSectionCarousel = ({data, sectionName}) => {
  const carouselRef = useRef(null); 

  const responsive = {
    0: { items: 1 },
    720: { items: 4 },
    1024: { items: 5 },
  };

  const [activeIndex, setActiveIndex] = useState(0);

  
  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
     
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  
  const items = data.slice(0, 10).map((item, index) => (
    <HomeSectionCard key={index} product={item} />
  ));

  const visibleItemsCount = 5; // based on largest screen config
  const maxIndex = items.length - visibleItemsCount;

  return (
    <div className='relative px-4 lg:px-8 border border-gray-300'>
      <div className='relative p-5'>
        <h2 className='text-2xl font-bold text-gray-950 pb-5'>{sectionName}</h2>
        <AliceCarousel
          ref={carouselRef} 
          items={items}
          disableDotsControls
          disableButtonsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
          responsive={responsive}
        />

        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            variant='contained'
            className='z-50'
            sx={{
              position: 'absolute',
              top: '10rem',
              left: '-1rem',
              transform: 'rotate(-90deg)',
              bgcolor: 'white',
            }}
          >
            <KeyboardArrowRightIcon
              sx={{ transform: 'rotate(-90deg)', color: 'black' }}
            />
          </Button>
        )}

        {activeIndex < maxIndex && (
          <Button
            onClick={slideNext}
            variant='contained'
            className='z-50'
            sx={{
              position: 'absolute',
              top: '10rem',
              right: '-1rem',
              transform: 'rotate(-90deg)',
              bgcolor: 'white',
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: 'rotate(-90deg)', color: 'black' }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
