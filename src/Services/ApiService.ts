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

interface ActorDetails {
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

interface Item {
	id: number
	title?: string
	name?: string
	media_type: string
	poster_path?: string
	profile_path?: string
	popularity: number
}

const BASE_URL = 'https://api.themoviedb.org/3'
const HEADERS = {
	accept: 'application/json',
	Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
}

export async function movieList(page = 1, movieOrTv = 'movie'): Promise<movie[]> {
	let types: string[]

	if (movieOrTv === 'tv') {
		types = ['airing_today', 'on_the_air', 'top_rated', 'popular']
	} else {
		types = ['now_playing', 'popular', 'top_rated', 'upcoming']
	}
	const promises = types.map(async type => {
		try {
			const url = `${BASE_URL}/${movieOrTv}/${type}?language=en-US&page=${page}`
			console.log(url)
			const response = await fetch(url, {
				method: 'GET',
				headers: HEADERS,
			})
			const data = await response.json()

			return data.results.map((movie: any) => ({
				id: movie.id,
				title: movie.title == null ? movie.name : movie.title,
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
		const response = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, { headers: HEADERS })
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

export async function fetchTvDetails(movieId: number): Promise<MovieDetails | null> {
	try {
		const response = await fetch(`${BASE_URL}/tv/${movieId}?language=en-US`, { headers: HEADERS })
		const data = await response.json()
		return {
			id: data.id,
			title: data.name,
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
		const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?language=en-US`, { headers: HEADERS })
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

export async function fetchTvCredits(movieId: number) {
	try {
		const response = await fetch(`${BASE_URL}/tv/${movieId}/credits?language=en-US`, { headers: HEADERS })
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
export async function fetchMovieImages(movieId: number): Promise<{ id: string; path: string }[]> {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}/images`, { headers: HEADERS })
		const data = await response.json()

		return data.backdrops.slice(0, 10).map((image: any, index: number) => ({
			id: String(index),
			path: image.file_path ? `https://image.tmdb.org/t/p/w300${image.file_path}` : '',
		}))
	} catch (error) {
		console.error('Błąd pobierania zdjęć filmu:', error)
		return []
	}
}

export async function fetchTvImages(movieId: number): Promise<{ id: string; path: string }[]> {
	try {
		const response = await fetch(`${BASE_URL}/tv/${movieId}/images`, { headers: HEADERS })
		const data = await response.json()

		return data.backdrops.slice(0, 10).map((image: any, index: number) => ({
			id: String(index),
			path: image.file_path ? `https://image.tmdb.org/t/p/w300${image.file_path}` : '',
		}))
	} catch (error) {
		console.error('Błąd pobierania zdjęć filmu:', error)
		return []
	}
}

export async function fetchMovieVideos(movieId: number) {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?language=en-US`, { headers: HEADERS })
		const data = await response.json()
		const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube')

		return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
	} catch (error) {
		console.error('Błąd pobierania wideo:', error)
		return null
	}
}

export async function fetchTvVideos(movieId: number) {
	try {
		const response = await fetch(`${BASE_URL}/tv/${movieId}/videos?language=en-US`, { headers: HEADERS })
		const data = await response.json()

		const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube')

		return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
	} catch (error) {
		console.error('Błąd pobierania wideo:', error)
		return null
	}
}

/**
 * Pobiera podobne filmy
 */
export async function fetchSimilarMovies(movieId: number): Promise<movie[]> {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`, { headers: HEADERS })
		const data = await response.json()

		return data.results.slice(0, 10).map((movie: any) => ({
			id: movie.id,
			title: movie.title == null ? movie.name : movie.title,
			img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			overview: movie.overview || 'Brak opisu',
			stars: movie.vote_average || 0,
			type: movie.genre_ids.length > 0 ? movie.genre_ids[0].toString() : 'Nieznany',
		}))
	} catch (error) {
		console.error('Błąd pobierania podobnych filmów:', error)
		return []
	}
}

export async function fetchRecommendedTv(movieId: number): Promise<movie[]> {
	try {
		const response = await fetch(`${BASE_URL}/tv/${movieId}/similar?language=en-US&page=1`, { headers: HEADERS })
		const data = await response.json()

		return data.results.slice(0, 10).map((movie: any) => ({
			id: movie.id,
			title: movie.name,
			img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			overview: movie.overview || 'Brak opisu',
			stars: movie.vote_average || 0,
			type: movie.genre_ids.length > 0 ? movie.genre_ids[0].toString() : 'Nieznany',
		}))
	} catch (error) {
		console.error('Błąd pobierania podobnych filmów:', error)
		return []
	}
}

export async function fetchActorDetails(actorId: number): Promise<ActorDetails | null> {
	try {
		const response = await fetch(`${BASE_URL}/person/${actorId}?language=en-US`, { headers: HEADERS })
		const data = await response.json()
		return {
			id: data.id,
			name: data.name,
			biography: data.biography,
			gender: data.gender,
			birthday: data.birthday,
			deathday: data.deathday,
			img: `https://image.tmdb.org/t/p/w300${data.profile_path}`,
			place_of_birth: data.place_of_birth,
			webpage: data.homepage,
		}
	} catch (error) {
		console.error('Błąd przy actor details', error)
		return null
	}
}

export async function fetchSearchResults(query: string) {
	if (!query.trim()) return []

	try {
		const response = await fetch(`${BASE_URL}/search/multi?query=${query}&language=en-US&page=1`, { headers: HEADERS })
		const data = await response.json()

		return data.results
			.slice(0, 10)
			.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
			.sort((a: Item, b: Item) => b.popularity - a.popularity)
			.map((item: any) => ({
				id: item.id,
				title: item.title || item.name,
				media_type: item.media_type,
				img: item.poster_path
					? `https://image.tmdb.org/t/p/w200${item.poster_path}`
					: item.profile_path
					? `https://image.tmdb.org/t/p/w200${item.profile_path}`
					: null,
			}))
	} catch (error) {
		console.error('Błąd pobierania wyników wyszukiwania:', error)
		return []
	}
}

export async function fetchActorMovies(movieId: number): Promise<movie[]> {
	try {
		const response = await fetch(`${BASE_URL}/person/${movieId}/movie_credits?language=en-US`, { headers: HEADERS })
		const data = await response.json()
		return data.cast.slice(0, 10).map((movieData: any) => ({
			id: movieData.id,
			title: movieData.title || movieData.name || 'No Title',
			img: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
			overview: movieData.overview || 'Brak opisu',
			stars: movieData.vote_average || 0,
			type: movieData.genre_ids.length > 0 ? movieData.genre_ids[0].toString() : 'Nieznany',
		}))
	} catch (error) {
		console.error('Błąd pobierania filmów aktora:', error)
		return []
	}
}
