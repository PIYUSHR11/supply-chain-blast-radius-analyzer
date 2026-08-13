import { Card, CardContent } from "@/components/ui/card";

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
    },
    {
      label: "Components",
      value: components,
    },
    {
      label: "Products",
      value: products,
    },
    {
      label: "Countries",
      value: countries,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <Card key={item.label}>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">
              {item.value}
            </div>

            <div className="text-sm text-muted-foreground">
              {item.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}