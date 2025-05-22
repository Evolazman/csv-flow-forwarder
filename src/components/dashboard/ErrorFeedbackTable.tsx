
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ErrorFeedbackItem {
  count: number;
  problem: string;
}

interface ErrorFeedbackTableProps {
  data: ErrorFeedbackItem[];
}

export const ErrorFeedbackTable = ({ data }: ErrorFeedbackTableProps) => {
  return (
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
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.count}</TableCell>
                <TableCell>{item.problem}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
