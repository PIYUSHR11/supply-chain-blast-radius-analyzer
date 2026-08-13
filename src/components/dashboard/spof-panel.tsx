import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
              className="rounded-lg border p-4"
            >
              <div className="font-semibold">
                {item.supplierName}
              </div>

              <div className="text-sm text-muted-foreground">
                {item.vulnerableComponents.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}