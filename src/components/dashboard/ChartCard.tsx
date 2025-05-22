
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const ChartCard = ({ title, children, className }: ChartCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center pt-2">
        {children}
      </CardContent>
    </Card>
  );
};
