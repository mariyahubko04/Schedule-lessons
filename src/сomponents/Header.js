import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Header = () => <div className='header-block'>
  <div className='header-block__logo'>
    <img src="images/logo.svg" alt='logo' />
  </div>

  <div className='header-block__menu'>
    <FontAwesomeIcon icon={faBars} size="2x" />
  </div>
</div>;