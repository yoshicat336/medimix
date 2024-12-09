import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/select";
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

  const selectTriggerClasses = `
    bg-[#e0e5ec] border-none 
    shadow-[-8px_-8px_15px_rgba(255,255,255,0.9),8px_8px_15px_rgba(0,0,0,0.15)]
    hover:shadow-[-6px_-6px_12px_rgba(255,255,255,0.95),6px_6px_12px_rgba(0,0,0,0.13)]
    hover:bg-[#e4e9f0]
    data-[state=open]:shadow-[-12px_-12px_20px_rgba(255,255,255,1),12px_12px_20px_rgba(0,0,0,0.2),0_0_30px_rgba(14,165,233,0.25)]
    data-[state=open]:bg-[#e8edf4]
    focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
    transition-all duration-300
  `.trim();

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
          animate-fade-in
          bg-gradient-to-r from-[#e0e5ec] via-[#e8edf4] to-[#e0e5ec]
        ">
          MediMix
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)] rounded-xl p-2">
            <Select onValueChange={setSelectedPrefix}>
              <SelectTrigger className={selectTriggerClasses}>
                <SelectValue placeholder="Select prefix" />
              </SelectTrigger>
              <SelectContent className="bg-[#e0e5ec] border-none shadow-lg">
                {prefixes.map((prefix) => (
                  <SelectItem key={prefix.value} value={prefix.value}>
                    {prefix.label} ({prefix.meaning})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.8),inset_5px_5px_10px_rgba(0,0,0,0.1)] rounded-xl p-2">
            <Select onValueChange={setSelectedSuffix}>
              <SelectTrigger className={selectTriggerClasses}>
                <SelectValue placeholder="Select suffix" />
              </SelectTrigger>
              <SelectContent className="bg-[#e0e5ec] border-none shadow-lg">
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