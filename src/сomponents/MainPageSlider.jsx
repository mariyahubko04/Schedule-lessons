import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const MainPageSlider = () => {
    const images = ["slide-1.png", "slide-2.jpg", "slide-3.jpg"];
    const settings = {
        dots: true,
    };

    return (
        <div className="container">
            <Slider {...settings}>
                {images.map((image) => (
                    <div key={image}>
                        <img src={`images/${image}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};