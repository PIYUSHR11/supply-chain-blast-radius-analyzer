import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SpofPanel } from "@/components/dashboard/spof-panel";
import { BlastRadiusPanel } from "@/components/dashboard/blast-radius-panel";
import { CountryRiskPanel } from "@/components/dashboard/country-risk-panel";

async function getMetadata() {
  const res = await fetch(
     `${process.env.NEXT_PUBLIC_APP_URL}/api/metadata`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

async function getSpof() {
  const res = await fetch(
     `${process.env.NEXT_PUBLIC_APP_URL}/api/spof`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Home() {
  const [metadata, spof] = await Promise.all([
    getMetadata(),
    getSpof(),
  ]);

  return (
    <main className="container mx-auto py-10 space-y-8">
      <DashboardHeader />
   <div className="grid gap-6 lg:grid-cols-2"> 
      <StatsCards
        {...metadata.stats}
      />

      <SpofPanel
        items={spof}
      />
      <BlastRadiusPanel
        suppliers={metadata.suppliers}
       />
     <CountryRiskPanel
      countries={metadata.countries}
      />
    </div>
    </main>
  );
}