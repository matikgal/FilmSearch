interface movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

interface MovieDetails {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	releaseDate: string
	runtime: number
	genres: string[]
}

interface Actor {
	id: number
	name: string
	character: string
	img: string | null
}

interface CrewMember {
	id: number
	name: string
	job: string
}

const API_KEY = '7fe5eb1c5b351c67a82c01791cb9f8a1'
const BASE_URL = 'https://api.themoviedb.org/3'
const HEADERS = {
	accept: 'application/json',
	Authorization:
		'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmU1ZWIxYzViMzUxYzY3YTgyYzAxNzkxY2I5ZjhhMSIsIm5iZiI6MTcwOTM5NTY0OC41ODksInN1YiI6IjY1ZTM0ZWMwOTk3OWQyMDE3Y2IwNmI5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5mm5q_Bv0I3mWtj2S4Kd23iFHcXeEugmVbSxzCIRi4',
}

export async function movieList(page = 1, movieOrTv = 'movie'): Promise<movie[]> {
	let types: string[]

	if (movieOrTv == 'tv') {
		types = ['airing_today', 'on_the_air', 'top_rated', 'popular']
	} else {
		types = ['now_playing', 'popular', 'top_rated', 'upcoming']
	}
	const promises = types.map(async type => {
		try {
			const url = `https://api.themoviedb.org/3/${movieOrTv}/${type}?language=pl-PL&page=${page}`
			console.log(url)
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmU1ZWIxYzViMzUxYzY3YTgyYzAxNzkxY2I5ZjhhMSIsIm5iZiI6MTcwOTM5NTY0OC41ODksInN1YiI6IjY1ZTM0ZWMwOTk3OWQyMDE3Y2IwNmI5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5mm5q_Bv0I3mWtj2S4Kd23iFHcXeEugmVbSxzCIRi4',
				},
			})

			const data = await response.json()

			return data.results.map((movie: any) => ({
				id: movie.id,
				title: movie.title,
				img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
				overview: movie.overview,
				stars: movie.vote_average,
				type: type,
			}))
		} catch (error) {
			console.error(`Error fetching ${type}:`, error)
			return []
		}
	})

	const moviesByType = await Promise.all(promises)
	return moviesByType.flat()
}

/**
 * Pobiera szczegóły filmu (tytuł, opis, data premiery, gatunki itd.)
 */
export async function fetchMovieDetails(movieId: number): Promise<MovieDetails | null> {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}?language=pl-PL`, { headers: HEADERS })
		const data = await response.json()
		return {
			id: data.id,
			title: data.title,
			img: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
			overview: data.overview,
			stars: data.vote_average,
			releaseDate: data.release_date,
			runtime: data.runtime,
			genres: data.genres.map((g: any) => g.name),
		}
	} catch (error) {
		console.error('Błąd pobierania szczegółów filmu:', error)
		return null
	}
}

/**
 * Pobiera obsadę i ekipę (aktorzy, reżyserzy, scenarzyści)
 */
export async function fetchMovieCredits(movieId: number) {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?language=pl-PL`, { headers: HEADERS })
		const data = await response.json()
		return {
			actors: data.cast.slice(0, 10).map((actor: any) => ({
				id: actor.id,
				name: actor.name,
				character: actor.character,
				img: actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : null,
			})),
			directors: data.crew.filter((person: any) => person.job === 'Director'),
			writers: data.crew.filter((person: any) => person.job === 'Screenplay' || person.job === 'Writer'),
		}
	} catch (error) {
		console.error('Błąd pobierania obsady filmu:', error)
		return null
	}
}

/**
 * Pobiera zdjęcia z filmu
 */
export async function fetchMovieImages(movieId: number): Promise<string[]> {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}/images`, { headers: HEADERS })
		const data = await response.json()
		return data.backdrops.slice(0, 10).map((image: any) => `https://image.tmdb.org/t/p/w500${image.file_path}`)
	} catch (error) {
		console.error('Błąd pobierania zdjęć filmu:', error)
		return []
	}
}

/**
 * Pobiera podobne filmy
 */
export async function fetchSimilarMovies(movieId: number) {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}/similar?language=pl-PL&page=1`, { headers: HEADERS })
		const data = await response.json()
		return data.results.slice(0, 10).map((movie: any) => ({
			id: movie.id,
			title: movie.title,
			img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
		}))
	} catch (error) {
		console.error('Błąd pobierania podobnych filmów:', error)
		return []
	}
}
