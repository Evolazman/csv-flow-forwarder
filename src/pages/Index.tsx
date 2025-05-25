
import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { WebhookForm } from "@/components/WebhookForm";
import { FileDetails } from "@/components/FileDetails";
import { FileManager } from "@/components/FileManager";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">CSV File Upload</h1>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">CSV File Upload</h2>
                
                <FileUploader onFileSelect={handleFileSelect} />
                
                {file && (
                  <>
                    <div className="my-6">
                      <FileDetails file={file} />
                    </div>
                    <WebhookForm file={file} />
                  </>
                )}
                
                {!file && (
                  <div className="mt-6 text-center text-gray-500">
                    <p>Upload a CSV file to continue</p>
                  </div>
                )}
              </div>

              <FileManager />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
