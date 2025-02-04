interface movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

export async function movieList(page = 1): Promise<movie[]> {
	const types = ['now_playing', 'popular', 'top_rated', 'upcoming']

	const promises = types.map(async type => {
		try {
			const url = `https://api.themoviedb.org/3/movie/${type}?language=pl-PL&page=${page}`

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
