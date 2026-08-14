import { ShieldAlert } from "lucide-react";
export function DashboardHeader() {
  return (
<div className = "flex iitems-start gap-4">
  <ShieldAlert className = "h-10 w-10 text-red-500"/>
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">
        Supply Chain Blast Radius & SPOF Analyzer
      </h1>

      <p className="text-muted-foreground">
        Analyze supplier failures, identify single points of failure,
        and evaluate country-level supply chain risks.
      </p>
    </div>
  </div>
  );
}