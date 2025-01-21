import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      const { error: supabaseError } = await supabase
        .from('approved_combinations')
        .insert({
          prefix,
          suffix,
          plain_language: data.plainLanguage,
          severity: data.severity,
          reasoning: data.reasoning,
          pronunciation: data.pronunciation,
        });

      if (supabaseError) throw supabaseError;

      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ['approved-combination', prefix, suffix] });

      toast({
        title: "Contribution submitted",
        description: "Your suggestion has been submitted successfully.",
      });

      reset();
      onClose();
    } catch (err) {
      console.error('Error submitting contribution:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit contribution');
      toast({
        title: "Error",
        description: "Failed to submit contribution. Please try again.",
        variant: "destructive",
      });
    }
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
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              {...register("plainLanguage", { required: true })}
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
              {...register("pronunciation", { required: true })}
              placeholder="e.g., kar-dee-oh-sis"
              className="bg-[#e0e5ec] border-none shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Medical Reasoning</label>
            <Textarea
              {...register("reasoning", { required: true })}
              placeholder="Explain the medical reasoning behind this term"
              className="bg-[#e0e5ec] border-none shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-medical hover:bg-medical-dark text-white shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]"
            >
              {isSubmitting ? "Submitting..." : "Submit Contribution"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionForm;