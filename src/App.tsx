import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import Index from "./pages/Index";
import ProjectInfo from "./pages/ProjectInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <div 
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          fontSize: '12px',
          color: 'rgba(0, 0, 0, 0)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: -1,
          fontFamily: 'monospace',
          opacity: 0
        }}
      >
        Built with ❤️ by August Quinlan
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project-info" element={<ProjectInfo />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
