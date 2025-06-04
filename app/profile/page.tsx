"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  MapPin,
  Calendar,
  Star,
  Package,
  Heart,
  Settings,
  Edit,
  Phone,
  Mail,
  Shield,
  Award,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const user = {
    id: "1",
    name: "John Banda",
    email: "john.banda@email.com",
    phone: "+265 991 234 567",
    avatar: "/placeholder.svg?height=120&width=120",
    location: "Lilongwe, Malawi",
    joinDate: "March 2023",
    verified: true,
    type: "individual" as const,
    stats: {
      orders: 24,
      reviews: 18,
      wishlist: 12,
      rating: 4.8,
    },
  }

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 125000,
      status: "delivered",
      items: 3,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      total: 85000,
      status: "shipped",
      items: 2,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      total: 45000,
      status: "delivered",
      items: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-green-100"
              />
              {user.verified && (
                <div className="absolute -bottom-2 -right-2 bg-green-600 rounded-full p-2">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {user.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
              </div>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {user.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Link href="/profile/settings">
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/profile/settings">
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{user.stats.orders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{user.stats.rating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{user.stats.wishlist}</div>
              <div className="text-sm text-gray-600">Wishlist Items</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{user.stats.reviews}</div>
              <div className="text-sm text-gray-600">Reviews Written</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Orders
                    <Link href="/profile?tab=orders">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt="Order"
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{order.id}</span>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            {order.items} items • {formatPrice(order.total)}
                          </div>
                          <div className="text-xs text-gray-500">{order.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Email Verified</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Phone Verified</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Identity Verification</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Verify
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track all your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Order history will appear here</h3>
                  <p className="text-gray-600 mb-6">Start shopping to see your orders</p>
                  <Link href="/">
                    <Button className="bg-green-600 hover:bg-green-700">Start Shopping</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
                <CardDescription>Reviews you've written for products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-6">Purchase products to leave reviews</p>
                  <Link href="/">
                    <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions on Akasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
                  <p className="text-gray-600">Your activity will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
