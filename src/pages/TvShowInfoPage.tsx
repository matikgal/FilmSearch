import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
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

export default function TvShowInfoPage() {
	const { id } = useParams<{ id: string }>()
	const tvId = Number(id)
	const [tvShow, setTvShow] = useState<any>(null)
	const [credits, setCredits] = useState<any>(null)
	const [images, setImages] = useState<{ id: string; path: string }[]>([])
	const [recommended, setRecommended] = useState<any[]>([])
	const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchData() {
			if (!id) return
			const tvData = await fetchTvDetails(tvId)
			setTvShow(tvData)
			const creditsData = await fetchTvCredits(tvId)
			setCredits(creditsData)
			const imagesData = await fetchTvImages(tvId)
			setImages(imagesData)
			const recommendedData = await fetchRecommendedTv(tvId)
			setRecommended(recommendedData)
			const trailerData = await fetchTvVideos(tvId)
			setTrailerUrl(trailerData)
		}
		fetchData()
	}, [tvId, id])

	if (!id) return <div className="text-white">Brak identyfikatora</div>
	if (!tvShow) return <div className="text-white">Ładowanie...</div>

	return (
		<>
			{trailerUrl ? (
				<div className="w-full h-[300px] md:h-[500px]">
					<iframe className="w-full h-full" src={trailerUrl} title={tvShow.title} allowFullScreen></iframe>
				</div>
			) : null}

			<div className="p-5 text-white container mx-auto max-w-6xl ">
				<div className="grid grid-cols-3 gap-5 items-stretch">
					<div
						className="hidden md:block h-full min-h-[400px] bg-center bg-contain bg-no-repeat"
						style={{ backgroundImage: `url(${tvShow.img})` }}
					/>
					<div className="col-span-2 flex flex-col justify-start">
						<h1 className="text-4xl font-bold">{tvShow.title}</h1>
						<div className="mt-2 flex gap-4">
							<p className="flex items-center gap-2">
								<CiCalendar /> {tvShow.releaseDate}
							</p>
							<p className="flex items-center gap-2">
								<CiClock2 /> {tvShow.runtime} min
							</p>
						</div>
						<p className="flex items-center gap-2 mt-1 text-lg">
							<FaStar className="text-[var(--color-secondary)]" />
							{tvShow.stars.toFixed(1)} / 10
						</p>
						<div className="flex flex-wrap gap-2 mt-2">
							{tvShow.genres.map((genre: string, index: number) => (
								<span
									key={index}
									className="bg-[var(--color-secondary)] text-black px-3 py-1 rounded-full text-sm font-semibold">
									{genre}
								</span>
							))}
						</div>
						<p className="text-gray-300 mt-4">{tvShow.overview}</p>
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
					header="Zdjęcia z serialu:"
				/>

				<MovieSlider movies={recommended} typ="Polecane Serial" movieB={false} />
			</div>
		</>
	)
}
