import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContributionManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContributionManager = ({ isOpen, onClose }: ContributionManagerProps) => {
  // This would typically fetch from a backend
  const mockContributions = [
    {
      id: 1,
      prefix: "cardio",
      suffix: "itis",
      explanation: "Inflammation of the heart",
      submittedBy: "dr.smith@example.com",
      date: "2024-03-12",
    },
    {
      id: 2,
      prefix: "dermato",
      suffix: "osis",
      explanation: "Abnormal skin condition",
      submittedBy: "dr.jones@example.com",
      date: "2024-03-11",
    },
  ];

  const handleApprove = (id: number) => {
    console.log("Approved contribution:", id);
    // Would typically make an API call to approve
  };

  const handleReject = (id: number) => {
    console.log("Rejected contribution:", id);
    // Would typically make an API call to reject
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#e0e5ec] border-none shadow-[-10px_-10px_20px_rgba(255,255,255,0.8),10px_10px_20px_rgba(0,0,0,0.1)] max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-medical-dark">
            Pending Contributions
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4">
          {mockContributions.map((contribution) => (
            <Card key={contribution.id} className="bg-[#e0e5ec] border-none shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.2)]">
              <CardHeader>
                <CardTitle className="text-lg text-medical-dark">
                  {contribution.prefix + contribution.suffix}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-600">{contribution.explanation}</p>
                  <div className="text-sm text-gray-500">
                    <p>Submitted by: {contribution.submittedBy}</p>
                    <p>Date: {contribution.date}</p>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      onClick={() => handleReject(contribution.id)}
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(contribution.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionManager;