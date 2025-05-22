
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">CSV Webhook Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Documentation
          </Button>
        </div>
      </div>
    </header>
  );
};
