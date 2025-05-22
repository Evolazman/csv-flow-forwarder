
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

// Sample data for dropdowns
const PROJECTS = [
  { id: "project1", name: "Marketing Campaign" },
  { id: "project2", name: "Sales Analysis" },
  { id: "project3", name: "Customer Feedback" },
  { id: "project4", name: "Product Development" },
];

const AGENTS = [
  { id: "agent1", name: "Data Processing Agent" },
  { id: "agent2", name: "Email Notification Agent" },
  { id: "agent3", name: "CRM Integration Agent" },
  { id: "agent4", name: "Analytics Agent" },
];

interface WebhookFormProps {
  file: File;
}

export const WebhookForm = ({ file }: WebhookFormProps) => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [agentId, setAgentId] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fileName || !projectId || !agentId || !webhookUrl) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Get the selected project and agent names
    const selectedProject = PROJECTS.find(p => p.id === projectId);
    const selectedAgent = AGENTS.find(a => a.id === agentId);
    
    if (!selectedProject || !selectedAgent) {
      toast({
        title: "Selection error",
        description: "Invalid project or agent selection",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Read file contents
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        if (!event.target || typeof event.target.result !== 'string') {
          throw new Error("Failed to read file");
        }
        
        const fileContents = event.target.result;
        
        // Send data to webhook
        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors", // Handle CORS issues
            body: JSON.stringify({
              fileName: fileName,
              projectName: selectedProject.name,
              projectId: selectedProject.id,
              agentName: selectedAgent.name,
              agentId: selectedAgent.id,
              fileContent: fileContents,
              originalFileName: file.name,
              timestamp: new Date().toISOString(),
            }),
          });
          
          toast({
            title: "Request sent",
            description: "CSV data was sent to the n8n webhook successfully",
          });
          
          // Reset form
          setFileName("");
          setProjectId("");
          setAgentId("");
        } catch (error) {
          console.error("Error sending webhook:", error);
          toast({
            title: "Error",
            description: "Failed to send data to webhook. Please check the URL.",
            variant: "destructive",
          });
        }
        
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read the file",
          variant: "destructive",
        });
        setIsLoading(false);
      };
      
      // Read the file as text
      reader.readAsText(file);
      
    } catch (error) {
      console.error("Error processing request:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL (n8n)</Label>
            <Input 
              id="webhook-url"
              placeholder="https://n8n.your-domain.com/webhook/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-name">File Name</Label>
            <Input 
              id="file-name"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Select value={projectId} onValueChange={setProjectId} required>
              <SelectTrigger id="project-name">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {PROJECTS.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent Name</Label>
            <Select value={agentId} onValueChange={setAgentId} required>
              <SelectTrigger id="agent-name">
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                {AGENTS.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send to n8n Webhook"}
        </Button>
      </div>
    </form>
  );
};
