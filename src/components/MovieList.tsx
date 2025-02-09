import { useEffect, useState, useRef } from 'react'
import { movieList } from '../Services/ApiService'
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
			movie: true
		},
		{
			type: 'now_playing',
			title: 'Now Playing',
			movie: true
		},
		{
			type: 'top_rated',
			title: 'Top Rated',
			movie: true
		},
		{
			type: 'upcoming',
			title: 'Upcoming',
			movie: true
		},
	]
	const tvType = [
		{
			type: 'popular',
			title: 'Popular Shows',
			movie: false
		},
		{
			type: 'airing_today',
			title: 'Airing today',
			movie: false
		},
		{
			type: 'on_the_air',
			title: 'On the Air',
			movie: false
		},
		{
			type: 'top_rated',
			title: 'top rated',
			movie: false
		},
	]

	
	return (
		<div className="container p-5 mx-auto md:w-4/5 lg:w-3/5">
			{(movieOrTv === 'movie' ? movieType : tvType).map(({ type, title, movie }) => (
				<div key={type}>
					
					<MovieSlider movies={movies.filter(movie => movie.type === type)} typ={title} movieB={movie} />
				</div>
			))}
		</div>
	)
}
