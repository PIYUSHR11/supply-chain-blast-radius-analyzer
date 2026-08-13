export function DashboardHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">
        Supply Chain Blast Radius & SPOF Analyzer
      </h1>

      <p className="text-muted-foreground">
        Analyze supplier failures, identify single points of failure,
        and evaluate country-level supply chain risks.
      </p>
    </div>
  );
}