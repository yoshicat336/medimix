import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const ApprovedCombinationsSection = () => {
  const { data: approvedCombinations, isError, error, isLoading } = useQuery({
    queryKey: ['approved-combinations'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('approved_combinations')
          .select('*');
        if (error) throw error;
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

  return (
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
  );
};

export default ApprovedCombinationsSection;