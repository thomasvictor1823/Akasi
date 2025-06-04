"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { CartItem } from "@/lib/types"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      productId: "1",
      product: {
        id: "1",
        name: "Fantech VENOM II VX3 Mouse Gaming",
        description: "High-performance gaming mouse",
        price: 2799999,
        originalPrice: 3100000,
        discount: 10,
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Electronics",
        condition: "new",
        rating: 4.5,
        reviewCount: 223,
        sellerId: "1",
        sellerName: "Fantech Store",
        sellerType: "business",
        storeId: "fantech-store",
        storeName: "Fantech Store",
        location: "South Jakarta",
        inStock: true,
        stockCount: 50,
        tags: ["gaming", "mouse"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      quantity: 2,
    },
    {
      id: "2",
      productId: "3",
      product: {
        id: "3",
        name: "Fantech MPR800 Firefly RGB Gaming Mousepad",
        description: "RGB gaming mousepad",
        price: 539999,
        originalPrice: 630000,
        discount: 14,
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Electronics",
        condition: "new",
        rating: 4.7,
        reviewCount: 143,
        sellerId: "2",
        sellerName: "GamerTime",
        sellerType: "business",
        storeId: "gamertime-store",
        storeName: "GamerTime",
        location: "Bekasi",
        inStock: true,
        stockCount: 25,
        tags: ["gaming", "mousepad"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      quantity: 1,
    },
  ])

  const [selectedItems, setSelectedItems] = useState<string[]>(["1", "2"])
  const [promoCode, setPromoCode] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId)
      return
    }

    setCartItems((items) => items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId))
    setSelectedItems((selected) => selected.filter((id) => id !== itemId))
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((selected) =>
      selected.includes(itemId) ? selected.filter((id) => id !== itemId) : [...selected, itemId],
    )
  }

  const selectAllItems = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item.id))
    }
  }

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id))
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = 15000
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link href="/">
              <Button className="bg-orange-600 hover:bg-orange-700">Continue Shopping</Button>
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
        <h1 className="text-2xl font-bold mb-8">Shopping Cart ({cartItems.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Select All Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Checkbox checked={selectedItems.length === cartItems.length} onCheckedChange={selectAllItems} />
                  <span className="font-medium">
                    Select All ({selectedItems.length}/{cartItems.length})
                  </span>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                      />

                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.product.storeName}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg">{formatPrice(item.product.price)}</span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(item.product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 rounded">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-orange-600 hover:bg-orange-700" disabled={selectedItems.length === 0}>
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
