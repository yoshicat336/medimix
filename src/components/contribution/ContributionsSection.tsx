import { Button } from "@/components/ui/button";
import { Contribution } from "@/data/types";

interface ContributionsSectionProps {
  contributions: Contribution[];
  onApprove: (contribution: Contribution) => Promise<void>;
}

const ContributionsSection = ({ contributions, onApprove }: ContributionsSectionProps) => {
  return (
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
                  onClick={() => onApprove(contribution)}
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
  );
};

export default ContributionsSection;