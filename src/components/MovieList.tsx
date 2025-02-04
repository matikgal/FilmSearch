import { useEffect, useState, useRef } from 'react'
import { movieList } from '../Services/ApiService'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import { MovieSlider } from './MovieSlider'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

interface Movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

export default function MovieList() {
	const [movies, setMovies] = useState<Movie[]>([])

	const sliderRef = useRef<Slider | null>(null)

	useEffect(() => {
		async function fetchMovies() {
			try {
				const data = await movieList(1)
				setMovies(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchMovies()
	}, [])

	const movieType = [
		{
			type: 'popular',
			title: 'Popular Movies',
		},
		{
			type: 'now_playing',
			title: 'Now Playing',
		},
		{
			type: 'top_rated',
			title: 'Top Rated',
		},
		{
			type: 'upcoming',
			title: 'Upcoming',
		},
	]

	return (
		<div className="container p-5 mx-auto lg:w-3/5">
			{movieType.map(({ type, title }) => (
				<div key={type}>
					<div className="flex justify-between mx-auto px-2 mt-10">
						<div className="flex gap-x-2 text-xl font-semibold text-white">
							<div className="w-[3px] bg-[var(--color-secondary)] rounded-full"></div>
							<h1 className="xl:text-2xl">{title}</h1>
						</div>
						<div className="flex gap-x-7">
							<button
								onClick={() => sliderRef.current?.slickPrev()}
								className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition">
								<FaAngleLeft />
							</button>
							<button
								onClick={() => sliderRef.current?.slickNext()}
								className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition">
								<FaAngleRight />
							</button>
						</div>
					</div>
					<MovieSlider movies={movies.filter(movie => movie.type === type)} />
				</div>
			))}
		</div>
	)
}
