import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  term: string;
}

const formSchema = z.object({
  reason: z.string().min(10, "Please provide at least 10 characters").max(500, "Please keep your report under 500 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ReportForm = ({ isOpen, onClose, term }: ReportFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const report = {
        term,
        reason: data.reason,
        timestamp: new Date(),
      };

      // Get existing reports from localStorage
      const existingReports = localStorage.getItem('reports');
      const reports = existingReports ? JSON.parse(existingReports) : [];
      
      // Add new report
      reports.push(report);
      
      // Save back to localStorage
      localStorage.setItem('reports', JSON.stringify(reports));

      toast({
        title: "Report submitted",
        description: "Thank you for helping us improve our medical database.",
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)] max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-medical-dark">
            Report Incorrect Information for {term}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Please explain what is incorrect:</label>
            <Textarea
              {...register("reason")}
              placeholder="Describe the issue with the current information..."
              className="bg-[#e0e5ec] border-none shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-medical hover:bg-medical-dark text-white shadow-[-3px_-3px_6px_rgba(255,255,255,0.8),3px_3px_6px_rgba(0,0,0,0.1)]"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportForm;