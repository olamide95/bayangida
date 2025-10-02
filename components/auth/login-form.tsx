"use client"

import type React from "react"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { BAYANGIDA_LOGO_URL } from "@/lib/constants"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // First, authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      console.log("🔥 Firebase Auth successful. User UID:", user.uid)
      console.log("📧 User email:", user.email)

      // Check if this user is an extension officer and their status
      try {
        // Method 1: Query by email instead of UID (since document ID might not match UID)
        const officersRef = collection(db, "extension_officers")
        const q = query(officersRef, where("email", "==", user.email))
        const querySnapshot = await getDocs(q)

        console.log("🔍 Found officer documents:", querySnapshot.size)

        if (!querySnapshot.empty) {
          // Get the first matching document
          const officerDoc = querySnapshot.docs[0]
          const officerData = officerDoc.data()
          
          console.log("👨‍🌾 Officer data:", officerData)
          console.log("📊 Officer status:", officerData.status)

          // Check if the officer is suspended
          if (officerData.status === "suspended") {
            console.log("🚫 Officer is suspended - blocking access")
            // Sign them out immediately
            await auth.signOut()
            setError("Your account has been suspended. Please contact the administrator.")
            setLoading(false)
            return
          }
          
          console.log("✅ Officer is active - allowing access")
          // Officer is active, redirect to dashboard
          router.push("/Extensionofficers/dashboard")
          return
        } else {
          console.log("ℹ️ No officer found with this email, might be admin user")
        }
      } catch (firestoreError) {
        console.error("❌ Error checking officer status:", firestoreError)
        // If we can't check the status, still allow login but log the error
        console.log("⚠️ Could not verify officer status, allowing login...")
      }

      console.log("➡️ Proceeding to dashboard...")
      // If not an extension officer or status check failed, proceed to dashboard
      router.push("/Extensionofficers/dashboard")
      
    } catch (error: any) {
      console.error("❌ Login error:", error)
      
      // Handle specific error cases
      if (error.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.")
      } else if (error.code === 'auth/user-not-found') {
        setError("No account found with this email address.")
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.")
      } else if (error.code === 'auth/too-many-requests') {
        setError("Too many failed login attempts. Please try again later.")
      } else {
        setError(error.message || "Login failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-lg overflow-hidden">
              <img
                src={"/placeholder.png"}
                alt="Bayangida Logo"
                className="h-12 w-12 object-contain"
              />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Bayangida Admin
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Access the Bayangida agricultural platform administration panel
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant={error.includes("suspended") ? "destructive" : "destructive"}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@bayangida.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}