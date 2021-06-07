import React, { useEffect } from 'react';

export const BotsPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <div className='bot-page'>
    <h1>Введіть ваш ідентифікатор</h1>

    <form onSubmit={() => { }}>
      <label className='bot-page__identificator-label'>
        <input placeholder='Ідентифікатор' />
        <p>Ідентифікатор можна дізнатися в меседжері Telegram</p>
      </label>
    </form>

    <div className="header__additional-block">
      Як дізнатися свій ідентифікатор?
  </div>

    <div className='bot-page__info'>
      <a className='bot-page__info--link' href='https://web.telegram.org/#/login'>
        Перейти в Telegram
    </a>

      <div className='bot-page__info--name'>
        <p>TheUniversitySchedule_bot</p>
        <span>Шукай в телеграмі бота за цією назвою</span>
      </div>
    </div>

    <div className='bot-page__image'>
      <img src='images/bot.png' alt='bot-image' />
    </div>
  </div>
};