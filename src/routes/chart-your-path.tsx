import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ChartYourPathMockup } from "@/components/calculator/ChartYourPathMockup";
import { CollegeLoanNeedCalculator } from "@/components/calculator/CollegeLoanNeedCalculator";
import type { SchoolTuitionRecord } from "@/data/tuitionData";

const TITLE = "Chart Your Path — How Much Do You Need to Borrow?";
const DESCRIPTION =
  "Calculate your annual funding gap, estimated total borrowing, and monthly payment while checking against 2026 federal loan limits.";
const URL = "https://www.graduationnavigator.com/chart-your-path";

export const Route = createFileRoute("/chart-your-path")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ChartYourPathPage,
});

function ChartYourPathPage() {
  const [school, setSchool] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<SchoolTuitionRecord | null>(null);
  const [residency, setResidency] = useState<"inState" | "outOfState">("inState");
  const [tuition, setTuition] = useState<number | "">(0);
  const [housing, setHousing] = useState<number | "">(0);
  const [housingPreset, setHousingPreset] = useState<string>("");
  const [years, setYears] = useState<number | "">(4);
  const [savings, setSavings] = useState<number | "">(0);
  const [rate, setRate] = useState<number | "">(8.07);
  const [termYears, setTermYears] = useState<number>(10);

  const handleSelectSchool = (rec: SchoolTuitionRecord) => {
    setSelectedSchool(rec);
    setSchool(rec.name);
    const newTuition = residency === "inState" ? rec.inState : rec.outOfState;
    setTuition(newTuition);
  };

  const handleClearSchool = () => {
    setSelectedSchool(null);
    setSchool("");
    setTuition(0);
  };

  const handleResidencyChange = (newResidency: "inState" | "outOfState") => {
    setResidency(newResidency);
    if (selectedSchool) {
      const newTuition = newResidency === "inState" ? selectedSchool.inState : selectedSchool.outOfState;
      setTuition(newTuition);
    }
  };

  const handleHousingChange = (newHousing: number | "", preset?: string) => {
    setHousing(newHousing);
    if (preset !== undefined) setHousingPreset(preset);
  };

  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
          {/* Main Mockup Design */}
          <ChartYourPathMockup
            school={school}
            selectedSchool={selectedSchool}
            residency={residency}
            tuition={tuition}
            housingExpenses={housing}
            housingPreset={housingPreset}
            years={years}
            savingsScholarships={savings}
            onSelectSchool={handleSelectSchool}
            onClearSchool={handleClearSchool}
            onResidencyChange={handleResidencyChange}
            onTuitionChange={setTuition}
            onHousingChange={handleHousingChange}
            onYearsChange={setYears}
            onSavingsChange={setSavings}
          />

          {/* Detailed Itemized Need & Repayment Calculator */}
          <CollegeLoanNeedCalculator
            schoolName={school}
            selectedSchool={selectedSchool}
            residency={residency}
            tuition={tuition}
            housing={housing}
            housingPreset={housingPreset}
            years={years}
            scholarships={savings}
            rate={rate}
            termYears={termYears}
            onSelectSchool={handleSelectSchool}
            onClearSchool={handleClearSchool}
            onResidencyChange={handleResidencyChange}
            onTuitionChange={setTuition}
            onHousingChange={handleHousingChange}
            onYearsChange={setYears}
            onScholarshipsChange={setSavings}
            onRateChange={setRate}
            onTermYearsChange={setTermYears}
          />
        </div>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
