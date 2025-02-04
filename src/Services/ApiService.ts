interface movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
}

export async function movieList(page = 1): Promise<movie[]> {
	const url = `https://api.themoviedb.org/3/movie/now_playing?language=us-EN&page=${page}`
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmU1ZWIxYzViMzUxYzY3YTgyYzAxNzkxY2I5ZjhhMSIsIm5iZiI6MTcwOTM5NTY0OC41ODksInN1YiI6IjY1ZTM0ZWMwOTk3OWQyMDE3Y2IwNmI5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5mm5q_Bv0I3mWtj2S4Kd23iFHcXeEugmVbSxzCIRi4',
			},
		})
		const data = await response.json()
		console.log(data)
		return data.results.map((movie: any) => ({
			id: movie.id,
			title: movie.title,
			img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			overview: movie.overview,
			stars: movie.vote_average,
		}))
	} catch (error) {
		console.error('błąd', error)
		return []
	}
}
