// app/dashboard/extension/view-produce/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowLeft, Eye, Plus, Tractor, Filter } from "lucide-react"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface Produce {
  id: string
  productName: string
  productImage: string
  category: string
  description: string
  price: number
  size: string
  quantity: number
  unit: string
  status: string
  sellerId: string
  sellerName: string
  sellerPhone: string
  sellerLocation: string
  extensionOfficerId: string
  extensionOfficerName: string
  createdAt: any
  listedBy: string
}

interface ExtensionOfficer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  specialization: string
  userId: string
}

export default function ViewProducePage() {
  const [produce, setProduce] = useState<Produce[]>([])
  const [filteredProduce, setFilteredProduce] = useState<Produce[]>([])
  const [extensionOfficer, setExtensionOfficer] = useState<ExtensionOfficer | null>(null)
  const [loading, setLoading] = useState(true)
  const [officerLoading, setOfficerLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()

  // Fetch extension officer first using auth
  useEffect(() => {
    const fetchExtensionOfficer = async () => {
      if (!user?.uid) return
      
      try {
        const officersQuery = query(
          collection(db, "extension_officers"),
          where("userId", "==", user.uid)
        )
        const officersSnapshot = await getDocs(officersQuery)
        
        if (!officersSnapshot.empty) {
          const officerDoc = officersSnapshot.docs[0]
          setExtensionOfficer({
            id: officerDoc.id,
            ...officerDoc.data()
          } as ExtensionOfficer)
        } else {
          toast({
            title: "Error",
            description: "Extension officer profile not found",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching extension officer:", error)
        toast({
          title: "Error",
          description: "Failed to fetch extension officer details",
          variant: "destructive",
        })
      } finally {
        setOfficerLoading(false)
      }
    }

    fetchExtensionOfficer()
  }, [user, toast])

  // Fetch produce for this extension officer using the officer's document ID
  useEffect(() => {
    const fetchProduce = async () => {
      if (!extensionOfficer?.id) return
      
      try {
        // Query to get produce listings created by this extension officer
        const produceQuery = query(
          collection(db, "produce_listings"),
          where("extensionOfficerId", "==", extensionOfficer.id),
        )
        const produceSnapshot = await getDocs(produceQuery)
        const produceData = produceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Produce[]

        setProduce(produceData)
        setFilteredProduce(produceData)
      } catch (error) {
        console.error("Error fetching produce:", error)
        toast({
          title: "Error",
          description: "Failed to fetch produce listings",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (extensionOfficer) {
      fetchProduce()
    }
  }, [extensionOfficer, toast])

  useEffect(() => {
    let filtered = produce.filter(item =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sellerLocation.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter)
    }

    setFilteredProduce(filtered)
  }, [searchTerm, statusFilter, produce])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "sold":
        return <Badge className="bg-blue-500">Sold</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return "Invalid date"
    }
  }

  const handleViewDetails = (produceId: string) => {
    // Navigate to produce details page or show modal
    toast({
      title: "View Produce Details",
      description: `Viewing details for produce ID: ${produceId}`,
    })
  }

  if (officerLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span>Loading extension officer details...</span>
        </div>
      </div>
    )
  }

  if (!extensionOfficer) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Extension officer profile not found</h2>
          <p className="text-muted-foreground mt-2">
            Please contact administrator to set up your extension officer profile.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/extension">Extension Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>View Produce</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/Extensionofficers/dashboard/extension/view-produce")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <Tractor className="h-5 w-5" />
                </div>
                All Listed Produce
              </h1>
            </div>
            <Button
              onClick={() => router.push("/Extensionofficers/dashboard/extension/list-produce")}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              List New Produce
            </Button>
          </div>
          <p className="text-muted-foreground">View and manage all produce listings created through your extension service</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardTitle className="flex items-center gap-2">
              <Tractor className="h-5 w-5" />
              Produce Listings
            </CardTitle>
            <CardDescription>All produce listings created by you for farmers</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by produce name, category, farmer, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] h-10">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold w-12 text-center">S/N</TableHead>
                    <TableHead className="font-semibold">Produce Details</TableHead>
                    <TableHead className="font-semibold">Farmer Info</TableHead>
                    <TableHead className="font-semibold">Price & Quantity</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Listed Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span>Loading produce listings...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredProduce.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex flex-col items-center space-y-2">
                          <Tractor className="h-12 w-12 text-muted-foreground/50" />
                          <span className="text-muted-foreground">
                            {searchTerm || statusFilter !== "all" ? "No matching produce found" : "No produce listings found"}
                          </span>
                          <Button 
                            onClick={() => router.push("/dashboard/extension/list-produce")}
                            className="mt-2"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            List Your First Produce
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProduce.map((item, index) => (
                      <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="text-center text-sm font-medium text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                              {item.productImage ? (
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Tractor className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{item.productName}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.size} • {item.description.substring(0, 30)}...
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{item.sellerName}</div>
                            <div className="text-xs text-muted-foreground">{item.sellerPhone}</div>
                            <div className="text-xs text-muted-foreground">{item.sellerLocation}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-semibold">₦{item.price.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.quantity} {item.unit}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {item.category}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(item.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 p-0 px-2 bg-transparent"
                            onClick={() => handleViewDetails(item.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredProduce.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProduce.length} of {produce.length} listings
                </div>
                <div className="text-sm text-muted-foreground">
                  Sorted by: Most Recent
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}