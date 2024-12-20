import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PinPadProps {
  isOpen: boolean;
  onClose: () => void;
  onCorrectPin: () => void;
}

const PinPad = ({ isOpen, onClose, onCorrectPin }: PinPadProps) => {
  const [pin, setPin] = useState("");
  const correctPin = "0312";

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      const newPin = pin + number;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          onCorrectPin();
          setPin("");
        } else {
          setPin("");
        }
      }
    }
  };

  const handleClear = () => {
    setPin("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      onClose();
      setPin("");
    }}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-medical-dark">Enter Admin PIN</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-[#e0e5ec] p-4 rounded-lg shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)]">
              {Array(4).fill(0).map((_, i) => (
                <span key={i} className="mx-2 text-2xl">
                  {pin[i] ? "•" : "_"}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "←"].map((num) => (
              <Button
                key={num}
                onClick={() => {
                  if (num === "C") {
                    handleClear();
                  } else if (num === "←") {
                    setPin(pin.slice(0, -1));
                  } else {
                    handleNumberClick(num.toString());
                  }
                }}
                className="bg-[#e0e5ec] border-none text-medical-dark text-xl h-14
                  shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.2)]
                  hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.2)]
                  active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.2)]"
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PinPad;