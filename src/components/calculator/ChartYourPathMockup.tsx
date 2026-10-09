import { useState, useId, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import {
  searchSchools,
  findSchoolByName,
  HOUSING_PRESETS,
  type SchoolTuitionRecord,
} from "@/data/tuitionData";

export function ChartYourPathMockup() {
  const { t } = useI18n();

  // Unique IDs for input element accessibility
  const schoolId = useId();
  const yearsId = useId();
  const tuitionId = useId();
  const housingId = useId();
  const housingSelectId = useId();
  const expensesId = useId();
  const savingsId = useId();

  // Inputs
  const [school, setSchool] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<SchoolTuitionRecord | null>(null);
  const [residency, setResidency] = useState<"inState" | "outOfState">("inState");
  const [tuition, setTuition] = useState<number | "">(0);
  const [housingPreset, setHousingPreset] = useState<string>("");
  const [housingExpenses, setHousingExpenses] = useState<number | "">(0);
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

  // Filter school suggestions from Tuition Tracker dataset
  const filteredSuggestions =
    school.trim().length >= 1 ? searchSchools(school, 8) : [];

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  // When a user selects a school from the dropdown
  const handleSelectSchool = (rec: SchoolTuitionRecord) => {
    setSelectedSchool(rec);
    setSchool(rec.name);
    setShowSuggestions(false);

    // Autofill tuition based on currently selected residency
    const autofilledTuition = residency === "inState" ? rec.inState : rec.outOfState;
    setTuition(autofilledTuition);

    // Recompute total annual expenses
    const currentHousing = typeof housingExpenses === "number" ? housingExpenses : 0;
    setAnnualExpenses(autofilledTuition + currentHousing);
  };

  // Change residency (In-State vs Out-of-State)
  const handleResidencyChange = (newResidency: "inState" | "outOfState") => {
    setResidency(newResidency);
    if (selectedSchool) {
      const newTuition = newResidency === "inState" ? selectedSchool.inState : selectedSchool.outOfState;
      setTuition(newTuition);
      const currentHousing = typeof housingExpenses === "number" ? housingExpenses : 0;
      setAnnualExpenses(newTuition + currentHousing);
    }
  };

  // When user selects a housing preset dropdown option
  const handleHousingPresetChange = (presetId: string) => {
    setHousingPreset(presetId);
    if (!presetId) return;

    if (presetId === "custom") {
      return;
    }

    const preset = HOUSING_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setHousingExpenses(preset.amount);
      const currentTuition = typeof tuition === "number" ? tuition : 0;
      setAnnualExpenses(currentTuition + preset.amount);
    }
  };

  // Clear chosen school to re-search
  const handleClearSchool = () => {
    setSelectedSchool(null);
    setSchool("");
    setShowSuggestions(true);
  };

  const expNum = typeof annualExpenses === "number" ? annualExpenses : 0;
  const savNum = typeof savingsScholarships === "number" ? savingsScholarships : 0;
  const yrNum = typeof years === "number" ? years : 0;
  const tuiNum = typeof tuition === "number" ? tuition : 0;
  const houseNum = typeof housingExpenses === "number" ? housingExpenses : 0;

  // Calculations
  const annualGap = Math.max(0, expNum - savNum);
  const totalGap = annualGap * yrNum;

  // 2026 Federal loan limits comparison
  const annualFederalCap = 20500; // Annual Direct Unsubsidized Limit
  const annualRemainingGap = Math.max(0, annualGap - annualFederalCap);
  const totalFederalCovered = Math.min(totalGap, annualFederalCap * yrNum);
  const totalRemainingPrivateGap = Math.max(0, totalGap - totalFederalCovered);

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

            {/* School Search Input with Tuition Tracker Database Autocomplete */}
            <div className="cyp-form-group" ref={autocompleteRef} style={{ position: "relative" }}>
              <label htmlFor={schoolId}>{t("cyp.school.q")}</label>

              {!selectedSchool ? (
                <>
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
                          key={inst.id}
                          type="button"
                          className="cyp-suggestion-item"
                          onClick={() => handleSelectSchool(inst)}
                        >
                          <span className="inst-icon">🎓</span>
                          <div className="cyp-suggestion-main">
                            <div className="cyp-suggestion-name">{inst.name}</div>
                            <div className="cyp-suggestion-sub">
                              <span className={`cyp-badge ${inst.isPublic ? "public" : "private"}`}>
                                {inst.isPublic ? t("cyp.school.public") : t("cyp.school.private")}
                              </span>
                              <span>
                                In: {formatMoney(inst.inState)}
                                {inst.isPublic && ` • Out: ${formatMoney(inst.outOfState)}`}
                              </span>
                            </div>
                          </div>
                          <span className="cyp-suggestion-price">
                            {formatMoney(residency === "inState" ? inst.inState : inst.outOfState)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Selected School Pill Card */
                <div className="cyp-selected-card">
                  <div className="cyp-selected-info">
                    <div className="cyp-selected-name">
                      <span>🎓</span> {selectedSchool.name}
                    </div>
                    <div className="cyp-selected-meta">
                      <span className={`cyp-badge ${selectedSchool.isPublic ? "public" : "private"}`}>
                        {selectedSchool.isPublic ? t("cyp.school.public") : t("cyp.school.private")}
                      </span>
                      <span className="cyp-badge year">
                        IPEDS 20{selectedSchool.year}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cyp-clear-btn"
                    onClick={handleClearSchool}
                  >
                    {t("cyp.school.clear")}
                  </button>
                </div>
              )}
            </div>

            {/* In-State vs. Out-of-State Residency Selector */}
            <div className="cyp-form-group">
              <label>{t("cyp.residency.label")}</label>
              <div className="cyp-residency-toggle" role="group">
                <button
                  type="button"
                  className={`cyp-residency-btn ${residency === "inState" ? "active" : ""}`}
                  onClick={() => handleResidencyChange("inState")}
                >
                  <span className="cyp-residency-title">🏠 {t("cyp.residency.inState")}</span>
                  {selectedSchool && (
                    <span className="cyp-residency-price">{formatMoney(selectedSchool.inState)}/yr</span>
                  )}
                </button>
                <button
                  type="button"
                  className={`cyp-residency-btn ${residency === "outOfState" ? "active" : ""}`}
                  onClick={() => handleResidencyChange("outOfState")}
                >
                  <span className="cyp-residency-title">✈️ {t("cyp.residency.outOfState")}</span>
                  {selectedSchool && (
                    <span className="cyp-residency-price">{formatMoney(selectedSchool.outOfState)}/yr</span>
                  )}
                </button>
              </div>
              {selectedSchool && !selectedSchool.isPublic && (
                <div className="cyp-residency-note">
                  ℹ️ {t("cyp.residency.privateNote")}
                </div>
              )}
            </div>

            {/* Tuition Cost Input (Autofilled from Tuition Tracker) */}
            <div className="cyp-form-group">
              <label htmlFor={tuitionId}>{t("cyp.tuition.q")}</label>
              <div className="cyp-money-wrap">
                <span className="prefix">$</span>
                <input
                  id={tuitionId}
                  type="number"
                  step="500"
                  min="0"
                  placeholder="0"
                  className="cyp-input money-input"
                  value={tuition === "" ? "" : tuition}
                  onFocus={(e) => {
                    if (tuition === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value);
                    setTuition(val);
                    const tVal = typeof val === "number" ? val : 0;
                    setAnnualExpenses(tVal + houseNum);
                  }}
                />
              </div>

              {selectedSchool && (
                <>
                  <div className="cyp-autofill-badge">
                    ✓ {t("cyp.school.autofilled")}
                  </div>
                  {selectedSchool.netPrice > 0 && (
                    <div className="cyp-net-price-tip">
                      💡 {t("cyp.school.netPriceNote").replace("{amount}", formatMoney(selectedSchool.netPrice))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Housing & Living Expenses Dropdown & Input */}
            <div className="cyp-form-group">
              <label htmlFor={housingId}>{t("cyp.housing.q")}</label>
              
              {/* National Average Preset Dropdown */}
              <select
                id={housingSelectId}
                className="cyp-select"
                value={housingPreset}
                onChange={(e) => handleHousingPresetChange(e.target.value)}
              >
                <option value="">{t("cyp.housing.dropdownPlaceholder")}</option>
                {HOUSING_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {t(preset.labelKey)}
                  </option>
                ))}
                <option value="custom">{t("cyp.housing.custom")}</option>
              </select>

              <div className="cyp-money-wrap">
                <span className="prefix">$</span>
                <input
                  id={housingId}
                  type="number"
                  step="250"
                  min="0"
                  placeholder="0"
                  className="cyp-input money-input"
                  value={housingExpenses === "" ? "" : housingExpenses}
                  onFocus={(e) => {
                    if (housingExpenses === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value);
                    setHousingExpenses(val);
                    setHousingPreset("custom");
                    const hVal = typeof val === "number" ? val : 0;
                    setAnnualExpenses(tuiNum + hVal);
                  }}
                />
              </div>

              {housingPreset && housingPreset !== "custom" && (
                <div className="cyp-autofill-badge">
                  ✓ {t("cyp.housing.appliedBadge").replace("{amount}", formatMoney(houseNum))}
                </div>
              )}
            </div>

            {/* Annual Total College Expenses (Combined Tuition + Living Costs) */}
            <div className="cyp-form-group">
              <label htmlFor={expensesId}>{t("cyp.totalExpenses.label")}</label>
              <div className="cyp-money-wrap">
                <span className="prefix">$</span>
                <input
                  id={expensesId}
                  type="number"
                  step="500"
                  min="0"
                  placeholder="0"
                  className="cyp-input money-input"
                  value={annualExpenses === "" ? "" : annualExpenses}
                  onFocus={(e) => {
                    if (annualExpenses === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value);
                    setAnnualExpenses(val);
                  }}
                />
              </div>

              {(tuiNum > 0 || houseNum > 0) && (
                <div className="cyp-breakdown-row">
                  <span>{t("cyp.totalExpenses.breakdown").replace("{tuition}", formatMoney(tuiNum)).replace("{housing}", formatMoney(houseNum))}</span>
                  <strong>= {formatMoney(expNum)} / yr</strong>
                </div>
              )}
            </div>

            {/* Years to Graduate */}
            <div className="cyp-form-group">
              <label htmlFor={yearsId}>{t("cyp.years.q")}</label>
              <input
                id={yearsId}
                type="number"
                min="1"
                max="6"
                className="cyp-input"
                value={years === "" ? "" : years}
                onChange={(e) => {
                  const val = e.target.value;
                  setYears(val === "" ? "" : Number(val));
                }}
              />
            </div>

            {/* Savings & Scholarships */}
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
                  value={savingsScholarships === "" ? "" : savingsScholarships}
                  onFocus={(e) => {
                    if (savingsScholarships === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value);
                    setSavingsScholarships(val);
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
                {selectedSchool ? (
                  <div className="cyp-selected-school">
                    🎓 {selectedSchool.name} ({residency === "inState" ? t("cyp.residency.inState") : t("cyp.residency.outOfState")})
                  </div>
                ) : school ? (
                  <div className="cyp-selected-school">🎓 {school}</div>
                ) : null}

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

            {/* Prominent Tuition Tracker Attribution & Methodology Citation */}
            <div className="cyp-citation-card">
              <div className="cyp-citation-header">
                <span>📊</span>
                <span>{t("cyp.citation.title")}</span>
              </div>
              <p>{t("cyp.citation.body")}</p>
              <a
                href="https://www.tuitiontracker.org/"
                target="_blank"
                rel="noreferrer noopener"
              >
                {t("cyp.citation.visitLink")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FUNDING GAP RESULT SECTION */}
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
          <a
            href="https://www.experian.com/blogs/ask-experian/how-do-student-loans-work/"
            target="_blank"
            rel="noreferrer noopener"
            className="cyp-topic-card"
          >
            <span className="topic-badge">{t("cyp.topicBadge1")}</span>
            <h4>{t("cyp.topic1.title")}</h4>
            <p>{t("cyp.topic1.desc")}</p>
            <span className="topic-more">{t("cyp.readExplainer")}</span>
          </a>

          <Link to="/blog/student-loan-types" className="cyp-topic-card">
            <span className="topic-badge">{t("cyp.topicBadge2")}</span>
            <h4>{t("cyp.topic2.title")}</h4>
            <p>{t("cyp.topic2.desc")}</p>
            <span className="topic-more">{t("cyp.readGuide")}</span>
          </Link>

          <Link to="/pay-for-school" className="cyp-topic-card">
            <span className="topic-badge">{t("cyp.topicBadge3")}</span>
            <h4>{t("cyp.topic3.title")}</h4>
            <p>{t("cyp.topic3.desc")}</p>
            <span className="topic-more">{t("cyp.readAnalysis")}</span>
          </Link>
        </div>
      </div>

      {/* Ready When You Are Banner */}
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
