
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface FileRecord {
  id: number;
  date: string;
  typeTest: string;
  fileName: string;
}

export const FileManager = () => {
  const [files, setFiles] = useState<FileRecord[]>([
    { id: 1, date: "2024-05-25", typeTest: "Performance", fileName: "test_data_1.csv" },
    { id: 2, date: "2024-05-24", typeTest: "Functionality", fileName: "user_data_2.csv" },
    { id: 3, date: "2024-05-23", typeTest: "Security", fileName: "audit_log_3.csv" },
  ]);

  const handleEdit = (id: number) => {
    toast({
      title: "Edit File",
      description: `Editing file with ID: ${id}`,
    });
  };

  const handleCTA = (id: number) => {
    toast({
      title: "CTA Action",
      description: `CTA action for file with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    setFiles(files.filter(file => file.id !== id));
    toast({
      title: "File Deleted",
      description: "File has been successfully deleted",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          File manager (Count Files: {files.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">No.</TableHead>
                <TableHead className="w-32">Date</TableHead>
                <TableHead className="w-32">Type Test</TableHead>
                <TableHead className="w-48">Files name</TableHead>
                <TableHead className="w-20">Edit</TableHead>
                <TableHead className="w-20">CTA</TableHead>
                <TableHead className="w-20">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.id}</TableCell>
                  <TableCell>{file.date}</TableCell>
                  <TableCell>{file.typeTest}</TableCell>
                  <TableCell>{file.fileName}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(file.id)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleCTA(file.id)}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      CTA
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(file.id)}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
