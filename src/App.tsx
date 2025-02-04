import './App.css'
import MovieList from './components/MovieList'
import Navbar from './components/Navbar'

function App() {
	return (
		<>
			<Navbar />

			<div className="bg-[var(--color-accent)]">
				{/*<MovieList /> */}
				<PopularMovie />
			</div>
		</>
	)
}

export default App
