import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
	fetchMovieDetails,
	fetchMovieCredits,
	fetchMovieImages,
	fetchSimilarMovies,
	fetchMovieVideos,
	fetchTvDetails,
	fetchTvCredits,
	fetchTvImages,
	fetchTvVideos,
	fetchRecommendedTv,
} from '../Services/ApiService'
import { CiCalendar, CiClock2 } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa6'
import ImgSlider from '../components/ImgSlider'
import { MovieSlider } from '../components/MovieSlider'

interface MovieInfoPageProps {
	movieB: boolean
}

export default function MovieInfoPage({ movieB }: MovieInfoPageProps) {
	const { id } = useParams<{ id: string }>()
	const movieId = Number(id)
	const [movie, setMovie] = useState<any>(null)
	const [credits, setCredits] = useState<any>(null)
	const [images, setImages] = useState<{ id: string; path: string }[]>([])
	const [similarMovies, setSimilarMovies] = useState<any[]>([])
	const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchData() {
			if (!id) return
			if (movieB === true) {
				const movieData = await fetchMovieDetails(movieId)
				setMovie(movieData)
				const creditsData = await fetchMovieCredits(movieId)
				setCredits(creditsData)
				const imagesData = await fetchMovieImages(movieId)
				setImages(imagesData)
				const similarMoviesData = await fetchSimilarMovies(movieId)
				setSimilarMovies(similarMoviesData)
				const trailerData = await fetchMovieVideos(movieId)
				setTrailerUrl(trailerData)
			} else {
				// W przypadku seriali – analogicznie, choć tutaj movieB powinno być false
				const tvData = await fetchTvDetails(movieId)
				setMovie(tvData)
				const creditsData = await fetchTvCredits(movieId)
				setCredits(creditsData)
				const imagesData = await fetchTvImages(movieId)
				setImages(imagesData)
				const similarMoviesData = await fetchRecommendedTv(movieId)
				setSimilarMovies(similarMoviesData)
				const trailerData = await fetchTvVideos(movieId)
				setTrailerUrl(trailerData)
			}
		}
		fetchData()
	}, [movieId, id, movieB])

	if (!id) {
		return <div className="text-white">Brak identyfikatora – wybierz element z listy.</div>
	}
	if (!movie) return <div className="text-white">Ładowanie...</div>

	return (
		<>
			{trailerUrl ? (
				<div className="w-full h-[300px] md:h-[500px]">
					<iframe className="w-full h-full" src={trailerUrl} title={movie.title} allowFullScreen></iframe>
				</div>
			) : null}

			<div className="p-5 text-white container mx-auto max-w-6xl">
				<div className="grid grid-cols-3 gap-5 items-stretch">
					<div
						className="hidden md:block h-full min-h-[400px] bg-center bg-contain bg-no-repeat"
						style={{ backgroundImage: `url(${movie.img})` }}
					/>
					<div className="col-span-2 flex flex-col justify-start">
						<h1 className="text-4xl font-bold">{movie.title}</h1>
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
					</div>
				</div>

				<h2 className="text-2xl mt-6">Obsada:</h2>
				<div className="flex flex-col gap-4 mt-5 md:grid md:grid-cols-2 lg:grid-cols-3">
					{credits?.actors.map((actor: any) => (
						<div
							key={actor.id}
							className="flex items-center gap-5 cursor-pointer"
							onClick={() => navigate(`/actor/${actor.id}`)}>
							{actor.img && (
								<div
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

				<ImgSlider
					images={images.map(image => ({ link: image.path, alt: `Zdjęcie ${image.id}` }))}
					header="Zdjęcia z filmu:"
				/>

				<MovieSlider movies={similarMovies} typ="Podobne Filmy" movieB={true} />
			</div>
		</>
	)
}
