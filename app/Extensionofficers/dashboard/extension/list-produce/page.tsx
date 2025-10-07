// app/dashboard/extension/list-produce/page.tsx
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Upload, ImageIcon, Sprout, X, ArrowLeft, Eye } from "lucide-react"
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { uploadImageToStorage } from "@/lib/storage"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

const categories = [
  "Grains and Legumes",
  "Tubers",
  "Fruits and Nuts",
  "Poultry",
  "Vegetables and Melons",
  "Livestock",
  "Fish and aquaculture",
  "Animal product",
  "Oil",
  "Cash crops",
  "Flowers",
  "Spices and Herbs",
  "By products",
  "Seed and seedlings",
  "Processed products",
]

const sizes = ["Small", "Medium", "Large"]
const units = ["kg", "g", "lb", "oz", "piece", "bunch", "bag"]

interface Farmer {
  id: string
  name: string
  phone: string
  location: string
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

export default function ListProducePage() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    price: 0,
    size: "",
    farmerId: "",
    quantity: 1,
    unit: "kg",
  })
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [extensionOfficer, setExtensionOfficer] = useState<ExtensionOfficer | null>(null)
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [farmersLoading, setFarmersLoading] = useState(true)
  const [officerLoading, setOfficerLoading] = useState(true)
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

  // Fetch farmers for this extension officer using the officer's document ID
  useEffect(() => {
    const fetchFarmers = async () => {
      if (!extensionOfficer?.id) return
      
      try {
        const farmersQuery = query(
          collection(db, "farmers"),
          where("extensionOfficerId", "==", extensionOfficer.id),
          where("status", "==", "active")
        )
        const farmersSnapshot = await getDocs(farmersQuery)
        const farmersData = farmersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Farmer[]

        setFarmers(farmersData)
      } catch (error) {
        console.error("Error fetching farmers:", error)
        toast({
          title: "Error",
          description: "Failed to fetch farmers",
          variant: "destructive",
        })
      } finally {
        setFarmersLoading(false)
      }
    }

    if (extensionOfficer) {
      fetchFarmers()
    }
  }, [extensionOfficer, toast])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFarmerSelect = (farmerId: string) => {
    const farmer = farmers.find(f => f.id === farmerId)
    setSelectedFarmer(farmer || null)
    handleInputChange("farmerId", farmerId)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image for the produce",
        variant: "destructive",
      })
      return
    }

    if (!formData.farmerId) {
      toast({
        title: "Error",
        description: "Please select a farmer",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Upload image using the utility function
      const imageUrl = await uploadImageToStorage(selectedImage, "produce")

      // Save to Firestore
      await addDoc(collection(db, "produce_listings"), {
        // Product information
        productName: formData.productName,
        productImage: imageUrl,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        size: formData.size,
        quantity: formData.quantity,
        unit: formData.unit,
        status: "active",
        
        // Farmer information
        sellerId: formData.farmerId,
        sellerName: selectedFarmer?.name || "",
        sellerPhone: selectedFarmer?.phone || "",
        sellerLocation: selectedFarmer?.location || "",
        
        // Extension officer information (using the document ID from auth)
        extensionOfficerId: extensionOfficer?.id,
        extensionOfficerName: extensionOfficer?.name,
        
        // System fields
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        listedBy: "extension_officer",
      })

      toast({
        title: "Success",
        description: "Produce listed successfully!",
      })

      // Reset form
      setFormData({
        productName: "",
        category: "",
        description: "",
        price: 0,
        size: "",
        farmerId: "",
        quantity: 1,
        unit: "kg",
      })
      setSelectedFarmer(null)
      setSelectedImage(null)
      setImagePreview(null)

      // Navigate to view all produce page after successful listing
      setTimeout(() => {
        router.push("/Extensionofficers/dashboard/extension/view-produce")
      }, 1500)

    } catch (error) {
      console.error("Error listing produce:", error)
      toast({
        title: "Error",
        description: "Failed to list produce. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewProduce = () => {
    router.push("/Extensionofficers/dashboard/extension/view-produce")
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
                <BreadcrumbPage>List Produce</BreadcrumbPage>
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
                onClick={() => router.push("/Extensionofficers/dashboard/extension")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <Sprout className="h-5 w-5" />
                </div>
                List Produce for Farmer
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleViewProduce}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View All Produce
            </Button>
          </div>
          <p className="text-muted-foreground">Help farmers list their produce on the Bayangida platform</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Produce Information
            </CardTitle>
            <CardDescription>Fill in the details for the farmer's produce listing</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Produce Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Produce Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="productName">Produce Name *</Label>
                    <Input
                      id="productName"
                      placeholder="E.g Tomatoes"
                      value={formData.productName}
                      onChange={(e) => handleInputChange("productName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the produce quality, harvest details, etc."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₦) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="5000"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", Number(e.target.value))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size">Size *</Label>
                      <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", Number(e.target.value))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Farmer Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Farmer Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="farmer">Select Farmer *</Label>
                    <Select 
                      value={formData.farmerId} 
                      onValueChange={handleFarmerSelect}
                      disabled={farmersLoading || farmers.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={farmersLoading ? "Loading farmers..." : "Select a farmer"} />
                      </SelectTrigger>
                      <SelectContent>
                        {farmers.map((farmer) => (
                          <SelectItem key={farmer.id} value={farmer.id}>
                            {farmer.name} - {farmer.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {farmers.length === 0 && !farmersLoading && (
                      <p className="text-sm text-muted-foreground">
                        No farmers found. Please add farmers first from the Extension Services page.
                      </p>
                    )}
                  </div>

                  {selectedFarmer && (
                    <>
                      <div className="space-y-2">
                        <Label>Farmer Phone</Label>
                        <Input
                          value={selectedFarmer.phone}
                          disabled
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Farmer Location</Label>
                        <Input
                          value={selectedFarmer.location}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </>
                  )}

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Upload Image *</Label>
                   <div 
  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 cursor-pointer hover:bg-muted/20 transition-colors"
  onClick={() => document.getElementById('image-upload')?.click()}
>
  {imagePreview ? (
    <div className="relative">
      <img
        src={imagePreview || "/placeholder.svg"}
        alt="Produce preview"
        className="w-full h-48 object-cover rounded-lg"
      />
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the container click
          removeImage();
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <div className="text-center">
      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
      <div className="mt-4">
        <span className="mt-2 block text-sm font-medium text-muted-foreground">
          Click to upload produce image
        </span>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>
    </div>
  )}
</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleViewProduce}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View All Produce
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !formData.farmerId}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Upload className="h-4 w-4 animate-spin" />
                      Listing Produce...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      List Produce
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}