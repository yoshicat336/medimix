import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface HeaderProps {
  onHomeClick?: () => void;
}

const Header = ({ onHomeClick }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 
        className="text-4xl font-bold text-center text-medical-dark cursor-pointer"
        onClick={onHomeClick}
      >
        MediMix
      </h1>
      <Link to="/project-info">
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default Header;