import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SuggestTermFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: "prefix" | "suffix";
}

interface FormData {
  term: string;
  meaning: string;
}

const SuggestTermForm = ({ isOpen, onClose, type }: SuggestTermFormProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('term_suggestions')
        .insert({
          term: data.term,
          type: type,
          meaning: data.meaning,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Your ${type} suggestion has been submitted for review.`,
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to submit suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)] max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-medical-dark">
            Suggest New {type.charAt(0).toUpperCase() + type.slice(1)}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Term</label>
            <Input
              {...register("term")}
              placeholder={`Enter new ${type}`}
              className="bg-[#e0e5ec] border-none shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Meaning</label>
            <Input
              {...register("meaning")}
              placeholder={`Enter the meaning of this ${type}`}
              className="bg-[#e0e5ec] border-none shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-medical hover:bg-medical-dark text-white shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]"
            >
              Submit Suggestion
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestTermForm;