"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/activities", label: "Activities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-bg/80 backdrop-blur-md border-b border-border py-4" 
        : "bg-transparent border-b border-transparent py-6"
    }`}>
      <div className="mx-auto flex items-center justify-between px-6 md:px-12 max-w-7xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-black text-base tracking-tight text-fg uppercase leading-none">
            Go Vertical<br/>
            <span className="text-accent font-bold text-xs tracking-widest normal-case">Experience</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-fg-muted hover:text-fg text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: dark mode toggle + CTA */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:border-accent text-fg-muted hover:text-accent transition-all duration-200"
          >
            {theme === "dark" ? (
              /* Sun icon */
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              /* Moon icon */
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-accent hover:bg-accent-h text-white font-bold text-sm rounded-full transition-colors duration-200"
          >
            Get in Touch
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden text-fg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg border-t border-border px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-fg-muted hover:text-fg text-sm font-medium uppercase tracking-wide transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center px-5 py-2.5 bg-accent hover:bg-accent-h text-white font-bold text-sm rounded-full transition-colors"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
