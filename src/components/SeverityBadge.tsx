import { cn } from "@/lib/utils";

type SeverityLevel = "low" | "moderate" | "high" | "severe";

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const colors: Record<SeverityLevel, string> = {
    low: "bg-green-100 text-green-800 border-green-200",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    severe: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium border",
        colors[severity]
      )}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
};

export default SeverityBadge;