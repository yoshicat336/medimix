import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SeverityBadge from "@/components/SeverityBadge";
import {
  prefixes,
  suffixes,
  getExplanation,
} from "@/data/medicalTerms";

const Index = () => {
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [selectedSuffix, setSelectedSuffix] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = Math.floor(Math.random() * (9000 - 5000 + 1)) + 5000; // Random duration between 5-9 seconds
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      if (elapsed < duration) {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => setLoading(false), 200); // Small delay after reaching 100%
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  const explanation = selectedPrefix && selectedSuffix
    ? getExplanation(selectedPrefix, selectedSuffix)
    : null;

  const selectTriggerClasses = `
    bg-[#e0e5ec] border-none 
    shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.2)]
    hover:shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(0,0,0,0.15)]
    hover:bg-[#e4e9f0]
    data-[state=open]:shadow-[-6px_-6px_12px_rgba(255,255,255,0.95),6px_6px_12px_rgba(0,0,0,0.25),0_0_15px_rgba(14,165,233,0.15)]
    data-[state=open]:bg-[#e8edf4]
    focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
    transition-all duration-300
  `.trim();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e0e5ec] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-center text-medical-dark mb-8">
            MediMix
          </h1>
          <div className="space-y-4">
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-center text-medical-dark">Loading medical database...</p>
          </div>
        </div>
      </div>
    );
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)] rounded-xl p-2">
            <Select onValueChange={setSelectedPrefix}>
              <SelectTrigger className={selectTriggerClasses}>
                <SelectValue placeholder="Select prefix" />
              </SelectTrigger>
              <SelectContent className="bg-[rgba(255,255,255,0.25)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-lg overflow-hidden">
                {prefixes.map((prefix) => (
                  <SelectItem 
                    key={prefix.value} 
                    value={prefix.value}
                    className="hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-200"
                  >
                    {prefix.label} ({prefix.meaning})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)] rounded-xl p-2">
            <Select onValueChange={setSelectedSuffix}>
              <SelectTrigger className={selectTriggerClasses}>
                <SelectValue placeholder="Select suffix" />
              </SelectTrigger>
              <SelectContent className="bg-[rgba(255,255,255,0.25)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-lg overflow-hidden">
                {suffixes.map((suffix) => (
                  <SelectItem 
                    key={suffix.value} 
                    value={suffix.value}
                    className="hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-200"
                  >
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