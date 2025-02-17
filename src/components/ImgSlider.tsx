/* Komponent ImgSlider - slider zdjęć z przyciskami nawigacyjnymi */
import { useRef } from 'react'
import Slider from 'react-slick'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

// Ustawienia slidera dla zdjęć
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
	header: string
}

export default function ImgSlider({ images, header }: ImgSliderProps) {
	const sliderRef = useRef<Slider>(null)

	return (
		<div>
			{/* Nagłówek slidera i przyciski nawigacji */}
			<div className="flex justify-between w-full gap-5 px-2 mt-8">
				<div className="flex gap-x-2 text-xl font-semibold text-white">
					<div className="w-[3px] bg-[var(--color-secondary)] rounded-full"></div>
					<h1 className="xl:text-2xl">{header}</h1>
				</div>
				<div className="gap-x-5 flex flex-row">
					{/* Przycisk przesuwania w lewo */}
					<button
						onClick={() => sliderRef.current?.slickPrev()}
						className="text-white bg-[var(--color-primary)] p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition">
						<FaAngleLeft />
					</button>
					{/* Przycisk przesuwania w prawo */}
					<button
						onClick={() => sliderRef.current?.slickNext()}
						className="text-white bg-[var(--color-primary)] p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition">
						<FaAngleRight />
					</button>
				</div>
			</div>
			{/* Slider z obrazkami */}
			<Slider {...imageSliderSettings} ref={sliderRef} className="mt-5 flex justify-center space-x-4">
				{images.map((img, index) => (
					<div key={index} className="p-2 outline-none focus:outline-none">
						<img src={img.link} alt={img.alt} className="w-full rounded-lg" />
					</div>
				))}
			</Slider>
		</div>
	)
}
