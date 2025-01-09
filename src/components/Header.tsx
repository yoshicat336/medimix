interface HeaderProps {
  onHomeClick?: () => void;
}

const Header = ({ onHomeClick }: HeaderProps) => {
  return (
    <h1 
      className="text-4xl font-bold text-center text-medical-dark mb-8 cursor-pointer"
      onClick={onHomeClick}
    >
      MediMix
    </h1>
  );
};

export default Header;