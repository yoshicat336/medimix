import { Button } from "@/components/ui/button";
import { Report } from "@/data/types";

interface ReportsSectionProps {
  reports: Report[];
  onDismiss: (reportIndex: number) => void;
}

const ReportsSection = ({ reports, onDismiss }: ReportsSectionProps) => {
  return (
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
                  onClick={() => onDismiss(index)}
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
  );
};

export default ReportsSection;