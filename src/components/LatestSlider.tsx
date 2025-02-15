import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { movieList } from '../Services/ApiService'
import { FaStar } from 'react-icons/fa6'
import { useRef } from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

interface Movie {
	id: number
	title: string
	img: string
	overview: string
	stars: number
	type: string
}

interface LatestSliderProps {
	media: 'movie' | 'tv'
	sliderTitle: string
}

const LatestSlider: React.FC<LatestSliderProps> = ({ media, sliderTitle }) => {
	const [items, setItems] = useState<Movie[]>([])
	const sliderRef = useRef<Slider | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await movieList(1, media)
				let filtered: Movie[] = []
				if (media === 'movie') {
					filtered = data.filter(item => item.type === 'now_playing').slice(0, 3)
				} else {
					filtered = data.filter(item => item.type === 'airing_today' || item.type === 'on_the_air').slice(0, 3)
				}
				setItems(filtered)
			} catch (error) {
				console.error(error)
			}
		}
		fetchData()
	}, [media])

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	}

	return (
		<div className="latest-slider my-10">
			<div className="flex justify-between items-center w-full px-2">
				<div className="flex gap-x-2 text-xl font-semibold text-white">
					<div className="w-[3px] bg-[var(--color-secondary)] rounded-full"></div>
					<h1 className="xl:text-2xl">{sliderTitle}</h1>
				</div>
				<div className="gap-5 flex">
					<button
						onClick={() => sliderRef.current?.slickPrev()}
						className="text-white bg-[var(--color-primary)] p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition cursor-pointer">
						<FaAngleLeft />
					</button>
					<button
						onClick={() => sliderRef.current?.slickNext()}
						className="text-white bg-[var(--color-primary)] p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-black transition cursor-pointer">
						<FaAngleRight />
					</button>
				</div>
			</div>
			<div>
				<Slider {...settings} ref={sliderRef}>
					{items.map(item => (
						<div
							key={item.id}
							className="mt-5 relative p-2"
							onClick={() => {
								if (media === 'movie') {
									navigate(`/movie/${item.id}`)
								} else {
									navigate(`/tv/${item.id}`)
								}
							}}>
							<img
								className="rounded-sm w-full h-60 sm:h-70 lg:h-100 xl:h-120 object-cover shadow-md"
								src={item.img}
								alt={item.title}
							/>
							<div className="absolute inset-0 bg-black opacity-50 z-10 m-2"></div>
							<div className="absolute inset-0 flex flex-row items-center justify-center font-thin text-3xl md:text-4xl lg:text-3xl text-white z-20 m-10">
								<img src={item.img} alt={item.title} className="hidden lg:block w-0 lg:h-auto lg:w-50" />
								<div className="flex flex-col justify-center items-center lg:items-start lg:p-10 lg:w-3/5">
									<div className="flex items-center gap-2 text-xl">
										<FaStar className="text-[var(--color-secondary)]" />
										<p>{item.stars.toFixed(1)}</p>
									</div>
									<p className="lg:font-semibold mt-2 text-center lg:text-left">{item.title}</p>
									<p className="hidden lg:block text-lg mt-5">{item.overview}</p>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	)
}

export default LatestSlider
