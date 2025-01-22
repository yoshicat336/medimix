import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/select";

interface Term {
  value: string;
  label: string;
  meaning: string;
}

interface TermSelectProps {
  terms: Term[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  selectTriggerClasses: string;
}

const TermSelect = ({ terms, value, onChange, placeholder, selectTriggerClasses }: TermSelectProps) => (
  <Select onValueChange={onChange} value={value}>
    <SelectTrigger className={selectTriggerClasses}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-white backdrop-blur-[12px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-lg overflow-hidden">
      {terms.map((term) => (
        <SelectItem 
          key={term.value} 
          value={term.value}
          className="hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-200"
        >
          {term.label} ({term.meaning})
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default TermSelect;