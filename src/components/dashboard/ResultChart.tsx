
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ResultChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  colors: string[];
  buttonLabels: string[];
}

export const ResultChart = ({ title, data, colors, buttonLabels }: ResultChartProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-36 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`result-cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <Button key={index} variant="outline" size="sm" className="w-full">
              {buttonLabels[index] || `${item.name}: ${item.value}%`}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
