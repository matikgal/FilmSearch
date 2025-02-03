import { useEffect, useState } from 'react'
import { movieList } from '../Services/ApiService'

interface movie {
	id: number
	title: string
	img: string
	overview: string
}

export default function PopularMovie() {
	const [movies, setMovies] = useState<movie[]>([])
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		async function fetchMovies() {
			try {
				const data = await movieList(page)
				if (movies.length == 0) setMovies(data)
				else {
					setMovies(prevMovies => [...prevMovies, ...data])
				}
			} catch (error) {
				console.error(error)
			}
		}
		fetchMovies()
	}, [page])
	return (
		<div className="container p-5 ">
			<div className="flex justify-between">
				<div className="flex gap-x-2 text-xl font-semibold text-white">
					<div className=" w-[3px]  bg-[var(--color-secondary)] rounded-full"></div>
					<h1>Popular Movies</h1>
				</div>
				<button onClick={() => setPage(prevPage => prevPage + 1)}>prawo lwo</button>
			</div>
			<ul className="flex flex-wrap ">
				{movies.map(movie => (
					<li key={movie.id} className="mt-5 w-1/2 pr-2">
						<div>
							<img src={movie.img} alt={movie.title} className="rounded-sm w-full h-auto shadow-md" />
						</div>
						<p>gwiazdki</p>
						<p className="text-white font-semibold  leading-4">{movie.title}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
