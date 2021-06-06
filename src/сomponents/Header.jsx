import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = ({ isLogin, setLoginStatus }) => <header className='header'>
  <div className='header__block flex-center'>
    <div className='header__block--logo flex-center'>
      <img
        className='header__block--logo-icon'
        src='images/icon.png'
        alt='logo'
      />
      <img 
        className='header__block--logo-schedule'
        src="images/university-schedule.png" 
        alt='university-schedule'
      />
    </div>

    <nav>
      <ul className='header__block--navbar flex-center'>
        <li className='header__block--navbar--link flex-center'>
          <NavLink className="navlink" to="/" exact>
            Головна
          </NavLink>
        </li>

        <li className='header__block--navbar--link login-link flex-center'>
          <NavLink onClick={() => setLoginStatus(false)} className="navlink" to={isLogin ? '/' : "/login"} exact>
            {isLogin ? 'Вийти' : 'Вхід'}
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
</header>;