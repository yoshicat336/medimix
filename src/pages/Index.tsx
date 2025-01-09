import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TermSelectors from "@/components/TermSelectors";
import ExplanationCard from "@/components/ExplanationCard";
import Loader from "@/components/Loader";
import PinPad from "@/components/PinPad";
import ContributionManager from "@/components/ContributionManager";
import ContributionForm from "@/components/ContributionForm";
import { getExplanation } from "@/data/medicalTerms";

const Index = () => {
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [selectedSuffix, setSelectedSuffix] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPinPadOpen, setIsPinPadOpen] = useState(false);
  const [isContributionManagerOpen, setIsContributionManagerOpen] = useState(false);
  const [isContributionFormOpen, setIsContributionFormOpen] = useState(false);

  useEffect(() => {
    const duration = Math.floor(Math.random() * (9000 - 5000 + 1)) + 5000;
    setTimeout(() => setLoading(false), duration);
  }, []);

  const explanation = selectedPrefix && selectedSuffix
    ? getExplanation(selectedPrefix, selectedSuffix)
    : null;

  const handleLoaderClick = () => {
    setIsPinPadOpen(true);
  };

  const handleCorrectPin = () => {
    setIsPinPadOpen(false);
    setIsContributionManagerOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e0e5ec] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <Header />
          <div className="space-y-8">
            <div className="flex justify-center cursor-pointer" onClick={handleLoaderClick}>
              <Loader />
            </div>
            <p className="text-center text-medical-dark">Loading medical database...</p>
          </div>
        </div>
        <PinPad 
          isOpen={isPinPadOpen}
          onClose={() => setIsPinPadOpen(false)}
          onCorrectPin={handleCorrectPin}
        />
        <ContributionManager
          isOpen={isContributionManagerOpen}
          onClose={() => setIsContributionManagerOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e0e5ec] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Header />
        <TermSelectors
          selectedPrefix={selectedPrefix}
          selectedSuffix={selectedSuffix}
          onPrefixChange={setSelectedPrefix}
          onSuffixChange={setSelectedSuffix}
        />
        {selectedPrefix && selectedSuffix && (
          <ExplanationCard
            prefix={selectedPrefix}
            suffix={selectedSuffix}
            explanation={explanation}
            onSuggestDefinition={() => setIsContributionFormOpen(true)}
          />
        )}
      </div>
      <ContributionForm
        isOpen={isContributionFormOpen}
        onClose={() => setIsContributionFormOpen(false)}
        prefix={selectedPrefix}
        suffix={selectedSuffix}
      />
    </div>
  );
};

export default Index;