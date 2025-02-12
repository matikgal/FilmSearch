import { useState, useEffect } from 'react'
import { FaSearch, FaBars, FaRegUser, FaFilm, FaTv } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { fetchSearchResults } from '../Services/ApiService'

const Navbar = ({ setMovieType }: { movieOrTv: string; setMovieType: (type: string) => void }) => {
	const [showSearch, setShowSearch] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [showAuth, setShowAuth] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState<
		{ id: number; name?: string; title?: string; media_type: 'movie' | 'person' }[]
	>([])
	const navigate = useNavigate()
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setShowSearch(false)
				setShowMenu(false)
				setShowAuth(false)
			}
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const location = useLocation()

	useEffect(() => {
		setShowSearch(false)
		setShowMenu(false)
		setShowAuth(false)
	}, [location.pathname])

	useEffect(() => {
		if (searchTerm.length > 0) {
			setShowMenu(false)
			setShowAuth(false)
		}
	}, [searchTerm])

	const toggleSearch = () => {
		setShowSearch(prev => !prev)
		setShowMenu(false)
		setShowAuth(false)
	}

	const toggleMenu = () => {
		setShowMenu(prev => !prev)
		setShowSearch(false)
		setShowAuth(false)
	}

	const toggleAuth = () => {
		setShowAuth(prev => !prev)
		setShowMenu(false)
		setShowSearch(false)
	}

	const changeType = (type: string) => {
		if (setMovieType) {
			setMovieType(type)
			setShowMenu(false)
		} else {
			console.error('setMovieType is not defined')
		}
	}

	useEffect(() => {
		if (searchTerm.length < 2) {
			setSearchResults([])
			return
		}

		const fetchResults = async () => {
			const results = await fetchSearchResults(searchTerm)
			setSearchResults(results)
		}

		const delayDebounce = setTimeout(fetchResults, 500)

		return () => clearTimeout(delayDebounce)
	}, [searchTerm])

	return (
		<div className="relative w-full bg-[var(--color-background)] px-5 lg:px-10">
			<div className="flex items-center justify-between h-[64px] container mx-auto">
				<Link
					to="/"
					className="text-3xl lg:text-5xl text-white cursor-pointer hover:text-[var(--color-secondary)] duration-300">
					FilmSearch
				</Link>

				{/* Pasek wyszukiwania (dla desktop) */}
				<label className="relative hidden md:flex items-center w-[400px] px-4 py-2 rounded-lg shadow-md bg-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
					<input
						type="text"
						placeholder="Search for movies or actors..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className="flex-1 bg-transparent outline-none text-white placeholder-gray-200"
					/>
					{searchResults.length > 0 && (
						<ul className="absolute top-full left-0 w-full bg-[var(--color-background)] text-white shadow-lg z-20 mt-1 rounded-lg overflow-hidden">
							{searchResults.map(item => (
								<li key={item.id}>
									<Link
										to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}
										className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--color-secondary)] hover:text-black"
										onClick={() => {
											setSearchTerm('')
											setSearchResults([])
										}}>
										{item.img && <img src={item.img} alt={item.title} className="w-10 h-14 object-cover rounded" />}
										<span>
											{item.title} ({item.media_type === 'movie' ? 'Film' : 'Serial'})
										</span>
									</Link>
								</li>
							))}
						</ul>
					)}
					<FaSearch className="ml-2 text-white cursor-pointer" />
				</label>

				{/* Ikony mobilne */}
				<div className="flex items-center gap-8 text-white text-2xl xl:hidden">
					<FaSearch onClick={toggleSearch} className="cursor-pointer md:hidden" />
					<FaBars onClick={toggleMenu} className="cursor-pointer" />
					<FaRegUser onClick={toggleAuth} className="cursor-pointer" />
				</div>

				{/* Pełne menu na desktop */}
				<div className="hidden xl:flex items-center gap-10">
					<div className="flex gap-5 text-white text-lg font-light">
						<button
							onClick={() => {
								setMovieType('movie')
								navigate('/list')
							}}
							className={`flex items-center space-x-1 transition cursor-pointer hover:text-[var(--color-secondary)] duration-150 hover:scale-105`}>
							<FaFilm />
							<span>Movies</span>
						</button>

						<button
							onClick={() => {
								setMovieType('tv')
								navigate('/list')
							}}
							className={`flex items-center space-x-1 transition cursor-pointer hover:text-[var(--color-secondary)] duration-150 hover:scale-105`}>
							<FaTv />
							<span>TV Shows</span>
						</button>
					</div>

					<div className="flex gap-5 text-white">
						<a
							href="#"
							className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] px-4 py-2 rounded-xl hover:text-black duration-300">
							Sign Up
						</a>
						<a
							href="#"
							className="ring-2 ring-[var(--color-primary)] hover:bg-[var(--color-primary)] px-4 py-2 rounded-xl duration-300">
							Log In
						</a>
					</div>
				</div>
			</div>

			{/* Dropdown wyszukiwarki */}
			<div
				className={classNames(
					'absolute top-[64px] left-0 w-full bg-[var(--color-background)] p-4 shadow-lg transition-all duration-300 z-20',
					{
						'opacity-0 translate-y-[-10px] invisible': !showSearch,
						'opacity-100 translate-y-0 visible': showSearch,
					}
				)}>
				<label className="relative flex items-center w-full px-4 py-2 bg-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
					<input
						type="text"
						placeholder="Search for movies..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className="flex-1 bg-transparent outline-none text-white"
					/>
					{searchResults.length > 0 && (
						<ul className="absolute top-full left-0 w-full bg-[var(--color-background)] text-white shadow-lg z-20 mt-1 rounded-lg overflow-hidden">
							{searchResults.map(item => (
								<li key={item.id}>
									<Link
										to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}
										className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--color-secondary)]"
										onClick={() => {
											setSearchTerm('')
											setSearchResults([])
										}}>
										{item.img && <img src={item.img} alt={item.title} className="w-10 h-14 object-cover rounded" />}
										<span>{item.title}</span>
									</Link>
								</li>
							))}
						</ul>
					)}
					<FaSearch className="ml-2 text-white cursor-pointer" />
				</label>
			</div>

			{/* Dropdown menu */}
			<div
				className={classNames(
					'absolute top-[64px] left-0 w-full bg-[var(--color-background)] p-4 shadow-lg z-20 transition-all duration-300',
					{
						'opacity-0 translate-y-[-10px] invisible': !showMenu,
						'opacity-100 translate-y-0 visible': showMenu,
					}
				)}>
				<button
					onClick={() => changeType('movie')}
					className="text-white text-xl py-2 w-full hover:text-[var(--color-secondary)] flex items-center justify-center gap-3">
					<FaFilm /> Movies
				</button>
				<hr />
				<button
					onClick={() => changeType('tv')}
					className="text-white text-xl py-2 w-full hover:text-[var(--color-secondary)] flex items-center justify-center gap-3">
					<FaTv /> TV Shows
				</button>
			</div>

			{/* Dropdown autoryzacji */}
			<div
				className={classNames(
					'absolute top-[64px] left-0 w-full bg-[var(--color-background)] p-4 shadow-lg transition-all duration-300',
					{
						'opacity-0 translate-y-[-10px] invisible': !showAuth,
						'opacity-100 translate-y-0 visible': showAuth,
					}
				)}>
				<a
					href="#"
					className="text-white text-lg py-2 hover:text-[var(--color-secondary)] flex items-center justify-center gap-3">
					Sign Up
				</a>
				<hr />
				<a
					href="#"
					className="text-white text-lg py-2 hover:text-[var(--color-secondary)] flex items-center justify-center gap-3">
					Log In
				</a>
			</div>
		</div>
	)
}

export default Navbar
