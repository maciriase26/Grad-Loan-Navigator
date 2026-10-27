import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  Scale,
  Users,
  Check,
  Building,
  HelpCircle,
  FileCheck,
} from "lucide-react";

const TITLE = "Cosigning for Student Loans | Cosigner Hub | Grad Navigator";
const DESCRIPTION =
  "Complete guide to student loan cosigners: federal endorsers vs. private cosigners, 2026 loan cap impacts, lender release streaks, CFPB rejection rates, auto-default rules, and bankruptcy protections.";
const URL = "https://www.graduationnavigator.com/cosigner-hub";

export const Route = createFileRoute("/cosigner-hub")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: CosignerHubPage,
});

export default function CosignerHubPage() {
  const { t } = useI18n();

  // Interactive state for 5 Questions Checklist
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});

  const toggleQuestion = (idx: number) => {
    setCheckedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const totalQuestions = 5;
  const completedCount = Object.values(checkedQuestions).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  return (
    <>
      <SiteHeader />

      <main className="cosign-page">
        {/* Breadcrumb Navigation */}
        <div className="wrap">
          <nav className="cosign-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">{t("cosign.breadcrumb.home")}</Link>
            <span className="cosign-breadcrumbs-sep">/</span>
            <Link to="/educational-resources">{t("cosign.breadcrumb.resources")}</Link>
            <span className="cosign-breadcrumbs-sep">/</span>
            <span className="cosign-breadcrumbs-current">{t("cosign.breadcrumb.current")}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="wrap cosign-hero">
          <div className="cosign-hero-flex">
            <div className="cosign-hero-text">
              <div className="eyebrow">{t("cosign.eyebrow")}</div>
              <h1 className="cosign-title">{t("cosign.title")}</h1>
              <p className="cosign-sub">{t("cosign.subtitle")}</p>

              <div className="cosign-meta-bar">
                <span className="cosign-badge-review">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  {t("cosign.badge.reviewed")}
                </span>
                <span className="cosign-badge-source">
                  <Scale size={13} aria-hidden="true" />
                  {t("cosign.badge.verified")}
                </span>
                <span className="cosign-badge-entities">
                  <span>§</span>
                  {t("cosign.badge.sources")}
                </span>
              </div>
            </div>

            <div className="cosign-hero-media">
              <img
                src="/images/gn-animation-understand-loans.svg"
                width="800"
                height="600"
                alt="Student loan co-borrowing and credit analysis"
                loading="eager"
                className="cosign-hero-animation"
              />
            </div>
          </div>
        </section>

        {/* Why It Matters Callout */}
        <section className="wrap">
          <div className="cosign-callout-card">
            <span className="cosign-callout-tag">{t("cosign.why.tag")}</span>
            <h2>{t("cosign.why.title")}</h2>
            <p>{t("cosign.why.body")}</p>
          </div>
        </section>

        {/* Key Statistics Grid */}
        <section className="wrap cosign-stats-section">
          <div className="cosign-stats-grid">
            <div className="cosign-stat-card">
              <span className="cosign-stat-val">{t("cosign.stat1.val")}</span>
              <span className="cosign-stat-label">{t("cosign.stat1.label")}</span>
              <p className="cosign-stat-sub">{t("cosign.stat1.sub")}</p>
            </div>

            <div className="cosign-stat-card">
              <span className="cosign-stat-val">{t("cosign.stat2.val")}</span>
              <span className="cosign-stat-label">{t("cosign.stat2.label")}</span>
              <p className="cosign-stat-sub">{t("cosign.stat2.sub")}</p>
            </div>

            <div className="cosign-stat-card">
              <span className="cosign-stat-val">{t("cosign.stat3.val")}</span>
              <span className="cosign-stat-label">{t("cosign.stat3.label")}</span>
              <p className="cosign-stat-sub">{t("cosign.stat3.sub")}</p>
            </div>

            <div className="cosign-stat-card">
              <span className="cosign-stat-val">{t("cosign.stat4.val")}</span>
              <span className="cosign-stat-label">{t("cosign.stat4.label")}</span>
              <p className="cosign-stat-sub">{t("cosign.stat4.sub")}</p>
            </div>

            <div className="cosign-stat-card">
              <span className="cosign-stat-val">{t("cosign.stat5.val")}</span>
              <span className="cosign-stat-label">{t("cosign.stat5.label")}</span>
              <p className="cosign-stat-sub">{t("cosign.stat5.sub")}</p>
            </div>

            <div className="cosign-stat-card">
              <span className="cosign-stat-val">{t("cosign.stat6.val")}</span>
              <span className="cosign-stat-label">{t("cosign.stat6.label")}</span>
              <p className="cosign-stat-sub">{t("cosign.stat6.sub")}</p>
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison Matrix */}
        <section className="wrap cosign-section">
          <div className="cosign-section-header">
            <span className="cosign-section-tag">{t("cosign.compare.tag")}</span>
            <h2>{t("cosign.compare.title")}</h2>
            <p>{t("cosign.compare.desc")}</p>
          </div>

          <div className="cosign-matrix-wrapper">
            <table className="cosign-matrix-table">
              <thead>
                <tr>
                  <th className="col-feature">Feature / Rule</th>
                  <th>
                    <span className="th-title">{t("cosign.compare.col1.title")}</span>
                    <span className="th-sub">{t("cosign.compare.col1.sub")}</span>
                  </th>
                  <th>
                    <span className="th-title">{t("cosign.compare.col2.title")}</span>
                    <span className="th-sub">{t("cosign.compare.col2.sub")}</span>
                  </th>
                  <th>
                    <span className="th-title">{t("cosign.compare.col3.title")}</span>
                    <span className="th-sub">{t("cosign.compare.col3.sub")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cell-label">{t("cosign.compare.row1.label")}</td>
                  <td>{t("cosign.compare.row1.c1")}</td>
                  <td>{t("cosign.compare.row1.c2")}</td>
                  <td>{t("cosign.compare.row1.c3")}</td>
                </tr>
                <tr>
                  <td className="cell-label">{t("cosign.compare.row2.label")}</td>
                  <td>{t("cosign.compare.row2.c1")}</td>
                  <td>{t("cosign.compare.row2.c2")}</td>
                  <td>{t("cosign.compare.row2.c3")}</td>
                </tr>
                <tr>
                  <td className="cell-label">{t("cosign.compare.row3.label")}</td>
                  <td>{t("cosign.compare.row3.c1")}</td>
                  <td>{t("cosign.compare.row3.c2")}</td>
                  <td>{t("cosign.compare.row3.c3")}</td>
                </tr>
                <tr>
                  <td className="cell-label">{t("cosign.compare.row4.label")}</td>
                  <td>{t("cosign.compare.row4.c1")}</td>
                  <td>{t("cosign.compare.row4.c2")}</td>
                  <td>{t("cosign.compare.row4.c3")}</td>
                </tr>
                <tr>
                  <td className="cell-label">{t("cosign.compare.row5.label")}</td>
                  <td>{t("cosign.compare.row5.c1")}</td>
                  <td>{t("cosign.compare.row5.c2")}</td>
                  <td>{t("cosign.compare.row5.c3")}</td>
                </tr>
                <tr>
                  <td className="cell-label">{t("cosign.compare.row6.label")}</td>
                  <td>{t("cosign.compare.row6.c1")}</td>
                  <td>{t("cosign.compare.row6.c2")}</td>
                  <td>{t("cosign.compare.row6.c3")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: The Basic Rule & How Federal Endorsers Work */}
        <section className="wrap cosign-section">
          <div className="cosign-grid-2">
            {/* Basic Rule Card */}
            <div className="cosign-card">
              <span className="cosign-card-tag">{t("cosign.basic.tag")}</span>
              <h3>{t("cosign.basic.title")}</h3>
              <ul className="cosign-list">
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.basic.p1")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.basic.p2")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.basic.p3")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.basic.p4")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.basic.p5")}</span>
                </li>
              </ul>
            </div>

            {/* How a Federal Endorser Works Card */}
            <div className="cosign-card">
              <span className="cosign-card-tag">{t("cosign.endorser.tag")}</span>
              <h3>{t("cosign.endorser.title")}</h3>
              <ul className="cosign-list">
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.endorser.li1")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.endorser.li2")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.endorser.li3")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.endorser.li4")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.endorser.li5")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                  <span>{t("cosign.endorser.li6")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.endorser.li7")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.endorser.li8")}</span>
                </li>
              </ul>

              <div style={{ marginTop: "18px", padding: "12px 14px", background: "var(--card-paper)", borderRadius: "8px", border: "1px solid var(--line)" }}>
                <strong style={{ fontSize: "13px", color: "var(--ink)", display: "block", marginBottom: "4px" }}>
                  {t("cosign.endorser.who.title")}
                </strong>
                <p style={{ fontSize: "12.5px", color: "var(--ink-soft)", margin: 0, lineHeight: 1.45 }}>
                  {t("cosign.endorser.who.p")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: 2026 Statutory Changes & Private Cosigning */}
        <section className="wrap cosign-section">
          <div className="cosign-grid-2">
            {/* 2026 Changes Card */}
            <div className="cosign-card">
              <span className="cosign-card-tag">{t("cosign.changes2026.tag")}</span>
              <h3>{t("cosign.changes2026.title")}</h3>
              <ul className="cosign-list">
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                  <span>{t("cosign.changes2026.li1")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.changes2026.li2")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym sym-gold" aria-hidden="true" />
                  <span>{t("cosign.changes2026.li3")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                  <span>{t("cosign.changes2026.li4")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.changes2026.li5")}</span>
                </li>
              </ul>
            </div>

            {/* Private Student Loan Cosigning Works Card */}
            <div className="cosign-card">
              <span className="cosign-card-tag">{t("cosign.private.tag")}</span>
              <h3>{t("cosign.private.title")}</h3>
              <ul className="cosign-list">
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.private.li1")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                  <span>{t("cosign.private.li2")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym" aria-hidden="true" />
                  <span>{t("cosign.private.li3")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                  <span>{t("cosign.private.li4")}</span>
                </li>
                <li className="cosign-list-item">
                  <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                  <span>{t("cosign.private.li5")}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Getting a Cosigner Off the Loan (Cosigner Release) */}
        <section className="wrap cosign-section">
          <div className="cosign-section-header">
            <span className="cosign-section-tag">{t("cosign.release.tag")}</span>
            <h2>{t("cosign.release.title")}</h2>
            <p>{t("cosign.release.p1")}</p>
          </div>

          <div className="cosign-card">
            <p style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--ink)", marginBottom: "16px" }}>
              {t("cosign.release.p2")}
            </p>

            {/* Lender Streak Table */}
            <div className="cosign-table-wrapper">
              <table className="cosign-lender-table">
                <thead>
                  <tr>
                    <th>{t("cosign.table.lender")}</th>
                    <th>{t("cosign.table.streak")}</th>
                    <th>{t("cosign.table.notes")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>{t("cosign.table.sallie")}</strong></td>
                    <td><span className="cosign-lender-badge">{t("cosign.table.sallie.streak")}</span></td>
                    <td>{t("cosign.table.sallie.notes")}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("cosign.table.sofi")}</strong></td>
                    <td><span className="cosign-lender-badge">{t("cosign.table.sofi.streak")}</span></td>
                    <td>{t("cosign.table.sofi.notes")}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("cosign.table.navy")}</strong></td>
                    <td><span className="cosign-lender-badge">{t("cosign.table.navy.streak")}</span></td>
                    <td>{t("cosign.table.navy.notes")}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("cosign.table.citizens")}</strong></td>
                    <td><span className="cosign-lender-badge">{t("cosign.table.citizens.streak")}</span></td>
                    <td>{t("cosign.table.citizens.notes")}</td>
                  </tr>
                  <tr>
                    <td><strong>{t("cosign.table.mefa")}</strong></td>
                    <td><span className="cosign-lender-badge">{t("cosign.table.mefa.streak")}</span></td>
                    <td>{t("cosign.table.mefa.notes")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="cosign-list" style={{ marginTop: "20px" }}>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym" aria-hidden="true" />
                <span>{t("cosign.release.p3")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                <span>{t("cosign.release.p4")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                <span>{t("cosign.release.p5")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                <span>{t("cosign.release.p6")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym sym-gold" aria-hidden="true" />
                <span><strong>{t("cosign.release.p7")}</strong></span>
              </li>
            </ul>

            <div className="cosign-warning-box">
              <AlertTriangle className="cosign-warning-icon" size={20} aria-hidden="true" />
              <p className="cosign-warning-text">{t("cosign.release.between")}</p>
            </div>
          </div>
        </section>

        {/* Section: Death, Defaults, and Bankruptcy */}
        <section className="wrap cosign-section">
          <div className="cosign-section-header">
            <span className="cosign-section-tag">{t("cosign.worst.tag")}</span>
            <h2>{t("cosign.worst.title")}</h2>
          </div>

          <div className="cosign-card">
            <ul className="cosign-list">
              <li className="cosign-list-item">
                <Check className="cosign-list-sym" aria-hidden="true" />
                <span>{t("cosign.worst.li1")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym" aria-hidden="true" />
                <span>{t("cosign.worst.li2")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym sym-gold" aria-hidden="true" />
                <span>{t("cosign.worst.li3")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym" aria-hidden="true" />
                <span>{t("cosign.worst.li4")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                <span>{t("cosign.worst.li5")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym sym-alert" aria-hidden="true" />
                <span>{t("cosign.worst.li6")}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Why More Families Are Being Asked to Cosign Now */}
        <section className="wrap cosign-section">
          <div className="cosign-section-header">
            <span className="cosign-section-tag">{t("cosign.whyMore.tag")}</span>
            <h2>{t("cosign.whyMore.title")}</h2>
          </div>

          <div className="cosign-card">
            <ul className="cosign-list">
              <li className="cosign-list-item">
                <TrendingUp className="cosign-list-sym sym-gold" aria-hidden="true" />
                <span>{t("cosign.whyMore.li1")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym" aria-hidden="true" />
                <span>{t("cosign.whyMore.li2")}</span>
              </li>
              <li className="cosign-list-item">
                <Users className="cosign-list-sym sym-alert" aria-hidden="true" />
                <span>{t("cosign.whyMore.li3")}</span>
              </li>
              <li className="cosign-list-item">
                <Check className="cosign-list-sym" aria-hidden="true" />
                <span>{t("cosign.whyMore.li4")}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section: 5 Questions to Ask Before Signing (Interactive Checklist) */}
        <section className="wrap cosign-section">
          <div className="cosign-section-header">
            <span className="cosign-section-tag">{t("cosign.questions.tag")}</span>
            <h2>{t("cosign.questions.title")}</h2>
            <p>{t("cosign.questions.intro")}</p>
          </div>

          <div className="cosign-checklist-card">
            <div className="cosign-progress-wrap">
              <div className="cosign-progress-bar-bg">
                <div
                  className="cosign-progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="cosign-progress-label">
                <span>{completedCount} of {totalQuestions} Verified</span>
                <span>{progressPercent}% Complete</span>
              </div>
            </div>

            <div className="cosign-check-list">
              {/* Question 1 */}
              <div
                className={`cosign-check-item ${checkedQuestions[1] ? "checked" : ""}`}
                onClick={() => toggleQuestion(1)}
                role="checkbox"
                aria-checked={!!checkedQuestions[1]}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleQuestion(1);
                  }
                }}
              >
                <div className="cosign-check-box">
                  {checkedQuestions[1] && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="cosign-check-content">
                  <h4>{t("cosign.q1.title")}</h4>
                  <p>{t("cosign.q1.desc")}</p>
                </div>
              </div>

              {/* Question 2 */}
              <div
                className={`cosign-check-item ${checkedQuestions[2] ? "checked" : ""}`}
                onClick={() => toggleQuestion(2)}
                role="checkbox"
                aria-checked={!!checkedQuestions[2]}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleQuestion(2);
                  }
                }}
              >
                <div className="cosign-check-box">
                  {checkedQuestions[2] && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="cosign-check-content">
                  <h4>{t("cosign.q2.title")}</h4>
                  <p>{t("cosign.q2.desc")}</p>
                </div>
              </div>

              {/* Question 3 */}
              <div
                className={`cosign-check-item ${checkedQuestions[3] ? "checked" : ""}`}
                onClick={() => toggleQuestion(3)}
                role="checkbox"
                aria-checked={!!checkedQuestions[3]}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleQuestion(3);
                  }
                }}
              >
                <div className="cosign-check-box">
                  {checkedQuestions[3] && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="cosign-check-content">
                  <h4>{t("cosign.q3.title")}</h4>
                  <p>{t("cosign.q3.desc")}</p>
                </div>
              </div>

              {/* Question 4 */}
              <div
                className={`cosign-check-item ${checkedQuestions[4] ? "checked" : ""}`}
                onClick={() => toggleQuestion(4)}
                role="checkbox"
                aria-checked={!!checkedQuestions[4]}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleQuestion(4);
                  }
                }}
              >
                <div className="cosign-check-box">
                  {checkedQuestions[4] && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="cosign-check-content">
                  <h4>{t("cosign.q4.title")}</h4>
                  <p>{t("cosign.q4.desc")}</p>
                </div>
              </div>

              {/* Question 5 */}
              <div
                className={`cosign-check-item ${checkedQuestions[5] ? "checked" : ""}`}
                onClick={() => toggleQuestion(5)}
                role="checkbox"
                aria-checked={!!checkedQuestions[5]}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleQuestion(5);
                  }
                }}
              >
                <div className="cosign-check-box">
                  {checkedQuestions[5] && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="cosign-check-content">
                  <h4>{t("cosign.q5.title")}</h4>
                  <p>{t("cosign.q5.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Bottom Line Callout */}
        <section className="wrap">
          <div className="cosign-bottomline-card">
            <span className="cosign-bottomline-tag">{t("cosign.bottom.tag")}</span>
            <h2>{t("cosign.bottom.title")}</h2>
            <p>{t("cosign.bottom.p")}</p>
          </div>
        </section>

        {/* Regulatory & Institutional Sources */}
        <section className="wrap">
          <div className="cosign-sources-box">
            <div className="cosign-sources-title">{t("cosign.sources.title")}</div>
            <p className="cosign-sources-text">{t("cosign.sources.body")}</p>
          </div>
        </section>

        {/* Navigation Bridge to Related Tools */}
        <section className="wrap">
          <div className="cosign-bridge-card">
            <span className="cosign-bridge-tag">{t("cosign.bridge.tag")}</span>
            <h2>{t("cosign.bridge.title")}</h2>
            <p>{t("cosign.bridge.desc")}</p>
            <div className="cosign-bridge-actions">
              <Link to="/chart-your-path" className="cosign-bridge-btn-primary">
                {t("cosign.bridge.btn.chart")} →
              </Link>
              <Link to="/free-money-first" className="cosign-bridge-btn-secondary">
                {t("cosign.bridge.btn.freeMoney")}
              </Link>
              <Link to="/aid-offer-comparison" className="cosign-bridge-btn-secondary">
                {t("cosign.bridge.btn.aid")}
              </Link>
              <Link to="/educational-resources" className="cosign-bridge-btn-secondary">
                {t("cosign.bridge.btn.resources")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
