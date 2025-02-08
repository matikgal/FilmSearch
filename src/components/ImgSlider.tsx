import { useRef } from 'react';
import Slider from 'react-slick';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const imageSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

interface Image {
    link: string;
    alt: string;
}

interface ImgSliderProps {
    images: Image[];
}

export default function ImgSlider({ images }: ImgSliderProps) {
    const sliderRef = useRef<Slider>(null); 

    return (
        <div>
            {/* Przycisk do przesuwania w lewo */}
            <button
                onClick={() => sliderRef.current?.slickPrev()} // Wywołujemy metodę slickPrev
                className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition">
                <FaAngleLeft />
            </button>

            {/* Przycisk do przesuwania w prawo */}
            <button
                onClick={() => sliderRef.current?.slickNext()} // Wywołujemy metodę slickNext
                className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition">
                <FaAngleRight />
            </button>
            <Slider {...imageSliderSettings} ref={sliderRef} className="mt-5 flex justify-center space-x-4">
                {images.map((img, index) => (
                    <div key={index} className="p-2">
                        <img src={img.link} alt={img.alt} className="w-full mr-4 rounded-lg" />
                    </div>
                ))}
            </Slider>

            
            
        </div>
    );
}
