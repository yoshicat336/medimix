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
        className="text-4xl font-bold text-center text-[#6E59A5] cursor-pointer"
        onClick={onHomeClick}
      >
        MediMix
      </h1>
      <Link to="/project-info">
        <Button variant="ghost" size="icon" className="text-[#7E69AB] hover:text-[#6E59A5]">
          <Info className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default Header;