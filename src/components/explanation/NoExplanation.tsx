import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NoExplanationProps {
  onSuggestDefinition: () => void;
}

const NoExplanation = ({ onSuggestDefinition }: NoExplanationProps) => (
  <Card className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[-12px_-12px_24px_rgba(255,255,255,0.9),12px_12px_24px_rgba(0,0,0,0.15)] transition-all duration-300">
    <CardContent className="py-6 space-y-4">
      <p className="text-lg text-gray-600 text-center">
        No explanation available for this combination yet.
      </p>
      <div className="flex justify-center">
        <Button
          onClick={onSuggestDefinition}
          className="bg-[#e0e5ec] text-medical-dark hover:text-medical shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)] hover:shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300"
        >
          Suggest Definition
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default NoExplanation;