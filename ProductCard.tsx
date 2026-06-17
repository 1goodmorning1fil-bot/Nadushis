'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useCart, useFavorites } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  slug: string
  price: number | string
  comparePrice?: number | string | null
  images: string[]
  volume: number[]
  brand: { name: string; slug: string }
  category: { name: string }
  gender: string
  concentration: string
  rating: number | string
  reviewCount: number
  newArrival?: boolean
  bestseller?: boolean
  inStock: boolean
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const { toggle, has } = useFavorites()
  const isFav = has(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    add({
      id: product.id,
      name: product.name,
      brand: product.brand.name,
      price: Number(product.price),
      image: product.images[0] ?? '',
      volume: product.volume[0] ?? 50,
      qty: 1,
      slug: product.slug,
    })
    toast.success(`${product.name} добавлен в корзину`)
  }

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    toggle({
      id: product.id,
      name: product.name,
      brand: product.brand.name,
      price: Number(product.price),
      image: product.images[0] ?? '',
      slug: product.slug,
    })
  }

  const rating = Number(product.rating)
  const stars = Math.round(rating)

  return (
    <Link href={`/shop/product/${product.slug}`}>
      <div className="luxury-card group cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ background: '#F5EDDC', aspectRatio: '3/4' }}>
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EBE0C8, #DFD1B0)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: '#C9A96E', opacity: 0.4 }}>ND</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.newArrival && (
              <span style={{ background: '#1E6B5E', color: '#F5EDDC', fontSize: '9px', fontFamily: 'var(--font-body)', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px' }}>
                Новинка
              </span>
            )}
            {product.bestseller && (
              <span style={{ background: '#C9A96E', color: 'white', fontSize: '9px', fontFamily: 'var(--font-body)', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px' }}>
                Хит
              </span>
            )}
            {!product.inStock && (
              <span style={{ background: '#999', color: 'white', fontSize: '9px', fontFamily: 'var(--font-body)', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px' }}>
                Нет в наличии
              </span>
            )}
          </div>

          {/* Fav button */}
          <button
            onClick={handleToggleFav}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all"
            style={{ background: 'rgba(245, 237, 220, 0.9)', opacity: 0, transition: 'opacity 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => !isFav && (e.currentTarget.style.opacity = '0')}
            ref={el => el && (isFav ? (el.style.opacity = '1') : null)}
          >
            <Heart size={14} color="#1E6B5E" fill={isFav ? '#1E6B5E' : 'none'} />
          </button>

          {/* Hover overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: 'linear-gradient(to top, rgba(30,107,94,0.95), transparent)', transform: 'translateY(8px)' }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(0)') }
          >
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-2.5 text-xs tracking-widest uppercase transition-all"
              style={{ background: product.inStock ? '#F5EDDC' : 'rgba(245,237,220,0.5)', color: '#1E6B5E', fontFamily: 'var(--font-body)', border: 'none', cursor: product.inStock ? 'pointer' : 'not-allowed', fontWeight: 500 }}
            >
              {product.inStock ? '+ В корзину' : 'Нет в наличии'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '4px' }}>
            {product.brand.name}
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 500, color: '#1A1A1A', lineHeight: '1.3', marginBottom: '8px', flex: 1 }}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array(5).fill(0).map((_, i) => (
              <span key={i} style={{ fontSize: '10px', color: i < stars ? '#C9A96E' : '#ddd' }}>★</span>
            ))}
            {product.reviewCount > 0 && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(26,26,26,0.4)', marginLeft: '4px' }}>
                ({product.reviewCount})
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: '#1E6B5E' }}>
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && Number(product.comparePrice) > Number(product.price) && (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(26,26,26,0.4)', textDecoration: 'line-through' }}>
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Volumes */}
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.volume.map(v => (
              <span key={v} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(26,26,26,0.5)', border: '1px solid rgba(201,169,110,0.3)', padding: '1px 6px' }}>
                {v}ml
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
