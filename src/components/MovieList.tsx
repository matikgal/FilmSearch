import { useEffect, useState, useRef } from 'react'
import { movieList } from '../Services/ApiService'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import { MovieSlider } from './MovieSlider'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

export default function MovieList({ movieOrTv }: { movieOrTv: string }) {
	const [movies, setMovies] = useState<Movie[]>([])

	useEffect(() => {
		async function fetchMovies() {
			try {
				const data = await movieList(1, movieOrTv)
				setMovies(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchMovies()
	}, [movieOrTv])

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
	const tvType = [
		{
			type: 'popular',
			title: 'Popular Shows',
		},
		{
			type: 'airing_today',
			title: 'Airing today',
		},
		{
			type: 'on_the_air',
			title: 'On the Air',
		},
		{
			type: 'top_rated',
			title: 'top rated',
		},
	]

	
	return (
		<div className="container p-5 mx-auto lg:w-3/5">
			{(movieOrTv === 'movie' ? movieType : tvType).map(({ type, title }) => (
				<div key={type}>
					<div className="flex justify-between mx-auto px-2 mt-10">
						<div className="flex gap-x-2 text-xl font-semibold text-white">
							<div className="w-[3px] bg-[var(--color-secondary)] rounded-full"></div>
							<h1 className="xl:text-2xl">{title}</h1>
						</div>
					</div>
					<MovieSlider movies={movies.filter(movie => movie.type === type)} />
				</div>
			))}
		</div>
	)
}
