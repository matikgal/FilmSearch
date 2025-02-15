import React, { useEffect, useState } from 'react'
import { movieList } from '../Services/ApiService'
import LatestSlider from '../components/LatestSlider'
import { MovieSlider } from '../components/MovieSlider'

interface Movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

const MainPage: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [tvShows, setTvShows] = useState<Movie[]>([])

	useEffect(() => {
		async function fetchMovies() {
			try {
				const moviesData = await movieList(1, 'movie')
				setMovies(moviesData)
			} catch (error) {
				console.error(error)
			}
		}
		fetchMovies()
	}, [])

	useEffect(() => {
		document.title = 'CineSnap'
	}, [])

	useEffect(() => {
		async function fetchTvShows() {
			try {
				const tvData = await movieList(1, 'tv')
				setTvShows(tvData)
			} catch (error) {
				console.error(error)
			}
		}
		fetchTvShows()
	}, [])

	const popularMovies = movies.filter(item => item.type === 'popular')
	const nowPlayingMovies = movies.filter(item => item.type === 'now_playing')

	const popularTv = tvShows.filter(item => item.type === 'popular')
	const airingTv = tvShows.filter(item => item.type === 'airing_today' || item.type === 'on_the_air')

	return (
		<div className="container mx-auto p-5">
			{/* Najnowsze Filmy */}
			<LatestSlider media="movie" sliderTitle="Latest Movies" />

			{/* Sekcje filmowe */}
			<section className="mb-10">
				<MovieSlider movies={popularMovies} typ="Popular Movies" movieB={true} />
			</section>
			<section className="mb-10">
				<MovieSlider movies={nowPlayingMovies} typ="Now Playing" movieB={true} />
			</section>

			{/* Najnowsze Seriale */}
			<LatestSlider media="tv" sliderTitle="Latest Shows" />

			{/* Sekcje serialowe */}
			<section className="mb-10">
				<MovieSlider movies={popularTv} typ="Popular Shows" movieB={false} />
			</section>
			<section className="mb-10">
				<MovieSlider movies={airingTv} typ="Airing Today" movieB={false} />
			</section>
		</div>
	)
}

export default MainPage
