/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Users, Tractor, Truck, CreditCard, Package, DollarSign, TrendingUp, TrendingDown, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { collection, query, where, getDocs, getCountFromServer, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

interface DashboardStats {
  totalUsers: number
  totalFarmers: number
  totalDrivers: number
  pendingTransactions: number
  pendingProduce: number
  pendingPayouts: number
  monthlyRevenue: number
  weeklyGrowth: number
}

interface RecentActivity {
  id: string
  type: string
  description: string
  timestamp: Date
  status: 'pending' | 'completed' | 'warning'
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalFarmers: 0,
    totalDrivers: 0,
    pendingTransactions: 0,
    pendingProduce: 0,
    pendingPayouts: 0,
    monthlyRevenue: 0,
    weeklyGrowth: 0,
  })
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users count
        const usersQuery = query(collection(db, "users"))
        const usersSnapshot = await getCountFromServer(usersQuery)
        const totalUsers = usersSnapshot.data().count

        // Fetch farmers count
        const farmersQuery = query(collection(db, "users"), where("userType", "==", "farmer"))
        const farmersSnapshot = await getCountFromServer(farmersQuery)
        const totalFarmers = farmersSnapshot.data().count

        // Fetch drivers count
        const driversQuery = query(collection(db, "users"), where("userType", "==", "driver"))
        const driversSnapshot = await getCountFromServer(driversQuery)
        const totalDrivers = driversSnapshot.data().count

        // Fetch pending transactions
        const pendingTransactionsQuery = query(collection(db, "transactions"), where("status", "==", "pending"))
        const pendingTransactionsSnapshot = await getCountFromServer(pendingTransactionsQuery)
        const pendingTransactions = pendingTransactionsSnapshot.data().count

        // Fetch pending produce
        const pendingProduceQuery = query(collection(db, "produce"), where("status", "==", "pending"))
        const pendingProduceSnapshot = await getCountFromServer(pendingProduceQuery)
        const pendingProduce = pendingProduceSnapshot.data().count

        // Fetch pending payouts
        const pendingPayoutsQuery = query(collection(db, "payouts"), where("status", "==", "pending"))
        const pendingPayoutsSnapshot = await getCountFromServer(pendingPayoutsQuery)
        const pendingPayouts = pendingPayoutsSnapshot.data().count

        // Calculate growth percentage
        const lastMonthUsers = 1100
        const weeklyGrowth = ((totalUsers - lastMonthUsers) / lastMonthUsers) * 100

        setStats({
          totalUsers,
          totalFarmers,
          totalDrivers,
          pendingTransactions,
          pendingProduce,
          pendingPayouts,
          monthlyRevenue: 105000,
          weeklyGrowth,
        })

        // Mock recent activities (replace with actual Firestore queries)
        setRecentActivities([
          {
            id: "1",
            type: "New User",
            description: "John Doe registered as a farmer",
            timestamp: new Date(),
            status: "completed"
          },
          {
            id: "2",
            type: "Order",
            description: "New order #ORD-1234 requires approval",
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            status: "pending"
          },
          {
            id: "3",
            type: "Produce",
            description: "Tomatoes listing needs verification",
            timestamp: new Date(Date.now() - 1000 * 60 * 120),
            status: "warning"
          },
          {
            id: "4",
            type: "Payout",
            description: "Payout request from Farmer Ahmed",
            timestamp: new Date(Date.now() - 1000 * 60 * 240),
            status: "pending"
          }
        ])

      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: `${stats.weeklyGrowth > 0 ? '+' : ''}${stats.weeklyGrowth.toFixed(1)}% from last month`,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      trend: stats.weeklyGrowth >= 0 ? "up" : "down",
    },
    {
      title: "Active Farmers",
      value: stats.totalFarmers,
      description: "Registered agricultural partners",
      icon: Tractor,
      color: "from-green-500 to-green-600",
      trend: "up",
    },
    {
      title: "Active Drivers",
      value: stats.totalDrivers,
      description: "Delivery personnel available",
      icon: Truck,
      color: "from-orange-500 to-orange-600",
      trend: "up",
    },
    {
      title: "Monthly Revenue",
      value: `₦${stats.monthlyRevenue.toLocaleString()}`,
      description: "Total revenue this month",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      trend: "up",
    },
    {
      title: "Pending Orders",
      value: stats.pendingTransactions,
      description: "Awaiting processing",
      icon: CreditCard,
      color: "from-yellow-500 to-yellow-600",
      trend: "neutral",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingProduce + stats.pendingPayouts,
      description: "Require attention",
      icon: Package,
      color: "from-red-500 to-red-600",
      trend: "neutral",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Dashboard Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        {/* Welcome Section */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Bayangida Admin
          </h1>
          <p className="text-muted-foreground">Manage your agricultural platform operations and monitor key metrics.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold mb-1">
                  {loading ? (
                    <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                  ) : (
                    typeof card.value === 'number' ? card.value.toLocaleString() : card.value
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <Clock className="h-4 w-4" />
                </div>
                Recent Activities
              </CardTitle>
              <CardDescription>Latest system activities and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTime(activity.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CheckCircle className="h-4 w-4" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-transparent hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Manage Users</p>
                    <p className="text-sm text-muted-foreground">View and manage all users</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-transparent hover:border-green-200 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Approve Produce</p>
                    <p className="text-sm text-muted-foreground">{stats.pendingProduce} items pending</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-transparent hover:border-yellow-200 hover:bg-yellow-50 transition-all duration-200 cursor-pointer">
                  <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Process Orders</p>
                    <p className="text-sm text-muted-foreground">{stats.pendingTransactions} orders waiting</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-transparent hover:border-purple-200 hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Handle Payouts</p>
                    <p className="text-sm text-muted-foreground">{stats.pendingPayouts} requests pending</p>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 text-white">
                <AlertCircle className="h-4 w-4" />
              </div>
              System Status
            </CardTitle>
            <CardDescription>Current platform health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 rounded-lg bg-white shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">API</p>
                <p className="text-sm text-muted-foreground">Operational</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">Database</p>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">Payments</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium">Uptime</p>
                <p className="text-sm text-muted-foreground">99.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}