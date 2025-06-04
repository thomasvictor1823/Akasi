"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, FlameIcon as Fire } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { flashDeals, sampleProducts } from "@/lib/data"
import { formatCompactPrice, getTimeRemaining } from "@/lib/utils"

export default function FlashDeals() {
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({})

  useEffect(() => {
    const updateTimer = () => {
      const newTimeRemaining: Record<string, string> = {}
      flashDeals.forEach((deal) => {
        newTimeRemaining[deal.id] = getTimeRemaining(deal.endDate)
      })
      setTimeRemaining(newTimeRemaining)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Fire className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Flash Deals</h2>
            <p className="text-orange-100">Limited time offers</p>
          </div>
        </div>
        <Link href="/deals">
          <Button variant="outline" className="bg-white text-orange-600 hover:bg-orange-50">
            View All Deals
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashDeals.map((deal) => {
          const dealProducts = sampleProducts.filter((product) => deal.productIds.includes(product.id))

          return dealProducts.map((product) => (
            <div key={`${deal.id}-${product.id}`} className="bg-white rounded-lg p-4 text-gray-900">
              <div className="relative mb-3">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover rounded"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{deal.discountPercentage}%</Badge>
              </div>

              <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-bold text-orange-600">
                  {formatCompactPrice(product.price * (1 - deal.discountPercentage / 100))}
                </span>
                <span className="text-sm text-gray-500 line-through">{formatCompactPrice(product.price)}</span>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Sold: {deal.usedQuantity}</span>
                  <span>Available: {(deal.maxQuantity || 0) - deal.usedQuantity}</span>
                </div>
                <Progress value={(deal.usedQuantity / (deal.maxQuantity || 1)) * 100} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>{timeRemaining[deal.id] || "Loading..."}</span>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Buy Now
                </Button>
              </div>
            </div>
          ))
        })}
      </div>
    </div>
  )
}
