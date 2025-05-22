
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";

interface UserTesterChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
}

export const UserTesterChart = ({ data, colors }: UserTesterChartProps) => {
  return (
    <ChartCard title="User tester 30/30" className="h-full">
      <div className="w-64 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};
