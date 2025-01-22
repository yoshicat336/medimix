import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

interface RandomButtonProps {
  type: 'prefix' | 'suffix';
  onClick: () => void;
  isLoading: boolean;
}

const RandomButton = ({ type, onClick, isLoading }: RandomButtonProps) => (
  <Button 
    variant="outline" 
    onClick={onClick}
    disabled={isLoading}
    className="flex-1 bg-[#e0e5ec] border-none shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.2)] hover:shadow-[-2px_-2px_4px_rgba(255,255,255,0.9),2px_2px_4px_rgba(0,0,0,0.15)]"
  >
    <Shuffle className="mr-2 h-4 w-4" />
    {isLoading ? "Selecting..." : `Random ${type}`}
  </Button>
);

export default RandomButton;