import { Card, CardContent } from "@/components/ui/card";
import {
  Factory,
  Package,
  ShoppingCart,
  Globe,
} from "lucide-react";

interface Props {
  suppliers: number;
  components: number;
  products: number;
  countries: number;
}

export function StatsCards({
  suppliers,
  components,
  products,
  countries,
}: Props) {
  const stats = [
    {
      label: "Suppliers",
      value: suppliers,
      icon: Factory,
    },
    {
      label: "Components",
      value: components,
      icon: Package, 
    },
    {
      label: "Products",
      value: products,
      icon: ShoppingCart,
    },
    {
      label: "Countries",
      value: countries,
      icon: Globe,
    },
  ];

return (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((item) => {
      const Icon = item.icon;

      return (
        <Card key={item.label}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                {item.label}
              </p>

              <div className="text-3xl font-bold">
                {item.value}
              </div>
            </div>

            <Icon className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      );
    })}
  </div>
);
}