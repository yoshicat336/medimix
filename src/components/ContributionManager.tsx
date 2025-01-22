import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { combinationExplanations } from "@/data/combinations";
import { supabase } from "@/integrations/supabase/client";
import { prefixes, suffixes } from "@/data/medicalTerms";
import TermSuggestionsSection from "./contribution/TermSuggestionsSection";
import ApprovedCombinationsSection from "./contribution/ApprovedCombinationsSection";
import ContributionsSection from "./contribution/ContributionsSection";
import ReportsSection from "./contribution/ReportsSection";
import { Contribution } from "@/data/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface ContributionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  greeting: string;
}

const getTeamMemberName = (pinCode: string) => {
  const teamMembers: Record<string, string> = {
    "1234": "August",
    "5678": "Sarah",
    "9012": "Michael",
    "3456": "Emma",
    // Add more team members and their pin codes here
  };
  return teamMembers[pinCode] || "Admin";
};

const ContributionManager = ({ isOpen, onClose, greeting }: ContributionManagerProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get the pin code from localStorage (set during PinPad entry)
  const pinCode = localStorage.getItem('adminPinCode') || "";
  const teamMemberName = getTeamMemberName(pinCode);
  const personalizedGreeting = `${greeting}, ${teamMemberName}`;

  const { data: contributions = [] } = useQuery({
    queryKey: ['contributions'],
    queryFn: () => {
      const savedContributions = localStorage.getItem('contributions');
      return savedContributions ? JSON.parse(savedContributions) : [];
    },
  });

  const { data: reports = [] } = useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      const savedReports = localStorage.getItem('reports');
      return savedReports ? JSON.parse(savedReports) : [];
    },
  });

  const handleApproveTermSuggestion = async (suggestion: any) => {
    try {
      const { error: updateError } = await supabase
        .from('term_suggestions')
        .update({ status: 'approved' })
        .eq('id', suggestion.id);

      if (updateError) throw updateError;

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

      await queryClient.invalidateQueries({ queryKey: ['term-suggestions'] });

      toast({
        title: "Success",
        description: `${suggestion.term} has been approved and added to the ${suggestion.type} list.`,
      });
    } catch (error) {
      console.error('Error approving term suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to approve suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDismissTermSuggestion = async (suggestion: any) => {
    try {
      const { error } = await supabase
        .from('term_suggestions')
        .update({ status: 'rejected' })
        .eq('id', suggestion.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['term-suggestions'] });

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

  const handleApproveContribution = async (contribution: Contribution) => {
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
      await queryClient.invalidateQueries({ queryKey: ['contributions'] });

      toast({
        title: "Success",
        description: `${contribution.prefix}${contribution.suffix} has been added to the database.`,
      });
    } catch (error) {
      console.error('Error in handleApprove:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDismissReport = async (reportIndex: number) => {
    const updatedReports = reports.filter((_, index) => index !== reportIndex);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
    await queryClient.invalidateQueries({ queryKey: ['reports'] });
    
    toast({
      title: "Success",
      description: "The report has been dismissed.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-medical-dark">
            {personalizedGreeting}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <TermSuggestionsSection
            onApprove={handleApproveTermSuggestion}
            onDismiss={handleDismissTermSuggestion}
          />
          <ApprovedCombinationsSection />
          <ContributionsSection
            contributions={contributions}
            onApprove={handleApproveContribution}
          />
          <ReportsSection
            reports={reports}
            onDismiss={handleDismissReport}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionManager;
