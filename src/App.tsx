import './App.css'
import MovieList from './components/MovieList'
// import MovieList from './components/MovieList'
import Navbar from './components/Navbar'
import PopularMovie from './components/PopularMovie'

function App() {
	return (
		<>
			<Navbar />
			{/* <MovieList /> */}
			<div className="bg-[var(--color-accent)]">
				{/*<MovieList /> */}
				<PopularMovie />
			</div>
		</>
	)
}

export default App
