import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

const ProjectInfo = () => {
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
              <h2 className="text-xl font-semibold mb-2 text-medical-dark">Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Interactive medical term learning</li>
                <li>Community contributions system</li>
                <li>Report system for incorrect information</li>
                <li>Admin dashboard for content management</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-medical-dark">Credits</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Built with Lovable - AI-powered web development platform</li>
                <li>Powered by OpenAI - Advanced language model technology</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectInfo;