import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const MainPageSlider = () => {
  const countImage = 3;
  const [numberShowImage, setNumberShowImage] = useState(1);

  const handleChangeImg = (isNext) => {
      setNumberShowImage((number) => {
          if (isNext) {
              if (number === countImage) return 1;
              return number + 1;
          } else {
              if (number === 1) return countImage;
              return number - 1;
          }
      });
  };

  return <div className='slide-block'>
      <div 
        className='slide-block__btn prev-btn flex-center'
        onClick={() => handleChangeImg(false)}
      >
        <img 
          src={`images/left.png`}
          alt='left icon'
        />
      </div>

      <div className={`slide-block__img slide-${numberShowImage}`} />

      <div className='slide-block__status flex-center'>
        <span className={`slide-block__status--item ${numberShowImage === 1 ? 'active' : ''}`} />
        <span className={`slide-block__status--item ${numberShowImage === 2 ? 'active' : ''}`} />
        <span className={`slide-block__status--item ${numberShowImage === 3 ? 'active' : ''}`} />
      </div>

      <div 
        className='slide-block__btn next-btn flex-center'
        onClick={() => handleChangeImg(true)}
      >
        <img 
          src={`images/right.png`}
          alt='right icon'
        />
      </div>
  </div>;
}