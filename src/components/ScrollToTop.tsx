// ScrollToTop - przewija stronę do góry przy zmianie ścieżki

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
	const { pathname } = useLocation()

	// Przy każdej zmianie ścieżki, przewiń do góry
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

export default ScrollToTop
