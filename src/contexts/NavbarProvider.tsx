import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NavbarContext, NavbarContextType } from './NavbarContext'

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [showSearch, setShowSearch] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [showAuth, setShowAuth] = useState(false)
	const location = useLocation()

	const hideAll = () => {
		setShowSearch(false)
		setShowMenu(false)
		setShowAuth(false)
	}

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

	const hideMenuAndAuth = () => {
		setShowMenu(false)
		setShowAuth(false)
	}

	// Zamykamy dropdowny przy zmianie ścieżki
	useEffect(() => {
		hideAll()
	}, [location.pathname])

	// Zamykamy dropdowny przy zmianie rozmiaru okna
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				hideAll()
			}
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const value: NavbarContextType = {
		showSearch,
		toggleSearch,
		showMenu,
		toggleMenu,
		showAuth,
		toggleAuth,
		hideAll,
		hideMenuAndAuth,
	}

	return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
}
