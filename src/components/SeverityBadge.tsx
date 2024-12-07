import { cn } from "@/lib/utils";

type SeverityLevel = "low" | "moderate" | "high" | "severe";

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const colors: Record<SeverityLevel, string> = {
    low: "bg-green-100/50 text-green-800 shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]",
    moderate: "bg-yellow-100/50 text-yellow-800 shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]",
    high: "bg-orange-100/50 text-orange-800 shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]",
    severe: "bg-red-100/50 text-red-800 shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium",
        colors[severity]
      )}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
};

export default SeverityBadge;