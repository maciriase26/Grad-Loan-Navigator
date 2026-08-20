import { useState, useId } from "react";
import { useI18n } from "@/i18n";

export function CollegeLoanNeedCalculator() {
  const { t } = useI18n();

  // Unique IDs for form inputs to comply with accessibility best practices
  const tuitionId = useId();
  const housingId = useId();
  const booksId = useId();
  const transportId = useId();

  const scholarshipsId = useId();
  const savings529Id = useId();
  const studentContribId = useId();
  const parentContribId = useId();
  const otherAidId = useId();

  const schoolNameId = useId();
  const degreeTypeId = useId();
  const yearsId = useId();
  const rateId = useId();
  const termId = useId();

  // 1. Annual Cost of Attendance
  const [tuition, setTuition] = useState<number>(0);
  const [housing, setHousing] = useState<number>(0);
  const [books, setBooks] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);

  // 2. Money Available Each Year
  const [scholarships, setScholarships] = useState<number>(0);
  const [savings529, setSavings529] = useState<number>(0);
  const [studentContrib, setStudentContrib] = useState<number>(0);
  const [parentContrib, setParentContrib] = useState<number>(0);
  const [otherAid, setOtherAid] = useState<number>(0);

  // 3. Program & Loan Assumptions
  const [schoolName, setSchoolName] = useState<string>("");
  const [degreeType, setDegreeType] = useState<"undergrad" | "grad" | "prof">("grad");
  const [years, setYears] = useState<number>(4);
  const [rate, setRate] = useState<number>(8.07);
  const [termYears, setTermYears] = useState<number>(10);

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

  // 2026 Federal Lifetime Borrowing Limits
  const FEDERAL_CAPS: Record<"undergrad" | "grad" | "prof", number> = {
    undergrad: 57500, // max aggregate independent undergrad
    grad: 100000, // 2026 Grad lifetime cap
    prof: 200000, // 2026 Professional (Law/Med) lifetime cap
  };

  const capLimit = FEDERAL_CAPS[degreeType];
  const isExceedingCap = estimatedTotalBorrowing > capLimit;
  const excessAmount = Math.max(0, estimatedTotalBorrowing - capLimit);

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
            </div>

            <div className="calc-field">
              <label htmlFor={housingId}>{t("calc.cost.housing")}</label>
              <div className="calc-input-wrap">
                <span className="prefix">$</span>
                <input
                  id={housingId}
                  type="number"
                  min="0"
                  step="500"
                  value={housing || ""}
                  onChange={(e) => setHousing(Number(e.target.value) || 0)}
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

            <div className="calc-field">
              <label htmlFor={yearsId}>{t("calc.assump.years")}</label>
              <select
                id={yearsId}
                className="select-input"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              >
                <option value={1}>1 Year</option>
                <option value={2}>2 Years</option>
                <option value={3}>3 Years</option>
                <option value={4}>4 Years</option>
                <option value={5}>5 Years</option>
                <option value={6}>6 Years</option>
              </select>
            </div>

            <div className="calc-field">
              <label htmlFor={rateId}>{t("calc.assump.rate")}</label>
              <input
                id={rateId}
                type="number"
                step="0.05"
                min="0"
                max="20"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
              />
            </div>

            <div className="calc-field">
              <label htmlFor={termId}>{t("calc.assump.term")}</label>
              <select
                id={termId}
                className="select-input"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
              >
                <option value={5}>5 Years</option>
                <option value={10}>10 Years (Standard)</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Output / Results Dashboard Box */}
      <div className="calc-results-panel">
        <div className="calc-results-header">
          <h3>{t("calc.result.title")}</h3>
          {schoolName && <span className="school-tag">{schoolName}</span>}
        </div>

        <div className="calc-results-grid">
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
            {estimatedTotalBorrowing === 0
              ? t("calc.status.zero")
              : isExceedingCap
                ? t("calc.status.exceed").replace("{amount}", formatCurrency(excessAmount))
                : t("calc.status.ok")}
          </p>
        </div>
      </div>
    </div>
  );
}
