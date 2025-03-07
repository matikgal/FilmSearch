import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchActorDetails, fetchActorMovies } from '../Services/ApiService'
import { MovieSlider } from '../components/MovieSlider'

export default function ActorPage() {
	const { id } = useParams<{ id: string }>()
	const actorId = Number(id)

	interface ActorDeatails {
		id: number
		name: string
		biography: string
		gender: number
		birthday: string
		deathday: string
		img: string
		place_of_birth: string
		webpage: string
	}

	interface Movie {
		id: number
		title: string
		img: string
		overview: string
		stars: number
		type: string
	}

	const [actorDetails, setActorDetails] = useState<ActorDeatails | null>(null)
	const [movies, setMovies] = useState<Movie[]>([])

	useEffect(() => {
		async function fetchData() {
			const actorData = await fetchActorDetails(actorId)
			setActorDetails(actorData)
			const moviesData = await fetchActorMovies(actorId)
			setMovies(moviesData)
		}
		fetchData()
	}, [actorId])

	if (!actorDetails) {
		return <p>Ładowanie danych aktora...</p>
	}

	return (
		<div className="container mx-auto px-5 text-white min-h-screen">
			<div className="flex flex-col md:flex-row gap-5 mb-10">
				{/* Lewa część (zdjęcie + info) */}
				<div className="w-full md:w-2/5 flex md:flex-col ">
					<div
						className="bg-center bg-no-repeat bg-contain min-h-[150px] md:min-h-[400px] h-[30vh] md:h-[40vh] lg:h-[50vh] w-1/2 md:w-full mt-5"
						style={{ backgroundImage: `url(${actorDetails.img})` }}></div>

					<div className="px-5 md:text-center flex justify-center flex-col mt-5">
						<h2 className="font-semibold tracking-wider">Gender:</h2>
						<p>
							{actorDetails.gender === 1
								? 'Woman'
								: actorDetails.gender === 2
								? 'Man'
								: actorDetails.gender === 3
								? 'Non-binary'
								: 'Brak danych'}
						</p>
						<h2 className="font-semibold tracking-wider mt-2">Birthday:</h2>
						<p>{actorDetails.birthday}</p>
						{actorDetails.deathday && (
							<>
								<h2 className="font-semibold tracking-wider mt-2">Date of death:</h2>
								<p>{actorDetails.deathday}</p>
							</>
						)}
						<h2 className="font-semibold tracking-wider mt-2">Birthplace:</h2>
						<p className="text-wrap">{actorDetails.place_of_birth}</p>
					</div>
				</div>

				{/* Prawa część (Imię + Biografia) */}
				<div className="w-full md:w-4/5 p-1 mt-10 lg:mt-5">
					<h1 className="text-3xl tracking-wider">{actorDetails.name}</h1>
					<h3 className="mt-5 font-bold text-2xl">Biography</h3>
					<p className="mt-4">
						{actorDetails.biography.split(' ').slice(0, 60).join(' ')}
						{actorDetails.biography.split(' ').length > 60 && <span className="xl:hidden">...</span>}
						<span className="hidden xl:inline"> {actorDetails.biography}</span>
					</p>
				</div>
			</div>
			<MovieSlider movies={movies} movieB={true} typ="Known for: " />
		</div>
	)
}
