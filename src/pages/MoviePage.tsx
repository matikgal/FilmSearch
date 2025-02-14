import { useEffect, useState } from 'react'
import { movieList } from '../Services/ApiService'
import { MovieSlider } from '../components/MovieSlider'

interface Movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

export default function MoviePage() {
	const [movies, setMovies] = useState<Movie[]>([])

	// Ustawiamy tytuł strony
	useEffect(() => {
		document.title = 'CineSnap - Movies'
	}, [])

	// Pobieramy filmy (dla 'movie')
	useEffect(() => {
		async function fetchMovies() {
			try {
				const data = await movieList(1, 'movie')
				setMovies(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchMovies()
	}, [])

	// Kategorie filmów – każda kategoria ma flagę movie ustawioną na true
	const movieType = [
		{ type: 'popular', title: 'Popular Movies', movie: true },
		{ type: 'now_playing', title: 'Now Playing', movie: true },
		{ type: 'top_rated', title: 'Top Rated', movie: true },
		{ type: 'upcoming', title: 'Upcoming', movie: true },
	]

	return (
		<div className="container p-5 mx-auto md:w-4/5 2xl:w-3/5">
			{movieType.map(({ type, title, movie }) => (
				<div key={type} className="mt-10">
					<MovieSlider movies={movies.filter(m => m.type === type)} typ={title} movieB={movie} />
				</div>
			))}
		</div>
	)
}
