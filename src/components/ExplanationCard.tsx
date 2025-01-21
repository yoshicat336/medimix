import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeverityBadge from "@/components/SeverityBadge";
import { CombinationExplanation } from "@/data/types";
import ReportForm from "./ReportForm";
import { AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ExplanationCardProps {
  prefix: string;
  suffix: string;
  explanation: CombinationExplanation | null;
  onSuggestDefinition: () => void;
}

const ExplanationCard = ({
  prefix,
  suffix,
  explanation,
  onSuggestDefinition,
}: ExplanationCardProps) => {
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);

  const { data: approvedExplanation, isLoading, error } = useQuery({
    queryKey: ['approved-combination', prefix, suffix],
    queryFn: async () => {
      try {
        console.log('Fetching approved combination for:', prefix, suffix);
        const { data, error: supabaseError } = await supabase
          .from('approved_combinations')
          .select('*')
          .eq('prefix', prefix)
          .eq('suffix', suffix)
          .maybeSingle();

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          throw supabaseError;
        }

        console.log('Received data:', data);

        if (data) {
          return {
            plainLanguage: data.plain_language,
            severity: data.severity,
            reasoning: data.reasoning,
            pronunciation: data.pronunciation,
          } as CombinationExplanation;
        }

        return null;
      } catch (err) {
        console.error('Error in query function:', err);
        throw err;
      }
    },
    enabled: !!prefix && !!suffix,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  // Use approved explanation if available, otherwise fall back to hardcoded explanation
  const finalExplanation = approvedExplanation || explanation;

  if (isLoading) {
    return (
      <Card className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
        <CardContent className="py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error('Error loading explanation:', error);
    return (
      <Card className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
        <CardContent className="py-6">
          <p className="text-red-500">Error loading explanation. Please try again later.</p>
          <p className="text-sm text-gray-500 mt-2">Technical details: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!finalExplanation) {
    return (
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
  }

  return (
    <>
      <Card className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
        <CardHeader className="flex flex-row justify-between items-start">
          <CardTitle className="text-2xl text-medical">
            {prefix.charAt(0).toUpperCase() + prefix.slice(1)}
            {suffix}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsReportFormOpen(true)}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{finalExplanation.plainLanguage}</p>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Severity:</span>
            <SeverityBadge severity={finalExplanation.severity} />
          </div>
          <div className="mt-4">
            <p className="font-medium text-gray-700">Pronunciation:</p>
            <p className="text-lg italic text-gray-600">{finalExplanation.pronunciation}</p>
          </div>
          <p className="mt-4 text-gray-600">{finalExplanation.reasoning}</p>
        </CardContent>
      </Card>
      <ReportForm
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        term={`${prefix}${suffix}`}
      />
    </>
  );
};

export default ExplanationCard;