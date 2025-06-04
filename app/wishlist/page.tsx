"use client"

import { useState } from "react"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Share2, ShoppingCart, Trash2, Filter, Grid3X3, List } from "lucide-react"
import { sampleProducts } from "@/lib/data"
import Link from "next/link"

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("date-added")

  // Simulate wishlist items (first 6 products)
  const wishlistItems = sampleProducts.slice(0, 6).map((product) => ({
    ...product,
    dateAdded: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
  }))

  const handleRemoveFromWishlist = (productId: string) => {
    // Handle remove from wishlist
    console.log("Remove from wishlist:", productId)
  }

  const handleAddToCart = (productId: string) => {
    // Handle add to cart
    console.log("Add to cart:", productId)
  }

  const handleShareWishlist = () => {
    // Handle share wishlist
    console.log("Share wishlist")
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Heart className="h-24 w-24 mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon. We'll keep them safe here for you.
            </p>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleShareWishlist}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Wishlist
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Badge variant="outline">{wishlistItems.length} items</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-added">Date Added</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-green-50 text-green-600" : ""}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-green-50 text-green-600" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="relative">
                <ProductCard product={item} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>

                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-xl font-bold text-gray-900">
                        {new Intl.NumberFormat("en-MW", {
                          style: "currency",
                          currency: "MWK",
                          minimumFractionDigits: 0,
                        }).format(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {new Intl.NumberFormat("en-MW", {
                            style: "currency",
                            currency: "MWK",
                            minimumFractionDigits: 0,
                          }).format(item.originalPrice)}
                        </span>
                      )}
                      {item.discount && <Badge className="bg-red-100 text-red-800">-{item.discount}%</Badge>}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Added {item.dateAdded.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{item.storeName}</span>
                      <span>•</span>
                      <span className={item.inStock ? "text-green-600" : "text-red-600"}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAddToCart(item.id)}
                      disabled={!item.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.slice(6, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
