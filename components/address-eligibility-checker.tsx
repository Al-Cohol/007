"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddressEligibilityCheckerProps {
  onEligibilityCheck: (isEligible: boolean) => void
}

export default function AddressEligibilityChecker({ onEligibilityCheck }: AddressEligibilityCheckerProps) {
  const [postcode, setPostcode] = useState("")
  const [address, setAddress] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<"eligible" | "not-eligible" | null>(null)
  const [showAddressInput, setShowAddressInput] = useState(false)
  const [email, setEmail] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const handlePostcodeCheck = () => {
    if (!postcode) return

    setIsChecking(true)

    // Simulate API call
    setTimeout(() => {
      setIsChecking(false)
      setShowAddressInput(true)
    }, 1500)
  }

  const handleAddressCheck = () => {
    if (!address) return

    setIsChecking(true)

    // Simulate API call - randomly determine eligibility for demo
    setTimeout(() => {
      const eligible = Math.random() > 0.3 // 70% chance of being eligible
      setCheckResult(eligible ? "eligible" : "not-eligible")
      setIsChecking(false)

      if (eligible) {
        setTimeout(() => {
          onEligibilityCheck(true)
        }, 2000)
      }
    }, 2000)
  }

  const handleRegisterInterest = () => {
    if (!email) return

    setIsRegistering(true)

    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false)
      setIsRegistered(true)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Address Eligibility</h2>
        <p className="text-gray-600">Enter your postcode to see if Lightspeed is available in your area</p>
      </div>

      <div className="space-y-6">
        {!showAddressInput && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <div className="flex space-x-2">
                <Input
                  id="postcode"
                  placeholder="e.g. SW1A 1AA"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handlePostcodeCheck}
                  disabled={!postcode || isChecking}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                  {isChecking ? "Checking..." : "Check"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showAddressInput && !checkResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="address">Select Your Address</Label>
                <select
                  id="address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                >
                  <option value="">Select your address</option>
                  <option value="1">123 Example Street</option>
                  <option value="2">124 Example Street</option>
                  <option value="3">125 Example Street</option>
                  <option value="4">126 Example Street</option>
                </select>
              </div>
              <Button
                onClick={handleAddressCheck}
                disabled={!address || isChecking}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isChecking ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {isChecking ? "Checking Eligibility..." : "Check Eligibility"}
              </Button>
            </motion.div>
          )}

          {checkResult === "eligible" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-green-50 rounded-xl border border-green-100"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Great news!</h3>
                  <p className="text-green-700">Your address is eligible for Lightspeed service.</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-green-700 mb-2">Redirecting you to package selection...</p>
                <div className="w-full bg-green-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {checkResult === "not-eligible" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-amber-50 rounded-xl border border-amber-100"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <XCircle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-800">We're not there yet</h3>
                  <p className="text-amber-700">Your address is not currently eligible for Lightspeed service.</p>
                </div>
              </div>

              {!isRegistered ? (
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-gray-600">
                    Register your interest and we'll notify you when service becomes available in your area.
                  </p>
                  <div className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleRegisterInterest}
                      disabled={!email || isRegistering}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isRegistering ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {isRegistering ? "Registering..." : "Register Interest"}
                    </Button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100 text-center"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">Thank you for your interest!</p>
                  <p className="text-sm text-green-600">
                    We'll notify you when Lightspeed becomes available in your area.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
