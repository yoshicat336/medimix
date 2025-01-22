import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CombinationExplanation } from "@/data/types";
import ReportForm from "./ReportForm";
import LoadingState from "./explanation/LoadingState";
import NoExplanation from "./explanation/NoExplanation";
import ExplanationContent from "./explanation/ExplanationContent";

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

  const { data: approvedExplanation, isLoading } = useQuery({
    queryKey: ['approved-combination', prefix, suffix],
    queryFn: async () => {
      try {
        console.log('Fetching approved combination for:', prefix, suffix);
        const { data, error } = await supabase
          .from('approved_combinations')
          .select('*')
          .eq('prefix', prefix)
          .eq('suffix', suffix)
          .maybeSingle();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        return data ? {
          plainLanguage: data.plain_language,
          severity: data.severity,
          reasoning: data.reasoning,
          pronunciation: data.pronunciation,
        } as CombinationExplanation : null;
      } catch (err) {
        console.error('Error in query function:', err);
        throw err;
      }
    },
    enabled: !!prefix && !!suffix,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) {
    return <LoadingState />;
  }

  const finalExplanation = approvedExplanation || explanation;

  if (!finalExplanation) {
    return <NoExplanation onSuggestDefinition={onSuggestDefinition} />;
  }

  return (
    <>
      <ExplanationContent
        prefix={prefix}
        suffix={suffix}
        explanation={finalExplanation}
        onReportClick={() => setIsReportFormOpen(true)}
      />
      <ReportForm
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        term={`${prefix}${suffix}`}
      />
    </>
  );
};

export default ExplanationCard;