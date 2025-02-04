import { useEffect, useState } from 'react'
import { movieList } from '../Services/ApiService'

interface movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

export default function MovieList() {
	const [popularMovies, setPopularMovies] = useState<movie[]>([])
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		async function fetchMovies() {
			try {
				const data = await movieList(page)
				if (popularMovies.length == 0) setPopularMovies(data)
				else {
					setPopularMovies(prevPopularMovies => [...prevPopularMovies, ...data])
				}
			} catch (error) {
				console.error(error)
			}
		}
		fetchMovies()
	}, [page])
	return (
		<div>
			<div>
				<h1></h1>
				<h1></h1>
				<ul>
					{popularMovies.map(movie => (
						<li key={movie.type}>
							<p>{movie.title}</p>
							<p>{movie.id}</p>
							<p>{movie.type}</p>
							<div>
								<img
									src={movie.img}
									alt={movie.title}
									style={{
										width: '150px',
										height: 'auto',
										borderRadius: '10px',
										boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
									}}
								/>
							</div>
							
						</li>
					))}
				</ul>
				<button onClick={() => setPage(prevPage => prevPage + 1)}>siema</button>
			</div>
		</div>
	)
}
