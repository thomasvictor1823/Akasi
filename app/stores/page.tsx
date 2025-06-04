import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Package, Users, Verified, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { sampleStores } from "@/lib/data"

export default function StoresPage() {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Featured Stores</h1>
          <p className="text-gray-600">Discover amazing stores and their products</p>
        </div>

        {/* Store Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default" className="bg-orange-600 hover:bg-orange-700">
              All Stores
            </Badge>
            <Badge variant="outline">Electronics</Badge>
            <Badge variant="outline">Fashion</Badge>
            <Badge variant="outline">Home & Garden</Badge>
            <Badge variant="outline">Sports</Badge>
            <Badge variant="outline">Books</Badge>
            <Badge variant="outline">Beauty</Badge>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Store Banner */}
              <div className="relative h-32 bg-gradient-to-r from-orange-400 to-orange-600">
                {store.banner && (
                  <Image
                    src={store.banner || "/placeholder.svg"}
                    alt={`${store.name} banner`}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute top-4 right-4">
                  {store.isVerified && (
                    <Badge className="bg-green-600 text-white">
                      <Verified className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>

              {/* Store Info */}
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative -mt-8">
                    <Image
                      src={store.logo || "/placeholder.svg?height=80&width=80"}
                      alt={store.name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-white bg-white"
                    />
                  </div>
                  <div className="flex-1 mt-2">
                    <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(store.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {store.rating} ({formatNumber(store.reviewCount)} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{store.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{store.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{formatNumber(store.productCount)} products</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{formatNumber(store.reviewCount)} followers</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {store.categories.map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Link href={`/store/${store.id}`} className="flex-1">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Visit Store</Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg">
            Load More Stores
          </Button>
        </div>
      </div>
    </div>
  )
}
