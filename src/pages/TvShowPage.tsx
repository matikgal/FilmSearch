import { useEffect, useState } from 'react'
import { movieList } from '../Services/ApiService'
import { MovieSlider } from '../components/MovieSlider'

interface Show {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

export default function TvShowPage() {
	const [shows, setShows] = useState<Show[]>([])

	useEffect(() => {
		document.title = 'CineSnap - TV Shows'
	}, [])

	useEffect(() => {
		async function fetchShows() {
			try {
				const data = await movieList(1, 'tv')
				setShows(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchShows()
	}, [])

	const tvType = [
		{ type: 'popular', title: 'Popular Shows', movie: false },
		{ type: 'airing_today', title: 'Airing Today', movie: false },
		{ type: 'on_the_air', title: 'On The Air', movie: false },
		{ type: 'top_rated', title: 'Top Rated', movie: false },
	]

	return (
		<div className="container p-5 mx-auto md:w-4/5 2xl:w-3/5">
			{tvType.map(({ type, title, movie }) => (
				<div key={type} className="mt-10">
					<MovieSlider movies={shows.filter(s => s.type === type)} typ={title} movieB={movie} />
				</div>
			))}
		</div>
	)
}
