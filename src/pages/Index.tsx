import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeverityBadge from "@/components/SeverityBadge";
import {
  prefixes,
  suffixes,
  getExplanation,
} from "@/data/medicalTerms";

const Index = () => {
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [selectedSuffix, setSelectedSuffix] = useState("");

  const explanation = selectedPrefix && selectedSuffix
    ? getExplanation(selectedPrefix, selectedSuffix)
    : null;

  return (
    <div className="min-h-screen bg-[#e0e5ec] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-medical-dark mb-8 drop-shadow-[2px_2px_2px_rgba(255,255,255,0.7)]">
          MediMix
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)] rounded-xl p-2 transform-gpu">
            <Select onValueChange={setSelectedPrefix}>
              <SelectTrigger className="bg-[#e0e5ec] border-none shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)] transform-gpu transition-all duration-300 ease-out will-change-transform hover:scale-[1.02] active:scale-95 active:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] focus:outline-none">
                <SelectValue placeholder="Select prefix" />
              </SelectTrigger>
              <SelectContent>
                {prefixes.map((prefix) => (
                  <SelectItem key={prefix.value} value={prefix.value}>
                    {prefix.label} ({prefix.meaning})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)] rounded-xl p-2 transform-gpu">
            <Select onValueChange={setSelectedSuffix}>
              <SelectTrigger className="bg-[#e0e5ec] border-none shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.1)] transform-gpu transition-all duration-300 ease-out will-change-transform hover:scale-[1.02] active:scale-95 active:shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] focus:outline-none">
                <SelectValue placeholder="Select suffix" />
              </SelectTrigger>
              <SelectContent>
                {suffixes.map((suffix) => (
                  <SelectItem key={suffix.value} value={suffix.value}>
                    {suffix.label} ({suffix.meaning})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedPrefix && selectedSuffix && (
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
              <Card className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
                <CardContent className="py-6">
                  <p className="text-lg text-gray-600 text-center">
                    No explanation available for this combination yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;