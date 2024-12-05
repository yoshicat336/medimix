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
    <div className="min-h-screen bg-gradient-to-b from-medical-light to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-medical-dark mb-8">
          MediMix
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select onValueChange={setSelectedPrefix}>
            <SelectTrigger>
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

          <Select onValueChange={setSelectedSuffix}>
            <SelectTrigger>
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

        {selectedPrefix && selectedSuffix && (
          <div className="space-y-4">
            {explanation ? (
              <Card>
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
                    <SeverityBadge severity={explanation.severity || "moderate"} />
                  </div>
                  <div className="mt-4">
                    <p className="font-medium text-gray-700">Pronunciation:</p>
                    <p className="text-lg italic text-gray-600">{explanation.pronunciation}</p>
                  </div>
                  <p className="mt-4 text-gray-600">{explanation.reasoning}</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
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