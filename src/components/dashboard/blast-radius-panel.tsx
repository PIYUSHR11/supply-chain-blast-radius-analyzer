"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Supplier {
  id: string;
  name: string;
}

interface BlastRadiusResult {
  supplierId: string;
  supplierName: string;
  affectedProducts: string[];
}

interface Props {
  suppliers: Supplier[];
}

export function BlastRadiusPanel({
  suppliers,
}: Props) {
  const [result, setResult] =
    useState<BlastRadiusResult[]>();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSupplierChange(
    supplierId: string
  ) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/blast-radius/${supplierId}`
      );
// TODO: Display supplier name instead of supplier ID in Select trigger.
console.log('suppx: ',suppliers)

      if (!response.ok) {
        throw new Error(
          "Failed to load blast radius analysis"
        );
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load blast radius analysis."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Blast Radius Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Select
          onValueChange={handleSupplierChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a supplier" />
          </SelectTrigger>

          <SelectContent>
            {suppliers.map((supplier) => (
              <SelectItem
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!result && !loading && !error && (
          <p className="text-sm text-muted-foreground">
            Select a supplier to analyze its blast radius.
          </p>
        )}

        {loading && (
          <p className="text-sm text-muted-foreground">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        {result?.map((item) => (
          <div
            key={item.supplierId}
            className="rounded-lg border p-4"
          >
            <div className="font-semibold">
              {item.supplierName}
            </div>

            <div className="mt-2 text-sm">
              Affected Products:
            </div>

            <ul className="mt-1 list-disc pl-5 text-sm">
              {item.affectedProducts.map(
                (product) => (
                  <li key={product}>
                    {product}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}