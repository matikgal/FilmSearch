// Navbar - pasek nawigacyjny z wyszukiwarką, menu i autoryzacją
import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaBars, FaRegUser, FaFilm, FaTv } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { fetchSearchResults } from '../Services/ApiService'
import { useNavbar } from '../hooks/useNavbar'

const Navbar: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState<
		{ id: number; name?: string; title?: string; media_type?: 'movie' | 'person' | 'tv'; img?: string }[]
	>([])

	// Pobieramy stany i metody z kontekstu
	const { showSearch, toggleSearch, showMenu, toggleMenu, showAuth, toggleAuth, hideAll, hideMenuAndAuth } = useNavbar()
	const navigate = useNavigate()

	// Refy do wykrywania kliknięć poza dropdownami
	const desktopSearchRef = useRef<HTMLLabelElement>(null)
	const mobileSearchRef = useRef<HTMLDivElement>(null)

	// Ukrywa dropdown, gdy klikniemy poza nim
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const desktopContains = desktopSearchRef.current && desktopSearchRef.current.contains(event.target as Node)
			const mobileContains = mobileSearchRef.current && mobileSearchRef.current.contains(event.target as Node)
			if (!desktopContains && !mobileContains) {
				setSearchTerm('')
				setSearchResults([])
				hideAll()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [hideAll])

	// Debounce wyszukiwania
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

	// Zmiana typu (movie/tv) i przejście do odpowiedniej strony
	const changeType = (type: string) => {
		hideMenuAndAuth()
		if (type === 'movie') {
			navigate('/movie')
		} else if (type === 'tv') {
			navigate('/tv')
		}
	}

	return (
		<div className="relative w-full bg-[var(--color-background)] px-5 lg:px-10">
			<div className="flex items-center justify-between h-[64px] container mx-auto">
				<Link
					to="/FilmSearch"
					className="text-3xl lg:text-5xl text-white cursor-pointer hover:text-[var(--color-secondary)] duration-300 font-serif">
					CineSnap
				</Link>

				{/* Pasek wyszukiwania - wersja desktop */}
				<label
					ref={desktopSearchRef}
					className="relative hidden md:flex items-center w-[400px] px-4 py-2 rounded-lg shadow-md bg-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
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
										to={
											(item.media_type || 'movie') === 'movie'
												? `/movie/${item.id}`
												: (item.media_type || 'movie') === 'person'
												? `/actor/${item.id}`
												: `/tv/${item.id}`
										}
										className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--color-secondary)] hover:text-black"
										onClick={() => {
											setSearchTerm('')
											setSearchResults([])
										}}>
										{item.img && (
											<img src={item.img} alt={item.title || item.name} className="w-10 h-14 object-cover rounded" />
										)}
										<span>
											{item.title || item.name} (
											{(item.media_type || 'movie') === 'movie'
												? 'Film'
												: (item.media_type || 'movie') === 'person'
												? 'Actor'
												: 'Serial'}
											)
										</span>
									</Link>
								</li>
							))}
						</ul>
					)}
					<FaSearch className="ml-2 text-white cursor-pointer" />
				</label>

				{/* Ikony - wersja mobilna */}
				<div className="flex items-center gap-8 text-white text-2xl xl:hidden">
					<FaSearch onClick={toggleSearch} className="cursor-pointer md:hidden" />
					<FaBars onClick={toggleMenu} className="cursor-pointer" />
					<FaRegUser onClick={toggleAuth} className="cursor-pointer" />
				</div>

				{/* Menu - wersja desktop */}
				<div className="hidden xl:flex items-center gap-10">
					<div className="flex gap-5 text-white text-lg font-light">
						<button
							onClick={() => changeType('movie')}
							className="flex items-center space-x-1 transition cursor-pointer hover:text-[var(--color-secondary)] duration-150 hover:scale-105">
							<FaFilm />
							<span>Movies</span>
						</button>
						<button
							onClick={() => changeType('tv')}
							className="flex items-center space-x-1 transition cursor-pointer hover:text-[var(--color-secondary)] duration-150 hover:scale-105">
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

			{/* Dropdown wyszukiwania - wersja mobilna */}
			<div
				ref={mobileSearchRef}
				className={classNames(
					'absolute top-[64px] left-0 w-full bg-[var(--color-background)] p-4 shadow-lg transition-all duration-300 z-20',
					{
						'opacity-0 translate-y-[-10px] invisible': !showSearch,
						'opacity-100 translate-y-0 visible': showSearch,
					}
				)}>
				<label className="relative flex items-center w-full px-4 py-2 bg-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-secondary)] z-20">
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
										to={
											(item.media_type || 'movie') === 'movie'
												? `/movie/${item.id}`
												: (item.media_type || 'movie') === 'person'
												? `/actor/${item.id}`
												: `/tv/${item.id}`
										}
										className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--color-secondary)]"
										onClick={() => {
											setSearchTerm('')
											setSearchResults([])
										}}>
										{item.img && (
											<img src={item.img} alt={item.title || item.name} className="w-10 h-14 object-cover rounded" />
										)}
										<span>{item.title || item.name}</span>
									</Link>
								</li>
							))}
						</ul>
					)}
					<FaSearch className="ml-2 text-white cursor-pointer" />
				</label>
			</div>

			{/* Dropdown menu - wersja mobilna */}
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

			{/* Dropdown autoryzacji - wersja mobilna */}
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
