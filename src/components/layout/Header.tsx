"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
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

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initialize state
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 transition-[background-color,border-color] duration-500 border-b will-change-transform",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
                    : "bg-transparent border-transparent"
            )}
        >
            <nav className="max-w-4xl w-full flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    PORTFOLIO<span className="text-primary text-2xl">.</span>
                </Link>
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
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button variant="default" size="sm" className="hidden sm:inline-flex rounded-full px-6">
                        Hire Me
                    </Button>
                </div>
            </nav>
        </header>
    )
}
