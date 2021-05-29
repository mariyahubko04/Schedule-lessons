import React from "react";

export const Footer = () => (
    <footer className="footer">
        <section className="footer__section">
            <div className="footer__section--block">
                <div className="footer__section--main-info">
                    <div className="footer__nav">
                        <div className="footer__nav--social-block">
                            <a className="footer__icon" href="#">
                                <img src="images/icon.png" alt="twitter-icon" />
                            </a>
                            <a className="footer__social--facebook" href="#">
                                <img
                                    src="images/facebook.svg"
                                    alt="facebook-icon"
                                />
                            </a>
                            <a className="footer__social--instagram" href="#">
                                <img
                                    src="images/instagram.svg"
                                    alt="instagram-icon"
                                />
                            </a>
                        </div>

                        <div className="vertical-line" />

                        <div className="footer__column">
                            <a href="#/">Про нас</a>
                            <a href="#/">Відгуки</a>
                            <a href="#/">Контакти</a>
                        </div>
                    </div>

                    <div className="footer__contact">
                        <span className="footer__contact-tel">
                            +38 095 560 66 22
                        </span>
                        <span>
                            <span className="footer__contact-time">
                                {`Робочий час: `}
                            </span>
                            Пн - Пт 11:00 - 17:00
                        </span>
                        <span className="footer__contact-location">
                            Київ, Україна
                        </span>
                    </div>
                </div>

                <div className="footer__column">
                    <span className="footer__column--nav-name">
                        Інформація:
                    </span>

                    <a href="#/">Головна</a>
                    <a href="#/">Увійти</a>
                    <a href="#/">Реєстрація</a>
                </div>
            </div>

            <div className="footer__сontact-info">
                <span className="footer__column--name">Питання:</span>
                <span className="footer__column--email">
                    sales@thewortex.com
                </span>
            </div>
        </section>
    </footer>
);
