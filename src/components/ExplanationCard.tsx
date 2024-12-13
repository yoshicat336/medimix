import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeverityBadge from "@/components/SeverityBadge";
import { getExplanation } from "@/data/medicalTerms";

interface ExplanationCardProps {
  selectedPrefix: string;
  selectedSuffix: string;
}

const ExplanationCard = ({ selectedPrefix, selectedSuffix }: ExplanationCardProps) => {
  const explanation = selectedPrefix && selectedSuffix
    ? getExplanation(selectedPrefix, selectedSuffix)
    : null;

  if (!selectedPrefix || !selectedSuffix) return null;

  return (
    <div className="space-y-4">
      {explanation ? (
        <Card className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
          <CardHeader>
            <CardTitle className="text-2xl text-medical">
              {selectedPrefix.charAt(0).toUpperCase() + selectedPrefix.slice(1)}
              {selectedSuffix}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{explanation.plainLanguage}</p>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Severity:</span>
              <SeverityBadge severity={explanation.severity} />
            </div>
            <div className="mt-4">
              <p className="font-medium text-gray-700">Pronunciation:</p>
              <p className="text-lg italic text-gray-600">{explanation.pronunciation}</p>
            </div>
            <p className="mt-4 text-gray-600">{explanation.reasoning}</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px rgba(0,0,0,0.1)]">
          <CardContent className="py-6">
            <p className="text-lg text-gray-600 text-center">
              No explanation available for this combination yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExplanationCard;