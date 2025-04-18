"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Zap, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PackageSelectionProps {
  onNext: () => void
  onBack: () => void
}

export default function PackageSelection({ onNext, onBack }: PackageSelectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const packages = [
    {
      id: "basic",
      name: "Basic",
      speed: "100 Mbps",
      price: 29.99,
      features: ["100 Mbps download speed", "30 Mbps upload speed", "Unlimited data", "Wi-Fi router included"],
      popular: false,
    },
    {
      id: "standard",
      name: "Standard",
      speed: "300 Mbps",
      price: 39.99,
      features: [
        "300 Mbps download speed",
        "100 Mbps upload speed",
        "Unlimited data",
        "Wi-Fi 6 router included",
        "Basic security package",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      speed: "1 Gbps",
      price: 59.99,
      features: [
        "1 Gbps download speed",
        "500 Mbps upload speed",
        "Unlimited data",
        "Wi-Fi 6 mesh system included",
        "Advanced security package",
        "Priority customer support",
      ],
      popular: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Package</h2>
        <p className="text-gray-600">Choose the internet package that best suits your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <motion.div key={pkg.id} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card
              className={`h-full overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                selectedPackage === pkg.id
                  ? "border-green-500 shadow-lg shadow-green-100"
                  : "border-gray-100 hover:border-green-200"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <CardContent className="p-6 flex flex-col h-full">
                {pkg.popular && <Badge className="self-start mb-2 bg-green-500 hover:bg-green-600">Most Popular</Badge>}
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-green-600">£{pkg.price}</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg mb-4 flex items-center">
                  <Zap className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold">{pkg.speed}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-grow">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {selectedPackage === pkg.id && (
                  <div className="bg-green-50 p-2 rounded-lg text-center text-green-700 text-sm font-medium">
                    Package Selected
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!selectedPackage} className="bg-green-600 hover:bg-green-700">
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
