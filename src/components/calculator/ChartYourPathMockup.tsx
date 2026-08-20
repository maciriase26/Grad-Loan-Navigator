import { useState, useId, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";

const US_HIGHER_ED_INSTITUTIONS = [
  "Harvard University",
  "Harvard Law School",
  "Harvard Medical School",
  "Stanford University",
  "Stanford Graduate School of Business",
  "Massachusetts Institute of Technology (MIT)",
  "New York University (NYU)",
  "NYU Stern School of Business",
  "NYU School of Law",
  "Columbia University",
  "Columbia Law School",
  "Columbia Business School",
  "Yale University",
  "Yale Law School",
  "Princeton University",
  "University of Pennsylvania (Penn)",
  "Wharton School of the University of Pennsylvania",
  "University of California, Berkeley (UC Berkeley)",
  "University of California, Los Angeles (UCLA)",
  "University of California, San Diego (UCSD)",
  "University of California, Davis (UC Davis)",
  "University of Chicago",
  "University of Chicago Booth School of Business",
  "Northwestern University",
  "Northwestern Pritzker School of Law",
  "Duke University",
  "Johns Hopkins University",
  "Cornell University",
  "Dartmouth College",
  "Brown University",
  "Georgetown University",
  "Georgetown University Law Center",
  "University of Michigan, Ann Arbor",
  "University of Virginia (UVA)",
  "University of Texas at Austin (UT Austin)",
  "Georgia Institute of Technology (Georgia Tech)",
  "University of Florida (UF)",
  "University of North Carolina at Chapel Hill (UNC)",
  "University of Southern California (USC)",
  "Vanderbilt University",
  "Washington University in St. Louis (WashU)",
  "Emory University",
  "Carnegie Mellon University (CMU)",
  "Boston University (BU)",
  "Boston College (BC)",
  "Northeastern University",
  "University of Notre Dame",
  "Purdue University",
  "Ohio State University",
  "Penn State University",
  "University of Washington (UW)",
  "University of Wisconsin-Madison",
  "University of Maryland, College Park",
  "University of Illinois Urbana-Champaign",
  "Texas A&M University",
  "Arizona State University (ASU)",
  "Michigan State University",
  "Rutgers University",
  "University of Miami",
  "Tulane University",
  "George Washington University (GWU)",
  "Fordham University",
];

export function ChartYourPathMockup() {
  const { t } = useI18n();

  // Unique IDs for input element accessibility
  const schoolId = useId();
  const yearsId = useId();
  const expensesId = useId();
  const savingsId = useId();

  // Inputs — Initialized to ZERO as requested
  const [school, setSchool] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [years, setYears] = useState<number | "">(4);
  const [annualExpenses, setAnnualExpenses] = useState<number | "">(0);
  const [savingsScholarships, setSavingsScholarships] = useState<number | "">(0);
  const [hasCalculated, setHasCalculated] = useState(false);

  const autocompleteRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Close autocomplete dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter US Higher Ed institution suggestions as user types
  const filteredSuggestions =
    school.trim().length >= 1
      ? US_HIGHER_ED_INSTITUTIONS.filter((inst) =>
          inst.toLowerCase().includes(school.toLowerCase()),
        ).slice(0, 6)
      : [];

  const expNum = typeof annualExpenses === "number" ? annualExpenses : 0;
  const savNum = typeof savingsScholarships === "number" ? savingsScholarships : 0;
  const yrNum = typeof years === "number" ? years : 0;

  // Calculations
  const annualGap = Math.max(0, expNum - savNum);
  const totalGap = annualGap * yrNum;

  // 2026 Federal loan limits comparison
  const annualFederalCap = 20500; // Annual Direct Unsubsidized Limit
  const annualRemainingGap = Math.max(0, annualGap - annualFederalCap);
  const totalFederalCovered = Math.min(totalGap, annualFederalCap * yrNum);
  const totalRemainingPrivateGap = Math.max(0, totalGap - totalFederalCovered);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  const handleCalculate = () => {
    setHasCalculated(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="cyp-wrap">
      {/* 1. CHART YOUR PATH — STEP 1 INPUTS */}
      <div className="cyp-hero">
        <h1>{t("cyp.h1")}</h1>
        <p className="cyp-sub">{t("cyp.sub")}</p>
      </div>

      {/* Main Mockup Card Container */}
      <div className="cyp-card">
        <div className="cyp-grid">
          {/* Left Column: Form Inputs */}
          <div className="cyp-left-col">
            <span className="cyp-tag">{t("cyp.tag")}</span>

            {/* School Input with US Higher Ed Autocomplete Suggestions */}
            <div className="cyp-form-group" ref={autocompleteRef} style={{ position: "relative" }}>
              <label htmlFor={schoolId}>{t("cyp.school.q")}</label>
              <input
                id={schoolId}
                type="text"
                className="cyp-input"
                placeholder={t("cyp.school.placeholder")}
                value={school}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSchool(e.target.value);
                  setShowSuggestions(true);
                }}
              />

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="cyp-suggestions-dropdown" role="listbox">
                  {filteredSuggestions.map((inst) => (
                    <button
                      key={inst}
                      type="button"
                      className="cyp-suggestion-item"
                      onClick={() => {
                        setSchool(inst);
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="inst-icon">🎓</span> {inst}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="cyp-form-group">
              <label htmlFor={yearsId}>{t("cyp.years.q")}</label>
              <input
                id={yearsId}
                type="number"
                min="1"
                max="6"
                className="cyp-input"
                value={years}
                onChange={(e) => {
                  const val = e.target.value;
                  setYears(val === "" ? "" : Number(val));
                }}
              />
            </div>

            <div className="cyp-form-group">
              <label htmlFor={expensesId}>{t("cyp.expenses.q")}</label>
              <div className="cyp-money-wrap">
                <span className="prefix">$</span>
                <input
                  id={expensesId}
                  type="number"
                  step="500"
                  min="0"
                  placeholder="0"
                  className="cyp-input money-input"
                  value={annualExpenses === 0 && annualExpenses !== "" ? "0" : annualExpenses}
                  onFocus={(e) => {
                    if (annualExpenses === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAnnualExpenses(val === "" ? "" : Number(val));
                  }}
                />
              </div>
            </div>

            <div className="cyp-form-group">
              <label htmlFor={savingsId}>{t("cyp.savings.q")}</label>
              <div className="cyp-money-wrap">
                <span className="prefix">$</span>
                <input
                  id={savingsId}
                  type="number"
                  step="500"
                  min="0"
                  placeholder="0"
                  className="cyp-input money-input"
                  value={savingsScholarships === 0 && savingsScholarships !== "" ? "0" : savingsScholarships}
                  onFocus={(e) => {
                    if (savingsScholarships === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSavingsScholarships(val === "" ? "" : Number(val));
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              className="cyp-calc-btn"
              onClick={handleCalculate}
            >
              {t("cyp.btn.calc")}
            </button>
          </div>

          {/* Right Column: Federal Loan Limits & Calculation Box */}
          <div className="cyp-right-col">
            <div className="cyp-limits-card">
              <span className="cyp-limits-tag">{t("cyp.limits.tag")}</span>
              <p className="cyp-limits-desc">{t("cyp.limits.desc")}</p>

              <div className="cyp-results-box">
                {school && <div className="cyp-selected-school">🎓 {school}</div>}
                <div className="cyp-res-row">
                  <span>{t("cyp.summary.cost")}</span>
                  <strong>{formatMoney(expNum)}</strong>
                </div>
                <div className="cyp-res-row">
                  <span>{t("cyp.summary.savings")}</span>
                  <strong className="text-savings">−{formatMoney(savNum)}</strong>
                </div>
                <div className="cyp-res-row main-gap">
                  <span>{t("cyp.summary.gap")}</span>
                  <strong className="text-gap">{formatMoney(annualGap)} / yr</strong>
                </div>

                <div className="cyp-divider" />

                <div className="cyp-res-row">
                  <span>{t("cyp.summary.totalGap").replace("{y}", String(yrNum))}</span>
                  <strong>{formatMoney(totalGap)}</strong>
                </div>
                <div className="cyp-res-row">
                  <span>{t("cyp.summary.fedLimit")}</span>
                  <span>$20,500 / yr</span>
                </div>
                <div className="cyp-res-row">
                  <span>{t("cyp.summary.fedCoverage")}</span>
                  <strong className="text-fed">{formatMoney(totalFederalCovered)}</strong>
                </div>

                {totalRemainingPrivateGap > 0 ? (
                  <div className="cyp-remaining-box warning">
                    <span>{t("cyp.summary.privGap")}</span>
                    <strong>{formatMoney(totalRemainingPrivateGap)}</strong>
                    <small>{t("cyp.summary.remYear").replace("{a}", formatMoney(annualRemainingGap))}</small>
                  </div>
                ) : (
                  <div className="cyp-remaining-box ok">
                    <span>{t("cyp.summary.covered")}</span>
                    <small>{t("cyp.summary.noPriv")}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FUNDING GAP RESULT SECTION (EXACT MOCKUP 2) */}
      {hasCalculated && (
        <div className="cyp-result-step" ref={resultRef}>
          <div className="cyp-hero">
            <h2>{t("cyp.res.h2")}</h2>
            <p className="cyp-sub">{t("cyp.res.sub")}</p>
          </div>

          <div className="cyp-result-grid">
            {/* Left: Your Result Card */}
            <div className="cyp-result-card">
              <span className="cyp-tag">{t("cyp.res.tag")}</span>

              <div className="cyp-gap-table">
                <div className="cyp-gap-row">
                  <span className="gap-row-label">{t("cyp.res.cost")}</span>
                  <span className="gap-row-val">{formatMoney(expNum)}</span>
                </div>
                <div className="cyp-gap-row">
                  <span className="gap-row-label">{t("cyp.res.savings")}</span>
                  <span className="gap-row-val text-savings">− {formatMoney(savNum)}</span>
                </div>
                <div className="cyp-gap-row highlight-box">
                  <span className="gap-row-label-bold">{t("cyp.res.gap")}</span>
                  <span className="gap-row-val-bold">{formatMoney(annualGap)}</span>
                </div>
              </div>
            </div>

            {/* Right: What's Next Card */}
            <div className="cyp-whats-next-card">
              <span className="cyp-tag">{t("cyp.next.tag")}</span>
              <p>{t("cyp.next.text")}</p>
              <Link to="/blog/student-loan-types" className="cyp-explore-btn">
                {t("cyp.next.btn")}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Teaser Topics Row */}
      <div className="cyp-topics-section">
        <h3>{t("cyp.topics.h2")}</h3>
        <div className="cyp-topics-grid">
          <Link to="/blog/refinancing-student-loans" className="cyp-topic-card">
            <span className="topic-badge">{t("cyp.topicBadge1")}</span>
            <h4>{t("cyp.topic1.title")}</h4>
            <p>{t("cyp.topic1.desc")}</p>
            <span className="topic-more">{t("cyp.readExplainer")}</span>
          </Link>

          <Link to="/blog/student-loan-types" className="cyp-topic-card">
            <span className="topic-badge">{t("cyp.topicBadge2")}</span>
            <h4>{t("cyp.topic2.title")}</h4>
            <p>{t("cyp.topic2.desc")}</p>
            <span className="topic-more">{t("cyp.readGuide")}</span>
          </Link>

          <Link to="/blog/student-loan-interest-by-the-numbers" className="cyp-topic-card">
            <span className="topic-badge">{t("cyp.topicBadge3")}</span>
            <h4>{t("cyp.topic3.title")}</h4>
            <p>{t("cyp.topic3.desc")}</p>
            <span className="topic-more">{t("cyp.readAnalysis")}</span>
          </Link>
        </div>
      </div>

      {/* Ready When You Are Banner (Preparation Checklist Link) */}
      <div className="cyp-ready-banner">
        <div className="cyp-ready-content">
          <h3>{t("cyp.ready.title")}</h3>
          <p>{t("cyp.ready.desc")}</p>
        </div>
        <Link to="/apply" className="cyp-ready-btn">
          {t("cyp.ready.cta")}
        </Link>
      </div>
    </div>
  );
}
