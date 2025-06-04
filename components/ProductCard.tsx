import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatCompactPrice = (price: number) => {
    if (price >= 1000000) {
      return `Rp ${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `Rp ${(price / 1000).toFixed(0)}K`
    }
    return formatPrice(price)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 group">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </Link>
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mt-2 space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">{formatCompactPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatCompactPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            <span>{product.location}</span>
          </div>
          {product.sellerType === "business" && (
            <Badge variant="outline" className="text-xs">
              Store
            </Badge>
          )}
        </div>

        {product.storeName && (
          <Link href={`/store/${product.storeId}`} className="text-xs text-orange-600 hover:underline mt-1 block">
            {product.storeName}
          </Link>
        )}

        <Button className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
