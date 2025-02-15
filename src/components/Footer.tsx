import { Link } from 'react-router-dom'

export default function Footer() {
	return (
		<footer className="bg-[var(--color-background)] text-gray-300 py-6 mt-10">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
				<div className="text-center md:text-left">
					<Link
						to="/"
						className="text-3xl lg:text-2xl text-white cursor-pointer hover:text-[var(--color-secondary)] duration-300">
						FilmSearch
					</Link>
					<p className="text-sm mt-1">The video data comes from the TMDB API.</p>
				</div>

				<div className="mt-4 md:mt-0">
					<ul className="flex gap-4 text-sm">
						<li>
							<a href="/" className="hover:text-white">
								Homepage
							</a>
						</li>
						<li>
							<a href="/movie" className="hover:text-white">
								Movie
							</a>
						</li>
						<li>
							<a href="/tv" className="hover:text-white">
								TV Series
							</a>
						</li>
						<li>
							<a href="/" className="hover:text-white">
								Contact
							</a>
						</li>
					</ul>
				</div>

				<div className="mt-4 md:mt-0">
					<p className="text-sm">&copy; {new Date().getFullYear()} CineSnap</p>
				</div>
			</div>
		</footer>
	)
}
