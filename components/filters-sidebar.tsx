"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

export default function FiltersSidebar() {
  const [priceRange, setPriceRange] = useState([100000, 5000000])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const cities = ["DKI Jakarta", "Bandung", "Medan", "Semarang", "Bogor", "Depok", "Pemalang"]

  const conditions = ["New", "Second", "Refurbish"]

  const colors = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Brown", value: "brown" },
    { name: "Yellow", value: "yellow" },
    { name: "Orange", value: "orange" },
  ]

  const ratings = ["4 stars above", "3 stars above"]

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
    setPriceRange([100000, 5000000])
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filter</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-orange-600 hover:text-orange-700">
          Clear all
        </Button>
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium">
          Price Range
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000000}
              min={0}
              step={100000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* City Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium border-t border-gray-100 mt-4 pt-4">
          City
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={city}
                checked={selectedFilters.includes(city)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(city)
                  } else {
                    removeFilter(city)
                  }
                }}
              />
              <Label htmlFor={city} className="text-sm">
                {city}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Condition Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium border-t border-gray-100 mt-4 pt-4">
          Condition
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={condition}
                checked={selectedFilters.includes(condition)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(condition)
                  } else {
                    removeFilter(condition)
                  }
                }}
              />
              <Label htmlFor={condition} className="text-sm">
                {condition}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Color Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium border-t border-gray-100 mt-4 pt-4">
          Color
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {colors.map((color) => (
            <div key={color.value} className="flex items-center space-x-2">
              <Checkbox
                id={color.value}
                checked={selectedFilters.includes(color.name)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(color.name)
                  } else {
                    removeFilter(color.name)
                  }
                }}
              />
              <div className={`w-4 h-4 rounded-full border border-gray-300 bg-${color.value}-500`} />
              <Label htmlFor={color.value} className="text-sm">
                {color.name}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Rating Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium border-t border-gray-100 mt-4 pt-4">
          Rating
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={rating}
                checked={selectedFilters.includes(rating)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFilter(rating)
                  } else {
                    removeFilter(rating)
                  }
                }}
              />
              <Label htmlFor={rating} className="text-sm">
                {rating}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Other Filters */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left font-medium border-t border-gray-100 mt-4 pt-4">
          Other
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="official-store"
              checked={selectedFilters.includes("Official store")}
              onCheckedChange={(checked) => {
                if (checked) {
                  addFilter("Official store")
                } else {
                  removeFilter("Official store")
                }
              }}
            />
            <Label htmlFor="official-store" className="text-sm">
              Official store
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-release"
              checked={selectedFilters.includes("New Release")}
              onCheckedChange={(checked) => {
                if (checked) {
                  addFilter("New Release")
                } else {
                  removeFilter("New Release")
                }
              }}
            />
            <Label htmlFor="new-release" className="text-sm">
              New Release
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
