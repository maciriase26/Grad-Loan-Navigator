import { useState, useId, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import { searchSchools, type SchoolTuitionRecord, HOUSING_PRESETS } from "@/data/tuitionData";
import { supabase } from "@/integrations/supabase/client";

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

function MailIcon() {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function buildAppealLetter(topSchoolName: string, compSchoolName: string, lang: string): string {
  const isEs = lang === "es";
  const schoolTarget = topSchoolName.trim() || (isEs ? "[Nombre de la Universidad]" : "[Name of University]");
  const schoolComp = compSchoolName.trim() || (isEs ? "[Universidad Competidora]" : "[Competing Peer University]");

  if (isEs) {
    return `Estimado Comité de Ayuda Financiera de ${schoolTarget}:

Es un honor para mí haber sido admitido en el programa [Nombre del Título / Maestría] para el próximo año académico. ${schoolTarget} continúa siendo mi primera opción de estudio debido a [mencionar profesor, centro de investigación o fortaleza del plan de estudios].

Me dirijo a ustedes respetuosamente para solicitar una reconsideración de mi paquete de ayuda financiera. Aunque agradezco profundamente la ayuda recibida [mencionar beca o subvención recibida, ej. beca de $5,000], el costo neto actual genera una brecha financiera significativa para mi familia.

[Seleccione Opción A o B:]
Opción A (Oferta Competitiva): He recibido una oferta de ayuda de ${schoolComp}, que proporciona [mencionar premio de ayuda, ej. beca anual de $15,000 / exención de matrícula como asistente graduado], reduciendo mi obligación restante de bolsillo a $[Monto].

Opción B (Cambio en Circunstancias Económicas): Desde que presenté mis documentos de ayuda financiera, la situación económica de mi hogar ha cambiado de forma importante debido a [describir brevemente cambio de empleo, gastos médicos extraordinarios o reducción de ingresos], resultando en [indicar impacto, ej. una pérdida imprevista de $X en ingresos anuales del hogar].

Si ${schoolTarget} tiene la posibilidad de reducir esta brecha de financiamiento en [monto razonable específico, ej. $4,000 a $6,000 por año], aceptaría con gran entusiasmo y enviaría mi depósito de matrícula de inmediato.

Agradezco sinceramente su tiempo, consideración y dedicación en apoyar a los estudiantes de posgrado.

Atentamente,
[Nombre y Apellidos]
[Número de Estudiante / Identificación de Solicitud]
[Teléfono] | [Correo Electrónico]`;
  }

  return `Dear Financial Aid Committee at ${schoolTarget},

I am honored to have been accepted into the [Degree / Program Name] program for the upcoming academic year. ${schoolTarget} remains my top choice due to [specific faculty, research center, or curriculum strength].

I am writing to respectfully request a reconsideration of my financial aid award. While I am deeply grateful for the aid received [mention any grant/scholarship received, e.g. $5,000 scholarship], the current net cost creates a significant funding gap for my family.

[Select Option A or B:]
Option A (Competing Offer): I have received an aid offer from ${schoolComp}, which provides [mention competing award, e.g. a $15,000 annual scholarship / graduate assistantship waiver], bringing my remaining out-of-pocket tuition obligation to $[Amount].

Option B (Changed Financial Circumstances): Since filing my financial aid documents, our household's financial situation has materially changed due to [briefly describe job change, extraordinary medical expenses, or reduced income], resulting in [briefly state impact, e.g., an unexpected loss of $X in annual household earnings].

If ${schoolTarget} is able to narrow this funding gap by [specific reasonable amount, e.g. $4,000 to $6,000 per year], I would enthusiastically commit and submit my enrollment deposit immediately.

Thank you very much for your time, consideration, and dedication to supporting graduate students.

Sincerely,
[Your Full Name]
[Your Student ID / Application Number]
[Phone Number] | [Email Address]`;
}

function buildComparisonSummary(calculatedOffers: any[], lang: string): string {
  const lines: string[] = [
    "GRAD LOAN NAVIGATOR: FINANCIAL AID OFFER COMPARISON SUMMARY",
    `Generated: ${new Date().toLocaleDateString()}`,
    "--------------------------------------------------",
    "",
  ];

  calculatedOffers.forEach((item, idx) => {
    const name = item.offer.schoolName || (lang === "es" ? `Universidad ${idx + 1}` : `School ${idx + 1}`);
    lines.push(`[${name}] (${item.years} ${lang === "es" ? "años" : "years"})`);
    lines.push(`  Cost of Attendance (COA): ${formatMoney(item.coa)}/yr`);
    lines.push(`  Free Gift Aid (Scholarships + Waivers): ${formatMoney(item.totalFreeAid)}/yr`);
    lines.push(`  Work-Study: ${formatMoney(item.workStudy)}/yr`);
    lines.push(`  True Net Price: ${formatMoney(item.netPriceAnnual)}/yr`);
    lines.push(`  Annual Loans: ${formatMoney(item.totalLoansAnnual)}/yr`);
    lines.push(`  Total Debt at Graduation: ${formatMoney(item.totalDebtAtGrad)}`);
    lines.push(`  Est. Monthly Repayment (10-Yr Standard): ${formatMoney(item.monthlyPayment)}/mo`);
    if (item.isMostlyLoans) {
      lines.push(`  * Advisory Note: ${item.loanPercentageOfPackage}% of aid package consists of borrowed debt.`);
    }
    lines.push("");
  });

  const s1 = calculatedOffers[0]?.offer.schoolName || "";
  const s2 = calculatedOffers[1]?.offer.schoolName || "";
  lines.push("--------------------------------------------------");
  lines.push(
    lang === "es"
      ? "SOLICITUD DE RECONSIDERACIÓN DE AYUDA FINANCIERA"
      : "FINANCIAL AID RECONSIDERATION REQUEST LETTER"
  );
  lines.push("--------------------------------------------------");
  lines.push("");
  lines.push(buildAppealLetter(s1, s2, lang));
  lines.push("");
  lines.push("--------------------------------------------------");
  lines.push("Prepared with Grad Loan Navigator (gradloannavigator.com)");
  return lines.join("\n");
}

const INITIAL_OFFERS: AidOffer[] = [
  {
    id: "offer-1",
    schoolName: "",
    programYears: 2,
    coa: "",
    scholarships: "",
    waivers: "",
    workStudy: "",
    loansDirect: "",
    loansPlus: "",
  },
  {
    id: "offer-2",
    schoolName: "",
    programYears: 2,
    coa: "",
    scholarships: "",
    waivers: "",
    workStudy: "",
    loansDirect: "",
    loansPlus: "",
  },
];

export function AidOfferComparisonTool() {
  const { t, lang } = useI18n();
  const [offers, setOffers] = useState<AidOffer[]>(INITIAL_OFFERS);

  // Email modal state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailName, setEmailName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "success">("idle");
  const [emailDelivered, setEmailDelivered] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  // Appeal draft email state
  const [appealEmail, setAppealEmail] = useState("");
  const [appealStatus, setAppealStatus] = useState<"idle" | "sending" | "success">("idle");
  const [appealDelivered, setAppealDelivered] = useState(false);
  const [appealError, setAppealError] = useState("");

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

  return (
    <div className="aoc-tool-wrapper">
      {/* Hero Header */}
      <div className="tool-header">
        <span className="eyebrow">{t("aoc.hero.tag")}</span>
        <h1>{t("aoc.hero.title")}</h1>
        <p className="sub">{t("aoc.hero.subtitle")}</p>
      </div>

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
          <button
            type="button"
            className="btn-primary aoc-email-btn"
            onClick={() => {
              setEmailStatus("idle");
              setEmailErrorMsg("");
              setIsEmailModalOpen(true);
            }}
          >
            <MailIcon />
            <span>{t("aoc.btn.emailMe")}</span>
          </button>
          <button type="button" className="btn-secondary aoc-print-btn" onClick={handlePrint}>
            <PrintIcon />
            <span>{t("aoc.btn.printPdf")}</span>
          </button>
          <button type="button" className="aoc-reset-btn" onClick={resetComparison}>
            {t("aoc.btn.reset")}
          </button>
        </div>
      </div>

      {/* Email Modal Dialog */}
      {isEmailModalOpen && (
        <div
          className="aoc-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEmailModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="aoc-modal-title"
        >
          <div className="aoc-modal-card">
            <div className="aoc-modal-header">
              <h3 id="aoc-modal-title" className="aoc-modal-title">
                {emailStatus === "success" ? t("aoc.modal.successTitle") : t("aoc.modal.title")}
              </h3>
              <button
                type="button"
                className="aoc-modal-close"
                onClick={() => setIsEmailModalOpen(false)}
                aria-label={t("aoc.modal.close")}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="aoc-modal-body">
              {emailStatus === "success" ? (
                <div className="aoc-modal-success">
                  <div className="aoc-success-icon-wrap">
                    <CheckIcon />
                  </div>
                  <strong style={{ display: "block", fontSize: "16px", marginBottom: "6px" }}>
                    {emailDelivered
                      ? t("aoc.appeal.deliveredTitle")
                      : t("aoc.appeal.savedTitle")}
                  </strong>
                  <p className="aoc-modal-desc">
                    {emailDelivered
                      ? t("aoc.appeal.deliveredDesc").replace("{email}", emailAddress.trim())
                      : t("aoc.appeal.savedDesc")}
                  </p>
                  <div className="aoc-modal-actions">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        emailAddress.trim()
                      )}&su=${encodeURIComponent(
                        lang === "es"
                          ? "Grad Loan Navigator: Resumen de Comparativa de Ofertas de Ayuda"
                          : "Grad Loan Navigator: Financial Aid Offer Comparison Summary"
                      )}&body=${encodeURIComponent(buildComparisonSummary(calculatedOffers, lang))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary aoc-modal-action-btn"
                    >
                      <MailIcon />
                      <span>{t("aoc.appeal.openGmail")}</span>
                    </a>
                    <a
                      href={`mailto:${encodeURIComponent(emailAddress.trim())}?subject=${encodeURIComponent(
                        lang === "es"
                          ? "Grad Loan Navigator: Resumen de Comparativa de Ofertas de Ayuda"
                          : "Grad Loan Navigator: Financial Aid Offer Comparison Summary"
                      )}&body=${encodeURIComponent(buildComparisonSummary(calculatedOffers, lang))}`}
                      className="btn-secondary aoc-modal-action-btn"
                    >
                      <MailIcon />
                      <span>{t("aoc.modal.openEmailBtn")}</span>
                    </a>
                    <button
                      type="button"
                      className="btn-secondary aoc-modal-action-btn"
                      onClick={() => {
                        setIsEmailModalOpen(false);
                        handlePrint();
                      }}
                    >
                      <PrintIcon />
                      <span>{t("aoc.modal.printBtn")}</span>
                    </button>
                    <button
                      type="button"
                      className="aoc-modal-close-btn"
                      onClick={() => setIsEmailModalOpen(false)}
                    >
                      {t("aoc.modal.close")}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const trimmedEmail = emailAddress.trim();
                    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
                      setEmailErrorMsg(t("aoc.modal.error"));
                      return;
                    }
                    setEmailErrorMsg("");
                    setEmailStatus("sending");

                    const summaryText = buildComparisonSummary(calculatedOffers, lang);
                    const subject =
                      lang === "es"
                        ? "Grad Loan Navigator: Resumen de Comparativa de Ofertas de Ayuda"
                        : "Grad Loan Navigator: Financial Aid Offer Comparison Summary";
                    const payload = {
                      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined,
                      name: emailName.trim() || "Student",
                      email: trimmedEmail,
                      reason: "aid_offer_comparison",
                      subject,
                      message: summaryText,
                      created_at: new Date().toISOString(),
                    };

                    // 1. Guaranteed direct Supabase insertion
                    try {
                      await supabase.from("contact_messages").insert({
                        id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : undefined,
                        name: payload.name,
                        email: payload.email,
                        reason: payload.reason,
                        message: summaryText.slice(0, 1990),
                        created_at: payload.created_at,
                      });
                    } catch (dbErr) {
                      console.warn("[AOC] Direct Supabase save notice:", dbErr);
                    }

                    // 2. Dispatch email via /api/contact
                    let wasSentViaApi = false;
                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      });
                      if (res.ok) {
                        const json = await res.json().catch(() => null);
                        if (json?.emailSent) {
                          wasSentViaApi = true;
                        }
                      }
                    } catch (err) {
                      console.warn("[AOC] Email endpoint error:", err);
                    }

                    setEmailDelivered(wasSentViaApi);
                    setEmailStatus("success");
                  }}
                  className="aoc-modal-form"
                >
                  <p className="aoc-modal-desc">{t("aoc.modal.desc")}</p>

                  <div className="aoc-modal-field">
                    <label className="aoc-label-sm">{t("aoc.modal.nameLabel")}</label>
                    <input
                      type="text"
                      className="aoc-input"
                      value={emailName}
                      onChange={(e) => setEmailName(e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="aoc-modal-field">
                    <label className="aoc-label-sm">
                      {t("aoc.modal.emailLabel")} <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="aoc-input"
                      value={emailAddress}
                      onChange={(e) => {
                        setEmailAddress(e.target.value);
                        if (emailErrorMsg) setEmailErrorMsg("");
                      }}
                      placeholder={t("aoc.modal.emailPlaceholder")}
                    />
                    {emailErrorMsg && <span className="aoc-modal-error">{emailErrorMsg}</span>}
                  </div>

                  <div className="aoc-modal-footer">
                    <button
                      type="submit"
                      disabled={emailStatus === "sending"}
                      className="btn-primary aoc-modal-submit"
                    >
                      <MailIcon />
                      <span>
                        {emailStatus === "sending" ? t("aoc.modal.sending") : t("aoc.modal.submitBtn")}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

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
                    <div className="aoc-th-name">
                      {o.offer.schoolName || (lang === "es" ? `Universidad ${idx + 1}` : `School ${idx + 1}`)}
                    </div>
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

      {/* Common terms in your aid offer Section */}
      <section className="aoc-terms-section">
        <div className="aoc-terms-header">
          <span className="eyebrow">{lang === "es" ? "GLOSARIO DE AYUDA" : "AID GLOSSARY"}</span>
          <h2>{t("aoc.terms.title")}</h2>
          <p className="sub">{t("aoc.terms.intro")}</p>
        </div>

        <div className="aoc-terms-grid">
          <div className="aoc-term-card">
            <div className="aoc-term-pill blue-pill">COA</div>
            <h4>{t("aoc.terms.coa.title")}</h4>
            <p>{t("aoc.terms.coa.desc")}</p>
          </div>

          <div className="aoc-term-card">
            <div className="aoc-term-pill purple-pill">SAI</div>
            <h4>{t("aoc.terms.sai.title")}</h4>
            <p>{t("aoc.terms.sai.desc")}</p>
          </div>

          <div className="aoc-term-card">
            <div className="aoc-term-pill amber-pill">NEED</div>
            <h4>{t("aoc.terms.need.title")}</h4>
            <p>{t("aoc.terms.need.desc")}</p>
          </div>

          <div className="aoc-term-card">
            <div className="aoc-term-pill teal-pill">WORK-STUDY</div>
            <h4>{t("aoc.terms.workStudy.title")}</h4>
            <p>{t("aoc.terms.workStudy.desc")}</p>
          </div>

          <div className="aoc-term-card">
            <div className="aoc-term-pill green-pill">GIFT AID</div>
            <h4>{t("aoc.terms.giftAid.title")}</h4>
            <p>{t("aoc.terms.giftAid.desc")}</p>
          </div>

          <div className="aoc-term-card">
            <div className="aoc-term-pill red-pill">LOANS</div>
            <h4>{t("aoc.terms.loans.title")}</h4>
            <p>{t("aoc.terms.loans.desc")}</p>
          </div>
        </div>
      </section>

      {/* Financial Aid Reconsideration Request Email Draft Section */}
      <section className="aoc-appeal-section">
        <div className="aoc-appeal-card">
          <div className="aoc-appeal-header">
            <span className="eyebrow">{t("aoc.appeal.tag")}</span>
            <h2>{t("aoc.appeal.title")}</h2>
            <p className="sub">{t("aoc.appeal.desc")}</p>
          </div>

          <div className="aoc-appeal-action-box">
            {appealStatus === "success" ? (
              <div className="aoc-appeal-success">
                <div className="aoc-success-icon-wrap sm">
                  <CheckIcon />
                </div>
                <div className="aoc-appeal-success-text">
                  <strong style={{ display: "block", fontSize: "15px", marginBottom: "4px" }}>
                    {appealDelivered
                      ? t("aoc.appeal.deliveredTitle")
                      : t("aoc.appeal.savedTitle")}
                  </strong>
                  <p style={{ margin: "0 0 10px 0", fontSize: "13px", color: "var(--color-muted-text)" }}>
                    {appealDelivered
                      ? t("aoc.appeal.deliveredDesc").replace("{email}", appealEmail.trim())
                      : t("aoc.appeal.savedDesc")}
                  </p>
                  <div className="aoc-appeal-success-actions" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(
                        lang === "es"
                          ? "Borrador de solicitud de reconsideracion de ayuda financiera"
                          : "Financial Aid Reconsideration Request Email Draft"
                      )}&body=${encodeURIComponent(
                        buildAppealLetter(
                          calculatedOffers[0]?.offer.schoolName || "",
                          calculatedOffers[1]?.offer.schoolName || "",
                          lang
                        )
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary aoc-open-mail-btn"
                    >
                      <MailIcon />
                      <span>{t("aoc.appeal.openGmail")}</span>
                    </a>
                    <a
                      href={`mailto:${encodeURIComponent(appealEmail.trim())}?subject=${encodeURIComponent(
                        lang === "es"
                          ? "Borrador de solicitud de reconsideracion de ayuda financiera"
                          : "Financial Aid Reconsideration Request Email Draft"
                      )}&body=${encodeURIComponent(
                        buildAppealLetter(
                          calculatedOffers[0]?.offer.schoolName || "",
                          calculatedOffers[1]?.offer.schoolName || "",
                          lang
                        )
                      )}`}
                      className="btn-secondary aoc-open-mail-btn"
                    >
                      <MailIcon />
                      <span>{t("aoc.appeal.openMail")}</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <form
                className="aoc-appeal-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const trimmed = appealEmail.trim();
                  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
                    setAppealError(t("aoc.modal.error"));
                    return;
                  }
                  setAppealError("");
                  setAppealStatus("sending");

                  const s1 = calculatedOffers[0]?.offer.schoolName || "";
                  const s2 = calculatedOffers[1]?.offer.schoolName || "";
                  const letter = buildAppealLetter(s1, s2, lang);
                  const summaryText = buildComparisonSummary(calculatedOffers, lang);

                  const subject =
                    lang === "es"
                      ? "Carta para solicitar reconsideracion de ayuda financiera"
                      : "Financial Aid Reconsideration Request Letter";

                  const message = `${letter}\n\n====================\nCOMPARISON SUMMARY:\n====================\n${summaryText}`;

                  const payload = {
                    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined,
                    name: "Student",
                    email: trimmed,
                    reason: "appeal_letter_request",
                    subject,
                    message,
                    created_at: new Date().toISOString(),
                  };

                  // 1. Guaranteed direct Supabase insertion
                  try {
                    await supabase.from("contact_messages").insert({
                      id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : undefined,
                      name: payload.name,
                      email: payload.email,
                      reason: payload.reason,
                      message: message.slice(0, 1990),
                      created_at: payload.created_at,
                    });
                  } catch (dbErr) {
                    console.warn("[AOC] Direct Supabase save notice:", dbErr);
                  }

                  // 2. Dispatch email via /api/contact
                  let wasSentViaApi = false;
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    if (res.ok) {
                      const json = await res.json().catch(() => null);
                      if (json?.emailSent) {
                        wasSentViaApi = true;
                      }
                    }
                  } catch (err) {
                    console.warn("[AOC] Appeal letter API error:", err);
                  }

                  setAppealDelivered(wasSentViaApi);
                  setAppealStatus("success");
                }}
              >
                <div className="aoc-appeal-input-wrap">
                  <input
                    type="email"
                    required
                    className="aoc-input aoc-appeal-email-input"
                    value={appealEmail}
                    onChange={(e) => {
                      setAppealEmail(e.target.value);
                      if (appealError) setAppealError("");
                    }}
                    placeholder={t("aoc.appeal.inputPlaceholder")}
                  />
                  <button
                    type="submit"
                    disabled={appealStatus === "sending"}
                    className="btn-primary aoc-appeal-submit-btn"
                  >
                    <MailIcon />
                    <span>
                      {appealStatus === "sending" ? t("aoc.appeal.sending") : t("aoc.appeal.btnSend")}
                    </span>
                  </button>
                </div>
                {appealError && <span className="aoc-modal-error">{appealError}</span>}
              </form>
            )}
          </div>

          {/* Expandable Preview Accordion (No raw copy text required) */}
          <details className="aoc-appeal-preview-details">
            <summary className="aoc-appeal-preview-summary">
              {t("aoc.appeal.previewTitle")}
            </summary>
            <div className="aoc-appeal-preview-content">
              <p className="aoc-appeal-preview-notice">{t("aoc.appeal.previewNotice")}</p>
              <pre className="aoc-letter-pre">
                <code>
                  {buildAppealLetter(
                    calculatedOffers[0]?.offer.schoolName || "",
                    calculatedOffers[1]?.offer.schoolName || "",
                    lang
                  )}
                </code>
              </pre>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
