import React from "react";
import Header from "../components/Header";
import WeeklyForecast from "../components/WeeklyForecast";
import HourlyForecast from "../components/HourlyForecast";
import StatsGrid from "../components/StatsGrid";

export default function Page() {
  return (
    <main className="flex h-full w-full justify-center">
      <section className="w-full max-w-md pb-32">
        <Header />
        <div className="flex flex-col gap-6">
          <HourlyForecast />
          <WeeklyForecast />
          <StatsGrid />
        </div>
      </section>
    </main>
  );
}
