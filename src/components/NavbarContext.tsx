import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface NavbarContextType {
	showSearch: boolean
	setShowSearch: (value: boolean) => void
	showMenu: boolean
	setShowMenu: (value: boolean) => void
	showAuth: boolean
	setShowAuth: (value: boolean) => void
	hideAll: () => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
	const [showSearch, setShowSearch] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [showAuth, setShowAuth] = useState(false)
	const location = useLocation() // 🔥 Wykrywamy zmianę URL

	// Funkcja do zamykania wszystkich elementów
	const hideAll = () => {
		setShowSearch(false)
		setShowMenu(false)
		setShowAuth(false)
	}

	// Zamykanie wszystkiego przy każdej zmianie strony
	useEffect(() => {
		hideAll()
	}, [location.pathname]) // 🔥 Każda zmiana URL zamyka dropdowny

	return (
		<NavbarContext.Provider
			value={{ showSearch, setShowSearch, showMenu, setShowMenu, showAuth, setShowAuth, hideAll }}>
			{children}
		</NavbarContext.Provider>
	)
}

export const useNavbar = () => {
	const context = useContext(NavbarContext)
	if (!context) {
		throw new Error('useNavbar must be used within a NavbarProvider')
	}
	return context
}
