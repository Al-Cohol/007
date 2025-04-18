"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Clock, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface AppointmentSchedulerProps {
  onNext: () => void
  onBack: () => void
}

export default function AppointmentScheduler({ onNext, onBack }: AppointmentSchedulerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)

  // Generate available time slots (in a real app, these would come from an API)
  const timeSlots = ["09:00 - 11:00", "11:00 - 13:00", "13:00 - 15:00", "15:00 - 17:00", "17:00 - 19:00"]

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return date < today || date.getDay() === 0 || date.getDay() === 6
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule Your Installation</h2>
        <p className="text-gray-600">Select a convenient date and time for our technician to visit</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-green-600" />
            Select a Date
          </h3>

          <div className="border rounded-xl p-4 bg-white">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} disabled={disabledDays} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            Select a Time Slot
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {timeSlots.map((slot) => (
              <motion.div key={slot} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedTimeSlot === slot
                      ? "border-green-500 bg-green-50"
                      : "border-gray-100 hover:border-green-200"
                  }`}
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium">{slot}</span>
                    {selectedTimeSlot === slot && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
        <p className="text-amber-800 text-sm">
          <strong>Note:</strong> A Lightspeed technician will arrive during your selected time slot. Please ensure
          someone over 18 is present at the property.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!date || !selectedTimeSlot} className="bg-green-600 hover:bg-green-700">
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
