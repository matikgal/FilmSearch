import { useRef } from 'react'
import Slider from 'react-slick'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const imageSliderSettings = {
	dots: false,
	infinite: true,
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
}

interface Image {
	link: string
	alt: string
}

interface ImgSliderProps {
	images: Image[]
}

export default function ImgSlider({ images }: ImgSliderProps) {
	const sliderRef = useRef<Slider>(null)

	return (
		<div>
			<div className="flex justify-end w-full gap-5 pr-2">
				{/* Przycisk do przesuwania w lewo */}
				<button
					onClick={() => sliderRef.current?.slickPrev()} // Wywołujemy metodę slickPrev
					className="text-white bg-[var(--color-primary)] p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition">
					<FaAngleLeft />
				</button>

				{/* Przycisk do przesuwania w prawo */}
				<button
					onClick={() => sliderRef.current?.slickNext()} // Wywołujemy metodę slickNext
					className="text-white bg-[var(--color-primary)] p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition">
					<FaAngleRight />
				</button>
			</div>
			<Slider {...imageSliderSettings} ref={sliderRef} className="mt-5 flex justify-center space-x-4">
				{images.map((img, index) => (
					<div key={index} className="p-2 outline-none  focus:outline-none  ">
						<img src={img.link} alt={img.alt} className="w-full rounded-lg " />
					</div>
				))}
			</Slider>
		</div>
	)
}
