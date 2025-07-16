"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import DarkModeToggle from "./dark-mode-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect for backdrop blur and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const solutionsItems = [
    { name: "Zaza Promptly", href: "/zaza-promptly", description: "AI-powered feedback generation" },
    { name: "Zaza Teach", href: "/zaza-teach", description: "Comprehensive teaching platform" },
    { name: "Zaza Study", href: "/zaza-study", description: "Student learning companion", comingSoon: true },
    { name: "Zaza Visuals", href: "/zaza-visuals", description: "Visual learning tools", comingSoon: true },
    { name: "Zaza Coach", href: "/zaza-coach", description: "Personalized coaching platform", comingSoon: true },
    { name: "Zaza ClarityDeck", href: "/zaza-claritydeck", description: "Clear presentation tools", comingSoon: true },
    { name: "Zaza Schwoop", href: "/zaza-schwoop", description: "Interactive learning experiences", comingSoon: true },
    { name: "Zaza HR Spark", href: "/zaza-hr-spark", description: "HR management solutions", comingSoon: true },
  ]

  const learningItems = [
    { name: "Blog", href: "/blog", description: "Latest insights and updates" },
    { name: "Free Resources", href: "/resources", description: "Educational materials and guides" },
    { name: "FAQs", href: "/faqs", description: "Frequently asked questions" },
    { name: "Privacy & Data Policy", href: "/privacy-policy", description: "Our commitment to your privacy" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 🟩 Left Section - Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded-md"
            >
              <img src="/logo.png" alt="Zaza Technologies" className="h-8 w-8 dark:brightness-110" />
              <span className="text-xl font-bold text-gray-900 dark:text-white font-sans tracking-tight">
                Zaza Technologies
              </span>
            </a>
          </div>

          {/* 🟦 Center Section - Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {/* Our Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("solutions")}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Our Solutions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Our Solutions</h3>
                  </div>
                  {solutionsItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                        </div>
                        {item.comingSoon && (
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                  <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                    <a
                      href="/products"
                      className="block px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      See All Products →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Learning Centre Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("learning")}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Learning Centre
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === "learning" && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Learning Centre</h3>
                  </div>
                  {learningItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Regular Navigation Items */}
            <a
              href="/about"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Contact
            </a>
            <a
              href="/vision"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Vision & Mission
            </a>
          </nav>

          {/* 🟨 Right Section - CTA Buttons + Dark Mode Toggle (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              asChild
              className="bg-gradient-to-r from-[#e879f9] to-[#8b5cf6] hover:from-[#d946ef] hover:to-[#7c3aed] text-white font-semibold px-5 py-2 rounded-full text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <a href="/zaza-promptly">Try Zaza Promptly</a>
            </Button>
            <Button
              asChild
              className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold px-5 py-2 rounded-full text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <a href="/zaza-teach">Try Zaza Teach</a>
            </Button>
            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg max-h-screen overflow-y-auto">
            {/* Mobile Solutions Section */}
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Our Solutions
              </div>
              {solutionsItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  {item.comingSoon && (
                    <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                </a>
              ))}
              <a
                href="/products"
                className="block px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                See All Products →
              </a>
            </div>

            {/* Mobile Learning Centre Section */}
            <div className="py-2 border-t border-gray-200 dark:border-gray-700">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Learning Centre
              </div>
              {learningItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Regular Links */}
            <div className="py-2 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="/vision"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Vision & Mission
              </a>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <div className="px-3 space-y-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#e879f9] to-[#8b5cf6] hover:from-[#d946ef] hover:to-[#7c3aed] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a href="/zaza-promptly">Try Zaza Promptly</a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a href="/zaza-teach">Try Zaza Teach</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
