import { createContext } from 'react'

export interface NavbarContextType {
	showSearch: boolean
	toggleSearch: () => void
	showMenu: boolean
	toggleMenu: () => void
	showAuth: boolean
	toggleAuth: () => void
	hideAll: () => void
	hideMenuAndAuth: () => void
}

export const NavbarContext = createContext<NavbarContextType | undefined>(undefined)
