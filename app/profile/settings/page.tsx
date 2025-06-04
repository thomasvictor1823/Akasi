"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Lock, Bell, MapPin, CreditCard, Shield, Eye, EyeOff, Plus, Trash2, Edit, Save } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AccountSettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    priceDrops: true,
    newsletter: true,
  })

  const addresses = [
    {
      id: "1",
      type: "Home",
      name: "John Banda",
      street: "123 Independence Drive",
      city: "Lilongwe",
      state: "Central Region",
      zipCode: "12345",
      country: "Malawi",
      isDefault: true,
    },
    {
      id: "2",
      type: "Work",
      name: "John Banda",
      street: "456 Business Park",
      city: "Blantyre",
      state: "Southern Region",
      zipCode: "67890",
      country: "Malawi",
      isDefault: false,
    },
  ]

  const paymentMethods = [
    {
      id: "1",
      type: "Mobile Money",
      provider: "TNM Mpamba",
      number: "**** **** 1234",
      isDefault: true,
    },
    {
      id: "2",
      type: "Mobile Money",
      provider: "Airtel Money",
      number: "**** **** 5678",
      isDefault: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/profile" className="text-green-600 hover:text-green-700">
              ← Back to Profile
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>Update your personal details and profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Profile"
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-gray-200"
                    />
                    {isEditing && (
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full">
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Profile Photo</h3>
                    <p className="text-sm text-gray-600">Upload a photo to personalize your account</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Banda" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.banda@email.com" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+265 991 234 567" disabled={!isEditing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself..." disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lilongwe">Lilongwe</SelectItem>
                        <SelectItem value="blantyre">Blantyre</SelectItem>
                        <SelectItem value="mzuzu">Mzuzu</SelectItem>
                        <SelectItem value="zomba">Zomba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ny">Chichewa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Change Password
                  </CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input id="currentPassword" type={showCurrentPassword ? "text" : "password"} className="pr-10" />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input id="newPassword" type={showNewPassword ? "text" : "password"} className="pr-10" />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Authentication</h4>
                      <p className="text-sm text-gray-600">Receive verification codes via SMS</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Authentication</h4>
                      <p className="text-sm text-gray-600">Receive verification codes via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                      <p className="text-sm text-gray-600">
                        {key === "orderUpdates" && "Get notified about your order status"}
                        {key === "promotions" && "Receive promotional offers and discounts"}
                        {key === "newProducts" && "Be the first to know about new products"}
                        {key === "priceDrops" && "Get alerts when prices drop on your wishlist"}
                        {key === "newsletter" && "Receive our weekly newsletter"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Saved Addresses
                  </span>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </Button>
                </CardTitle>
                <CardDescription>Manage your shipping and billing addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{address.type}</h4>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {address.name}
                            <br />
                            {address.street}
                            <br />
                            {address.city}, {address.state} {address.zipCode}
                            <br />
                            {address.country}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Methods
                  </span>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardTitle>
                <CardDescription>Manage your payment methods for faster checkout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-green-100 rounded flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{method.provider}</h4>
                            <p className="text-sm text-gray-600">
                              {method.type} ending in {method.number.slice(-4)}
                            </p>
                            {method.isDefault && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Default</span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
