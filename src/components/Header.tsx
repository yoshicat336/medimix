import React from "react";

const Header = () => (
  <h1 className="text-4xl font-bold text-center text-medical-dark mb-8 
    relative
    before:content-[''] before:absolute before:inset-0
    before:bg-[#e0e5ec]
    before:transform before:translate-x-1 before:translate-y-1
    before:rounded-lg before:-z-10
    after:content-[''] after:absolute after:inset-0
    after:bg-[#e0e5ec]
    after:transform after:-translate-x-1 after:-translate-y-1
    after:rounded-lg after:-z-10
    shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.15)]
    p-4 rounded-lg
    hover:shadow-[-8px_-8px_15px_rgba(255,255,255,0.95),8px_8px_15px_rgba(0,0,0,0.2)]
    transition-all duration-300
    bg-gradient-to-r from-[#e0e5ec] via-[#e8edf4] to-[#e0e5ec]">
    MediMix
  </h1>
);

export default Header;