"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Calendar, MapPin, Package, User, Phone, Home, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ConfirmationScreen() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadCalendar = () => {
    setIsDownloading(true)
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Installation Confirmed!</h2>
        <p className="text-gray-600">Your Lightspeed installation has been scheduled</p>
      </motion.div>

      <Card className="border-green-100">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Installation Details</h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Appointment Date & Time</p>
                <p className="text-gray-600">Monday, May 15, 2023 | 09:00 - 11:00</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Installation Address</p>
                <p className="text-gray-600">123 Example Street, London, SW1A 1AA</p>
              </div>
            </div>

            <div className="flex items-start">
              <Package className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Selected Package</p>
                <p className="text-gray-600">Standard - 300 Mbps | £39.99/month</p>
              </div>
            </div>

            <div className="flex items-start">
              <User className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Contact Person</p>
                <p className="text-gray-600">John Smith</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Contact Phone</p>
                <p className="text-gray-600">+44 7123 456789</p>
              </div>
            </div>

            <div className="flex items-start">
              <Home className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Property Type</p>
                <p className="text-gray-600">House</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
        <h4 className="font-medium text-amber-800 mb-2">What happens next?</h4>
        <ol className="list-decimal list-inside space-y-2 text-amber-700 text-sm">
          <li>You'll receive a confirmation email with all the details.</li>
          <li>Our technician will call you 30 minutes before arrival.</li>
          <li>Please ensure someone over 18 is present during installation.</li>
          <li>The installation typically takes 1-2 hours to complete.</li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Button variant="outline" className="flex items-center" onClick={handleDownloadCalendar}>
          <Download className="h-4 w-4 mr-2" />
          {isDownloading ? "Downloading..." : "Add to Calendar"}
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">Return to Homepage</Button>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Reference Number: LS-2023-05789</p>
        <p className="mt-1">
          Need help?{" "}
          <a href="#" className="text-green-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}
