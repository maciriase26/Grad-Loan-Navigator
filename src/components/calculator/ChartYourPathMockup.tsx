import { useState, useId, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import {
  searchSchools,
  HOUSING_PRESETS,
  type SchoolTuitionRecord,
  type ProgramTuition,
} from "@/data/tuitionData";

export function ChartYourPathMockup() {
  const { t, lang } = useI18n();

  // Unique IDs for input element accessibility
  const schoolId = useId();
  const programSelectId = useId();
  const degreeTypeId = useId();
  const priorBorrowingId = useId();
  const yearsId = useId();
  const tuitionId = useId();
  const housingId = useId();
  const housingSelectId = useId();
  const expensesId = useId();
  const savingsId = useId();

  // Inputs
  const [school, setSchool] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<SchoolTuitionRecord | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<ProgramTuition | null>(null);
  const [degreeType, setDegreeType] = useState<"grad" | "prof">("grad");
  const [priorBorrowing, setPriorBorrowing] = useState<number | "">(0);
  const [residency, setResidency] = useState<"inState" | "outOfState">("inState");
  const [tuition, setTuition] = useState<number | "">(0);
  const [housingPreset, setHousingPreset] = useState<string>("");
  const [housingExpenses, setHousingExpenses] = useState<number | "">(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [years, setYears] = useState<number | "">(2); // Default to 2 years for grad school
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

  // Filter school suggestions from IPEDS/ABA/AAMC dataset
  const filteredSuggestions =
    school.trim().length >= 1 ? searchSchools(school, 8) : [];

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  // When a user selects a school from the dropdown
  const handleSelectSchool = (rec: SchoolTuitionRecord) => {
    setSelectedSchool(rec);
    setSchool(rec.name);
    setShowSuggestions(false);

    // Pick school-wide average if available, otherwise first program
    const defaultProg =
      rec.programs.find((p) => p.program.toLowerCase().includes("school-wide average")) ||
      rec.programs[0];

    setSelectedProgram(defaultProg);

    const isProf =
      defaultProg?.level === "Professional" ||
      ["law", "medicine", "dentistry", "pharmacy", "veterinary", "osteopathic", "optometry", "chiropractic", "podiatry"].some(
        (kw) => defaultProg?.program.toLowerCase().includes(kw)
      );
    setDegreeType(isProf ? "prof" : "grad");

    // Autofill tuition based on currently selected residency
    const autofilledTuition = residency === "inState" ? defaultProg.inState : defaultProg.outOfState;
    setTuition(autofilledTuition);

    // Recompute total annual expenses
    const currentHousing = typeof housingExpenses === "number" ? Math.max(0, housingExpenses) : 0;
    setAnnualExpenses(autofilledTuition + currentHousing);
  };

  // When a user selects a specific program within a school
  const handleProgramChange = (programId: string) => {
    if (!selectedSchool) return;
    const prog = selectedSchool.programs.find((p) => p.id === programId);
    if (!prog) return;

    setSelectedProgram(prog);

    const isProf =
      prog.level === "Professional" ||
      ["law", "medicine", "dentistry", "pharmacy", "veterinary", "osteopathic", "optometry", "chiropractic", "podiatry"].some(
        (kw) => prog.program.toLowerCase().includes(kw)
      );
    setDegreeType(isProf ? "prof" : "grad");

    const newTuition = residency === "inState" ? prog.inState : prog.outOfState;
    setTuition(newTuition);

    const currentHousing = typeof housingExpenses === "number" ? Math.max(0, housingExpenses) : 0;
    setAnnualExpenses(newTuition + currentHousing);
  };

  // Change residency (In-State vs Out-of-State)
  const handleResidencyChange = (newResidency: "inState" | "outOfState") => {
    setResidency(newResidency);
    if (selectedProgram) {
      const newTuition = newResidency === "inState" ? selectedProgram.inState : selectedProgram.outOfState;
      setTuition(newTuition);
      const currentHousing = typeof housingExpenses === "number" ? Math.max(0, housingExpenses) : 0;
      setAnnualExpenses(newTuition + currentHousing);
    } else if (selectedSchool) {
      const newTuition = newResidency === "inState" ? selectedSchool.inState : selectedSchool.outOfState;
      setTuition(newTuition);
      const currentHousing = typeof housingExpenses === "number" ? Math.max(0, housingExpenses) : 0;
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
      const currentTuition = typeof tuition === "number" ? Math.max(0, tuition) : 0;
      setAnnualExpenses(currentTuition + preset.amount);
    }
  };

  // Clear chosen school to re-search
  const handleClearSchool = () => {
    setSelectedSchool(null);
    setSelectedProgram(null);
    setSchool("");
    setShowSuggestions(true);
  };

  // Numbers clamped to non-negative
  const expNum = Math.max(0, typeof annualExpenses === "number" ? annualExpenses : 0);
  const savNum = Math.max(0, typeof savingsScholarships === "number" ? savingsScholarships : 0);
  const yrNum = Math.max(0, typeof years === "number" ? years : 0);
  const priorNum = Math.max(0, typeof priorBorrowing === "number" ? priorBorrowing : 0);
  const tuiNum = Math.max(0, typeof tuition === "number" ? tuition : 0);
  const houseNum = Math.max(0, typeof housingExpenses === "number" ? housingExpenses : 0);

  // Calculations
  const annualGap = Math.max(0, expNum - savNum);
  const totalGap = annualGap * yrNum;

  // 2026 Federal loan limits under One Big Beautiful Bill Act
  // General Graduate: $20,500/year, $100,000 program cap
  // Professional (Law/Med/Dentistry/Pharm/Vet): $50,000/year, $200,000 program cap
  // Lifetime combined federal aggregate ceiling (undergrad + grad): $257,500
  const yearlyFedLimit = degreeType === "prof" ? 50000 : 20500;
  const programCap = degreeType === "prof" ? 200000 : 100000;
  const lifetimeCeiling = 257500;
  const remainingLifetime = Math.max(0, lifetimeCeiling - priorNum);

  // Federal max = smallest of (yearly limit x years), program cap, and $257,500 minus prior borrowing
  const federalMax = yrNum > 0 ? Math.min(yearlyFedLimit * yrNum, programCap, remainingLifetime) : 0;
  const totalFederalCovered = Math.min(totalGap, federalMax);
  const totalRemainingPrivateGap = Math.max(0, totalGap - totalFederalCovered);

  // Standard 10-year monthly payment on total borrowing at 2026-27 unsubsidized rate (8.07%)
  const rate = 8.07;
  const monthlyRate = rate / 100 / 12;
  const totalMonths = 120;
  let estimatedMonthlyPayment = 0;
  if (totalGap > 0) {
    estimatedMonthlyPayment =
      (totalGap * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const handleCalculate = () => {
    setHasCalculated(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Pluralization helper
  const yearsLabel = yrNum === 1 ? (lang === "es" ? "1 Año" : "1 Year") : (lang === "es" ? `${yrNum} Años` : `${yrNum} Years`);

  return (
    <div className="cyp-wrap">
      {/* 1. CHART YOUR PATH - STEP 1 INPUTS */}
      <div className="cyp-hero">
        <div className="cyp-hero-flex">
          <div className="cyp-hero-text">
            <h1>{t("cyp.h1")}</h1>
            <p className="cyp-sub">{t("cyp.sub")}</p>
          </div>
          <div className="cyp-hero-media">
            <img
              src="/images/gn-animation-chart-your-path.svg"
              width="800"
              height="600"
              alt={t("alt.anim.chartYourPath")}
              loading="lazy"
              className="cyp-hero-animation"
            />
          </div>
        </div>
      </div>

      {/* Main Mockup Card Container */}
      <div className="cyp-card">
        <div className="cyp-grid">
          {/* Left Column: Form Inputs */}
          <div className="cyp-left-col">
            <span className="cyp-tag">{t("cyp.tag")}</span>

            {/* School Search Input with Graduate Database Autocomplete */}
            <div className="cyp-form-group" ref={autocompleteRef} style={{ position: "relative" }}>
              <label htmlFor={schoolId}>{t("cyp.school.q")}</label>

              {!selectedSchool ? (
                <>
                  <input
                    id={schoolId}
                    type="text"
                    className="cyp-input"
                    placeholder={lang === "es" ? "Ej. University of Florida, Harvard, Michigan..." : "e.g. University of Florida, Harvard, Michigan..."}
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
                          <span className="inst-icon">◆</span>
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
                              {inst.programs.length > 1 && (
                                <span className="cyp-prog-count">({inst.programs.length} programs)</span>
                              )}
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
                      <span className="inst-icon">◆</span> {selectedSchool.name}
                    </div>
                    <div className="cyp-selected-meta">
                      <span className={`cyp-badge ${selectedSchool.isPublic ? "public" : "private"}`}>
                        {selectedSchool.isPublic ? t("cyp.school.public") : t("cyp.school.private")}
                      </span>
                      <span className="cyp-badge year">
                        {selectedSchool.state}
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

            {/* Program / Track Picker if school has multiple programs */}
            {selectedSchool && selectedSchool.programs.length > 1 && (
              <div className="cyp-form-group">
                <label htmlFor={programSelectId}>
                  {lang === "es" ? "Programa o Titulación" : "Program / Degree Track"}
                </label>
                <select
                  id={programSelectId}
                  className="cyp-select"
                  value={selectedProgram?.id || selectedSchool.programs[0].id}
                  onChange={(e) => handleProgramChange(e.target.value)}
                >
                  {selectedSchool.programs.map((prog) => (
                    <option key={prog.id} value={prog.id}>
                      {prog.program} ({prog.level}) — In: {formatMoney(prog.inState)}
                      {selectedSchool.isPublic && ` / Out: ${formatMoney(prog.outOfState)}`}
                    </option>
                  ))}
                </select>
                {selectedProgram?.source && (
                  <small style={{ color: "#64748b", fontSize: "0.78rem", display: "block", marginTop: "4px" }}>
                    Source: {selectedProgram.source}
                  </small>
                )}
              </div>
            )}

            {/* Program Type (Graduate vs Professional) */}
            <div className="cyp-form-group">
              <label htmlFor={degreeTypeId}>
                {lang === "es" ? "Tipo de Programa Federal" : "Degree Program Category"}
              </label>
              <select
                id={degreeTypeId}
                className="cyp-select"
                value={degreeType}
                onChange={(e) => setDegreeType(e.target.value as "grad" | "prof")}
              >
                <option value="grad">
                  {lang === "es" ? "Posgrado General (Maestría / Ph.D.) — Tope: $20,500/año ($100k máx.)" : "General Graduate (Master's / Ph.D.) — Cap: $20,500/yr ($100k max)"}
                </option>
                <option value="prof">
                  {lang === "es" ? "Grado Profesional (Derecho, Medicina, Dental, Farmacia, Vet) — Tope: $50,000/año ($200k máx.)" : "Professional Degree (Law, Medical, Dental, Pharmacy, Vet) — Cap: $50,000/yr ($200k max)"}
                </option>
              </select>
            </div>

            {/* In-State vs. Out-of-State Residency Selector */}
            <div className="cyp-form-group">
              <label>{t("cyp.residency.label")}</label>
              <div className="cyp-residency-toggle" role="group" aria-label={t("cyp.residency.label")}>
                <button
                  type="button"
                  aria-label={`${t("cyp.residency.inState")}${selectedProgram ? `: ${formatMoney(selectedProgram.inState)} per year` : ""}`}
                  aria-pressed={residency === "inState"}
                  className={`cyp-residency-btn ${residency === "inState" ? "active" : ""}`}
                  onClick={() => handleResidencyChange("inState")}
                >
                  <span className="cyp-residency-title">{t("cyp.residency.inState")}</span>
                  {selectedProgram && (
                    <span className="cyp-residency-price">{formatMoney(selectedProgram.inState)}/yr</span>
                  )}
                </button>
                <button
                  type="button"
                  aria-label={`${t("cyp.residency.outOfState")}${selectedProgram ? `: ${formatMoney(selectedProgram.outOfState)} per year` : ""}`}
                  aria-pressed={residency === "outOfState"}
                  className={`cyp-residency-btn ${residency === "outOfState" ? "active" : ""}`}
                  onClick={() => handleResidencyChange("outOfState")}
                >
                  <span className="cyp-residency-title">{t("cyp.residency.outOfState")}</span>
                  {selectedProgram && (
                    <span className="cyp-residency-price">{formatMoney(selectedProgram.outOfState)}/yr</span>
                  )}
                </button>
              </div>
              {selectedSchool && !selectedSchool.isPublic && (
                <div className="cyp-residency-note">
                  * {t("cyp.residency.privateNote")}
                </div>
              )}
            </div>

            {/* Tuition Cost Input */}
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
                    const raw = e.target.value;
                    const val = raw === "" ? "" : Math.max(0, Number(raw));
                    setTuition(val);
                    const tVal = typeof val === "number" ? val : 0;
                    setAnnualExpenses(tVal + houseNum);
                  }}
                />
              </div>

              {selectedSchool && (
                <div className="cyp-autofill-badge">
                  ◆ {t("cyp.school.autofilled")} ({selectedProgram?.program || "Graduate"})
                </div>
              )}
            </div>

            {/* Housing & Living Expenses Dropdown & Input */}
            <div className="cyp-form-group">
              <label htmlFor={housingId}>{t("cyp.housing.q")}</label>

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
                    const raw = e.target.value;
                    const val = raw === "" ? "" : Math.max(0, Number(raw));
                    setHousingExpenses(val);
                    setHousingPreset("custom");
                    const hVal = typeof val === "number" ? val : 0;
                    setAnnualExpenses(tuiNum + hVal);
                  }}
                />
              </div>

              {housingPreset && housingPreset !== "custom" && (
                <div className="cyp-autofill-badge">
                  ◆ {t("cyp.housing.appliedBadge").replace("{amount}", formatMoney(houseNum))}
                </div>
              )}
            </div>

            {/* Annual Total College Expenses */}
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
                    const raw = e.target.value;
                    const val = raw === "" ? "" : Math.max(0, Number(raw));
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

            {/* Years to Graduate (defaults to 2 for grad) */}
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
                  const raw = e.target.value;
                  const val = raw === "" ? "" : Math.max(0, Math.min(6, Number(raw)));
                  setYears(val);
                }}
              />
            </div>

            {/* Prior Undergrad / Graduate Federal Borrowing */}
            <div className="cyp-form-group">
              <label htmlFor={priorBorrowingId}>
                {lang === "es" ? "Préstamos Federales Previos (Pregrado/Posgrado)" : "Prior Federal Student Loans Borrowed"}
              </label>
              <div className="cyp-money-wrap">
                <span className="prefix">$</span>
                <input
                  id={priorBorrowingId}
                  type="number"
                  step="1000"
                  min="0"
                  placeholder="0"
                  className="cyp-input money-input"
                  value={priorBorrowing === "" ? "" : priorBorrowing}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setPriorBorrowing(raw === "" ? "" : Math.max(0, Number(raw)));
                  }}
                />
              </div>
              <small style={{ color: "#64748b", fontSize: "0.78rem", display: "block", marginTop: "4px" }}>
                {lang === "es" ? "Cuenta para el límite federal combinado de por vida de $257,500." : "Counts toward the $257,500 lifetime aggregate federal limit."}
              </small>
            </div>

            {/* Savings & Scholarships */}
            <div className="cyp-form-group">
              <div className="cyp-label-with-link">
                <label htmlFor={savingsId}>{t("cyp.savings.q")}</label>
                <Link to="/free-money-first" className="cyp-free-money-link">
                  {t("cyp.freeMoney.link")} →
                </Link>
              </div>
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
                    const raw = e.target.value;
                    setSavingsScholarships(raw === "" ? "" : Math.max(0, Number(raw)));
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
              <span className="cyp-limits-tag">
                {degreeType === "prof" ? "2026 Professional Limits" : t("cyp.limits.tag")}
              </span>
              <p className="cyp-limits-desc">
                {degreeType === "prof"
                  ? (lang === "es"
                      ? "Límites profesionales de 2026: hasta $50,000 por año con un tope agregado de $200,000."
                      : "2026 professional borrowing caps allow up to $50,000 per year with a $200,000 program aggregate limit.")
                  : t("cyp.limits.desc")}
              </p>

              <div className="cyp-results-box">
                {selectedSchool ? (
                  <div className="cyp-selected-school">
                    ◆ {selectedSchool.name} {selectedProgram && `· ${selectedProgram.program}`} ({residency === "inState" ? t("cyp.residency.inState") : t("cyp.residency.outOfState")})
                  </div>
                ) : school ? (
                  <div className="cyp-selected-school">◆ {school}</div>
                ) : null}

                <div className="cyp-res-row">
                  <span>{t("cyp.summary.cost")}</span>
                  <strong>{formatMoney(expNum)} / yr</strong>
                </div>
                <div className="cyp-res-row">
                  <span>{t("cyp.summary.savings")}</span>
                  <strong className="text-savings">−{formatMoney(savNum)} / yr</strong>
                </div>
                <div className="cyp-res-row main-gap">
                  <span>{t("cyp.summary.gap")}</span>
                  <strong className="text-gap">{formatMoney(annualGap)} / yr</strong>
                </div>

                <div className="cyp-divider" />

                <div className="cyp-res-row">
                  <span>{t("cyp.summary.totalGap").replace("{y}", String(yrNum))} ({yearsLabel})</span>
                  <strong>{formatMoney(totalGap)}</strong>
                </div>
                <div className="cyp-res-row">
                  <span>{t("cyp.summary.fedLimit")}</span>
                  <span>{formatMoney(yearlyFedLimit)} / yr</span>
                </div>
                <div className="cyp-res-row">
                  <span>{t("cyp.summary.fedCoverage")}</span>
                  <strong className="text-fed">{formatMoney(totalFederalCovered)}</strong>
                </div>

                {totalGap > 0 && (
                  <div className="cyp-res-row" style={{ fontSize: "0.88rem", color: "#64748b" }}>
                    <span>{lang === "es" ? "Pago mensual est. (10 años @ 8.07%)" : "Est. Monthly Payment (10-Yr @ 8.07%)"}</span>
                    <strong>{formatMoney(estimatedMonthlyPayment)} / mo</strong>
                  </div>
                )}

                {totalRemainingPrivateGap > 0 ? (
                  <div className="cyp-remaining-box warning">
                    <span>{t("cyp.summary.privGap")}</span>
                    <strong>{formatMoney(totalRemainingPrivateGap)}</strong>
                    <small>
                      {totalGap > programCap
                        ? (lang === "es"
                            ? `Excede el tope del programa (${formatMoney(programCap)}) por ${formatMoney(totalGap - programCap)}.`
                            : `Exceeds the ${formatMoney(programCap)} program aggregate cap by ${formatMoney(totalGap - programCap)}.`)
                        : totalGap > yearlyFedLimit * yrNum
                          ? (lang === "es"
                              ? `Excede el límite anual (${formatMoney(yearlyFedLimit)}/año × ${yearsLabel}).`
                              : `Exceeds the annual limit (${formatMoney(yearlyFedLimit)}/yr × ${yearsLabel} = ${formatMoney(yearlyFedLimit * yrNum)}).`)
                          : (lang === "es"
                              ? `Préstamos previos (${formatMoney(priorNum)}) y nuevos préstamos superan el tope de por vida de $257,500.`
                              : `Combined prior loans (${formatMoney(priorNum)}) and borrowing exceed the $257,500 lifetime cap.`)}
                    </small>
                  </div>
                ) : (
                  <div className="cyp-remaining-box ok">
                    <span>{totalGap === 0 ? "No Loans Needed" : t("cyp.summary.covered")}</span>
                    <small>
                      {totalGap === 0
                        ? (lang === "es" ? "Tus becas y ahorros cubren todo el costo." : "Your scholarships and savings cover your total cost.")
                        : (lang === "es" ? "Se ajusta completamente a los límites federales de 2026." : t("cyp.summary.noPriv"))}
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* Authoritative Data Sources & Methodology Citation */}
            <div className="cyp-citation-card">
              <div className="cyp-citation-header">
                <span className="cyp-citation-sym">§</span>
                <span>{lang === "es" ? "Fuentes y Metodología" : "Data Sources & Methodology"}</span>
              </div>
              <p>
                {lang === "es"
                  ? "Cifras de matrícula y cuotas recopiladas de las encuestas oficiales IPEDS (NCES) 2024–25, informes de acreditación ABA Standard 509 (2025), AAMC Medical School Tuition (2025–26) y AACP Pharmacy Tuition. Los límites federales reflejan la ley One Big Beautiful Bill Act vigentes para el año académico 2026–27."
                  : "Tuition and fee data sourced from U.S. Dept. of Education IPEDS 2024–25 Cost Surveys, American Bar Association (ABA) 2025 Standard 509 Reports, AAMC Medical School Tuition Reports (2025–26), and AACP Pharmacy Reports. Borrowing caps reflect the One Big Beautiful Bill Act limits effective July 1, 2026."}
              </p>
              <a
                href="https://studentaid.gov"
                target="_blank"
                rel="noreferrer noopener"
              >
                {lang === "es" ? "Ver normativa en studentaid.gov →" : "Verify federal limits at studentaid.gov →"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FUNDING GAP RESULT SECTION */}
      {hasCalculated && (
        <div className="cyp-result-step" ref={resultRef}>
          <div className="cyp-result-header-flex">
            <div className="cyp-result-header-text">
              <h2>{t("cyp.res.h2")}</h2>
              <p className="cyp-sub">{t("cyp.res.sub")}</p>
            </div>
            <div className="cyp-result-header-media">
              <img
                src="/images/gn-animation-plan-complete.svg"
                width="800"
                height="600"
                alt={t("alt.anim.planComplete")}
                loading="lazy"
                className="cyp-result-animation"
              />
            </div>
          </div>

          <div className="cyp-result-grid">
            {/* Left: Your Result Card */}
            <div className="cyp-result-card">
              <span className="cyp-tag">{t("cyp.res.tag")}</span>

              <div className="cyp-gap-table">
                <div className="cyp-gap-row">
                  <span className="gap-row-label">{t("cyp.res.cost")}</span>
                  <span className="gap-row-val">{formatMoney(expNum)} / yr</span>
                </div>
                <div className="cyp-gap-row">
                  <span className="gap-row-label">{t("cyp.res.savings")}</span>
                  <span className="gap-row-val text-savings">− {formatMoney(savNum)} / yr</span>
                </div>
                <div className="cyp-gap-row highlight-box">
                  <span className="gap-row-label-bold">{t("cyp.res.gap")}</span>
                  <span className="gap-row-val-bold">{formatMoney(annualGap)} / yr</span>
                </div>
                <div className="cyp-gap-row">
                  <span className="gap-row-label">
                    {lang === "es" ? `Total (${yearsLabel})` : `Total Estimated Need (${yearsLabel})`}
                  </span>
                  <span className="gap-row-val">{formatMoney(totalGap)}</span>
                </div>
                <div className="cyp-gap-row">
                  <span className="gap-row-label">
                    {lang === "es" ? "Máximo Federal Permitido" : "Max Federal Loan Coverage"}
                  </span>
                  <span className="gap-row-val text-fed">{formatMoney(totalFederalCovered)}</span>
                </div>
                {totalRemainingPrivateGap > 0 && (
                  <div className="cyp-gap-row highlight-box" style={{ background: "#fff1f2", borderColor: "#fecdd3" }}>
                    <span className="gap-row-label-bold" style={{ color: "#9f1239" }}>
                      {lang === "es" ? "Brecha Privada Restante" : "Remaining Gap (Private Loans)"}
                    </span>
                    <span className="gap-row-val-bold" style={{ color: "#9f1239" }}>
                      {formatMoney(totalRemainingPrivateGap)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: What's Next Card */}
            <div className="cyp-whats-next-card">
              <span className="cyp-tag">{t("cyp.next.tag")}</span>
              <p>{t("cyp.next.text")}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                <Link to="/aid-offer-comparison" className="cyp-explore-btn">
                  {lang === "es" ? "Comparar ofertas de ayuda financiera →" : "Compare Financial Aid Offers →"}
                </Link>
                <Link to="/free-money-first" className="cyp-explore-btn" style={{ background: "#f8fafc", color: "#1e293b", border: "1px solid #cbd5e1" }}>
                  {lang === "es" ? "Buscar becas y dinero gratis primero →" : "Find Free Money & Scholarships First →"}
                </Link>
              </div>
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

          <a
            href="https://www.experian.com/blogs/ask-experian/how-to-get-a-student-loan/"
            target="_blank"
            rel="noopener noreferrer"
            className="cyp-topic-card"
          >
            <span className="topic-badge">{t("cyp.topicBadge3")}</span>
            <h4>{t("cyp.topic3.title")}</h4>
            <p>{t("cyp.topic3.desc")}</p>
            <span className="topic-more">{t("cyp.readAnalysis")}</span>
          </a>
        </div>
      </div>

      {/* Ready When You Are Banner */}
      <div className="cyp-ready-banner">
        <div className="cyp-ready-content">
          <h3>{t("cyp.ready.title")}</h3>
          <p>{t("cyp.ready.desc")}</p>
        </div>
        <Link to="/aid-offer-comparison" className="cyp-ready-btn">
          {t("cyp.ready.cta")}
        </Link>
      </div>
    </div>
  );
}
