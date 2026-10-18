import { useState, useId, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import {
  searchSchools,
  HOUSING_PRESETS,
  type SchoolTuitionRecord,
} from "@/data/tuitionData";

export interface CollegeLoanNeedCalculatorProps {
  schoolName?: string;
  selectedSchool?: SchoolTuitionRecord | null;
  residency?: "inState" | "outOfState";
  tuition?: number | "";
  housing?: number | "";
  housingPreset?: string;
  years?: number | "";
  scholarships?: number | "";
  rate?: number | "";
  termYears?: number;
  onSelectSchool?: (rec: SchoolTuitionRecord) => void;
  onClearSchool?: () => void;
  onResidencyChange?: (res: "inState" | "outOfState") => void;
  onTuitionChange?: (val: number | "") => void;
  onHousingChange?: (val: number | "", preset?: string) => void;
  onYearsChange?: (val: number | "") => void;
  onScholarshipsChange?: (val: number | "") => void;
  onRateChange?: (val: number | "") => void;
  onTermYearsChange?: (val: number) => void;
}

export function CollegeLoanNeedCalculator(props: CollegeLoanNeedCalculatorProps = {}) {
  const {
    schoolName: propSchoolName,
    selectedSchool: propSelectedSchool,
    residency: propResidency,
    tuition: propTuition,
    housing: propHousing,
    housingPreset: propHousingPreset,
    years: propYears,
    scholarships: propScholarships,
    rate: propRate,
    termYears: propTermYears,
    onSelectSchool: propOnSelectSchool,
    onClearSchool: propOnClearSchool,
    onResidencyChange: propOnResidencyChange,
    onTuitionChange: propOnTuitionChange,
    onHousingChange: propOnHousingChange,
    onYearsChange: propOnYearsChange,
    onScholarshipsChange: propOnScholarshipsChange,
    onRateChange: propOnRateChange,
    onTermYearsChange: propOnTermYearsChange,
  } = props;

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
  const [tuition, setTuition] = useState<number | "">(propTuition ?? 0);
  const [housing, setHousing] = useState<number | "">(propHousing ?? 0);
  const [books, setBooks] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);

  // School lookup & residency state
  const [schoolSearch, setSchoolSearch] = useState<string>(propSchoolName ?? "");
  const [selectedSchool, setSelectedSchool] = useState<SchoolTuitionRecord | null>(
    propSelectedSchool ?? null
  );
  const [residency, setResidency] = useState<"inState" | "outOfState">(
    propResidency ?? "inState"
  );
  const [housingPreset, setHousingPreset] = useState<string>(propHousingPreset ?? "");
  const [showSchoolSuggestions, setShowSchoolSuggestions] = useState<boolean>(false);
  const schoolDropdownRef = useRef<HTMLDivElement>(null);

  // 2. Money Available Each Year
  const [scholarships, setScholarships] = useState<number | "">(propScholarships ?? 0);
  const [savings529, setSavings529] = useState<number>(0);
  const [studentContrib, setStudentContrib] = useState<number>(0);
  const [parentContrib, setParentContrib] = useState<number>(0);
  const [otherAid, setOtherAid] = useState<number>(0);

  // 3. Program & Loan Assumptions
  const [schoolName, setSchoolName] = useState<string>(propSchoolName ?? "");
  const [degreeType, setDegreeType] = useState<"undergrad" | "grad" | "prof">("grad");
  const [priorUndergradLoans, setPriorUndergradLoans] = useState<number>(0);
  const [years, setYears] = useState<number | "">(propYears ?? 4);
  const [rate, setRate] = useState<number | "">(propRate ?? 8.07);
  const [termYears, setTermYears] = useState<number>(propTermYears ?? 10);

  // Sync state if props change externally
  useEffect(() => {
    if (propSchoolName !== undefined) {
      setSchoolName(propSchoolName);
      setSchoolSearch(propSchoolName);
    }
  }, [propSchoolName]);

  useEffect(() => {
    if (propSelectedSchool !== undefined) {
      setSelectedSchool(propSelectedSchool);
    }
  }, [propSelectedSchool]);

  useEffect(() => {
    if (propResidency !== undefined) {
      setResidency(propResidency);
    }
  }, [propResidency]);

  useEffect(() => {
    if (propTuition !== undefined) {
      setTuition(propTuition);
    }
  }, [propTuition]);

  useEffect(() => {
    if (propHousing !== undefined) {
      setHousing(propHousing);
    }
  }, [propHousing]);

  useEffect(() => {
    if (propHousingPreset !== undefined) {
      setHousingPreset(propHousingPreset);
    }
  }, [propHousingPreset]);

  useEffect(() => {
    if (propYears !== undefined) {
      setYears(propYears);
    }
  }, [propYears]);

  useEffect(() => {
    if (propScholarships !== undefined) {
      setScholarships(propScholarships);
    }
  }, [propScholarships]);

  useEffect(() => {
    if (propRate !== undefined) {
      setRate(propRate);
    }
  }, [propRate]);

  useEffect(() => {
    if (propTermYears !== undefined) {
      setTermYears(propTermYears);
    }
  }, [propTermYears]);

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
    propOnSelectSchool?.(rec);
  };

  const handleClearSchool = () => {
    setSelectedSchool(null);
    setSchoolSearch("");
    setSchoolName("");
    setShowSchoolSuggestions(true);
    propOnClearSchool?.();
  };

  const handleResidencyChange = (newResidency: "inState" | "outOfState") => {
    setResidency(newResidency);
    if (selectedSchool) {
      const newRate = newResidency === "inState" ? selectedSchool.inState : selectedSchool.outOfState;
      setTuition(newRate);
    }
    propOnResidencyChange?.(newResidency);
  };

  const handleHousingPresetSelect = (presetId: string) => {
    setHousingPreset(presetId);
    if (!presetId || presetId === "custom") {
      propOnHousingChange?.(housing, "custom");
      return;
    }
    const preset = HOUSING_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setHousing(preset.amount);
      propOnHousingChange?.(preset.amount, presetId);
    }
  };

  // Automatically adjust default interest rate when degree type changes
  const handleDegreeChange = (type: "undergrad" | "grad" | "prof") => {
    setDegreeType(type);
    let newRate = activeRate;
    if (type === "undergrad") newRate = 6.52;
    else if (type === "grad" || type === "prof") newRate = 8.07;
    setRate(newRate);
    propOnRateChange?.(newRate);
  };

  const tNum = typeof tuition === "number" ? tuition : 0;
  const hNum = typeof housing === "number" ? housing : 0;
  const sNum = typeof scholarships === "number" ? scholarships : 0;
  const activeYears = typeof years === "number" && years > 0 ? years : 1;
  const activeRate = typeof rate === "number" && rate >= 0 ? rate : 0;
  const activeTerm = typeof termYears === "number" && termYears > 0 ? termYears : 10;

  // Calculations
  const totalAnnualCost = tNum + hNum + books + transport;
  const totalAvailableFunding = sNum + savings529 + studentContrib + parentContrib + otherAid;
  const annualFundingGap = Math.max(0, totalAnnualCost - totalAvailableFunding);
  const estimatedTotalBorrowing = annualFundingGap * activeYears;

  // Monthly Payment & Amortization Formula
  let monthlyPayment = 0;
  let totalRepaid = 0;
  let totalInterestPaid = 0;

  if (estimatedTotalBorrowing > 0 && activeTerm > 0) {
    const monthlyRate = activeRate / 100 / 12;
    const totalMonths = activeTerm * 12;

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
              <label htmlFor={schoolSearchId}>◆ {t("calc.school.search")}</label>
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
                          <span className="inst-icon">◆</span>
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
                      <span className="inst-icon">◆</span> {selectedSchool.name}
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
                    onClick={handleClearSchool}
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
                    <span className="cyp-residency-title">{t("cyp.residency.inState")}</span>
                    <span className="cyp-residency-price">{formatCurrency(selectedSchool.inState)}</span>
                  </button>
                  <button
                    type="button"
                    className={`cyp-residency-btn ${residency === "outOfState" ? "active" : ""}`}
                    onClick={() => handleResidencyChange("outOfState")}
                  >
                    <span className="cyp-residency-title">{t("cyp.residency.outOfState")}</span>
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
                  value={tuition === "" ? "" : tuition}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value);
                    setTuition(val);
                    propOnTuitionChange?.(val);
                  }}
                />
              </div>
              {selectedSchool && (
                <div className="cyp-autofill-badge" style={{ fontSize: "11px" }}>
                  ◆ {t("cyp.school.autofilled")}
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
                  value={housing === "" ? "" : housing}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value);
                    setHousing(val);
                    setHousingPreset("custom");
                    propOnHousingChange?.(val, "custom");
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
              <div className="calc-label-with-link">
                <label htmlFor={scholarshipsId}>{t("calc.funding.scholarships")}</label>
                <Link to="/free-money-first" className="cyp-free-money-link">
                  {t("cyp.freeMoney.link")} →
                </Link>
              </div>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={scholarshipsId}
                  type="number"
                  min="0"
                  step="500"
                  value={scholarships === "" ? "" : scholarships}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value);
                    setScholarships(val);
                    propOnScholarshipsChange?.(val);
                  }}
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
                value={years === "" ? "" : years}
                onFocus={(e) => {
                  if (years === 0) e.target.select();
                }}
                onChange={(e) => {
                  const val = e.target.value === "" ? "" : Number(e.target.value);
                  setYears(val);
                  propOnYearsChange?.(val);
                }}
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
                  value={rate === "" ? "" : rate}
                  onFocus={(e) => {
                    if (rate === 0) e.target.select();
                  }}
                  onChange={(e) => {
                    const val = e.target.value === "" ? "" : Number(e.target.value);
                    setRate(val);
                    propOnRateChange?.(val);
                  }}
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
                onChange={(e) => {
                  const val = Number(e.target.value) || 10;
                  setTermYears(val);
                  propOnTermYearsChange?.(val);
                }}
              >
                <option value={5}>{t("calc.term.5")}</option>
                <option value={10}>{t("calc.term.10")}</option>
                <option value={15}>{t("calc.term.15")}</option>
                <option value={20}>{t("calc.term.20")}</option>
                <option value={25}>{t("calc.term.25")}</option>
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
            <span className="res-sub">{t("calc.result.sub.gap")}</span>
          </div>

          <div className="res-stat">
            <span className="res-label">{t("calc.result.totalBorrowing")}</span>
            <span className="res-val highlight-gold">
              {formatCurrency(estimatedTotalBorrowing)}
            </span>
            <span className="res-sub">
              {activeYears === 1
                ? t("calc.result.sub.yearsSingle")
                : t("calc.result.sub.yearsPlural").replace("{years}", String(activeYears))}
            </span>
          </div>

          <div className="res-stat">
            <span className="res-label">{t("calc.result.monthlyPayment")}</span>
            <span className="res-val">{formatCurrency(monthlyPayment)}</span>
            <span className="res-sub">
              {activeTerm === 1
                ? t("calc.result.sub.termRateSingle").replace("{rate}", String(activeRate))
                : t("calc.result.sub.termRatePlural").replace("{termYears}", String(activeTerm)).replace("{rate}", String(activeRate))}
            </span>
          </div>

          <div className="res-stat">
            <span className="res-label">{t("calc.result.totalRepaid")}</span>
            <span className="res-val">{formatCurrency(totalRepaid)}</span>
            <span className="res-sub">{t("calc.result.sub.repaid")}</span>
          </div>

          <div className="res-stat">
            <span className="res-label">{t("calc.result.interestPaid")}</span>
            <span className="res-val">{formatCurrency(totalInterestPaid)}</span>
            <span className="res-sub">{t("calc.result.sub.interest")}</span>
          </div>
        </div>

        {/* 2026 Federal Limit Rule Assessment Status */}
        <div className={`calc-status-box ${isExceedingCap ? "status-warning" : "status-ok"}`}>
          <div className="status-top">
            <span className="status-badge-icon">{isExceedingCap ? "!" : "◆"}</span>
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
            <span className="cyp-citation-sym">§</span>
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
