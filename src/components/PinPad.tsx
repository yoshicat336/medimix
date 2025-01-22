import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PinPadProps {
  isOpen: boolean;
  onClose: () => void;
  onCorrectPin: () => void;
}

const PinPad = ({ isOpen, onClose, onCorrectPin }: PinPadProps) => {
  const [pin, setPin] = useState("");

  const validPins = ["1234", "5678", "9012", "3456"]; // Match with team members in ContributionManager

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + number);
    }
  };

  const handleClear = () => {
    setPin("");
  };

  const handleSubmit = () => {
    if (validPins.includes(pin)) {
      localStorage.setItem('adminPinCode', pin);
      onCorrectPin();
      setPin("");
    } else {
      toast.error("Invalid PIN");
      setPin("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-medical-dark">
            Enter Admin PIN
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-4 w-48">
              <div className="text-center text-2xl font-mono">
                {pin.split("").map((_, i) => "•").join("")}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <Button
                key={number}
                variant="outline"
                onClick={() => handleNumberClick(number.toString())}
                className="h-12 text-xl"
              >
                {number}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={handleClear}
              className="h-12"
            >
              Clear
            </Button>
            <Button
              variant="outline"
              onClick={() => handleNumberClick("0")}
              className="h-12 text-xl"
            >
              0
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              className="h-12"
            >
              Enter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PinPad;