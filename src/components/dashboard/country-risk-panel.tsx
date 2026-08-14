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

import { Badge } from "@/components/ui/badge";

interface Country {
  code: string;
  name: string;
}

interface CountryRiskResult {
  country: string;
  suppliers: string[];
  components: string[];
  products: string[];
}

interface Props {
  countries: Country[];
}

export function CountryRiskPanel({
  countries,
}: Props) {
  const [result, setResult] =
    useState<CountryRiskResult[]>();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleCountryChange(
    countryCode: string
  ) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/country-risk/${countryCode}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load country risk analysis"
        );
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load country risk analysis."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Country Risk Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Select
          onValueChange={handleCountryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>

          <SelectContent>
            {countries.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
              >
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!result && !loading && !error && (
          <p className="text-sm text-muted-foreground">
            Select a country to analyze supply chain risk.
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
            key={item.country}
            className="rounded-lg border bg-muted/30 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
  <div className="font-semibold text-lg">
    {item.country}
  </div>

  <Badge variant="secondary">
    Risk Analysis
  </Badge>
</div>

            <div>
              <div className="text-sm font-medium">
                Suppliers ({item.suppliers.length})
              </div>
              <ul className="list-disc pl-5 text-sm">
                {item.suppliers.map((supplier) => (
                  <li key={supplier}>
                    {supplier}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-medium">
                Components ({item.components.length})
              </div>
              <ul className="list-disc pl-5 text-sm">
                {item.components.map((component) => (
                  <li key={component}>
                    {component}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-medium">
                Products ({item.products.length})
              </div>
              <ul className="list-disc pl-5 text-sm">
                {item.products.map((product) => (
                  <li key={product}>
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}