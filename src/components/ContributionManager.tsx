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
import { useQuery } from "@tanstack/react-query";

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