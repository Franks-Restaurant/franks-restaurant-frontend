
import React, { useState } from 'react';
import { format } from "date-fns";
import { Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const AVAILABLE_TIMES = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "5:00 PM",
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
  "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
];

interface TableBookingProps {
  customButton?: React.ReactNode;
}

const TableBooking = ({ customButton }: TableBookingProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  const handleBooking = () => {
    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }
    
    toast.success("Table booked successfully!", {
      description: `Your table has been booked for ${format(date, "PPP")} at ${time} for ${guests} guests.`
    });
    setIsOpen(false);
  };

  const defaultButton = (
    <Button
      size="sm" 
      variant="outline"
      className="bg-white hover:bg-gray-50 border-none"
    >
      Book a Table
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {customButton || defaultButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair">Book a Table</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border pointer-events-auto"
              disabled={(date) => date < new Date()}
            />
          </div>
          {date && (
            <>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Select Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_TIMES.map((t) => (
                    <Button
                      key={t}
                      variant={time === t ? "default" : "outline"}
                      onClick={() => setTime(t)}
                      className="text-sm"
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Number of Guests</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => guests > 1 && setGuests(guests - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => guests < 10 && setGuests(guests + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
          <Button
            onClick={handleBooking}
            className="mt-4 bg-restaurant-primary"
            disabled={!date || !time}
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TableBooking;
