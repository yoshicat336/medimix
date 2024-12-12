import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeverityBadge from "@/components/SeverityBadge";
import Loader from "@/components/Loader";
import {
  prefixes,
  suffixes,
  getExplanation,
} from "@/data/medicalTerms";

const Index = () => {
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [selectedSuffix, setSelectedSuffix] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = Math.floor(Math.random() * (9000 - 5000 + 1)) + 5000;

    const handleAnimationEnd = () => {
      setShowContent(true);
    };

    const element = loaderRef.current?.querySelector('.item3');
    element?.addEventListener("animationend", handleAnimationEnd);

    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, duration);

    return () => {
      element?.removeEventListener("animationend", handleAnimationEnd);
      clearTimeout(timer);
    };
  }, []);

  const explanation =
    selectedPrefix && selectedSuffix
      ? getExplanation(selectedPrefix, selectedSuffix)
      : null;

  if (loading && !showContent) {
    return (
      <div className="min-h-screen bg-[#e0e5ec] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-center text-medical-dark mb-8">
            MediMix
          </h1>
          <div className="space-y-8">
            <div className="flex justify-center" ref={loaderRef}>
              <Loader />
            </div>
            <p className="text-center text-medical-dark">
              Loading medical database...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e0e5ec] p-6 animate-spring-in">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-medical-dark mb-8">
          MediMix
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="shadow rounded-xl p-2">
            <Select onValueChange={setSelectedPrefix}>
              <SelectTrigger className="select-trigger">
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

          <div className="shadow rounded-xl p-2">
            <Select onValueChange={setSelectedSuffix}>
              <SelectTrigger className="select-trigger">
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
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedPrefix.charAt(0).toUpperCase() +
                      selectedPrefix.slice(1)}
                    {selectedSuffix}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{explanation.plainLanguage}</p>
                  <div>
                    <span>Severity:</span>
                    <SeverityBadge severity={explanation.severity} />
                  </div>
                  <p>Pronunciation: {explanation.pronunciation}</p>
                  <p>{explanation.reasoning}</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <p>No explanation available for this combination yet.</p>
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
