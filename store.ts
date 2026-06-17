'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  volume: number
  qty: number
  slug: string
}

export interface FavoriteItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  slug: string
}

interface CartStore {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (id: string, volume: number) => void
  update: (id: string, volume: number, qty: number) => void
  clear: () => void
  total: () => number
  count: () => number
}

interface FavoriteStore {
  items: FavoriteItem[]
  toggle: (item: FavoriteItem) => void
  has: (id: string) => boolean
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        set(state => {
          const existing = state.items.find(i => i.id === item.id && i.volume === item.volume)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id && i.volume === item.volume
                  ? { ...i, qty: i.qty + item.qty }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },
      remove: (id, volume) =>
        set(state => ({ items: state.items.filter(i => !(i.id === id && i.volume === volume)) })),
      update: (id, volume, qty) =>
        set(state => ({
          items: state.items.map(i =>
            i.id === id && i.volume === volume ? { ...i, qty } : i
          ),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'nadushis-cart' }
  )
)

export const useFavorites = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => {
        const exists = get().items.find(i => i.id === item.id)
        if (exists) {
          set(state => ({ items: state.items.filter(i => i.id !== item.id) }))
        } else {
          set(state => ({ items: [...state.items, item] }))
        }
      },
      has: (id) => get().items.some(i => i.id === id),
    }),
    { name: 'nadushis-favorites' }
  )
)
