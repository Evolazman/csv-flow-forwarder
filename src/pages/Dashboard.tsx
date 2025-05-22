
import { useState, useRef } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid 
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useReactToPdf } from "react-to-pdf";
import { Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [currentProject, setCurrentProject] = useState("CP land");
  const [currentDate, setCurrentDate] = useState("16/05/2023");
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  // PDF generation hook
  const { toPdf, targetRef } = useReactToPdf({
    filename: `dashboard-${currentProject}-${currentDate}.pdf`,
    options: {
      format: 'a4',
    },
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
    toPdf();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8" ref={targetRef}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Project: {currentProject}</h1>
            <p className="text-sm text-muted-foreground">{currentDate}</p>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First row */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-center">User tester 30/30</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center pt-2">
                <div className="w-64 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-center">Success Rate</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="text-center">
                    <p className="text-4xl font-bold">68%</p>
                    <p className="text-xs text-muted-foreground mt-1">16/20</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-center">Error rate Count</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="text-center">
                    <p className="text-4xl font-bold">5%</p>
                    <p className="text-xs text-muted-foreground mt-1">15/300</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-center">Duration time</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="text-center">
                    <p className="text-4xl font-bold">00:20</p>
                    <p className="text-xs text-muted-foreground mt-1">Max: 01:55min</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-center">ASR</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="text-center">
                    <p className="text-4xl font-bold">68%</p>
                    <p className="text-xs text-muted-foreground mt-1">16/20</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Second row */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                Result
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-36 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resultData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {resultData.map((entry, index) => (
                        <Cell key={`result-cell-${index}`} fill={RESULT_COLORS[index % RESULT_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full">Success: 68%</Button>
                <Button variant="outline" size="sm" className="w-full">Failure: 32%</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                ASR
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-36 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={asrData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {asrData.map((entry, index) => (
                        <Cell key={`asr-cell-${index}`} fill={ASR_COLORS[index % ASR_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full">Accurate: 68%</Button>
                <Button variant="outline" size="sm" className="w-full">Errors: 32%</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                Test case
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={testCaseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Third row - Error feedback */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                Error feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Count</TableHead>
                    <TableHead>Problem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorFeedbackData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.count}</TableCell>
                      <TableCell>{item.problem}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
