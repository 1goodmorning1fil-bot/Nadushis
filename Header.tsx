'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart, useFavorites } from '@/lib/store'
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function Header() {
  const { count } = useCart()
  const { items: favs } = useFavorites()
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { label: 'Каталог', href: '/shop/catalog' },
    { label: 'Бренды', href: '/shop/brands' },
    { label: 'Новинки', href: '/shop/catalog?new=true' },
    { label: 'О нас', href: '/shop/about' },
  ]

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(245, 237, 220, 0.95)' : '#F5EDDC',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: '1px solid rgba(201, 169, 110, 0.25)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Mobile menu */}
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} color="#1E6B5E" /> : <Menu size={22} color="#1E6B5E" />}
          </button>

          {/* Nav left */}
          <nav className="hidden lg:flex items-center gap-8">
            {nav.slice(0, 2).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-widest uppercase transition-colors"
                style={{ color: '#1A1A1A', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1E6B5E')}
                onMouseLeave={e => (e.currentTarget.style.color = '#1A1A1A')}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/shop" className="flex-shrink-0">
            <div className="flex flex-col items-center">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: '#1E6B5E', letterSpacing: '0.05em', lineHeight: 1 }}>
                На Душись
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.3em', color: '#C9A96E', textTransform: 'uppercase', marginTop: '2px' }}>
                Парфюмерный Дом
              </span>
            </div>
          </Link>

          {/* Nav right */}
          <nav className="hidden lg:flex items-center gap-8">
            {nav.slice(2).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-widest uppercase transition-colors"
                style={{ color: '#1A1A1A', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1E6B5E')}
                onMouseLeave={e => (e.currentTarget.style.color = '#1A1A1A')}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button onClick={() => setSearchOpen(!searchOpen)} className="transition-opacity hover:opacity-60">
              <Search size={20} color="#1E6B5E" />
            </button>

            {session?.user && (session.user as any).role === 'ADMIN' && (
              <Link href="/admin" className="text-xs tracking-widest uppercase" style={{ color: '#C9A96E', fontFamily: 'var(--font-body)' }}>
                Админ
              </Link>
            )}

            <Link href="/shop/favorites" className="relative transition-opacity hover:opacity-60">
              <Heart size={20} color="#1E6B5E" fill={favs.length > 0 ? '#1E6B5E' : 'none'} />
              {favs.length > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full" style={{ background: '#C9A96E', fontSize: '10px' }}>
                  {favs.length}
                </span>
              )}
            </Link>

            <Link href="/shop/cart" className="relative transition-opacity hover:opacity-60">
              <ShoppingBag size={20} color="#1E6B5E" />
              {count() > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full" style={{ background: '#1E6B5E', fontSize: '10px' }}>
                  {count()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t" style={{ borderColor: 'rgba(201, 169, 110, 0.25)', background: '#F5EDDC' }}>
            <div className="max-w-2xl mx-auto px-6 py-4 flex gap-3">
              <input
                autoFocus
                type="text"
                placeholder="Поиск по аромату, бренду, нотам..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/shop/catalog?search=${encodeURIComponent(searchQuery)}`
                  }
                }}
                className="input-luxury flex-1"
              />
              <button
                className="btn-primary text-xs"
                onClick={() => {
                  if (searchQuery.trim()) window.location.href = `/shop/catalog?search=${encodeURIComponent(searchQuery)}`
                }}
              >
                Найти
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: '#F5EDDC' }}>
          <div className="p-6 pt-24 flex flex-col gap-6">
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#1E6B5E' }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(201, 169, 110, 0.3)' }}>
              <Link href="/shop/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                <ShoppingBag size={20} color="#C9A96E" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1A1A1A' }}>Корзина ({count()})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
