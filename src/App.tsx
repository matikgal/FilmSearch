import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MoviePage from './pages/MoviePage'
import MovieInfoPage from './pages/MovieInfoPage'
import TvShowPage from './pages/TvShowPage'
import TvShowInfoPage from './pages/TvShowInfoPage'
import Navbar from './components/Navbar'
import { NavbarProvider } from './contexts/NavbarProvider'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Footer from './components/Footer'
import ActorPage from './pages/ActorPage'
import './index.css'

function App() {
	return (
		<Router>
			<div className="bg-[var(--color-accent)] ">
				<NavbarProvider>
					<Navbar />
					<Routes>
						<Route path="/FilmSearch" element={<MainPage />} />
						<Route path="/movie" element={<MoviePage />} />
						<Route path="/movie/:id" element={<MovieInfoPage movieB={true} />} />
						<Route path="/tv" element={<TvShowPage />} />
						<Route path="/tv/:id" element={<TvShowInfoPage />} />
						<Route path="/actor/:id" element={<ActorPage />} />
					</Routes>
					<Footer />
				</NavbarProvider>
			</div>
		</Router>
	)
}

export default App
