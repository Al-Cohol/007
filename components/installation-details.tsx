"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, Home, Key, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface InstallationDetailsProps {
  onNext: () => void
  onBack: () => void
}

export default function InstallationDetails({ onNext, onBack }: InstallationDetailsProps) {
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [accessInfo, setAccessInfo] = useState("")
  const [existingProvider, setExistingProvider] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [specialRequirements, setSpecialRequirements] = useState("")
  const [hasExistingWiring, setHasExistingWiring] = useState<boolean | null>(null)
  const [isFormValid, setIsFormValid] = useState(false)

  // Validate form whenever any field changes
  const validateForm = () => {
    const isValid =
      contactName.trim() !== "" && contactPhone.trim() !== "" && propertyType !== "" && hasExistingWiring !== null

    setIsFormValid(isValid)
  }

  // Update validation when form fields change
  useState(() => {
    validateForm()
  })

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Installation Details</h2>
        <p className="text-gray-600">Help us prepare for your installation by providing a few details</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <Home className="h-5 w-5 mr-2 text-green-600" />
            Contact Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name*</Label>
              <Input
                id="contactName"
                placeholder="Full name"
                value={contactName}
                onChange={(e) => {
                  setContactName(e.target.value)
                  validateForm()
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone*</Label>
              <Input
                id="contactPhone"
                placeholder="Phone number"
                value={contactPhone}
                onChange={(e) => {
                  setContactPhone(e.target.value)
                  validateForm()
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <Key className="h-5 w-5 mr-2 text-green-600" />
            Property Access
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type*</Label>
              <RadioGroup
                value={propertyType}
                onValueChange={(value) => {
                  setPropertyType(value)
                  validateForm()
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="house" id="house" />
                  <Label htmlFor="house">House</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flat" id="flat" />
                  <Label htmlFor="flat">Flat/Apartment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business">Business Premises</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessInfo">Access Information</Label>
              <Textarea
                id="accessInfo"
                placeholder="E.g., entry code, parking instructions, etc."
                value={accessInfo}
                onChange={(e) => setAccessInfo(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <Info className="h-5 w-5 mr-2 text-green-600" />
            Technical Information
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Do you have existing telephone/broadband wiring?*</Label>
              <RadioGroup
                value={hasExistingWiring ? "yes" : hasExistingWiring === false ? "no" : ""}
                onValueChange={(value) => {
                  setHasExistingWiring(value === "yes")
                  validateForm()
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="wiring-yes" />
                  <Label htmlFor="wiring-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="wiring-no" />
                  <Label htmlFor="wiring-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="existingProvider">Current Internet Provider (if any)</Label>
              <Input
                id="existingProvider"
                placeholder="E.g., BT, Sky, Virgin Media"
                value={existingProvider}
                onChange={(e) => setExistingProvider(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements or Notes</Label>
              <Textarea
                id="specialRequirements"
                placeholder="Any additional information that might help our technician"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-2 mt-6">
        <Checkbox id="terms" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            By proceeding, you agree to our{" "}
            <a href="#" className="text-green-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!isFormValid} className="bg-green-600 hover:bg-green-700">
          Review & Confirm
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
