import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-MW", {
    style: "currency",
    currency: "MWK",
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatCompactPrice(price: number): string {
  if (price >= 1000000) {
    return `MWK ${(price / 1000000).toFixed(1)}M`
  } else if (price >= 1000) {
    return `MWK ${(price / 1000).toFixed(0)}K`
  }
  return formatPrice(price)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function calculateDiscountedPrice(originalPrice: number, discount: number): number {
  return originalPrice - (originalPrice * discount) / 100
}

export function getTimeRemaining(endDate: Date): string {
  const now = new Date().getTime()
  const end = endDate.getTime()
  const difference = end - now

  if (difference <= 0) return "Expired"

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}
