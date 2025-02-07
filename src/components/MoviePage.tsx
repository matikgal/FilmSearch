import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
	fetchMovieDetails,
	fetchMovieCredits,
	fetchMovieImages,
	fetchSimilarMovies,
	fetchMovieVideos,
} from '../Services/ApiService'
import {
	fetchMovieDetails,
	fetchMovieCredits,
	fetchMovieImages,
	fetchSimilarMovies,
	fetchMovieVideos,
} from '../Services/ApiService'
import { CiCalendar, CiClock2 } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa6'

import Slider from 'react-slick'
import { useNavigate } from 'react-router-dom'

export default function MoviePage() {
	const { id } = useParams<{ id: string }>()
	const movieId = Number(id)

	const [movie, setMovie] = useState<any>(null)
	const [credits, setCredits] = useState<any>(null)
	const [images, setImages] = useState<string[]>([])
	const [similarMovies, setSimilarMovies] = useState<any[]>([])
	const [trailerUrl, setTrailerUrl] = useState<string | null>(null)

	const navigate = useNavigate()

	useEffect(() => {
		async function fetchData() {
			const movieData = await fetchMovieDetails(movieId)
			const creditsData = await fetchMovieCredits(movieId)
			const imagesData = await fetchMovieImages(movieId)
			const similarMoviesData = await fetchSimilarMovies(movieId)
			const trailerData = await fetchMovieVideos(movieId)

			setMovie(movieData)
			setCredits(creditsData)
			setImages(imagesData)
			setSimilarMovies(similarMoviesData)
			setTrailerUrl(trailerData)
		}

		fetchData()
	}, [movieId])

	if (!movie) return <div className="text-white">Ładowanie...</div>

	const imageSliderSettings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	const movieSliderSettings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		variableWidth: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
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
				breakpoint: 429,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	}

	return (
		<>
			{/* Trailer */}
			{trailerUrl ? (
				<div className="w-full h-[300px] md:h-[500px] max-w-">
					<iframe className="w-full h-full" src={trailerUrl} title={movie.title} allowFullScreen></iframe>
				</div>
			) : (
				<div
					className="w-full h-[300px] md:h-[500px] bg-center bg-cover bg-no-repeat"
					style={{ backgroundImage: `url(${movie.img})` }}
				/>
			)}

			<div className="p-5 text-white container mx-auto max-w-6xl">
				{/* Szczegóły filmu */}
				<div className="grid grid-cols-3 gap-5 items-stretch ">
					{/* Obrazek */}
					<div
						className="hidden md:block h-full min-h-[400px] bg-center bg-contain bg-no-repeat "
						style={{ backgroundImage: `url(${movie.img})` }}
					/>

					{/* Opis filmu (2/3 szerokości) */}
					<div className="col-span-2 text-white flex flex-col justify-start">
						<h1 className="text-4xl font-thin">{movie.title}</h1>

						<div className="mt-2 flex gap-4">
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

						{/* Gatunki */}
						<div className="flex flex-wrap gap-2 mt-2">
							{movie.genres.map((genre: string, index: number) => (
								<span
									key={index}
									className="bg-[var(--color-secondary)] text-black px-3 py-1 rounded-full text-sm font-semibold">
									{genre}
								</span>
							))}
						</div>
						{/* Gatunki */}
						<div className="flex flex-wrap gap-2 mt-2">
							{movie.genres.map((genre: string, index: number) => (
								<span
									key={index}
									className="bg-[var(--color-secondary)] text-black px-3 py-1 rounded-full text-sm font-semibold">
									{genre}
								</span>
							))}
						</div>

						{/* Opis */}
						<p className="text-gray-300 mt-4">{movie.overview}</p>
					</div>
				</div>

				{/* Obsada */}
				<h2 className="text-2xl mt-6">Obsada:</h2>
				<div className="flex flex-col gap-4 mt-5 md:grid md:grid-cols-2 lg:grid-cols-3">
					{credits?.actors.map((actor: any) => (
						<div key={actor.id} className="flex items-center gap-5">
							{actor.img && (
								<div
									onClick={() => navigate(`/actor/${actor.id}`)}
									className="w-[60px] h-[60px] rounded-full bg-center bg-cover bg-no-repeat"
									style={{ backgroundImage: `url(${actor.img})` }}
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
				<Slider {...imageSliderSettings} className="mt-5 flex justify-center space-x-4">
					{images.map((img, index) => (
						<div className="p-2">
							<img key={index} src={img} alt="movie scene" className="w-full  mr-4 rounded-lg" />
						</div>
					))}
				</Slider>
				{/* Zdjęcia */}

				{/* Podobne filmy */}
				<h2 className="text-2xl mt-6">Podobne filmy:</h2>

				<Slider {...movieSliderSettings} className="mt-5">
					{similarMovies.map(movie => (
						<div className="p-2">
							<Link to={`/movie/${movie.id}`} key={movie.id} className="text-center flex-1 min-w-0">
								<div
									className="w-full aspect-[2/3] bg-center bg-cover bg-no-repeat rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
									style={{ backgroundImage: `url(${movie.img})` }}
								/>
								<p className="mt-2 text-sm lg:text-base">{movie.title}</p>
							</Link>
						</div>
					))}
				</Slider>
				{/* Podobne filmy */}
			</div>
		</>
	)
}
