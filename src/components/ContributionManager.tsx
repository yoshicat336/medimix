import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SeverityLevel } from "@/data/types";
import { useToast } from "@/hooks/use-toast";
import { combinationExplanations } from "@/data/combinations";
import { supabase, fetchFromSupabase } from "@/integrations/supabase/client";
import { prefixes, suffixes } from "@/data/medicalTerms";

interface Contribution {
  prefix: string;
  suffix: string;
  plainLanguage: string;
  severity: SeverityLevel;
  reasoning: string;
  pronunciation: string;
  timestamp: Date;
}

interface Report {
  term: string;
  reason: string;
  timestamp: Date;
}

interface TermSuggestion {
  id: string;
  term: string;
  type: 'prefix' | 'suffix';
  meaning: string;
  status: string;
  created_at: string;
}

interface ContributionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  greeting: string;
}

const ContributionManager = ({ isOpen, onClose, greeting }: ContributionManagerProps) => {
  const { toast } = useToast();

  const { data: approvedCombinations, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['approved-combinations'],
    queryFn: async () => {
      try {
        const data = await fetchFromSupabase(async () => {
          const response = await supabase
            .from('approved_combinations')
            .select('*');
          return response;
        });
        return data || [];
      } catch (error) {
        console.error('Failed to fetch approved combinations:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: termSuggestions = [], refetch: refetchTermSuggestions } = useQuery({
    queryKey: ['term-suggestions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('term_suggestions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const getContributions = (): Contribution[] => {
    const savedContributions = localStorage.getItem('contributions');
    return savedContributions ? JSON.parse(savedContributions) : [];
  };

  const getReports = (): Report[] => {
    const savedReports = localStorage.getItem('reports');
    return savedReports ? JSON.parse(savedReports) : [];
  };

  const contributions = getContributions();
  const reports = getReports();

  const handleApproveTermSuggestion = async (suggestion: TermSuggestion) => {
    try {
      // Update the term suggestion status
      const { error: updateError } = await supabase
        .from('term_suggestions')
        .update({ status: 'approved' })
        .eq('id', suggestion.id);

      if (updateError) throw updateError;

      // Add to the appropriate list in medicalTerms
      if (suggestion.type === 'prefix') {
        prefixes.push({
          value: suggestion.term.toLowerCase(),
          label: suggestion.term + '-',
          meaning: suggestion.meaning
        });
      } else {
        suffixes.push({
          value: suggestion.term.toLowerCase(),
          label: '-' + suggestion.term,
          meaning: suggestion.meaning
        });
      }

      await refetchTermSuggestions();

      toast({
        title: "Success",
        description: `${suggestion.term} has been approved and added to the ${suggestion.type} list.`,
      });

      window.location.reload();
    } catch (error) {
      console.error('Error approving term suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to approve suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDismissTermSuggestion = async (suggestion: TermSuggestion) => {
    try {
      const { error } = await supabase
        .from('term_suggestions')
        .update({ status: 'rejected' })
        .eq('id', suggestion.id);

      if (error) throw error;

      await refetchTermSuggestions();

      toast({
        title: "Success",
        description: "The suggestion has been dismissed.",
      });
    } catch (error) {
      console.error('Error dismissing term suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to dismiss suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (contribution: Contribution) => {
    try {
      const { error } = await supabase
        .from('approved_combinations')
        .insert({
          prefix: contribution.prefix,
          suffix: contribution.suffix,
          plain_language: contribution.plainLanguage,
          severity: contribution.severity,
          reasoning: contribution.reasoning,
          pronunciation: contribution.pronunciation,
        });

      if (error) {
        console.error('Error inserting approved combination:', error);
        toast({
          title: "Error",
          description: "Failed to approve contribution. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const key = `${contribution.prefix}-${contribution.suffix}`;
      combinationExplanations[key] = {
        plainLanguage: contribution.plainLanguage,
        severity: contribution.severity,
        reasoning: contribution.reasoning,
        pronunciation: contribution.pronunciation,
      };

      const updatedContributions = contributions.filter(
        c => !(c.prefix === contribution.prefix && c.suffix === contribution.suffix)
      );
      localStorage.setItem('contributions', JSON.stringify(updatedContributions));

      await refetch();

      toast({
        title: "Success",
        description: `${contribution.prefix}${contribution.suffix} has been added to the database.`,
      });

      window.location.reload();
    } catch (error) {
      console.error('Error in handleApprove:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDismissReport = (reportIndex: number) => {
    const updatedReports = reports.filter((_, index) => index !== reportIndex);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
    
    toast({
      title: "Success",
      description: "The report has been dismissed.",
    });

    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-medical-dark">
            {greeting}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Term Suggestions Section */}
          <div className="p-4 bg-[#e0e5ec] rounded-lg shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)]">
            <h3 className="text-lg font-semibold mb-2 text-medical-dark">Term Suggestions</h3>
            <ul className="space-y-2">
              {termSuggestions.filter(s => s.status === 'pending').map((suggestion) => (
                <li key={suggestion.id} className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-medical-dark">
                        {suggestion.term} ({suggestion.type})
                      </h4>
                      <p className="text-sm text-gray-600">{suggestion.meaning}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Suggested: {new Date(suggestion.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApproveTermSuggestion(suggestion)}
                        className="bg-medical hover:bg-medical-dark text-white text-sm"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleDismissTermSuggestion(suggestion)}
                        className="bg-gray-500 hover:bg-gray-600 text-white text-sm"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
              {termSuggestions.filter(s => s.status === 'pending').length === 0 && (
                <li className="text-medical-dark">No pending term suggestions</li>
              )}
            </ul>
          </div>

          {/* Approved Combinations Section */}
          <div className="p-4 bg-[#e0e5ec] rounded-lg shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)]">
            <h3 className="text-lg font-semibold mb-2 text-medical-dark">Approved Combinations</h3>
            {isLoading ? (
              <p className="text-medical-dark">Loading approved combinations...</p>
            ) : isError ? (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  {error?.message || "Error loading approved combinations. Please try again."}
                </AlertDescription>
              </Alert>
            ) : (
              <ul className="space-y-2">
                {approvedCombinations && approvedCombinations.length > 0 ? (
                  approvedCombinations.map((combination) => (
                    <li key={combination.id} className="p-3 bg-white rounded-lg shadow-sm">
                      <div>
                        <h4 className="font-medium text-medical-dark">
                          {combination.prefix + combination.suffix}
                        </h4>
                        <p className="text-sm text-gray-600">{combination.plain_language}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Severity: {combination.severity}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-medical-dark">No approved combinations</li>
                )}
              </ul>
            )}
          </div>

          {/* Contributions Section */}
          <div className="p-4 bg-[#e0e5ec] rounded-lg shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)]">
            <h3 className="text-lg font-semibold mb-2 text-medical-dark">Recent Contributions</h3>
            <ul className="space-y-2">
              {contributions.length > 0 ? (
                contributions.map((contribution, index) => (
                  <li key={index} className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-medical-dark">
                          {contribution.prefix + contribution.suffix}
                        </h4>
                        <p className="text-sm text-gray-600">{contribution.plainLanguage}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Severity: {contribution.severity}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleApprove(contribution)}
                        className="bg-medical hover:bg-medical-dark text-white text-sm"
                      >
                        Approve
                      </Button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-medical-dark">No recent contributions</li>
              )}
            </ul>
          </div>

          {/* Reports Section */}
          <div className="p-4 bg-[#e0e5ec] rounded-lg shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)]">
            <h3 className="text-lg font-semibold mb-2 text-medical-dark">Reported Issues</h3>
            <ul className="space-y-2">
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <li key={index} className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-medical-dark">
                          {report.term}
                        </h4>
                        <p className="text-sm text-gray-600">{report.reason}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Reported: {new Date(report.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDismissReport(index)}
                        className="bg-gray-500 hover:bg-gray-600 text-white text-sm"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-medical-dark">No reported issues</li>
              )}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionManager;
