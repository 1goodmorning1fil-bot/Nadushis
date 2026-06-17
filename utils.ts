import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(Number(price))
}

export function formatConcentration(c: string): string {
  const map: Record<string, string> = {
    PARFUM: 'Parfum',
    EAU_DE_PARFUM: 'Eau de Parfum',
    EAU_DE_TOILETTE: 'Eau de Toilette',
    EAU_DE_COLOGNE: 'Eau de Cologne',
    EAU_FRAICHE: 'Eau Fraîche',
  }
  return map[c] ?? c
}

export function formatGender(g: string): string {
  const map: Record<string, string> = {
    MALE: 'Для него',
    FEMALE: 'Для неё',
    UNISEX: 'Унисекс',
  }
  return map[g] ?? g
}
