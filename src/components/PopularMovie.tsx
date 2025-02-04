import { useEffect, useState } from 'react'
import { movieList } from '../Services/ApiService'
import { FaPlay } from 'react-icons/fa'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'

interface movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
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
			<div className="flex justify-between border">
				<div className="flex gap-x-2 text-xl font-semibold text-white">
					<div className=" w-[3px]  bg-[var(--color-secondary)] rounded-full"></div>
					<h1>Popular Movies</h1>
				</div>
				<div className="flex gap-x-5 ">
					<button onClick={() => setPage(prevPage => prevPage + 1)} className="text-white ">
						<FaAngleLeft />
					</button>
					<button onClick={() => setPage(prevPage => prevPage + 1)} className="text-white">
						<FaAngleRight />
					</button>
				</div>
			</div>
			<ul className="flex flex-wrap ">
				{movies.map(movie => (
					<li key={movie.id} className="mt-5 w-1/2 pr-2">
						<div className="relative">
							<img src={movie.img} alt={movie.title} className="rounded-sm w-full h-auto shadow-md" />

							<div className="absolute inset-0 flex items-center justify-center text-4xl text-white opacity-0 hover:opacity-100 duration-300">
								<div className="bg-black absolute inset-0 hover:opacity-10 opacity-0 duration-300"></div>

								<FaPlay />
							</div>
						</div>
						<p>{movie.stars}</p>
						<p className="text-white font-semibold  leading-4">{movie.title}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
