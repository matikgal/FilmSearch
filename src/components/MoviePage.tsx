import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchMovieDetails, fetchMovieCredits, fetchMovieImages, fetchSimilarMovies } from '../Services/ApiService'
import { CiCalendar, CiClock2 } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function MoviePage() {
	const { id } = useParams<{ id: string }>()
	const movieId = Number(id)

	const [movie, setMovie] = useState<any>(null)
	const [credits, setCredits] = useState<any>(null)
	const [images, setImages] = useState<string[]>([])
	const [similarMovies, setSimilarMovies] = useState<any[]>([])

	const navigate = useNavigate()

	useEffect(() => {
		async function fetchData() {
			const movieData = await fetchMovieDetails(movieId)
			const creditsData = await fetchMovieCredits(movieId)
			const imagesData = await fetchMovieImages(movieId)
			const similarMoviesData = await fetchSimilarMovies(movieId)

			setMovie(movieData)
			setCredits(creditsData)
			setImages(imagesData)
			setSimilarMovies(similarMoviesData)
		}

		fetchData()
	}, [movieId])

	if (!movie) return <div className="text-white">Ładowanie...</div>

	return (
		<div className="p-5 text-white container mx-auto">
			{/* Szczegóły filmu */}
			<h1 className="text-4xl font-thin">{movie.title}</h1>
			<div className="mt-2">
				<div className="flex gap-4">
					<p className="flex items-center gap-2">
						<CiCalendar /> {movie.releaseDate}
					</p>
					<p className="flex items-center gap-2">
						<CiClock2 /> {movie.runtime} min
					</p>
				</div>
				<p className="flex items-center gap-2 mt-1 text-lg">
					<FaStar className="text-[var(--color-secondary)]" />
					{movie.stars.toFixed(1)} / 10
				</p>
			</div>

			<div className="flex flex-wrap gap-2 mt-2">
				{movie.genres.map((genre: string, index: number) => (
					<span
						key={index}
						className="bg-[var(--color-secondary)] text-black px-3 py-1 rounded-full text-sm font-semibold">
						{genre}
					</span>
				))}
			</div>

			<p className="text-gray-300 mt-4">{movie.overview}</p>
			<img src={movie.img} alt={movie.title} className="w-[300px] mt-4 hidden" />

			{/* Obsada */}
			<h2 className="text-2xl mt-6">Obsada:</h2>
			<div className="flex flex-col gap-4 mt-5">
				{credits?.actors.map((actor: any) => (
					<div key={actor.id} className="flex items-center gap-5">
						{actor.img && (
							<div
							onClick={() => navigate(`/actor/${actor.id}`)}
								className="w-[60px] h-[60px] rounded-full bg-center bg-cover bg-no-repeat"
								style={{ backgroundImage: `url(${actor.img})`  }}
							/>
						)}

						<div>
							<p className="font-semibold">{actor.name}</p>
							<p className="text-sm text-gray-400">{actor.character}</p>
						</div>
					</div>
				))}
			</div>

			{/* Zdjęcia */}
			<h2 className="text-2xl mt-6">Zdjęcia z filmu:</h2>
			<div className="flex gap-4 overflow-x-scroll mt-3">
				{images.map((img, index) => (
					<img key={index} src={img} alt="movie scene" className="w-[300px] rounded-lg" />
				))}
			</div>

			{/* Podobne filmy */}
			<h2 className="text-2xl mt-6">Podobne filmy:</h2>
			<div className="flex gap-4 overflow-x-scroll mt-3">
				{similarMovies.map(movie => (
					<Link to={`/movie/${movie.id}`} key={movie.id} className="text-center">
						<div
							className="w-[130px] h-[200px] bg-center bg-cover bg-no-repeat rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
							style={{ backgroundImage: `url(${movie.img})` }}
						/>
						<p className="mt-2 text-sm">{movie.title}</p>
					</Link>
				))}
			</div>
		</div>
	)
}
