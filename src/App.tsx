import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MoviePage from './pages/MoviePage'
import MovieInfoPage from './pages/MovieInfoPage'
import TvShowPage from './pages/TvShowPage'
import TvShowInfoPage from './pages/TvShowInfoPage'
import ActorPage from './pages/ActorPage' // Upewnij się, że importujesz ActorPage
import Navbar from './components/Navbar'
import { NavbarProvider } from './contexts/NavbarProvider'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Footer from './components/Footer'

function App() {
	return (
		<Router>
			<div className="bg-[var(--color-accent)]">
				<NavbarProvider>
					<Navbar />
					<Routes>
						{/* Strony główne */}
						<Route path="/movie" element={<MoviePage />} />
						<Route path="/tv" element={<TvShowPage />} />
						{/* Strony szczegółowe */}
						<Route path="/movie/:id" element={<MovieInfoPage movieB={true} />} />
						<Route path="/tv/:id" element={<TvShowInfoPage />} />
						{/* Strona aktora */}
						<Route path="/actor/:id" element={<ActorPage />} /> {/* Dodaj tę linię */}
					</Routes>
					<Footer />
				</NavbarProvider>
			</div>
		</Router>
	)
}

export default App
