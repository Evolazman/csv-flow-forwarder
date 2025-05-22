
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
}

export const StatCard = ({ title, value, subValue }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-center">
          <p className="text-4xl font-bold">{value}</p>
          {subValue && <p className="text-xs text-muted-foreground mt-1">{subValue}</p>}
        </div>
      </CardContent>
    </Card>
  );
};
