import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/select";
import { useForm } from "react-hook-form";
import { SeverityLevel } from "@/data/types";

interface ContributionFormProps {
  isOpen: boolean;
  onClose: () => void;
  prefix: string;
  suffix: string;
}

interface FormData {
  plainLanguage: string;
  severity: SeverityLevel;
  reasoning: string;
  pronunciation: string;
}

const ContributionForm = ({ isOpen, onClose, prefix, suffix }: ContributionFormProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // In a real app, this would make an API call
    console.log("Contribution submitted:", {
      ...data,
      prefix,
      suffix,
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)] max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-medical-dark">
            Suggest Definition for {prefix + suffix}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              {...register("plainLanguage")}
              placeholder="Enter a plain language description"
              className="bg-[#e0e5ec] border-none shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Severity</label>
            <Select onValueChange={(value) => register("severity").onChange({ target: { value } })}>
              <SelectTrigger className="bg-[#e0e5ec] border-none shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]">
                <SelectValue placeholder="Select severity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Pronunciation</label>
            <Input
              {...register("pronunciation")}
              placeholder="e.g., kar-dee-oh-sis"
              className="bg-[#e0e5ec] border-none shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Medical Reasoning</label>
            <Textarea
              {...register("reasoning")}
              placeholder="Explain the medical reasoning behind this term"
              className="bg-[#e0e5ec] border-none shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-medical hover:bg-medical-dark text-white shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]"
            >
              Submit Contribution
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionForm;