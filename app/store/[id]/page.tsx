import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Package, Users, Verified, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import { sampleStores, sampleProducts } from "@/lib/data"

export default function StorePage({ params }: { params: { id: string } }) {
  const store = sampleStores.find((s) => s.id === params.id) || sampleStores[0]
  const storeProducts = sampleProducts.filter((p) => p.storeId === store.id)

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
        {/* Store Header */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          {/* Store Banner */}
          <div className="relative h-48 bg-gradient-to-r from-orange-400 to-orange-600">
            {store.banner && (
              <Image
                src={store.banner || "/placeholder.svg"}
                alt={`${store.name} banner`}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Store Info */}
          <div className="p-6">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative -mt-16">
                <Image
                  src={store.logo || "/placeholder.svg?height=120&width=120"}
                  alt={store.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white bg-white"
                />
              </div>
              <div className="flex-1 mt-4">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
                  {store.isVerified && (
                    <Badge className="bg-green-600 text-white">
                      <Verified className="h-4 w-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(store.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{store.rating}</span>
                  <span className="text-gray-600">({formatNumber(store.reviewCount)} reviews)</span>
                </div>

                <p className="text-gray-600 mb-4 max-w-2xl">{store.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{store.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4" />
                    <span>{formatNumber(store.productCount)} products</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{formatNumber(store.reviewCount)} followers</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Heart className="h-4 w-4 mr-2" />
                    Follow Store
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="products">Products ({storeProducts.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({store.reviewCount})</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {storeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {storeProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-600">This store hasn't added any products yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="about">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">About {store.name}</h3>
              <p className="text-gray-600 mb-6">{store.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Store Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Location: {store.location}</div>
                    <div>Joined: {store.createdAt.toLocaleDateString()}</div>
                    <div>Products: {store.productCount}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {store.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
              <div className="text-center py-12">
                <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h4>
                <p className="text-gray-600">Be the first to review this store!</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="policies">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">Store Policies</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Shipping Policy</h4>
                  <p className="text-gray-600 text-sm">
                    We ship nationwide with various shipping options. Standard shipping takes 5-7 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Return Policy</h4>
                  <p className="text-gray-600 text-sm">30-day return policy for unused items in original packaging.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Payment Methods</h4>
                  <p className="text-gray-600 text-sm">We accept Paychangu, bank transfers, and cash on delivery.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
