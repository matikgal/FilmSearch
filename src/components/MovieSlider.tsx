// MovieSlider - slider do wyświetlania filmów/seriali.
// Kliknięcie elementu przenosi do szczegółów (movie/tv).

import { useRef } from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'

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
	typ: string
	movieB: boolean
}

export function MovieSlider({ movies, typ, movieB }: MovieSliderProps) {
	// Ref do slidera i nawigacja
	const sliderRef = useRef<InstanceType<typeof Slider> | null>(null)

	const navigate = useNavigate()

	// Ustawienia slidera
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 4,
		initialSlide: 0,
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
		<div>
			{/* Nagłówek slidera z tytułem */}
			<div className="flex justify-between items-center w-full px-2">
				<div className="flex gap-x-2 text-xl font-semibold text-white">
					<div className="w-[3px] bg-[var(--color-secondary)] rounded-full"></div>
					<h1 className="xl:text-2xl">{typ}</h1>
				</div>
				{/* Przyciski do przewijania slidera */}
				<div className="gap-5 flex">
					<button
						onClick={() => sliderRef.current?.slickPrev()}
						className="text-white bg-[var(--color-primary)] p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition cursor-pointer">
						<FaAngleLeft />
					</button>
					<button
						onClick={() => sliderRef.current?.slickNext()}
						className="text-white bg-[var(--color-primary)] p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition cursor-pointer">
						<FaAngleRight />
					</button>
				</div>
			</div>
			{/* Slider z filmami/serialami */}
			<Slider {...settings} ref={sliderRef} className="mt-5">
				{movies.map(movie => (
					<div
						key={movie.id}
						className="p-2"
						onClick={() => {
							// Przekierowanie do szczegółów
							if (movieB === true) {
								navigate(`/movie/${movie.id}`)
							} else {
								navigate(`/tv/${movie.id}`)
							}
						}}>
						<div className="relative">
							<img
								src={movie.img}
								alt={movie.title}
								className="rounded-sm w-full h-60 sm:h-70 xl:h-80 object-cover shadow-md"
							/>
							<div className="absolute inset-0 flex items-center justify-center text-4xl text-white opacity-0 hover:opacity-100 duration-300">
								<div className="bg-black absolute inset-0 hover:opacity-20 opacity-0 duration-300 cursor-pointer"></div>
								<FaPlay className="cursor-pointer" />
							</div>
						</div>
						{/* Ocena i tytuł filmu */}
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
		</div>
	)
}
