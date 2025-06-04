import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Shirt,
  Home,
  Car,
  Tractor,
  Heart,
  Dumbbell,
  Book,
  Laptop,
  Gamepad2,
  Headphones,
  User,
  Footprints,
  Watch,
  Armchair,
  ChefHat,
  Palette,
  Trees,
  Bike,
  Settings,
  Wrench,
  Sprout,
  Beef,
  Droplets,
} from "lucide-react"
import { categories } from "@/lib/data"
import { formatNumber } from "@/lib/utils"

const iconMap = {
  Smartphone,
  Shirt,
  Home,
  Car,
  Tractor,
  Heart,
  Dumbbell,
  Book,
  Laptop,
  Gamepad2,
  Headphones,
  User,
  Footprints,
  Watch,
  Armchair,
  ChefHat,
  Palette,
  Trees,
  Bike,
  Settings,
  Wrench,
  Sprout,
  Beef,
  Droplets,
}

export default function CategoryGrid() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Smartphone

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                  <IconComponent className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{formatNumber(category.productCount)} items</p>
                </div>
                {category.featured && (
                  <Badge variant="secondary" className="text-xs">
                    Popular
                  </Badge>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
