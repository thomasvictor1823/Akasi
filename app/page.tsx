import Header from "@/components/header"
import CategoryGrid from "@/components/category-grid"
import FlashDeals from "@/components/flash-deals"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Star, Shield, Truck, RotateCcw } from "lucide-react"
import { sampleProducts } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredProducts = sampleProducts.slice(0, 8)
  const trendingProducts = sampleProducts.slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 mb-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Welcome to Akasi Marketplace</h1>
              <p className="text-xl mb-6 text-green-100">
                Discover amazing products from local sellers and businesses across Malawi
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                  Start Shopping
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-green-600 hover:bg-white hover:text-green-600 w-full sm:w-auto"
                >
                  Become a Seller
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/akasi-logo.png"
                alt="Akasi Marketplace"
                width={300}
                height={300}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <Truck className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <h3 className="font-medium">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over MWK 50,000</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <Shield className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <h3 className="font-medium">Secure Payment</h3>
            <p className="text-sm text-gray-600">100% protected transactions</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <RotateCcw className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <h3 className="font-medium">Easy Returns</h3>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <Star className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <h3 className="font-medium">Quality Assured</h3>
            <p className="text-sm text-gray-600">Verified sellers only</p>
          </div>
        </div>

        {/* Flash Deals */}
        <div className="mb-8">
          <FlashDeals />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <CategoryGrid />
        </div>

        {/* Trending Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <Link href="/trending">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showCompare />
            ))}
          </div>
        </div>

        {/* Business Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Grow Your Business with Akasi</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of successful sellers on Malawi's leading marketplace. Reach customers nationwide and
                grow your business with our powerful tools.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Easy product listing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Marketing tools & analytics</span>
                </div>
              </div>
              <Link href="/sell">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Selling Today
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-lg p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
                <div className="text-gray-600 mb-4">Active Sellers</div>
                <div className="text-4xl font-bold text-orange-600 mb-2">50,000+</div>
                <div className="text-gray-600 mb-4">Products Listed</div>
                <div className="text-4xl font-bold text-green-600 mb-2">100,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
