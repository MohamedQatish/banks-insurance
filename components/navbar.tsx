'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Moon, Sun, Menu, X, Search } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

// قمنا بتبسيط الروابط لتصبح مباشرة وموجهة بدون قوائم منسدلة معقدة
const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الأخبار', href: '/news' },
  { label: 'قرارات وتعاميم', href: '/news?category=قرارات' },
  { label: 'عن المجلة', href: '/about' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: '#060e1a',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(0,0,0,0.6)'
          : '0 2px 12px rgba(0,0,0,0.35)',
        borderBottom: '2.5px solid #c9a227',
      }}
    >
      {/* Top micro-bar */}
      <div
        className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-1.5 text-xs"
        style={{ borderBottom: '1px solid rgba(201,162,39,0.1)', color: 'rgba(201,162,39,0.55)' }}
      >
        <span>مجلة متخصصة في القطاع المصرفي والمالي وشركات التأمين في سوريا والعالم العربي</span>
        <time style={{ color: 'rgba(255,255,255,0.3)' }}>
          {new Date().toLocaleDateString('ar-SY', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>

      {/* Main nav row */}
      <nav
        className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-6"
        aria-label="التنقل الرئيسي"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="الرئيسية">
          <div className="relative w-14 h-14 shrink-0">
            <Image
              src="/logo.png"
              alt="مجلة المصارف والتأمين"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <p
              className="text-xs font-light tracking-widest"
              style={{ color: 'rgba(201,162,39,0.65)', letterSpacing: '0.14em' }}
            >
              مجلة متخصصة
            </p>
            <h1 className="text-lg font-bold leading-tight text-white">
              المصارف والتأمين
            </h1>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-0" role="menubar">
          {navLinks.map((link) => (
            <li key={link.label} role="none" className="relative">
              <Link
                href={link.href}
                role="menuitem"
                className="relative flex items-center gap-1 px-4 py-2.5 text-sm font-semibold transition-all duration-200 group"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded"
                  style={{ background: 'rgba(201,162,39,0.09)' }}
                  aria-hidden="true"
                />
                <span className="relative z-10 group-hover:text-white transition-colors">{link.label}</span>
                <span
                  className="absolute bottom-0 right-3 left-3 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-right"
                  style={{ background: '#c9a227' }}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Search */}
          <div className="relative hidden sm:flex items-center">
            {searchOpen ? (
              <input
                type="search"
                placeholder="ابحث في المجلة..."
                autoFocus
                className="text-sm px-3 py-1.5 rounded-lg outline-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(201,162,39,0.4)',
                  color: '#ffffff',
                  width: '200px',
                }}
                onBlur={() => setSearchOpen(false)}
                aria-label="بحث"
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-lg transition-colors hover:bg-white/6"
                style={{ color: 'rgba(201,162,39,0.8)' }}
                aria-label="فتح البحث"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
            className="p-2.5 rounded-lg transition-all duration-300 hover:bg-white/6"
            style={{ color: 'rgba(201,162,39,0.8)' }}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="transition-transform duration-300" />
            ) : (
              <Moon size={18} className="transition-transform duration-300" />
            )}
          </button>

          {/* Mobile menu */}
          <button
            className="lg:hidden p-2.5 rounded-lg transition-colors hover:bg-white/6"
            aria-label="القائمة"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav
          className="lg:hidden px-4 pb-5 flex flex-col gap-0.5"
          aria-label="القائمة الجوالة"
          style={{ borderTop: '1px solid rgba(201,162,39,0.12)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-3 text-sm font-semibold rounded-lg transition-colors hover:bg-white/5"
              style={{ color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(201,162,39,0.07)' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}