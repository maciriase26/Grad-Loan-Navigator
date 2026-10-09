import { useState, useId, useRef, useEffect } from "react";
import { useI18n } from "@/i18n";
import {
  searchSchools,
  HOUSING_PRESETS,
  type SchoolTuitionRecord,
} from "@/data/tuitionData";

export function CollegeLoanNeedCalculator() {
  const { t } = useI18n();

  // Unique IDs for form inputs to comply with accessibility best practices
  const tuitionId = useId();
  const housingId = useId();
  const housingSelectId = useId();
  const booksId = useId();
  const transportId = useId();
  const schoolSearchId = useId();

  const scholarshipsId = useId();
  const savings529Id = useId();
  const studentContribId = useId();
  const parentContribId = useId();
  const otherAidId = useId();

  const schoolNameId = useId();
  const degreeTypeId = useId();
  const priorUndergradId = useId();
  const yearsId = useId();
  const rateId = useId();
  const termId = useId();

  // 1. Annual Cost of Attendance
  const [tuition, setTuition] = useState<number>(0);
  const [housing, setHousing] = useState<number>(0);
  const [books, setBooks] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);

  // School lookup & residency state
  const [schoolSearch, setSchoolSearch] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<SchoolTuitionRecord | null>(null);
  const [residency, setResidency] = useState<"inState" | "outOfState">("inState");
  const [housingPreset, setHousingPreset] = useState<string>("");
  const [showSchoolSuggestions, setShowSchoolSuggestions] = useState<boolean>(false);
  const schoolDropdownRef = useRef<HTMLDivElement>(null);

  // 2. Money Available Each Year
  const [scholarships, setScholarships] = useState<number>(0);
  const [savings529, setSavings529] = useState<number>(0);
  const [studentContrib, setStudentContrib] = useState<number>(0);
  const [parentContrib, setParentContrib] = useState<number>(0);
  const [otherAid, setOtherAid] = useState<number>(0);

  // 3. Program & Loan Assumptions
  const [schoolName, setSchoolName] = useState<string>("");
  const [degreeType, setDegreeType] = useState<"undergrad" | "grad" | "prof">("grad");
  const [priorUndergradLoans, setPriorUndergradLoans] = useState<number>(0);
  const [years, setYears] = useState<number>(4);
  const [rate, setRate] = useState<number>(8.07);
  const [termYears, setTermYears] = useState<number>(10);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (schoolDropdownRef.current && !schoolDropdownRef.current.contains(event.target as Node)) {
        setShowSchoolSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const schoolSuggestions =
    schoolSearch.trim().length >= 1 ? searchSchools(schoolSearch, 6) : [];

  const handleSelectSchool = (rec: SchoolTuitionRecord) => {
    setSelectedSchool(rec);
    setSchoolSearch(rec.name);
    setSchoolName(rec.name);
    setShowSchoolSuggestions(false);
    const autofilledRate = residency === "inState" ? rec.inState : rec.outOfState;
    setTuition(autofilledRate);
  };

  const handleResidencyChange = (newResidency: "inState" | "outOfState") => {
    setResidency(newResidency);
    if (selectedSchool) {
      const newRate = newResidency === "inState" ? selectedSchool.inState : selectedSchool.outOfState;
      setTuition(newRate);
    }
  };

  const handleHousingPresetSelect = (presetId: string) => {
    setHousingPreset(presetId);
    if (!presetId || presetId === "custom") return;
    const preset = HOUSING_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setHousing(preset.amount);
    }
  };

  // Automatically adjust default interest rate when degree type changes
  const handleDegreeChange = (type: "undergrad" | "grad" | "prof") => {
    setDegreeType(type);
    if (type === "undergrad") setRate(6.52);
    else if (type === "grad" || type === "prof") setRate(8.07);
  };

  // Calculations
  const totalAnnualCost = tuition + housing + books + transport;
  const totalAvailableFunding = scholarships + savings529 + studentContrib + parentContrib + otherAid;
  const annualFundingGap = Math.max(0, totalAnnualCost - totalAvailableFunding);
  const estimatedTotalBorrowing = annualFundingGap * years;

  // Monthly Payment & Amortization Formula
  let monthlyPayment = 0;
  let totalRepaid = 0;
  let totalInterestPaid = 0;

  if (estimatedTotalBorrowing > 0 && termYears > 0) {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = termYears * 12;

    if (monthlyRate === 0) {
      monthlyPayment = estimatedTotalBorrowing / totalMonths;
    } else {
      monthlyPayment =
        (estimatedTotalBorrowing * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
    totalRepaid = monthlyPayment * totalMonths;
    totalInterestPaid = Math.max(0, totalRepaid - estimatedTotalBorrowing);
  }

  // 2026 Federal Aggregate & Combined Lifetime Borrowing Limits
  const FEDERAL_CAPS: Record<"undergrad" | "grad" | "prof", number> = {
    undergrad: 57500, // max aggregate independent undergrad
    grad: 100000, // 2026 Grad aggregate limit
    prof: 200000, // 2026 Professional (Law/Med) aggregate limit
  };
  const COMBINED_LIFETIME_CEILING = 257500; // Federal lifetime aggregate ceiling across combined undergrad + grad borrowing

  const degreeCapLimit = FEDERAL_CAPS[degreeType];
  const isExceedingDegreeCap = estimatedTotalBorrowing > degreeCapLimit;
  const degreeExcessAmount = Math.max(0, estimatedTotalBorrowing - degreeCapLimit);

  const combinedTotalBorrowing = priorUndergradLoans + estimatedTotalBorrowing;
  const isExceedingLifetimeCap =
    (degreeType === "grad" || degreeType === "prof") && combinedTotalBorrowing > COMBINED_LIFETIME_CEILING;
  const lifetimeExcessAmount = Math.max(0, combinedTotalBorrowing - COMBINED_LIFETIME_CEILING);

  const isExceedingCap = isExceedingDegreeCap || isExceedingLifetimeCap;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
      val,
    );

  return (
    <div className="calc-container" id="need-calculator">
      <div className="calc-header">
        <span className="calc-badge">2026 Interactive Tool</span>
        <h2>{t("calc.title")}</h2>
        <p>{t("calc.subtitle")}</p>
      </div>

      <div className="calc-main-grid">
        {/* Box 1: Annual Cost of Attendance */}
        <div className="calc-card">
          <div className="calc-card-title">{t("calc.cost.title")}</div>
          <div className="calc-fields">
            {/* School Search & Autofill Header */}
            <div className="calc-field" ref={schoolDropdownRef} style={{ position: "relative" }}>
              <label htmlFor={schoolSearchId}>🎓 {t("calc.school.search")}</label>
              {!selectedSchool ? (
                <>
                  <input
                    id={schoolSearchId}
                    type="text"
                    className="text-input"
                    placeholder={t("cyp.school.placeholder")}
                    value={schoolSearch}
                    onFocus={() => setShowSchoolSuggestions(true)}
                    onChange={(e) => {
                      setSchoolSearch(e.target.value);
                      setShowSchoolSuggestions(true);
                    }}
                  />
                  {showSchoolSuggestions && schoolSuggestions.length > 0 && (
                    <div className="cyp-suggestions-dropdown" role="listbox">
                      {schoolSuggestions.map((inst) => (
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
                              <span>In: {formatCurrency(inst.inState)}</span>
                            </div>
                          </div>
                          <span className="cyp-suggestion-price">
                            {formatCurrency(residency === "inState" ? inst.inState : inst.outOfState)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="cyp-selected-card">
                  <div className="cyp-selected-info">
                    <div className="cyp-selected-name" style={{ fontSize: "13px" }}>
                      🎓 {selectedSchool.name}
                    </div>
                    <div className="cyp-selected-meta">
                      <span className={`cyp-badge ${selectedSchool.isPublic ? "public" : "private"}`}>
                        {selectedSchool.isPublic ? t("cyp.school.public") : t("cyp.school.private")}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cyp-clear-btn"
                    onClick={() => {
                      setSelectedSchool(null);
                      setSchoolSearch("");
                      setShowSchoolSuggestions(true);
                    }}
                  >
                    {t("cyp.school.clear")}
                  </button>
                </div>
              )}

              {/* In-State vs Out-of-State Toggle */}
              {selectedSchool && (
                <div className="cyp-residency-toggle" style={{ marginTop: "6px" }}>
                  <button
                    type="button"
                    className={`cyp-residency-btn ${residency === "inState" ? "active" : ""}`}
                    onClick={() => handleResidencyChange("inState")}
                  >
                    <span className="cyp-residency-title">🏠 {t("cyp.residency.inState")}</span>
                    <span className="cyp-residency-price">{formatCurrency(selectedSchool.inState)}</span>
                  </button>
                  <button
                    type="button"
                    className={`cyp-residency-btn ${residency === "outOfState" ? "active" : ""}`}
                    onClick={() => handleResidencyChange("outOfState")}
                  >
                    <span className="cyp-residency-title">✈️ {t("cyp.residency.outOfState")}</span>
                    <span className="cyp-residency-price">{formatCurrency(selectedSchool.outOfState)}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Tuition Input */}
            <div className="calc-field">
              <label htmlFor={tuitionId}>{t("calc.cost.tuition")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={tuitionId}
                  type="number"
                  min="0"
                  step="500"
                  value={tuition || ""}
                  onChange={(e) => setTuition(Number(e.target.value) || 0)}
                />
              </div>
              {selectedSchool && (
                <div className="cyp-autofill-badge" style={{ fontSize: "11px" }}>
                  ✓ {t("cyp.school.autofilled")}
                </div>
              )}
            </div>

            {/* Housing Input & Preset Dropdown */}
            <div className="calc-field">
              <label htmlFor={housingId}>{t("calc.cost.housing")}</label>
              <select
                id={housingSelectId}
                className="select-input"
                style={{ marginBottom: "6px", fontSize: "12.5px" }}
                value={housingPreset}
                onChange={(e) => handleHousingPresetSelect(e.target.value)}
              >
                <option value="">{t("calc.housing.preset")}...</option>
                {HOUSING_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {t(preset.labelKey)}
                  </option>
                ))}
                <option value="custom">{t("cyp.housing.custom")}</option>
              </select>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={housingId}
                  type="number"
                  min="0"
                  step="500"
                  value={housing || ""}
                  onChange={(e) => {
                    setHousing(Number(e.target.value) || 0);
                    setHousingPreset("custom");
                  }}
                />
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor={booksId}>{t("calc.cost.books")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={booksId}
                  type="number"
                  min="0"
                  step="100"
                  value={books || ""}
                  onChange={(e) => setBooks(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor={transportId}>{t("calc.cost.transport")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={transportId}
                  type="number"
                  min="0"
                  step="100"
                  value={transport || ""}
                  onChange={(e) => setTransport(Number(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          <div className="calc-sum-row">
            <span>{t("calc.cost.total")}</span>
            <span className="sum-val">{formatCurrency(totalAnnualCost)}</span>
          </div>
        </div>

        {/* Box 2: Money Available Each Year */}
        <div className="calc-card">
          <div className="calc-card-title">{t("calc.funding.title")}</div>
          <div className="calc-fields">
            <div className="calc-field">
              <label htmlFor={scholarshipsId}>{t("calc.funding.scholarships")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={scholarshipsId}
                  type="number"
                  min="0"
                  step="500"
                  value={scholarships || ""}
                  onChange={(e) => setScholarships(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor={savings529Id}>{t("calc.funding.savings")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={savings529Id}
                  type="number"
                  min="0"
                  step="500"
                  value={savings529 || ""}
                  onChange={(e) => setSavings529(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor={studentContribId}>{t("calc.funding.student")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={studentContribId}
                  type="number"
                  min="0"
                  step="500"
                  value={studentContrib || ""}
                  onChange={(e) => setStudentContrib(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor={parentContribId}>{t("calc.funding.parent")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={parentContribId}
                  type="number"
                  min="0"
                  step="500"
                  value={parentContrib || ""}
                  onChange={(e) => setParentContrib(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor={otherAidId}>{t("calc.funding.other")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={otherAidId}
                  type="number"
                  min="0"
                  step="500"
                  value={otherAid || ""}
                  onChange={(e) => setOtherAid(Number(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          <div className="calc-sum-row">
            <span>{t("calc.funding.total")}</span>
            <span className="sum-val">{formatCurrency(totalAvailableFunding)}</span>
          </div>
        </div>

        {/* Box 3: Program & Loan Assumptions */}
        <div className="calc-card">
          <div className="calc-card-title">{t("calc.assump.title")}</div>
          <div className="calc-fields">
            <div className="calc-field">
              <label htmlFor={schoolNameId}>{t("calc.assump.school")}</label>
              <input
                id={schoolNameId}
                type="text"
                className="text-input"
                placeholder={t("calc.assump.school.placeholder")}
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>

            <div className="calc-field">
              <label htmlFor={degreeTypeId}>{t("calc.assump.degree")}</label>
              <select
                id={degreeTypeId}
                className="select-input"
                value={degreeType}
                onChange={(e) =>
                  handleDegreeChange(e.target.value as "undergrad" | "grad" | "prof")
                }
              >
                <option value="undergrad">{t("calc.assump.degree.undergrad")}</option>
                <option value="grad">{t("calc.assump.degree.grad")}</option>
                <option value="prof">{t("calc.assump.degree.prof")}</option>
              </select>
            </div>

            {(degreeType === "grad" || degreeType === "prof") && (
              <div className="calc-field">
                <label htmlFor={priorUndergradId}>{t("calc.assump.priorUndergrad")}</label>
                <div className="calc-input-wrap">
                  <span className="prefix">$</span>
                  <input
                    id={priorUndergradId}
                    type="number"
                    min="0"
                    step="500"
                    value={priorUndergradLoans || ""}
                    placeholder="0"
                    onChange={(e) => setPriorUndergradLoans(Number(e.target.value) || 0)}
                  />
                </div>
                <small style={{ display: "block", marginTop: "4px", fontSize: "0.8rem", color: "#64748b" }}>
                  {t("calc.assump.priorUndergrad.note")}
                </small>
              </div>
            )}

            <div className="calc-field">
              <label htmlFor={yearsId}>{t("calc.assump.years")}</label>
              <input
                id={yearsId}
                type="number"
                min="1"
                max="6"
                className="text-input"
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 1)}
              />
            </div>

            <div className="calc-field">
              <label htmlFor={rateId}>{t("calc.assump.rate")}</label>
              <div className="calc-input-wrap">
                <input
                  id={rateId}
                  type="number"
                  step="0.01"
                  min="0"
                  max="25"
                  className="text-input"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value) || 0)}
                />
                <span className="suffix">%</span>
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor={termId}>{t("calc.assump.term")}</label>
              <select
                id={termId}
                className="select-input"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value) || 10)}
              >
                <option value="5">5 Years</option>
                <option value="10">10 Years (Standard)</option>
                <option value="15">15 Years</option>
                <option value="20">20 Years (Extended)</option>
                <option value="25">25 Years</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Output Results Card */}
      <div className="calc-results-panel">
        <div className="calc-results-header">
          <h3>{t("calc.result.title")}</h3>
          {schoolName && <span className="school-tag">{schoolName}</span>}
        </div>

        <div className="calc-stats-grid">
          <div className="res-stat">
            <span className="res-label">{t("calc.result.annualGap")}</span>
            <span className="res-val highlight">{formatCurrency(annualFundingGap)}</span>
            <span className="res-sub">Cost − Available Funding</span>
          </div>

          <div className="res-stat">
            <span className="res-label">{t("calc.result.totalBorrowing")}</span>
            <span className="res-val highlight-gold">
              {formatCurrency(estimatedTotalBorrowing)}
            </span>
            <span className="res-sub">{years} Years × Annual Gap</span>
          </div>

          <div className="res-stat">
            <span className="res-label">{t("calc.result.monthlyPayment")}</span>
            <span className="res-val">{formatCurrency(monthlyPayment)}</span>
            <span className="res-sub">
              {termYears} Yr Term @ {rate}%
            </span>
          </div>

          <div className="res-stat">
            <span className="res-label">{t("calc.result.totalRepaid")}</span>
            <span className="res-val">{formatCurrency(totalRepaid)}</span>
            <span className="res-sub">Principal + Interest</span>
          </div>

          <div className="res-stat">
            <span className="res-label">{t("calc.result.interestPaid")}</span>
            <span className="res-val">{formatCurrency(totalInterestPaid)}</span>
            <span className="res-sub">Total Interest Cost</span>
          </div>
        </div>

        {/* 2026 Federal Limit Rule Assessment Status */}
        <div className={`calc-status-box ${isExceedingCap ? "status-warning" : "status-ok"}`}>
          <div className="status-top">
            <span className="status-badge-icon">{isExceedingCap ? "⚠️" : "✓"}</span>
            <strong>{t("calc.result.statusLabel")}:</strong>
          </div>
          <p>
            {estimatedTotalBorrowing === 0 && priorUndergradLoans === 0
              ? t("calc.status.zero")
              : isExceedingLifetimeCap
                ? t("calc.status.lifetimeExceed")
                    .replace("{combined}", formatCurrency(combinedTotalBorrowing))
                    .replace("{amount}", formatCurrency(lifetimeExcessAmount))
                : isExceedingDegreeCap
                  ? t("calc.status.exceed").replace("{amount}", formatCurrency(degreeExcessAmount))
                  : t("calc.status.ok")}
          </p>
        </div>

        {/* Tuition Tracker Citation Card */}
        <div className="cyp-citation-card" style={{ marginTop: "20px" }}>
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
  );
}
