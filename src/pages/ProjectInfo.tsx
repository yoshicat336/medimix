import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, UserPlus } from "lucide-react";
import { TeamApplicationForm } from "@/components/TeamApplicationForm";

const ProjectInfo = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#e0e5ec] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            ← Back to MediMix
          </Button>
        </Link>
        
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-medical-dark">
              About MediMix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-medical-dark">Developer</h2>
              <p className="text-gray-700">August Quinlan</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-medical-dark">Tech Stack</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>TypeScript - For type-safe JavaScript development</li>
                <li>React - Frontend framework</li>
                <li>Tailwind CSS - Utility-first CSS framework for styling</li>
                <li>Shadcn/UI - Component library for consistent design</li>
                <li>React Router - For page navigation</li>
                <li>React Query - For efficient data fetching and caching</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-medical-dark">Credits</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Created by August Quinlan</li>
                <li>Built with Lovable - AI-powered web development platform - Bring your ideas to life</li>
                <li>Powered by OpenAI - Advanced language model technology</li>
              </ul>
            </div>

            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-medical hover:bg-medical-dark transition-colors"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Join the Team
              </Button>
            </div>
          </CardContent>
        </Card>

        <TeamApplicationForm 
          open={showApplicationForm} 
          onOpenChange={setShowApplicationForm}
        />
      </div>
    </div>
  );
};

export default ProjectInfo;