import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MedicalTermSelector from "@/components/MedicalTermSelector";
import ExplanationCard from "@/components/ExplanationCard";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [selectedSuffix, setSelectedSuffix] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const duration = Math.floor(Math.random() * (9000 - 5000 + 1)) + 5000;
    setTimeout(() => setLoading(false), duration);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#e0e5ec] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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
          bg-gradient-to-r from-[#e0e5ec] via-[#e8edf4] to-[#e0e5ec]
        ">
          MediMix
        </h1>

        <MedicalTermSelector
          selectedPrefix={selectedPrefix}
          selectedSuffix={selectedSuffix}
          setSelectedPrefix={setSelectedPrefix}
          setSelectedSuffix={setSelectedSuffix}
        />

        <ExplanationCard
          selectedPrefix={selectedPrefix}
          selectedSuffix={selectedSuffix}
        />

        <ContactForm />
      </div>
    </div>
  );
};

export default Index;