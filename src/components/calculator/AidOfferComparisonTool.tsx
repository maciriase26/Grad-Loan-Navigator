import { useState, useId, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import { searchSchools, type SchoolTuitionRecord, HOUSING_PRESETS } from "@/data/tuitionData";

export interface AidOffer {
  id: string;
  schoolName: string;
  programYears: number;
  coa: number | "";
  scholarships: number | "";
  waivers: number | "";
  workStudy: number | "";
  loansDirect: number | "";
  loansPlus: number | "";
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

const INITIAL_OFFERS: AidOffer[] = [
  {
    id: "offer-1",
    schoolName: "State University (In-State)",
    programYears: 2,
    coa: 28500,
    scholarships: 6000,
    waivers: 4500,
    workStudy: 2500,
    loansDirect: 12000,
    loansPlus: 3500,
  },
  {
    id: "offer-2",
    schoolName: "Private University (Metro)",
    programYears: 2,
    coa: 58000,
    scholarships: 18000,
    waivers: 0,
    workStudy: 3000,
    loansDirect: 20500,
    loansPlus: 16500,
  },
];

export function AidOfferComparisonTool() {
  const { t, lang } = useI18n();
  const [offers, setOffers] = useState<AidOffer[]>(INITIAL_OFFERS);
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Search state for autocomplete per school
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(null);
  const [searchQueries, setSearchQueries] = useState<Record<number, string>>({});
  const [searchResults, setSearchResults] = useState<Record<number, SchoolTuitionRecord[]>>({});
  const searchWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close search popups on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (activeSearchIndex !== null) {
        const ref = searchWrapperRefs.current[activeSearchIndex];
        if (ref && !ref.contains(e.target as Node)) {
          setActiveSearchIndex(null);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeSearchIndex]);

  const updateOffer = (index: number, field: keyof AidOffer, value: any) => {
    setOffers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addSchool = () => {
    if (offers.length >= 4) return;
    const newOffer: AidOffer = {
      id: `offer-${Date.now()}`,
      schoolName: `School ${offers.length + 1}`,
      programYears: 2,
      coa: "",
      scholarships: "",
      waivers: "",
      workStudy: "",
      loansDirect: "",
      loansPlus: "",
    };
    setOffers([...offers, newOffer]);
  };

  const removeSchool = (index: number) => {
    if (offers.length <= 1) return;
    setOffers(offers.filter((_, i) => i !== index));
  };

  const resetComparison = () => {
    setOffers(INITIAL_OFFERS);
  };

  const handlePrint = () => {
    window.print();
  };

  // Compute metrics per school
  const calculatedOffers = offers.map((offer) => {
    const coa = typeof offer.coa === "number" ? offer.coa : 0;
    const scholarships = typeof offer.scholarships === "number" ? offer.scholarships : 0;
    const waivers = typeof offer.waivers === "number" ? offer.waivers : 0;
    const workStudy = typeof offer.workStudy === "number" ? offer.workStudy : 0;
    const loansDirect = typeof offer.loansDirect === "number" ? offer.loansDirect : 0;
    const loansPlus = typeof offer.loansPlus === "number" ? offer.loansPlus : 0;
    const years = typeof offer.programYears === "number" && offer.programYears > 0 ? offer.programYears : 2;

    const totalFreeAid = scholarships + waivers;
    const totalLoansAnnual = loansDirect + loansPlus;
    const netPriceAnnual = Math.max(0, coa - totalFreeAid);
    const outOfPocketGapAnnual = Math.max(0, coa - totalFreeAid - workStudy);
    const uncoveredShortfall = Math.max(0, outOfPocketGapAnnual - totalLoansAnnual);
    const totalDebtAtGrad = totalLoansAnnual * years;

    // Standard 10-year monthly loan repayment (120 months) at 8.08%
    const rateMonthly = 0.0808 / 12;
    const numPayments = 120;
    let monthlyPayment = 0;
    if (totalDebtAtGrad > 0) {
      monthlyPayment = Math.round(
        (totalDebtAtGrad * (rateMonthly * Math.pow(1 + rateMonthly, numPayments))) /
          (Math.pow(1 + rateMonthly, numPayments) - 1)
      );
    }
    const totalRepaid10Yr = monthlyPayment * numPayments;
    const totalInterest10Yr = Math.max(0, totalRepaid10Yr - totalDebtAtGrad);

    // University's advertised total aid (which misleadingly includes loans)
    const schoolAdvertisedAid = totalFreeAid + workStudy + totalLoansAnnual;
    const loanPercentageOfPackage =
      schoolAdvertisedAid > 0 ? Math.round((totalLoansAnnual / schoolAdvertisedAid) * 100) : 0;
    const isMostlyLoans = loanPercentageOfPackage >= 50 && totalLoansAnnual > 0;

    return {
      offer,
      coa,
      scholarships,
      waivers,
      workStudy,
      loansDirect,
      loansPlus,
      years,
      totalFreeAid,
      totalLoansAnnual,
      netPriceAnnual,
      outOfPocketGapAnnual,
      uncoveredShortfall,
      totalDebtAtGrad,
      monthlyPayment,
      totalRepaid10Yr,
      totalInterest10Yr,
      schoolAdvertisedAid,
      loanPercentageOfPackage,
      isMostlyLoans,
    };
  });

  // Determine highlights across entered schools
  const validNetPrices = calculatedOffers.filter((o) => o.coa > 0).map((o) => o.netPriceAnnual);
  const minNetPrice = validNetPrices.length > 0 ? Math.min(...validNetPrices) : null;

  const validDebts = calculatedOffers.filter((o) => o.coa > 0).map((o) => o.totalDebtAtGrad);
  const minDebt = validDebts.length > 0 ? Math.min(...validDebts) : null;

  // Appeal Letter Copy Function
  const appealLetterText = `Dear Financial Aid Committee at [Name of University],

I am honored to have been accepted into the [Degree / Program Name] program for the upcoming academic year. [Name of University] remains my top choice due to [specific faculty, research center, or curriculum strength].

I am writing to respectfully request a reconsideration of my financial aid award. While I am deeply grateful for the [mention any grant/scholarship received, e.g. $5,000 scholarship], the current net cost creates a significant funding gap for my family.

[Select Option A or B:]
Option A (Competing Offer): I have received an aid offer from [Competing Peer University], which provides [mention competing award, e.g. a $15,000 annual scholarship / graduate assistantship waiver], bringing my remaining out-of-pocket tuition obligation to $[Amount].

Option B (Changed Financial Circumstances): Since filing my financial aid documents, our household's financial situation has materially changed due to [briefly describe job change, extraordinary medical expenses, or reduced income], resulting in [briefly state impact, e.g., an unexpected loss of $X in annual household earnings].

If [Name of University] is able to narrow this funding gap by [specific reasonable amount, e.g. $4,000 to $6,000 per year], I would enthusiastically commit and submit my enrollment deposit immediately.

Thank you very much for your time, consideration, and dedication to supporting graduate students.

Sincerely,
[Your Full Name]
[Your Student ID / Application Number]
[Phone Number] | [Email Address]`;

  const copyAppealLetter = () => {
    navigator.clipboard.writeText(appealLetterText);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 3000);
  };

  return (
    <div className="aoc-tool-wrapper">
      {/* Top Controls Bar */}
      <div className="aoc-controls-bar">
        <div className="aoc-controls-left">
          <button
            type="button"
            className="btn-primary aoc-add-btn"
            onClick={addSchool}
            disabled={offers.length >= 4}
          >
            <span>{t("aoc.btn.addSchool")}</span>
          </button>
          <span className="aoc-school-count">
            {offers.length} / 4 {lang === "es" ? "universidades" : "schools"}
          </span>
        </div>

        <div className="aoc-controls-right">
          <button type="button" className="btn-secondary aoc-print-btn" onClick={handlePrint}>
            <PrintIcon />
            <span>{t("aoc.btn.printPdf")}</span>
          </button>
          <button type="button" className="aoc-reset-btn" onClick={resetComparison}>
            {t("aoc.btn.reset")}
          </button>
        </div>
      </div>

      {/* Printable Report Header (Active on print) */}
      <div className="aoc-print-only aoc-print-header">
        <div className="aoc-print-logo">Grad Loan Navigator</div>
        <h2>{t("aoc.pdf.header")}</h2>
        <p className="aoc-print-sub">
          {t("aoc.pdf.sub")} • {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Schools Cards Grid */}
      <div className={`aoc-cards-grid aoc-grid-${offers.length}`}>
        {calculatedOffers.map((item, idx) => {
          const { offer, coa, totalFreeAid, totalLoansAnnual, netPriceAnnual, outOfPocketGapAnnual, totalDebtAtGrad, monthlyPayment, isMostlyLoans, loanPercentageOfPackage, schoolAdvertisedAid } = item;
          const isLowestNetPrice = minNetPrice !== null && netPriceAnnual === minNetPrice && coa > 0;
          const isLowestDebt = minDebt !== null && totalDebtAtGrad === minDebt && coa > 0;

          return (
            <div
              key={offer.id}
              className={`aoc-school-card ${isLowestNetPrice ? "aoc-card-highlight" : ""}`}
            >
              {/* Card Header */}
              <div className="aoc-card-header">
                <div className="aoc-school-top-row">
                  <span className="aoc-school-index">
                    {lang === "es" ? "Universidad" : "School"} {idx + 1}
                  </span>
                  {offers.length > 1 && (
                    <button
                      type="button"
                      className="aoc-remove-btn"
                      onClick={() => removeSchool(idx)}
                      title={t("aoc.btn.removeSchool")}
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* School Name Input with Autocomplete */}
                <div
                  className="aoc-name-search-wrap"
                  ref={(el) => {
                    searchWrapperRefs.current[idx] = el;
                  }}
                >
                  <label className="aoc-label-sm">{t("aoc.field.schoolName")}</label>
                  <input
                    type="text"
                    className="aoc-input aoc-school-name-input"
                    placeholder={t("aoc.field.schoolSearchPlaceholder")}
                    value={offer.schoolName}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateOffer(idx, "schoolName", val);
                      setSearchQueries((prev) => ({ ...prev, [idx]: val }));
                      if (val.trim().length >= 2) {
                        const results = searchSchools(val, 5);
                        setSearchResults((prev) => ({ ...prev, [idx]: results }));
                        setActiveSearchIndex(idx);
                      } else {
                        setSearchResults((prev) => ({ ...prev, [idx]: [] }));
                      }
                    }}
                    onFocus={() => {
                      if (offer.schoolName.trim().length >= 2) {
                        const results = searchSchools(offer.schoolName, 5);
                        setSearchResults((prev) => ({ ...prev, [idx]: results }));
                        setActiveSearchIndex(idx);
                      }
                    }}
                  />

                  {/* Autocomplete Dropdown */}
                  {activeSearchIndex === idx && (searchResults[idx]?.length || 0) > 0 && (
                    <ul className="aoc-autocomplete-list">
                      {searchResults[idx].map((school) => (
                        <li
                          key={school.id}
                          className="aoc-autocomplete-item"
                          onClick={() => {
                            updateOffer(idx, "schoolName", school.name);
                            // Autofill COA: tuition + national avg housing ($13,500)
                            const estCoa = school.inState + 13500;
                            updateOffer(idx, "coa", estCoa);
                            setActiveSearchIndex(null);
                          }}
                        >
                          <div className="aoc-auto-name">{school.name}</div>
                          <div className="aoc-auto-meta">
                            {school.isPublic ? "Public" : "Private"} • In-State Tuition:{" "}
                            {formatMoney(school.inState)} | Out-of-State:{" "}
                            {formatMoney(school.outOfState)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Program Length */}
                <div className="aoc-program-row">
                  <label className="aoc-label-sm">{t("aoc.field.programYears")}</label>
                  <select
                    className="aoc-select"
                    value={offer.programYears}
                    onChange={(e) => updateOffer(idx, "programYears", Number(e.target.value))}
                  >
                    <option value={1}>1 Year (Accelerated)</option>
                    <option value={2}>2 Years (Standard Master's)</option>
                    <option value={3}>3 Years (Law / MFA / Dual)</option>
                    <option value={4}>4 Years (Medical / Doctoral)</option>
                    <option value={5}>5 Years (Ph.D.)</option>
                  </select>
                </div>
              </div>

              {/* Badges Bar (Lowest Net Price / Lowest Debt) */}
              <div className="aoc-badges-bar">
                {isLowestNetPrice && (
                  <span className="aoc-badge aoc-badge-green">
                    <CheckIcon /> {t("aoc.badge.lowestNetPrice")}
                  </span>
                )}
                {isLowestDebt && (
                  <span className="aoc-badge aoc-badge-blue">
                    ◆ {t("aoc.badge.lowestDebt")}
                  </span>
                )}
              </div>

              {/* Input Section 1: Cost of Attendance */}
              <div className="aoc-field-block">
                <div className="aoc-field-header">
                  <label className="aoc-label">{t("aoc.field.coa")}</label>
                  <span className="aoc-field-hint">{t("aoc.field.coaHelp")}</span>
                </div>
                <div className="aoc-money-wrap">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    placeholder="0"
                    className="aoc-input money-input"
                    value={offer.coa === "" ? "" : offer.coa}
                    onChange={(e) =>
                      updateOffer(idx, "coa", e.target.value === "" ? "" : Number(e.target.value))
                    }
                  />
                </div>
              </div>

              {/* Input Section 2: Free Money (Gift Aid) */}
              <div className="aoc-section-box aoc-box-gift">
                <div className="aoc-box-header">
                  <span className="aoc-box-tag green-tag">◆ {t("aoc.section.giftAid")}</span>
                </div>

                <div className="aoc-inputs-subgrid">
                  <div className="aoc-subfield">
                    <label className="aoc-label-sm">{t("aoc.field.scholarships")}</label>
                    <div className="aoc-money-wrap sm">
                      <span className="prefix">$</span>
                      <input
                        type="number"
                        min="0"
                        step="500"
                        placeholder="0"
                        className="aoc-input sm money-input"
                        value={offer.scholarships === "" ? "" : offer.scholarships}
                        onChange={(e) =>
                          updateOffer(
                            idx,
                            "scholarships",
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="aoc-subfield">
                    <label className="aoc-label-sm">{t("aoc.field.waivers")}</label>
                    <div className="aoc-money-wrap sm">
                      <span className="prefix">$</span>
                      <input
                        type="number"
                        min="0"
                        step="500"
                        placeholder="0"
                        className="aoc-input sm money-input"
                        value={offer.waivers === "" ? "" : offer.waivers}
                        onChange={(e) =>
                          updateOffer(
                            idx,
                            "waivers",
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Section 3: Work-Study */}
              <div className="aoc-section-box aoc-box-work">
                <div className="aoc-box-header">
                  <span className="aoc-box-tag blue-tag">§ {t("aoc.section.workStudy")}</span>
                </div>
                <div className="aoc-subfield">
                  <label className="aoc-label-sm">{t("aoc.field.workStudy")}</label>
                  <div className="aoc-money-wrap sm">
                    <span className="prefix">$</span>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      placeholder="0"
                      className="aoc-input sm money-input"
                      value={offer.workStudy === "" ? "" : offer.workStudy}
                      onChange={(e) =>
                        updateOffer(
                          idx,
                          "workStudy",
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <span className="aoc-field-subtext">{t("aoc.field.workStudyHelp")}</span>
                </div>
              </div>

              {/* Input Section 4: Loans (Debt You Must Repay) */}
              <div className="aoc-section-box aoc-box-loans">
                <div className="aoc-box-header">
                  <span className="aoc-box-tag amber-tag">! {t("aoc.section.loans")}</span>
                </div>

                <div className="aoc-inputs-subgrid">
                  <div className="aoc-subfield">
                    <label className="aoc-label-sm">{t("aoc.field.loansDirect")}</label>
                    <div className="aoc-money-wrap sm">
                      <span className="prefix">$</span>
                      <input
                        type="number"
                        min="0"
                        step="500"
                        placeholder="0"
                        className="aoc-input sm money-input"
                        value={offer.loansDirect === "" ? "" : offer.loansDirect}
                        onChange={(e) =>
                          updateOffer(
                            idx,
                            "loansDirect",
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="aoc-subfield">
                    <label className="aoc-label-sm">{t("aoc.field.loansPlus")}</label>
                    <div className="aoc-money-wrap sm">
                      <span className="prefix">$</span>
                      <input
                        type="number"
                        min="0"
                        step="500"
                        placeholder="0"
                        className="aoc-input sm money-input"
                        value={offer.loansPlus === "" ? "" : offer.loansPlus}
                        onChange={(e) =>
                          updateOffer(
                            idx,
                            "loansPlus",
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <p className="aoc-loans-disclaimer">{t("aoc.loansWarningNotice")}</p>
              </div>

              {/* Debt-Heavy Warning Flag (Step 04) */}
              {isMostlyLoans && (
                <div className="aoc-warning-flag">
                  <span className="aoc-flag-icon">!</span>
                  <span>
                    {t("aoc.flag.mostlyLoans").replace("{percent}", String(loanPercentageOfPackage))}
                  </span>
                </div>
              )}

              {/* Deceptive Aid Unmasked Callout */}
              {totalLoansAnnual > 0 && schoolAdvertisedAid > 0 && (
                <div className="aoc-deceptive-aid-callout">
                  <div className="aoc-deceptive-row">
                    <span className="aoc-dec-label">School advertised "aid":</span>
                    <span className="aoc-dec-val strikethrough">
                      {formatMoney(schoolAdvertisedAid)}
                    </span>
                  </div>
                  <div className="aoc-deceptive-row">
                    <span className="aoc-dec-label">Actual Free Gift Aid:</span>
                    <span className="aoc-dec-val green">{formatMoney(totalFreeAid)}</span>
                  </div>
                  <div className="aoc-deceptive-row">
                    <span className="aoc-dec-label">Disguised Debt:</span>
                    <span className="aoc-dec-val amber">{formatMoney(totalLoansAnnual)}/yr</span>
                  </div>
                </div>
              )}

              {/* Calculation Summary Box (Step 03) */}
              <div className="aoc-results-summary">
                <div className="aoc-res-header">{t("aoc.res.title")}</div>

                {/* Net Price */}
                <div className="aoc-res-row highlight-net">
                  <div className="aoc-res-info">
                    <strong>{t("aoc.res.netPrice")}</strong>
                    <span className="aoc-res-subtext">{t("aoc.res.netPriceFormula")}</span>
                  </div>
                  <div className="aoc-res-number">{formatMoney(netPriceAnnual)}</div>
                </div>

                {/* Out of Pocket Gap */}
                <div className="aoc-res-row">
                  <div className="aoc-res-info">
                    <span>{t("aoc.res.annualGap")}</span>
                    <span className="aoc-res-subtext">{t("aoc.res.annualGapFormula")}</span>
                  </div>
                  <div className="aoc-res-number">{formatMoney(outOfPocketGapAnnual)}</div>
                </div>

                {/* Debt at Graduation */}
                <div className="aoc-res-row highlight-debt">
                  <div className="aoc-res-info">
                    <strong>{t("aoc.res.totalDebt")}</strong>
                    <span className="aoc-res-subtext">{t("aoc.res.totalDebtFormula")}</span>
                  </div>
                  <div className="aoc-res-number amber">{formatMoney(totalDebtAtGrad)}</div>
                </div>

                {/* Monthly Payment */}
                <div className="aoc-res-row highlight-payment">
                  <div className="aoc-res-info">
                    <strong>{t("aoc.res.monthlyPayment")}</strong>
                    <span className="aoc-res-subtext">{t("aoc.res.monthlyPaymentFormula")}</span>
                  </div>
                  <div className="aoc-res-number pay-number">
                    {formatMoney(monthlyPayment)}
                    <span className="aoc-mo-label">/mo</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Matrix Summary Table */}
      <section className="aoc-matrix-section">
        <h3 className="aoc-matrix-title">{t("aoc.matrix.title")}</h3>
        <div className="aoc-matrix-table-wrap">
          <table className="aoc-matrix-table">
            <thead>
              <tr>
                <th className="aoc-th-metric">{t("aoc.matrix.colMetric")}</th>
                {calculatedOffers.map((o, idx) => (
                  <th key={o.offer.id} className="aoc-th-school">
                    <div className="aoc-th-name">{o.offer.schoolName || `School ${idx + 1}`}</div>
                    <div className="aoc-th-years">
                      {o.years} {lang === "es" ? "años" : "years"}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="aoc-td-metric">{t("aoc.matrix.coa")}</td>
                {calculatedOffers.map((o) => (
                  <td key={o.offer.id}>{formatMoney(o.coa)}</td>
                ))}
              </tr>
              <tr className="aoc-tr-green">
                <td className="aoc-td-metric">{t("aoc.matrix.freeAid")}</td>
                {calculatedOffers.map((o) => (
                  <td key={o.offer.id} className="green-text">
                    {formatMoney(o.totalFreeAid)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="aoc-td-metric">{t("aoc.matrix.workStudy")}</td>
                {calculatedOffers.map((o) => (
                  <td key={o.offer.id}>{formatMoney(o.workStudy)}</td>
                ))}
              </tr>
              <tr className="aoc-tr-highlight">
                <td className="aoc-td-metric">
                  <strong>{t("aoc.matrix.netPrice")}</strong>
                </td>
                {calculatedOffers.map((o) => (
                  <td key={o.offer.id} className="bold-number">
                    {formatMoney(o.netPriceAnnual)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="aoc-td-metric">{t("aoc.matrix.annualGap")}</td>
                {calculatedOffers.map((o) => (
                  <td key={o.offer.id}>{formatMoney(o.outOfPocketGapAnnual)}</td>
                ))}
              </tr>
              <tr className="aoc-tr-amber">
                <td className="aoc-td-metric">{t("aoc.matrix.annualLoans")}</td>
                {calculatedOffers.map((o) => (
                  <td key={o.offer.id} className="amber-text">
                    {formatMoney(o.totalLoansAnnual)}
                  </td>
                ))}
              </tr>
              <tr className="aoc-tr-highlight">
                <td className="aoc-td-metric">
                  <strong>{t("aoc.matrix.totalDebt")}</strong>
                </td>
                {calculatedOffers.map((o) => (
                  <td key={o.offer.id} className="bold-number amber-text">
                    {formatMoney(o.totalDebtAtGrad)}
                  </td>
                ))}
              </tr>
              <tr className="aoc-tr-highlight">
                <td className="aoc-td-metric">
                  <strong>{t("aoc.matrix.monthlyPayment")}</strong>
                </td>
                {calculatedOffers.map((o) => (
                  <td key={o.offer.id} className="bold-number payment-text">
                    {formatMoney(o.monthlyPayment)}/mo
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Guide: How to Read Your Aid Offer & Appeal Template (Step 06) */}
      <section className="aoc-guide-section">
        <div className="aoc-guide-header">
          <span className="eyebrow">{t("aoc.guide.tag")}</span>
          <h2>{t("aoc.guide.title")}</h2>
          <p className="sub">{t("aoc.guide.subtitle")}</p>
        </div>

        <div className="aoc-guide-points">
          <div className="aoc-guide-point">
            <h4>{t("aoc.guide.p1.title")}</h4>
            <p>{t("aoc.guide.p1.body")}</p>
          </div>

          <div className="aoc-guide-point">
            <h4>{t("aoc.guide.p2.title")}</h4>
            <p>{t("aoc.guide.p2.body")}</p>
          </div>

          <div className="aoc-guide-point">
            <h4>{t("aoc.guide.p3.title")}</h4>
            <p>{t("aoc.guide.p3.body")}</p>
          </div>
        </div>

        {/* Appeal Letter Template Card */}
        <div className="aoc-letter-card">
          <div className="aoc-letter-header">
            <div>
              <h3>{t("aoc.letter.title")}</h3>
              <p>{t("aoc.letter.desc")}</p>
            </div>
            <button
              type="button"
              className="btn-primary aoc-copy-btn"
              onClick={copyAppealLetter}
            >
              <CopyIcon />
              <span>{copiedLetter ? t("aoc.letter.copied") : t("aoc.letter.btnCopy")}</span>
            </button>
          </div>
          <pre className="aoc-letter-pre">
            <code>{appealLetterText}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
