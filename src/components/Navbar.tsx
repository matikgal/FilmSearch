import { useState } from 'react'
import { FaSearch, FaTv, FaFilm, FaRegUser, FaBars } from 'react-icons/fa'

export default function Navbar() {
	const [showSearch, setShowSearch] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [showAuth, setShowAuth] = useState(false)

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
		setShowSearch(false)
		setShowMenu(false)
	}

	return (
		<div className="relative w-full bg-[var(--color-background)] px-5 lg:px-10 ">
			{/* Główna belka */}
			<div className="flex items-center justify-between h-[64px] z-40 container mx-auto">
				{/* Logo */}
				<h1 className="text-3xl lg:text-5xl text-white">FilmSearch</h1>

				{/* Pasek wyszukiwania na LG */}
				<label className="hidden md:flex items-center w-[300px] md:w-[400px] px-4 py-2 rounded-lg shadow-md bg-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-secondary)]">
					<input
						type="text"
						placeholder="Search for movies..."
						className="flex-1 bg-transparent outline-none text-white placeholder-gray-200"
					/>
					<FaSearch className="ml-2 text-white cursor-pointer hover:text-[var(--color-secondary)] transition duration-200" />
				</label>

				{/* Ikony mobilne (widoczne na lg) */}
				<div className="flex items-center gap-8 text-white text-2xl xl:hidden font-semibold">
					<FaSearch onClick={toggleSearch} className="cursor-pointer md:hidden" />
					<FaBars onClick={toggleMenu} className="cursor-pointer" />
					<FaRegUser onClick={toggleAuth} className="cursor-pointer" />
				</div>

				{/* Pełne menu i przyciski (widoczne dopiero na XL) */}
				<div className="hidden xl:flex items-center gap-10">
					<div className="flex gap-5 text-white text-lg font-light">
						<a
							href="#"
							className="flex items-center space-x-1 cursor-pointer hover:text-[var(--color-secondary)] transition duration-300 hover:scale-105">
							<FaFilm />
							<span>Movies</span>
						</a>
						<a
							href="#"
							className="flex items-center space-x-1 cursor-pointer hover:text-[var(--color-secondary)] transition duration-300 hover:scale-105">
							<FaTv />
							<span>TV Shows</span>
						</a>
					</div>

					<div className="flex gap-5 items-center justify-center text-white">
						<a
							href="#"
							className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] duration-300 px-4 py-2 rounded-xl font-semibold">
							Sign Up
						</a>
						<a
							href="#"
							className="ring-2 ring-[var(--color-primary)] hover:bg-[var(--color-primary)] duration-300 px-4 py-2 rounded-xl font-semibold">
							Log In
						</a>
					</div>
				</div>
			</div>

			{/* Dropdown wyszukiwarki */}
			<div
				className={`absolute top-[64px] left-0 w-full bg-[var(--color-background)] p-4 shadow-lg rounded-b-lg transform transition-transform duration-300 ${
					showSearch ? ' opacity-100' : ' opacity-0'
				}`}>
				<label className="flex items-center w-full px-4 py-2 rounded-lg shadow-md bg-[var(--color-primary)]">
					<input
						type="text"
						placeholder="Search for movies..."
						className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
					/>
					<FaSearch className="ml-2 text-white cursor-pointer hover:text-[var(--color-secondary)] transition duration-200" />
				</label>
			</div>

			{/* Dropdown menu (Movies & TV Shows) */}
			<div
				className={`absolute top-[64px] left-0 text-center w-full bg-[var(--color-accent)] p-4 shadow-lg rounded-b-lg transform transition-transform duration-300 font-semibold${
					showMenu ? 'opacity-100' : ' opacity-0 '
				}`}>
				<a
					href="#"
					className=" text-white text-xl py-2 hover:text-[var(--color-secondary)] flex items-center justify-center gap-x-3 ">
					<FaFilm />
					<span>Movies</span>
				</a>
				<hr className="h-1 " />
				<a
					href="#"
					className=" text-white text-xl py-2 hover:text-[var(--color-secondary)] flex items-center justify-center gap-x-3">
					<FaTv />
					<span>TV Shows</span>
				</a>
			</div>

			{/* Dropdown autoryzacji (Sign Up / Log In) */}
			<div
				className={`absolute top-[64px] left-0 w-full bg-[var(--color-accent)] p-4 shadow-lg rounded-b-lg transform transition-transform duration-300 font-semibold ${
					showAuth ? ' opacity-100' : 'opacity-0'
				}`}>
				<a
					href="#"
					className="flex items-center justify-center gap-x-3 text-white text-lg py-2 hover:text-[var(--color-secondary)]">
					Sign Up
				</a>
				<hr className="h-1 " />
				<a
					href="#"
					className="flex items-center justify-center gap-x-3 text-white text-lg py-2 hover:text-[var(--color-secondary)]">
					Log In
				</a>
			</div>
		</div>
	)
}
