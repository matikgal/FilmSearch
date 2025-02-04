import './App.css'
import MovieList from './components/MovieList'
import Navbar from './components/Navbar'
import { useState } from 'react'

function App() {
	const [movieOrTv, setMovieOrTv] = useState('movie')
	return (
		<>
			<Navbar setMovieOrTv={setMovieOrTv} />

			<div className="bg-[var(--color-accent)]">
				<MovieList movieOrTv={movieOrTv}/>
				
			</div>
		</>
	)
}

export default App
