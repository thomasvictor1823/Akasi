"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, MapPin, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { sampleProducts } from "@/lib/data"
import ProductCard from "@/components/ProductCard" // Import ProductCard component

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = sampleProducts.find((p) => p.id === params.id) || sampleProducts[0]
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const relatedProducts = sampleProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? "border-orange-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-600">({product.reviewCount} reviews)</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{product.stockCount} in stock</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Store Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{product.storeName}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{product.location}</span>
                  </div>
                </div>
                <Link href={`/store/${product.storeId}`}>
                  <Button variant="outline" size="sm">
                    Visit Store
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">{product.stockCount} available</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button variant="outline" className="w-full" size="lg">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <div className="text-sm font-medium">Free Shipping</div>
                <div className="text-xs text-gray-600">Orders over Rp 500k</div>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <div className="text-sm font-medium">Secure Payment</div>
                <div className="text-xs text-gray-600">100% protected</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <div className="text-sm font-medium">Easy Returns</div>
                <div className="text-xs text-gray-600">30-day policy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <div className="mt-6">
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>High-precision optical sensor</li>
                  <li>Customizable RGB lighting</li>
                  <li>Ergonomic design for extended gaming sessions</li>
                  <li>Programmable buttons</li>
                  <li>Compatible with Windows and Mac</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">Brand</span>
                    <span className="text-gray-600">Fantech</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">Model</span>
                    <span className="text-gray-600">VENOM II VX3</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">Sensor Type</span>
                    <span className="text-gray-600">Optical</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">DPI</span>
                    <span className="text-gray-600">Up to 12,000</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">Connection</span>
                    <span className="text-gray-600">USB Wired</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">Cable Length</span>
                    <span className="text-gray-600">1.8m</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">Weight</span>
                    <span className="text-gray-600">95g</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">Warranty</span>
                    <span className="text-gray-600">1 Year</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
              <div className="text-center py-12">
                <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h4>
                <p className="text-gray-600 mb-4">Be the first to review this product!</p>
                <Button className="bg-orange-600 hover:bg-orange-700">Write a Review</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
