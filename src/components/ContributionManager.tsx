import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SeverityLevel } from "@/data/types";

interface Contribution {
  prefix: string;
  suffix: string;
  plainLanguage: string;
  severity: SeverityLevel;
  reasoning: string;
  pronunciation: string;
  timestamp: Date;
}

interface ContributionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  greeting: string;
}

const ContributionManager = ({ isOpen, onClose, greeting }: ContributionManagerProps) => {
  // This would typically come from a database, but for now we'll get it from localStorage
  const getContributions = (): Contribution[] => {
    const savedContributions = localStorage.getItem('contributions');
    return savedContributions ? JSON.parse(savedContributions) : [];
  };

  const contributions = getContributions();

  const handleApprove = (contribution: Contribution) => {
    // This would typically make an API call to update the database
    console.log('Approved contribution:', contribution);
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionManager;