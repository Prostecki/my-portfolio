"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
]

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [menuOpen, setMenuOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    React.useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [menuOpen])

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 transition-[background-color,border-color] duration-500 border-b",
                    isScrolled || menuOpen
                        ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
                        : "bg-transparent border-transparent"
                )}
            >
                <nav className="max-w-4xl w-full flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tighter" onClick={() => setMenuOpen(false)}>
                        PORTFOLIO<span className="text-primary text-2xl">.</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium hover:text-primary transition-colors opacity-70 hover:opacity-100"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <Button variant="default" size="sm" className="hidden sm:inline-flex rounded-full px-6" asChild>
                            <a href="#contact">Hire Me</a>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden rounded-full"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                        >
                            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </nav>
            </header>

            {/* Mobile menu overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 md:hidden flex flex-col pt-[73px] transition-all duration-300",
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
                <nav className="relative flex flex-col items-center justify-center flex-1 gap-2 px-6">
                    {navItems.map((item, i) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                                "w-full text-center text-2xl font-bold tracking-tighter py-4 border-b border-border/30 opacity-70 hover:opacity-100 hover:text-primary transition-all duration-200",
                                menuOpen ? "translate-y-0 opacity-70" : "translate-y-4 opacity-0",
                            )}
                            style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button variant="default" size="lg" className="mt-8 rounded-full px-12 w-full sm:hidden" asChild>
                        <a href="#contact" onClick={() => setMenuOpen(false)}>Hire Me</a>
                    </Button>
                </nav>
            </div>
        </>
    )
}
