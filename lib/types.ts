export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  category: string
  subcategory?: string
  categories: string[] // Multiple categories support
  condition: "new" | "used" | "refurbished"
  rating: number
  reviewCount: number
  sellerId: string
  sellerName: string
  sellerType: "individual" | "business"
  storeId?: string
  storeName?: string
  location: string
  inStock: boolean
  stockCount: number
  tags: string[]
  variants?: ProductVariant[]
  specifications?: Record<string, string>
  minOrderQuantity?: number
  bulkPricing?: BulkPricing[]
  shippingInfo?: ShippingInfo
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  priceAdjustment?: number
  stockCount: number
}

export interface BulkPricing {
  minQuantity: number
  price: number
  discount: number
}

export interface ShippingInfo {
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  freeShippingThreshold?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  parentId?: string
  subcategories?: Category[]
  productCount: number
  featured: boolean
}

export interface Store {
  id: string
  name: string
  description: string
  logo?: string
  banner?: string
  ownerId: string
  ownerName: string
  rating: number
  reviewCount: number
  productCount: number
  location: string
  isVerified: boolean
  categories: string[]
  businessType: "individual" | "small_business" | "enterprise"
  establishedYear?: number
  responseTime?: string
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  type: "individual" | "business"
  storeId?: string
  location: string
  phone?: string
  verified: boolean
  createdAt: Date
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedVariants?: Record<string, string>
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  paymentMethod: string
  shippingAddress: Address
  trackingNumber?: string
  createdAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  images?: string[]
  verified: boolean
  createdAt: Date
}

export interface Deal {
  id: string
  title: string
  description: string
  productIds: string[]
  discountPercentage: number
  startDate: Date
  endDate: Date
  maxQuantity?: number
  usedQuantity: number
}
