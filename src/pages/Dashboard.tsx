import { useState, useRef } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { UserTesterChart } from "@/components/dashboard/UserTesterChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { ResultChart } from "@/components/dashboard/ResultChart";
import { TestCaseChart } from "@/components/dashboard/TestCaseChart";
import { ErrorFeedbackTable } from "@/components/dashboard/ErrorFeedbackTable";
import { DashboardHeaderContent } from "@/components/dashboard/DashboardHeader";
import { usePDF } from "react-to-pdf";

const Dashboard = () => {
  const [currentProject, setCurrentProject] = useState("CP land");
  const [currentDate, setCurrentDate] = useState("16/05/2023");
  const targetRef = useRef<HTMLDivElement>(null);
  
  // PDF generation hook - fixed the options object to match the library's types
  const { toPDF } = usePDF({
    filename: `dashboard-${currentProject}-${currentDate}.pdf`,
    page: {
      // Using page option instead of options.format
      format: 'a4'
    },
    // targetRef is a direct property, not part of options
    targetRef: targetRef,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Dashboard exported to PDF successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to export dashboard",
        variant: "destructive",
      });
    },
  });
  
  // Mock data for charts
  const pieData = [
    { name: "User 1", value: 5 },
    { name: "User 2", value: 3 },
    { name: "User 3", value: 4 },
    { name: "User 4", value: 6 },
    { name: "User 5", value: 7 },
    { name: "User 6", value: 5 },
  ];
  
  const resultData = [
    { name: "Success", value: 68 },
    { name: "Failure", value: 32 },
  ];
  
  const asrData = [
    { name: "Accurate", value: 68 },
    { name: "Errors", value: 32 },
  ];
  
  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8', '#82ca9d'];
  const RESULT_COLORS = ['#4CAF50', '#FF5252'];
  const ASR_COLORS = ['#2196F3', '#FFC107'];
  
  const errorFeedbackData = [
    { count: 20, problem: "Navigation issue in main menu" },
    { count: 15, problem: "Form validation error on submission" },
    { count: 10, problem: "Loading time exceeds threshold" },
  ];

  const testCaseData = [
    { name: "Case A", value: 80 },
    { name: "Case B", value: 95 },
    { name: "Case C", value: 45 },
    { name: "Case D", value: 30 },
  ];

  const handleExport = () => {
    toPDF();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8" ref={targetRef}>
        <DashboardHeaderContent 
          projectName={currentProject} 
          date={currentDate}
          onExport={handleExport}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First row */}
          <div className="md:col-span-1">
            <UserTesterChart data={pieData} colors={COLORS} />
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <StatCard title="Success Rate" value="68%" subValue="16/20" />
              <StatCard title="Error rate Count" value="5%" subValue="15/300" />
              <StatCard title="Duration time" value="00:20" subValue="Max: 01:55min" />
              <StatCard title="ASR" value="68%" subValue="16/20" />
            </div>
          </div>
          
          {/* Second row */}
          <ResultChart 
            title="Result" 
            data={resultData} 
            colors={RESULT_COLORS} 
            buttonLabels={["Success: 68%", "Failure: 32%"]} 
          />
          
          <ResultChart 
            title="ASR" 
            data={asrData} 
            colors={ASR_COLORS} 
            buttonLabels={["Accurate: 68%", "Errors: 32%"]} 
          />
          
          <TestCaseChart data={testCaseData} />
          
          {/* Third row - Error feedback */}
          <ErrorFeedbackTable data={errorFeedbackData} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
