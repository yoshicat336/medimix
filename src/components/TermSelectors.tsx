import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import { Shuffle, Plus } from "lucide-react";
import { prefixes, suffixes } from "@/data/medicalTerms";
import SuggestTermForm from "./SuggestTermForm";
import { useToast } from "@/hooks/use-toast";

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
  const [isSuggestPrefixOpen, setIsSuggestPrefixOpen] = useState(false);
  const [isSuggestSuffixOpen, setIsSuggestSuffixOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
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

  const handleRandomSelection = async (type: 'prefix' | 'suffix') => {
    try {
      setIsLoading(true);
      const terms = type === 'prefix' ? prefixes : suffixes;
      const randomIndex = Math.floor(Math.random() * terms.length);
      const selectedTerm = terms[randomIndex].value;
      
      if (type === 'prefix') {
        onPrefixChange(selectedTerm);
      } else {
        onSuffixChange(selectedTerm);
      }

      toast({
        title: "Random term selected",
        description: `Selected ${type}: ${terms[randomIndex].label}`,
      });
    } catch (error) {
      console.error(`Error selecting random ${type}:`, error);
      toast({
        title: "Error",
        description: `Failed to select random ${type}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleRandomSelection('prefix')}
            disabled={isLoading}
            className="flex-1 bg-[#e0e5ec] border-none shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.2)] hover:shadow-[-2px_-2px_4px_rgba(255,255,255,0.9),2px_2px_4px_rgba(0,0,0,0.15)]"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            {isLoading ? "Selecting..." : "Random Prefix"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsSuggestPrefixOpen(true)}
            disabled={isLoading}
            className="bg-[#e0e5ec] border-none shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.2)] hover:shadow-[-2px_-2px_4px_rgba(255,255,255,0.9),2px_2px_4px_rgba(0,0,0,0.15)]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Suggest New
          </Button>
        </div>
        <div className="shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)] rounded-xl p-2">
          <Select onValueChange={onPrefixChange} value={selectedPrefix}>
            <SelectTrigger className={selectTriggerClasses}>
              <SelectValue placeholder="Select prefix" />
            </SelectTrigger>
            <SelectContent className="bg-white backdrop-blur-[12px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-lg overflow-hidden">
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
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleRandomSelection('suffix')}
            disabled={isLoading}
            className="flex-1 bg-[#e0e5ec] border-none shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.2)] hover:shadow-[-2px_-2px_4px_rgba(255,255,255,0.9),2px_2px_4px_rgba(0,0,0,0.15)]"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            {isLoading ? "Selecting..." : "Random Suffix"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsSuggestSuffixOpen(true)}
            disabled={isLoading}
            className="bg-[#e0e5ec] border-none shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.2)] hover:shadow-[-2px_-2px_4px_rgba(255,255,255,0.9),2px_2px_4px_rgba(0,0,0,0.15)]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Suggest New
          </Button>
        </div>
        <div className="shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)] rounded-xl p-2">
          <Select onValueChange={onSuffixChange} value={selectedSuffix}>
            <SelectTrigger className={selectTriggerClasses}>
              <SelectValue placeholder="Select suffix" />
            </SelectTrigger>
            <SelectContent className="bg-white backdrop-blur-[12px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-lg overflow-hidden">
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

      <SuggestTermForm
        isOpen={isSuggestPrefixOpen}
        onClose={() => setIsSuggestPrefixOpen(false)}
        type="prefix"
      />
      <SuggestTermForm
        isOpen={isSuggestSuffixOpen}
        onClose={() => setIsSuggestSuffixOpen(false)}
        type="suffix"
      />
    </div>
  );
};

export default TermSelectors;