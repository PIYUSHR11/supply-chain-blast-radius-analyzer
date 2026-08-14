import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { SpofItem } from "@/types/dashboard";

interface Props {
  items: SpofItem[];
}

export function SpofPanel({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Single Points of Failure
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.supplierId}
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-4"
            >
          <div className = "flex items-center justify-between">
              <div className="font-semibold">
                {item.supplierName}
              </div>
	<Badge variant="destructive">
    HIGH RISK
  </Badge>
</div>

              <div className="mt-2 text-sm text-muted-foreground">
  Vulnerable Components:
</div>

<ul className="mt-1 list-disc pl-5 text-sm">
  {item.vulnerableComponents.map((component) => (
    <li key={component}>
      {component}
    </li>
  ))}
</ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}