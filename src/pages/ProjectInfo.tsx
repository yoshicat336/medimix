import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectInfo = () => {
  return (
    <div className="min-h-screen bg-[#F1F0FB] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            ← Back to MediMix
          </Button>
        </Link>
        
        <Card className="bg-white shadow-lg border-[#9b87f5]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#7E69AB]">
              About MediMix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-[#6E59A5]">Developer</h2>
              <p className="text-[#1A1F2C]">August Quinlan</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-[#6E59A5]">Tech Stack</h2>
              <ul className="list-disc list-inside space-y-2 text-[#1A1F2C]">
                <li>TypeScript - For type-safe JavaScript development</li>
                <li>React - Frontend framework</li>
                <li>Tailwind CSS - Utility-first CSS framework for styling</li>
                <li>Shadcn/UI - Component library for consistent design</li>
                <li>React Router - For page navigation</li>
                <li>React Query - For efficient data fetching and caching</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-[#6E59A5]">Features</h2>
              <ul className="list-disc list-inside space-y-2 text-[#1A1F2C]">
                <li>Interactive medical term learning</li>
                <li>Community contributions system</li>
                <li>Report system for incorrect information</li>
                <li>Admin dashboard for content management</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectInfo;