import React from 'react';
import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

export const Header = ({ isLogin, setLoginStatus }) => {
  const history = useHistory();

  const setLogin = () => {
    setLoginStatus(false);
    sessionStorage.removeItem('user');
    history.push(isLogin ? '/' : "/login");
  };

  useEffect(() => {
    return () => setLoginStatus(false);
  }, []);

return <header className='header'>
  <div className='header__block flex-center'>
    <div className='header__block--logo flex-center' onClick={() => { history.push('/') }}>
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

        {isLogin && 
            <li className='header__block--navbar--link flex-center profile-btn'>
            <NavLink className="navlink" to="/profile" exact>
              Особистий кабінет
            </NavLink>
          </li>
        }

        <li className='header__block--navbar--link login-link flex-center'>
          <button className="navlink" onClick={setLogin}>
            {isLogin ? 'Вийти' : 'Вхід'}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</header>};