
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface TestCaseChartProps {
  data: Array<{ name: string; value: number }>;
}

export const TestCaseChart = ({ data }: TestCaseChartProps) => {
  return (
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
            <BarChart data={data}>
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
  );
};
