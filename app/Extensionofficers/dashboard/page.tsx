// app/dashboard/extension/page.tsx
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

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
import { collection, getDocs, addDoc, serverTimestamp, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

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

export default function ExtensionServicesPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddFarmerDialogOpen, setIsAddFarmerDialogOpen] = useState(false)
  const [newFarmer, setNewFarmer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })
  const { toast } = useToast()

  // Current extension officer ID (in a real app, this would come from authentication)
  const extensionOfficerId = "extension_officer_1"

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const farmersQuery = query(
          collection(db, "farmers"),
          where("extensionOfficerId", "==", extensionOfficerId)
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
        // Mock data for demonstration
        const mockFarmers: Farmer[] = [
          {
            id: "1",
            name: "Aminu Hassan",
            email: "aminu.hassan@example.com",
            phone: "+234 801 234 5678",
            location: "Kaduna State",
            createdAt: new Date(),
            status: "active",
            extensionOfficerId: extensionOfficerId,
          },
          {
            id: "2",
            name: "Fatima Abdullahi",
            email: "fatima.abdullahi@example.com",
            phone: "+234 802 345 6789",
            location: "Kano State",
            createdAt: new Date(),
            status: "active",
            extensionOfficerId: extensionOfficerId,
          },
          {
            id: "3",
            name: "Ibrahim Musa",
            email: "ibrahim.musa@example.com",
            phone: "+234 803 456 7890",
            location: "Sokoto State",
            createdAt: new Date(),
            status: "active",
            extensionOfficerId: extensionOfficerId,
          },
        ]
        setFarmers(mockFarmers)
        setFilteredFarmers(mockFarmers)
      } finally {
        setLoading(false)
      }
    }

    fetchFarmers()
  }, [extensionOfficerId])

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
    try {
      const farmerData = {
        ...newFarmer,
        extensionOfficerId,
        status: "active",
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "farmers"), farmerData)

      // Add to local state
      const newFarmerWithId = {
        id: `temp-${Date.now()}`,
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
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter farmer's phone number"
                        value={newFarmer.phone}
                        onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter farmer's location"
                        value={newFarmer.location}
                        onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
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
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span>Loading farmers...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredFarmers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
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
                    filteredFarmers.map((farmer) => (
                      <TableRow key={farmer.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                              <Users className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">{farmer.name}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {farmer.id}
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
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                              <Eye className="h-4 w-4" />
                            </Button>
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
      </div>
    </>
  )
}