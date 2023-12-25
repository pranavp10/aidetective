'use client'
import { usePathname } from "next/navigation"

const removeHeader = ['/login', '/admin/dashboard', '/submit', '/search', '/tool']

const useShowNavbar = (): boolean => {
    const pathname = usePathname()
    return !removeHeader.some((path) => pathname.includes(path))
}

export default useShowNavbar
