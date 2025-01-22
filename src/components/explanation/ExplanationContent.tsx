import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import SeverityBadge from "@/components/SeverityBadge";
import { CombinationExplanation } from "@/data/types";

interface ExplanationContentProps {
  prefix: string;
  suffix: string;
  explanation: CombinationExplanation;
  onReportClick: () => void;
}

const ExplanationContent = ({ prefix, suffix, explanation, onReportClick }: ExplanationContentProps) => (
  <Card className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
    <CardHeader className="flex flex-row justify-between items-start">
      <CardTitle className="text-2xl text-medical">
        {prefix.charAt(0).toUpperCase() + prefix.slice(1)}
        {suffix}
      </CardTitle>
      <Button
        variant="ghost"
        size="sm"
        onClick={onReportClick}
        className="text-gray-500 hover:text-red-500 transition-colors"
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Report
      </Button>
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
);

export default ExplanationContent;