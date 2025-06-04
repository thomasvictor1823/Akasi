"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, FlameIcon as Fire, Zap, Gift } from "lucide-react"
import { flashDeals, sampleProducts } from "@/lib/data"
import { formatCompactPrice, getTimeRemaining } from "@/lib/utils"
import Image from "next/image"

export default function DealsPage() {
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
    const interval = setInterval(updateTimer, 60000)

    return () => clearInterval(interval)
  }, [])

  const dealProducts = sampleProducts.filter((product) =>
    flashDeals.some((deal) => deal.productIds.includes(product.id)),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-lg p-8 mb-8 text-white">
          <div className="text-center">
            <Fire className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Flash Deals & Special Offers</h1>
            <p className="text-xl text-orange-100 mb-6">Limited time deals with incredible savings - Don't miss out!</p>
            <div className="flex justify-center space-x-6 text-center">
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-orange-200">Active Deals</div>
              </div>
              <div>
                <div className="text-3xl font-bold">70%</div>
                <div className="text-orange-200">Max Discount</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24h</div>
                <div className="text-orange-200">Limited Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <Zap className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Lightning Deals</h3>
            <p className="text-gray-600 text-sm mb-4">Limited quantity, limited time</p>
            <Badge className="bg-yellow-100 text-yellow-800">Ending Soon</Badge>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <Gift className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Daily Deals</h3>
            <p className="text-gray-600 text-sm mb-4">New deals every day</p>
            <Badge className="bg-green-100 text-green-800">Fresh Today</Badge>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <Fire className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Hot Deals</h3>
            <p className="text-gray-600 text-sm mb-4">Trending products on sale</p>
            <Badge className="bg-red-100 text-red-800">Trending</Badge>
          </div>
        </div>

        {/* Active Flash Deals */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Fire className="h-6 w-6 text-orange-500 mr-2" />
            Active Flash Deals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashDeals.map((deal) => {
              const dealProducts = sampleProducts.filter((product) => deal.productIds.includes(product.id))

              return dealProducts.map((product) => (
                <div
                  key={`${deal.id}-${product.id}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white text-lg px-3 py-1">
                      -{deal.discountPercentage}% OFF
                    </Badge>
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {timeRemaining[deal.id] || "Loading..."}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>

                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl font-bold text-orange-600">
                        {formatCompactPrice(product.price * (1 - deal.discountPercentage / 100))}
                      </span>
                      <span className="text-lg text-gray-500 line-through">{formatCompactPrice(product.price)}</span>
                      <Badge className="bg-green-100 text-green-800">
                        Save {formatCompactPrice(product.price * (deal.discountPercentage / 100))}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Sold: {deal.usedQuantity}</span>
                        <span>Available: {(deal.maxQuantity || 0) - deal.usedQuantity}</span>
                      </div>
                      <Progress value={(deal.usedQuantity / (deal.maxQuantity || 1)) * 100} className="h-3" />
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round((deal.usedQuantity / (deal.maxQuantity || 1)) * 100)}% claimed
                      </div>
                    </div>

                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="lg">
                      Claim Deal Now
                    </Button>
                  </div>
                </div>
              ))
            })}
          </div>
        </div>

        {/* Deal Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All Deal Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-green-100 mb-6">
            Subscribe to our newsletter and be the first to know about flash deals and special offers
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
            <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded-lg text-gray-900" />
            <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
