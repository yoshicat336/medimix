import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface TermSuggestion {
  id: string;
  term: string;
  type: 'prefix' | 'suffix';
  meaning: string;
  status: string;
  created_at: string;
}

interface TermSuggestionsSectionProps {
  onApprove: (suggestion: TermSuggestion) => Promise<void>;
  onDismiss: (suggestion: TermSuggestion) => Promise<void>;
}

const TermSuggestionsSection = ({ onApprove, onDismiss }: TermSuggestionsSectionProps) => {
  const { data: termSuggestions = [], isLoading, error } = useQuery({
    queryKey: ['term-suggestions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('term_suggestions')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return <div>Loading suggestions...</div>;
  }

  if (error) {
    return <div>Error loading suggestions: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-[#e0e5ec] rounded-lg shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)]">
      <h3 className="text-lg font-semibold mb-2 text-medical-dark">Term Suggestions</h3>
      <ul className="space-y-2">
        {termSuggestions.length > 0 ? (
          termSuggestions.map((suggestion) => (
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
                    onClick={() => onApprove(suggestion)}
                    className="bg-medical hover:bg-medical-dark text-white text-sm"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => onDismiss(suggestion)}
                    className="bg-gray-500 hover:bg-gray-600 text-white text-sm"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-medical-dark">No pending term suggestions</li>
        )}
      </ul>
    </div>
  );
};

export default TermSuggestionsSection;