import './App.css'
import MovieList from './components/MovieList'
import MoviePage from './components/MoviePage'
import ActorPage from './components/ActorPage'
import Navbar from './components/Navbar'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
	const [movieOrTv, setMovieOrTv] = useState('movie')

	return (
		<Router>
			<div className="bg-[var(--color-accent)]">
			<ScrollToTop />

				{' '}
				<Navbar movieOrTv={movieOrTv} setMovieType={setMovieOrTv} />
				<Routes>
					<Route path="/" element={<MovieList movieOrTv={movieOrTv} />} />
					<Route path="/list" element={<MovieList movieOrTv={movieOrTv} />} />
					<Route path="/movie/:id" element={<MoviePage movieB={true} />} />

					<Route path="/tv/:id" element={<MoviePage movieB={false} />} />
					<Route path="/actor/:actorID" element={<ActorPage />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
