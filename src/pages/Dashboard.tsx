
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Download, ChevronDown } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [currentProject, setCurrentProject] = useState("Testing Analytics Dashboard");
  const targetRef = useRef<HTMLDivElement>(null);

  // Response Time Trends data
  const responseTimeData = [
    { time: "00:00", current: 0.5, average: 0.3 },
    { time: "06:00", current: 0.4, average: 0.35 },
    { time: "12:00", current: 0.6, average: 0.4 },
    { time: "18:00", current: 0.45, average: 0.38 },
    { time: "24:00", current: 0.5, average: 0.35 }
  ];

  // Platform distribution data
  const platformData = [
    { name: "LINE", value: 36, color: "#00C851" },
    { name: "Instagram", value: 30, color: "#E1306C" },
    { name: "Facebook", value: 25, color: "#4267B2" },
    { name: "Web", value: 15, color: "#FF8800" }
  ];

  // Question types data
  const questionTypesData = [
    { name: "Product Information (32)", count: 32 },
    { name: "Technical Support (28)", count: 28 },
    { name: "Billing Inquiries (24)", count: 24 },
    { name: "Account Management (20)", count: 20 },
    { name: "General Questions (16)", count: 16 }
  ];

  // Session summaries data
  const sessionSummaries = [
    {
      id: "2024-01-15 10:30",
      platform: "UX Evaluation",
      status: "Done",
      summary: "User tried to check product pricing and navigation. She provided accurate information but took longer than expected to access relevant pricing data.",
      recommendations: [
        "Optimize pricing page loading",
        "Improve navigation structure",
        "Add quick access to pricing info"
      ]
    },
    {
      id: "2024-01-15 09:15",
      platform: "UX Evaluation", 
      status: "Done",
      summary: "Customer inquiry about refund process. Bot successfully guided user through the required steps.",
      recommendations: [
        "Streamline refund process",
        "Add visual progress indicators"
      ]
    }
  ];

  // Most frequent issues
  const frequentIssues = [
    { issue: "Bot users too long to respond during peak hours", frequency: 89, change: "+12%" },
    { issue: "Voice recognition fails with accented speech", frequency: 76, change: "+8%" },
    { issue: "Bot provides generic answers to specific questions", frequency: 65, change: "+5%" },
    { issue: "Connection drops during file uploads", frequency: 54, change: "-3%" },
    { issue: "Bot doesn't understand context in follow-up questions", frequency: 43, change: "+15%" }
  ];

  // Frequently encountered problems
  const encounteredProblems = [
    { problem: "Bot takes too long to respond during peak hours", frequency: 78, severity: "High" },
    { problem: "Voice recognition fails with accented speech", frequency: 65, severity: "Medium" },
    { problem: "Bot provides generic answers to specific questions", frequency: 52, severity: "Medium" },
    { problem: "Connection drops during file uploads", frequency: 48, severity: "Low" },
    { problem: "Bot doesn't understand context in follow-up questions", frequency: 35, severity: "High" }
  ];

  const handleExport = () => {
    toast({
      title: "Export",
      description: "Dashboard exported successfully",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900 text-white">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-700 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{currentProject}</h1>
              <p className="text-sm text-gray-400">Comprehensive insights and analytics from your chatbot and voice bot testing sessions.</p>
            </div>
            <Button variant="outline" onClick={handleExport} className="border-gray-600 text-white hover:bg-gray-800">
              <Download className="mr-2 h-4 w-4" /> Upload
            </Button>
          </header>
          
          <main className="container mx-auto px-4 py-6 space-y-6" ref={targetRef}>
            {/* Filters Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" />
                  Filters & Date Range
                </CardTitle>
                <p className="text-gray-400 text-sm">Filter sessions by date, name, platform, or robot type.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Date Range</label>
                    <Select defaultValue="jan-may">
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jan-may">Jan 1, 2024 - May 25, 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Tester</label>
                    <Select defaultValue="all-testers">
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-testers">All Testers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Platform</label>
                    <Select defaultValue="all-platforms">
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-platforms">All Platforms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Robot Type</label>
                    <Select defaultValue="all-robots">
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-robots">All Robots</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 border-gray-600 text-white hover:bg-gray-700">
                  Export Data
                </Button>
              </CardContent>
            </Card>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-white">1,247</div>
                  <div className="text-sm text-gray-400">Total Tests</div>
                  <div className="text-xs text-green-400 mt-1">+12% from last month</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-white">89</div>
                  <div className="text-sm text-gray-400">Issues Detected</div>
                  <div className="text-xs text-red-400 mt-1">+8% from last week</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-white">4m 32s</div>
                  <div className="text-sm text-gray-400">Avg Session Duration</div>
                  <div className="text-xs text-green-400 mt-1">-2% from last week</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-white">5</div>
                  <div className="text-sm text-gray-400">Question Types</div>
                  <div className="text-xs text-blue-400 mt-1">Detected via chatbot</div>
                </CardContent>
              </Card>
            </div>

            {/* Question Types */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Common Question Types</CardTitle>
                <p className="text-gray-400 text-sm">Breakdown of question types detected through conversations</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {questionTypesData.map((type, index) => (
                    <Button key={index} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      {type.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Response Time Trends */}
              <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Response Time Trends</CardTitle>
                  <p className="text-gray-400 text-sm">Average response time in seconds over 24 hours</p>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="current" stroke="#10B981" strokeWidth={2} name="Current" />
                        <Line type="monotone" dataKey="average" stroke="#3B82F6" strokeWidth={2} name="Average" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Distribution */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Testing Platform Distribution</CardTitle>
                  <p className="text-gray-400 text-sm">Percentage of tests conducted on each platform</p>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {platformData.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
                          <span className="text-gray-300">{platform.name}</span>
                        </div>
                        <span className="text-white font-medium">{platform.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Session Summaries */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" />
                  AI Summary Per Session
                </CardTitle>
                <p className="text-gray-400 text-sm">Detailed summaries of testing sessions, bot accuracy, and recommendations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessionSummaries.map((session, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">UX</span>
                        <span className="text-white font-medium">{session.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">{session.status}</span>
                        <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-600">
                          2m 56s
                        </Button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h4 className="text-white font-medium mb-1">Session Summary</h4>
                      <p className="text-gray-300 text-sm">{session.summary}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">AI-Generated Recommendations</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {session.recommendations.map((rec, recIndex) => (
                          <li key={recIndex}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bottom Row - Issues and Problems */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Most Frequent Issues */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top 5 Most Frequent Issues</CardTitle>
                  <p className="text-gray-400 text-sm">Issues ordered by frequency during past 7 days</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {frequentIssues.map((issue, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-gray-300 text-sm">{issue.issue}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{issue.frequency}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            issue.change.startsWith('+') ? 'bg-red-600' : 'bg-green-600'
                          } text-white`}>
                            {issue.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Frequently Encountered Problems */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Frequently Encountered Problems</CardTitle>
                  <p className="text-gray-400 text-sm">Common problems occurring during test sessions</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {encounteredProblems.map((problem, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{problem.frequency}%</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            problem.severity === 'High' ? 'bg-red-600' :
                            problem.severity === 'Medium' ? 'bg-yellow-600' : 'bg-blue-600'
                          } text-white`}>
                            {problem.severity}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{problem.problem}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-600">UX</Button>
                          <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-600">Analytics</Button>
                          <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-600">API</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
