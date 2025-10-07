"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Eye, Phone, Mail, MapPin, Users, Plus, UserPlus, Tractor } from "lucide-react"
import { collection, getDocs, addDoc, serverTimestamp, query, where, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

interface ExtensionOfficer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  specialization: string
  userId: string
  // ... other fields
}

interface Farmer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  createdAt: any
  status: "active" | "inactive"
  extensionOfficerId: string
}

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
  createdAt: any
}

export default function ExtensionServicesPage() {
  const [extensionOfficer, setExtensionOfficer] = useState<ExtensionOfficer | null>(null)
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([])
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null)
  const [farmerProduce, setFarmerProduce] = useState<Produce[]>([])
  const [loading, setLoading] = useState(true)
  const [officerLoading, setOfficerLoading] = useState(true)
  const [produceLoading, setProduceLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddFarmerDialogOpen, setIsAddFarmerDialogOpen] = useState(false)
  const [isViewProduceDialogOpen, setIsViewProduceDialogOpen] = useState(false)
  const [newFarmer, setNewFarmer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const fetchExtensionOfficer = async () => {
      if (!user?.uid) return
      
      try {
        // Query to find the extension officer document with matching userId
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

  useEffect(() => {
    const fetchFarmers = async () => {
      if (!extensionOfficer?.id) return
      
      try {
        // Query to get only farmers assigned to this extension officer
        const farmersQuery = query(
          collection(db, "farmers"),
          where("extensionOfficerId", "==", extensionOfficer.id)
        )
        const farmersSnapshot = await getDocs(farmersQuery)
        const farmersData = farmersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Farmer[]

        setFarmers(farmersData)
        setFilteredFarmers(farmersData)
      } catch (error) {
        console.error("Error fetching farmers:", error)
        toast({
          title: "Error",
          description: "Failed to fetch farmers",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (extensionOfficer) {
      fetchFarmers()
    }
  }, [extensionOfficer, toast])

  useEffect(() => {
    const filtered = farmers.filter(
      (farmer) =>
        (farmer.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (farmer.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (farmer.location?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
    )
    setFilteredFarmers(filtered)
  }, [searchTerm, farmers])

  const handleAddFarmer = async () => {
    if (!extensionOfficer) return
    
    try {
      const farmerData = {
        ...newFarmer,
        extensionOfficerId: extensionOfficer.id, // Use the extension officer's document ID
        status: "active",
        createdAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, "farmers"), farmerData)

      // Add to local state with the actual document ID
      const newFarmerWithId = {
        id: docRef.id,
        ...farmerData,
        createdAt: new Date(),
      } as Farmer

      setFarmers([...farmers, newFarmerWithId])
      setFilteredFarmers([...filteredFarmers, newFarmerWithId])

      toast({
        title: "Success",
        description: "Farmer added successfully!",
      })

      // Reset form and close dialog
      setNewFarmer({
        name: "",
        email: "",
        phone: "",
        location: "",
      })
      setIsAddFarmerDialogOpen(false)
    } catch (error) {
      console.error("Error adding farmer:", error)
      toast({
        title: "Error",
        description: "Failed to add farmer. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchFarmerProduce = async (farmerId: string) => {
    setProduceLoading(true)
    try {
      // Query to get produce listings for the selected farmer
      const produceQuery = query(
        collection(db, "produce_listings"),
        where("sellerId", "==", farmerId)
      )
      const produceSnapshot = await getDocs(produceQuery)
      const produceData = produceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Produce[]

      setFarmerProduce(produceData)
      
      // Find the selected farmer
      const farmer = farmers.find(f => f.id === farmerId)
      setSelectedFarmer(farmer || null)
      setIsViewProduceDialogOpen(true)
    } catch (error) {
      console.error("Error fetching farmer produce:", error)
      toast({
        title: "Error",
        description: "Failed to fetch farmer's produce",
        variant: "destructive",
      })
    } finally {
      setProduceLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString()
      }
      return new Date(timestamp).toLocaleDateString()
    } catch (error) {
      return "Invalid date"
    }
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
                <BreadcrumbPage>Extension Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Welcome Section */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <Tractor className="h-6 w-6" />
            </div>
            Extension Services
          </h1>
          <p className="text-muted-foreground">
            Manage farmers under your supervision and help them list their produce
          </p>
        </div>

        {/* Farmers List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                My Farmers
              </div>
              <Dialog open={isAddFarmerDialogOpen} onOpenChange={setIsAddFarmerDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Farmer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Farmer</DialogTitle>
                    <DialogDescription>
                      Add a new farmer to your extension service list.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Farmer Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter farmer's name"
                        value={newFarmer.name}
                        onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter farmer's email"
                        value={newFarmer.email}
                        onChange={(e) => setNewFarmer({ ...newFarmer, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter farmer's phone number"
                        value={newFarmer.phone}
                        onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter farmer's location"
                        value={newFarmer.location}
                        onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddFarmerDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddFarmer}>Add Farmer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <CardDescription>Farmers registered under your extension service</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search farmers by name, email, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold w-12 text-center">S/N</TableHead>
                    <TableHead className="font-semibold">Farmer Details</TableHead>
                    <TableHead className="font-semibold">Contact Info</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Joined Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span>Loading farmers...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredFarmers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center space-y-2">
                          <Users className="h-12 w-12 text-muted-foreground/50" />
                          <span className="text-muted-foreground">No farmers found</span>
                          <Button 
                            onClick={() => setIsAddFarmerDialogOpen(true)}
                            className="mt-2"
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Your First Farmer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFarmers.map((farmer, index) => (
                      <TableRow key={farmer.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="text-center text-sm font-medium text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                              <Users className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">{farmer.name}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {farmer.id.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span>{farmer.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{farmer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>{farmer.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(farmer.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(farmer.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 p-0 px-2 bg-transparent"
                              onClick={() => fetchFarmerProduce(farmer.id)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Produce
                            </Button>
                            <Link href={`/dashboard/extension/list-produce?farmerId=${farmer.id}`}>
                              <Button variant="outline" size="sm" className="h-8 p-0 px-2 bg-transparent">
                                <Plus className="h-4 w-4 mr-1" />
                                Add Produce
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Farmer Produce Dialog */}
        <Dialog open={isViewProduceDialogOpen} onOpenChange={setIsViewProduceDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedFarmer ? `${selectedFarmer.name}'s Produce` : "Farmer Produce"}
              </DialogTitle>
              <DialogDescription>
                {selectedFarmer ? `View all produce listings for ${selectedFarmer.name}` : "View produce listings"}
              </DialogDescription>
            </DialogHeader>
            {produceLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span>Loading produce...</span>
                </div>
              </div>
            ) : farmerProduce.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Tractor className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No produce listings found for this farmer</p>
                {selectedFarmer && (
                  <Link href={`/dashboard/extension/list-produce?farmerId=${selectedFarmer.id}`}>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Produce for {selectedFarmer.name}
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                {farmerProduce.map((produce) => (
                  <Card key={produce.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                          {produce.productImage ? (
                            <img
                              src={produce.productImage}
                              alt={produce.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <Tractor className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{produce.productName}</h3>
                          <p className="text-sm text-muted-foreground">{produce.category}</p>
                          <p className="text-sm mt-1 line-clamp-2">{produce.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <span className="font-semibold">₦{produce.price.toLocaleString()}</span>
                              <span className="text-sm text-muted-foreground ml-1">
                                per {produce.quantity} {produce.unit}
                              </span>
                            </div>
                            <Badge className={produce.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                              {produce.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            Listed on: {formatDate(produce.createdAt)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}