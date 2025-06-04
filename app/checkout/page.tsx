"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, CreditCard, Truck } from "lucide-react"
import Image from "next/image"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("paychangu")
  const [shippingMethod, setShippingMethod] = useState("regular")

  const orderItems = [
    {
      id: "1",
      name: "Fantech VENOM II VX3 Mouse Gaming",
      price: 2799999,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
      store: "Fantech Store",
    },
    {
      id: "2",
      name: "Fantech MPR800 Firefly RGB Gaming Mousepad",
      price: 539999,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      store: "GamerTime",
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15000
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handlePayment = () => {
    // Integrate with Paychangu payment gateway
    console.log("Processing payment with Paychangu...")
    // This would redirect to Paychangu payment page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Shipping Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+62 812 3456 7890" />
                </div>
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Textarea id="address" placeholder="Enter your full address" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Jakarta" />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" placeholder="DKI Jakarta" />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" placeholder="12345" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Shipping Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="regular" id="regular" />
                      <div>
                        <Label htmlFor="regular" className="font-medium">
                          Regular Shipping
                        </Label>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">{formatPrice(15000)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="font-medium">
                          Express Shipping
                        </Label>
                        <p className="text-sm text-gray-600">2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">{formatPrice(35000)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <div>
                        <Label htmlFor="overnight" className="font-medium">
                          Overnight Shipping
                        </Label>
                        <p className="text-sm text-gray-600">Next business day</p>
                      </div>
                    </div>
                    <span className="font-medium">{formatPrice(75000)}</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="paychangu" id="paychangu" />
                      <div>
                        <Label htmlFor="paychangu" className="font-medium">
                          Paychangu
                        </Label>
                        <p className="text-sm text-gray-600">Secure payment with Paychangu</p>
                      </div>
                    </div>
                    <div className="text-orange-600 font-medium">Recommended</div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <div>
                        <Label htmlFor="bank-transfer" className="font-medium">
                          Bank Transfer
                        </Label>
                        <p className="text-sm text-gray-600">Direct bank transfer</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <div>
                        <Label htmlFor="cod" className="font-medium">
                          Cash on Delivery
                        </Label>
                        <p className="text-sm text-gray-600">Pay when you receive</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.store}</p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-orange-600">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handlePayment}>
                  Complete Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
