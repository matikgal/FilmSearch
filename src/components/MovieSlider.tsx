import React, { useRef } from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'
import Slider from 'react-slick'

interface Movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

interface MovieSliderProps {
	movies: Movie[]
}

export const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
	const sliderRef = useRef<Slider | null>(null)

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 4,
		arrows: false,
		responsive: [
			{
				breakpoint: 429,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 627,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
				},
			},
		],
	}

	return (
		<Slider ref={sliderRef} {...settings} className="mt-5 ">
			{movies.map(movie => (
				<div key={movie.id} className="p-2">
					<div className="relative">
						<img src={movie.img} alt={movie.title} className="rounded-sm w-full h-auto shadow-md" />
						<div className="absolute inset-0 flex items-center justify-center text-4xl text-white opacity-0 hover:opacity-100 duration-300">
							<div className="bg-black absolute inset-0 hover:opacity-20 opacity-0 duration-300 cursor-pointer"></div>
							<FaPlay className=" cursor-pointer" />
						</div>
					</div>
					<p className="flex items-center font-light text-sm mt-2 text-white gap-x-1 px-2">
						<FaStar className="text-[var(--color-secondary)]" />
						{movie.stars.toFixed(1)}
					</p>
					<p className="text-white font-semibold leading-4 text-sm xl:text-base px-2 hover:underline cursor-pointer mt-1">
						{movie.title}
					</p>
				</div>
			))}
		</Slider>
	)
}
