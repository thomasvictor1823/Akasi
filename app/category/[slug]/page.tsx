import Header from "@/components/header"
import FiltersSidebar from "@/components/filters-sidebar"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3X3, List, Filter } from "lucide-react"
import { categories, sampleProducts } from "@/lib/data"
import { formatNumber } from "@/lib/utils"
import Link from "next/link"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((cat) => cat.slug === params.slug) || categories[0]
  const categoryProducts = sampleProducts.filter(
    (product) =>
      product.categories.includes(category.id) || product.category.toLowerCase().includes(category.name.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-green-600">
            Categories
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">{formatNumber(category.productCount)} products</Badge>
            {category.featured && <Badge className="bg-green-100 text-green-800">Popular Category</Badge>}
          </div>
        </div>

        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Shop by Subcategory</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  href={`/category/${subcategory.slug}`}
                  className="p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-center"
                >
                  <div className="font-medium text-sm">{subcategory.name}</div>
                  <div className="text-xs text-gray-500">{formatNumber(subcategory.productCount)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="hidden lg:block">
            <FiltersSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <div className="text-sm text-gray-600">
                    Showing {categoryProducts.length} products in {category.name}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Customer Rating</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="bg-green-50 text-green-600">
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {categoryProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showCompare />
                  ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-8">
                  <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                    Load More Products
                  </Button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Grid3X3 className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products in this category. Try browsing other categories or check back later.
                </p>
                <Link href="/categories">
                  <Button className="bg-green-600 hover:bg-green-700">Browse All Categories</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
