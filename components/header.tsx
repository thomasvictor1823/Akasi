"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Heart, Bell, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { categories } from "@/lib/data"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const cartItemCount = 3

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/akasi-logo.png" alt="Akasi" width={40} height={40} className="rounded" />
            <span className="text-2xl font-bold text-green-700">Akasi</span>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Deliver to Lilongwe</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for products, stores, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button size="sm" className="absolute right-1 top-1 bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/categories" className="text-lg font-medium">
                    All Categories
                  </Link>
                  <Link href="/stores" className="text-lg font-medium">
                    Stores
                  </Link>
                  <Link href="/deals" className="text-lg font-medium">
                    Flash Deals
                  </Link>
                  <Link href="/sell" className="text-lg font-medium">
                    Start Selling
                  </Link>
                  <Link href="/business" className="text-lg font-medium">
                    Business
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            {/* Language/Currency */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  MWK <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>🇲🇼 MWK - Malawi</DropdownMenuItem>
                <DropdownMenuItem>🇺🇸 USD - US Dollar</DropdownMenuItem>
                <DropdownMenuItem>🇿🇦 ZAR - South Africa</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden md:flex relative">
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500">
                5
              </Badge>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden md:flex relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                2
              </Badge>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Seller Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Business Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-between py-2 border-t border-gray-100">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium hover:text-green-600">
                  All Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[800px] grid-cols-3">
                    {categories
                      .filter((cat) => cat.featured)
                      .map((category) => (
                        <NavigationMenuLink key={category.id} asChild>
                          <Link
                            href={`/category/${category.slug}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-6">
            <Link href="/deals" className="text-sm font-medium hover:text-green-600 text-orange-600">
              Flash Deals
            </Link>
            <Link href="/stores" className="text-sm font-medium hover:text-green-600">
              Stores
            </Link>
            <Link href="/business" className="text-sm font-medium hover:text-green-600">
              Business
            </Link>
            <Link href="/sell" className="text-sm font-medium hover:text-green-600 bg-green-50 px-3 py-1 rounded">
              Start Selling
            </Link>
          </div>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden py-3 border-t border-gray-100">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products, stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2"
            />
            <Button size="sm" className="absolute right-1 top-1 bg-green-600 hover:bg-green-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
