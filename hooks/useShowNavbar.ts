'use client'
import { usePathname } from "next/navigation"

const removeHeader = ['/login']

const useShowNavbar = (): boolean => {
 const pathname = usePathname()
 return !removeHeader.includes(pathname)
}

export default useShowNavbar
