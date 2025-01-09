import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/select";
import { prefixes, suffixes } from "@/data/medicalTerms";

interface TermSelectorsProps {
  selectedPrefix: string;
  selectedSuffix: string;
  onPrefixChange: (value: string) => void;
  onSuffixChange: (value: string) => void;
}

const TermSelectors = ({
  selectedPrefix,
  selectedSuffix,
  onPrefixChange,
  onSuffixChange,
}: TermSelectorsProps) => {
  const selectTriggerClasses = `
    bg-[#e0e5ec] border-none 
    shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.2)]
    hover:shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(0,0,0,0.15)]
    hover:bg-[#e4e9f0]
    data-[state=open]:shadow-[-6px_-6px_12px_rgba(255,255,255,0.95),6px_6px_12px_rgba(0,0,0,0.25),0_0_15px_rgba(14,165,233,0.15)]
    data-[state=open]:bg-[#e8edf4]
    focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
    transition-all duration-300
  `.trim();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)] rounded-xl p-2">
        <Select onValueChange={onPrefixChange} value={selectedPrefix}>
          <SelectTrigger className={selectTriggerClasses}>
            <SelectValue placeholder="Select prefix" />
          </SelectTrigger>
          <SelectContent className="bg-[rgba(255,255,255,0.25)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-lg overflow-hidden">
            {prefixes.map((prefix) => (
              <SelectItem 
                key={prefix.value} 
                value={prefix.value}
                className="hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-200"
              >
                {prefix.label} ({prefix.meaning})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)] rounded-xl p-2">
        <Select onValueChange={onSuffixChange} value={selectedSuffix}>
          <SelectTrigger className={selectTriggerClasses}>
            <SelectValue placeholder="Select suffix" />
          </SelectTrigger>
          <SelectContent className="bg-[rgba(255,255,255,0.25)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-lg overflow-hidden">
            {suffixes.map((suffix) => (
              <SelectItem 
                key={suffix.value} 
                value={suffix.value}
                className="hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-200"
              >
                {suffix.label} ({suffix.meaning})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TermSelectors;