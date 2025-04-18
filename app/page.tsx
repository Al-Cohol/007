"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, MapPin, Calendar, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import AddressEligibilityChecker from "@/components/address-eligibility-checker"
import PackageSelection from "@/components/package-selection"
import AppointmentScheduler from "@/components/appointment-scheduler"
import InstallationDetails from "@/components/installation-details"
import ConfirmationScreen from "@/components/confirmation-screen"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [eligibilityChecked, setEligibilityChecked] = useState(false)
  const [isEligible, setIsEligible] = useState(false)

  const steps = [
    { id: 0, title: "Check Eligibility", icon: <MapPin className="h-5 w-5" /> },
    { id: 1, title: "Select Package", icon: <Home className="h-5 w-5" /> },
    { id: 2, title: "Schedule Installation", icon: <Calendar className="h-5 w-5" /> },
    { id: 3, title: "Installation Details", icon: <Info className="h-5 w-5" /> },
    { id: 4, title: "Confirmation", icon: <CheckCircle className="h-5 w-5" /> },
  ]

  const handleEligibilityCheck = (eligible: boolean) => {
    setEligibilityChecked(true)
    setIsEligible(eligible)
    if (eligible) {
      setCurrentStep(1)
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[50vh] bg-gradient-to-r from-green-400 to-emerald-600 overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "url('/placeholder.svg?height=1000&width=1000')",
              backgroundSize: "cover",
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Lightspeed Internet</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Ultra-fast fiber broadband for your home. Experience the future of connectivity today.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress Tracker */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-12">
          <div className="hidden md:flex items-center w-full max-w-4xl justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    currentStep >= index
                      ? "border-green-500 bg-green-50 text-green-500"
                      : "border-gray-200 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${currentStep >= index ? "text-green-500" : "text-gray-500"}`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block h-0.5 w-24 mt-6 ${
                      currentStep > index ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden text-center">
            <h2 className="text-xl font-semibold text-gray-800">{steps[currentStep].title}</h2>
            <div className="flex justify-center mt-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 mx-1 rounded-full ${currentStep >= index ? "bg-green-500" : "bg-gray-200"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border border-gray-100 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-6 md:p-8">
              {currentStep === 0 && <AddressEligibilityChecker onEligibilityCheck={handleEligibilityCheck} />}
              {currentStep === 1 && <PackageSelection onNext={handleNextStep} onBack={handlePreviousStep} />}
              {currentStep === 2 && <AppointmentScheduler onNext={handleNextStep} onBack={handlePreviousStep} />}
              {currentStep === 3 && <InstallationDetails onNext={handleNextStep} onBack={handlePreviousStep} />}
              {currentStep === 4 && <ConfirmationScreen />}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Features Section */}
      {currentStep === 0 && !eligibilityChecked && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="container mx-auto px-4 py-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Lightspeed?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Ultra-Fast Speeds",
                description: "Experience download speeds up to 1Gbps with our fiber optic network.",
                icon: "⚡",
              },
              {
                title: "Professional Installation",
                description: "Our expert technicians ensure your setup is optimized for performance.",
                icon: "🛠️",
              },
              {
                title: "Reliable Connection",
                description: "99.9% uptime guarantee with 24/7 technical support.",
                icon: "🔄",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="text-4xl mb-4 bg-green-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-green-600">Lightspeed</h3>
              <p className="text-gray-600 mt-2">The future of home internet</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                Coverage
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                Support
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Lightspeed Internet. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
