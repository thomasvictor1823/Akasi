import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, ShoppingCart, Heart, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { formatCompactPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  showCompare?: boolean
}

export default function ProductCard({ product, showCompare = false }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 group relative">
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

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col space-y-1">
            <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
            {showCompare && (
              <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Quick Buy */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm">
            Quick Buy
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2 hover:text-green-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mt-2 space-x-1 mb-2">
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

        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">{formatCompactPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatCompactPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.bulkPricing && product.bulkPricing.length > 0 && (
            <div className="text-xs text-green-600">
              Bulk: {formatCompactPrice(product.bulkPricing[0].price)} for {product.bulkPricing[0].minQuantity}+
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
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
          <Link href={`/store/${product.storeId}`} className="text-xs text-green-600 hover:underline mb-2 block">
            {product.storeName}
          </Link>
        )}

        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
