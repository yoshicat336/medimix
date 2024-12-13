import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PinPad = ({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) => {
  const [pin, setPin] = useState('');

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      const newPin = pin + number;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === '0312') {
          onSuccess();
          setPin('');
        } else {
          setPin('');
        }
      }
    }
  };

  const handleClear = () => {
    setPin('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-center space-x-2">
              {[1,2,3,4].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    pin.length > index - 1
                      ? 'bg-medical'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6,7,8,9].map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number.toString())}
                className="p-4 bg-[#e0e5ec] rounded-lg
                  shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.2)]
                  hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.2)]
                  active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.2)]
                  transition-all duration-200"
              >
                {number}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="p-4 bg-[#e0e5ec] rounded-lg
                shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.2)]
                hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.2)]
                active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.2)]
                transition-all duration-200"
            >
              C
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              className="p-4 bg-[#e0e5ec] rounded-lg
                shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.2)]
                hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.2)]
                active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.2)]
                transition-all duration-200"
            >
              0
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PinPad;