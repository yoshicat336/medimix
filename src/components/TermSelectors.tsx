import React, { useState } from "react";
import { prefixes, suffixes } from "@/data/medicalTerms";
import { combinationExplanations } from "@/data/combinations";
import SuggestTermForm from "./SuggestTermForm";
import RandomButton from "./term-selector/RandomButton";
import SuggestButton from "./term-selector/SuggestButton";
import TermSelect from "./term-selector/TermSelect";

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

  const getValidCombinations = (type: 'prefix' | 'suffix') => {
    const terms = type === 'prefix' ? prefixes : suffixes;
    return terms.filter(term => {
      if (type === 'prefix') {
        return suffixes.some(suffix => {
          const combo = combinationExplanations[`${term.value}-${suffix.value}`];
          return combo && combo.plainLanguage && combo.severity && combo.reasoning && combo.pronunciation;
        });
      } else {
        return prefixes.some(prefix => {
          const combo = combinationExplanations[`${prefix.value}-${term.value}`];
          return combo && combo.plainLanguage && combo.severity && combo.reasoning && combo.pronunciation;
        });
      }
    });
  };

  const handleRandomSelection = async (type: 'prefix' | 'suffix') => {
    try {
      setIsLoading(true);
      const validTerms = getValidCombinations(type);
      
      if (validTerms.length > 0) {
        const randomIndex = Math.floor(Math.random() * validTerms.length);
        const selectedTerm = validTerms[randomIndex].value;
        
        if (type === 'prefix') {
          onPrefixChange(selectedTerm);
        } else {
          onSuffixChange(selectedTerm);
        }
      }
    } catch (error) {
      console.error(`Error selecting random ${type}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <div className="flex gap-2">
          <RandomButton
            type="prefix"
            onClick={() => handleRandomSelection('prefix')}
            isLoading={isLoading}
          />
          <SuggestButton
            onClick={() => setIsSuggestPrefixOpen(true)}
            isLoading={isLoading}
          />
        </div>
        <div className="shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)] rounded-xl p-2">
          <TermSelect
            terms={prefixes}
            value={selectedPrefix}
            onChange={onPrefixChange}
            placeholder="Select prefix"
            selectTriggerClasses={selectTriggerClasses}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <RandomButton
            type="suffix"
            onClick={() => handleRandomSelection('suffix')}
            isLoading={isLoading}
          />
          <SuggestButton
            onClick={() => setIsSuggestSuffixOpen(true)}
            isLoading={isLoading}
          />
        </div>
        <div className="shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.15)] rounded-xl p-2">
          <TermSelect
            terms={suffixes}
            value={selectedSuffix}
            onChange={onSuffixChange}
            placeholder="Select suffix"
            selectTriggerClasses={selectTriggerClasses}
          />
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