import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Header />

      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>

      <footer className="py-12 border-t border-muted text-center text-muted-foreground bg-muted/10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">
            © 2026 Mark Taratynov. Created based on modern web standards.
          </p>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Telegram</a>
          </div>
        </div>
      </footer>

      {/* Optimized Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--primary-rgb),0.05)_0%,transparent_40%),radial-gradient(circle_at_80%_80%,rgba(var(--primary-rgb),0.03)_0%,transparent_40%)]" />
    </main>
  )
}
