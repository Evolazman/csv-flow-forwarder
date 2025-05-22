
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DashboardHeaderProps {
  projectName: string;
  date: string;
  onExport: () => void;
}

export const DashboardHeaderContent = ({ projectName, date, onExport }: DashboardHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Project: {projectName}</h1>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      <Button variant="outline" onClick={onExport}>
        <Download className="mr-2 h-4 w-4" /> Export PDF
      </Button>
    </div>
  );
};
