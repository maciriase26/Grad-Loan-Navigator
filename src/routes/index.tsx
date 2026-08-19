import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CompassMark, SiteFooter, SiteHeader } from "@/components/SiteChrome";

import { useI18n } from "@/i18n";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grad Loan Navigator — Life After Grad PLUS" },
      {
        name: "description",
        content:
          "Plain-language guide to the new graduate borrowing caps, grandfather rules, and how to compare private lenders after Grad PLUS ended.",
      },
      { property: "og:title", content: "Grad Loan Navigator — Life After Grad PLUS" },
      {
        property: "og:description",
        content:
          "Plain-language guide to the new graduate borrowing caps, grandfather rules, and how to compare private lenders after Grad PLUS ended.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://graduationnavigator.com/" }],
  }),
  component: Index,
  errorComponent: () => <IndexError />,
});

function IndexError() {
  const { t } = useI18n();
  return (
    <>
      <SiteHeader />
      <main className="wrap guide-head">
        <h1>{t("error.title")}</h1>
        <p className="sub">
          {t("error.sub.pre")}
          <Link to="/educational-resources">{t("error.sub.link")}</Link>
          {t("error.sub.post")}
        </p>
      </main>
      <SiteFooter />
    </>
  );
}

const STATIONS = [
  { id: "understand", n: 1 },
  { id: "learn", n: 2 },
  { id: "apply", n: 3 },
];


const DEGREE_TIERS: { labelKey: string; options: string[] }[] = [
  { labelKey: "form.degree.tier1", options: ["form.degree.associate"] },
  { labelKey: "form.degree.tier2", options: ["form.degree.bachelor"] },
  { labelKey: "form.degree.tier3", options: ["M.A.", "M.B.A."] },
  { labelKey: "form.degree.tier4", options: ["Ph.D.", "J.D.", "M.D."] },
];

export function Index() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    gradYear: "",
    degree: "",
    creditUse: "",
    savings: "",
    email: "",
  });
  const [yearOptions, setYearOptions] = useState<number[]>([]);

  const stepValid =
    step === 1
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      : step === 2
        ? !!form.gradYear
        : step === 3
          ? !!form.degree
          : step === 4
            ? !!form.creditUse
            : !!form.savings;


  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYearOptions(Array.from({ length: 9 }, (_, i) => currentYear + i));
  }, []);


  const [activeIds, setActiveIds] = useState<string[]>(["understand"]);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [fill, setFill] = useState(0);
  const routeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = routeRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const mid = window.innerHeight * 0.45;
      const progress = Math.max(0, Math.min(1, (mid - rect.top) / total));
      setFill(progress * 100);

      const next: string[] = [];
      STATIONS.forEach((s) => {
        const node = document.getElementById(s.id);
        if (!node) return;
        const r = node.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.2)
          next.push(s.id);
      });
      setActiveIds(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed((prev) =>
              prev.includes(e.target.id) ? prev : [...prev, e.target.id],
            );
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    STATIONS.forEach((s) => {
      const node = document.getElementById(s.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const stationClass = (id: string) =>
    ["station", activeIds.includes(id) ? "active" : "", revealed.includes(id) ? "revealed" : ""]
      .filter(Boolean)
      .join(" ");


  return (
    <>
      <SiteHeader />


      <main>
        <section className="hero wrap">
          <svg className="hero-deco" viewBox="0 0 320 220" fill="none" aria-hidden="true">
            <path
              d="M14 18 C 90 10, 120 70, 90 110 S 40 170, 110 178 S 240 150, 230 90 S 300 40, 296 8"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeDasharray="1 9"
              strokeLinecap="round"
            />
            <circle cx="14" cy="18" r="5" fill="var(--gold)" />
            <circle cx="90" cy="110" r="4" fill="var(--ink)" opacity="0.35" />
            <circle cx="110" cy="178" r="4" fill="var(--ink)" opacity="0.35" />
            <circle cx="296" cy="8" r="6" fill="var(--gold)" />
            <circle cx="296" cy="8" r="10" stroke="var(--gold)" strokeWidth="1.4" opacity="0.5" />
          </svg>

          <div className="eyebrow">{t("home.eyebrow")}</div>
          <h1>
            {t("home.h1.line1")}
            <br />
            {t("home.h1.line2a")}
            <em>{t("home.h1.line2em")}</em>
            {t("home.h1.line2b")}
          </h1>
          <p className="sub">{t("home.sub")}</p>
          <div className="hero-actions">
            <a className="btn-primary" href="#quiz">
              {t("home.cta.rate")}
            </a>
            <Link className="btn-secondary" to="/educational-resources">
              {t("home.cta.loans101")}
            </Link>

          </div>

          <div className="quiz-card" id="quiz">
            {!submitted ? (
              <div className="assess-form">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${(step / 5) * 100}%` }} />
                </div>
                <div className="step-count">{t("form.step.count").replace("{n}", String(step))}</div>

                <div className="steps-wrap">
                  <div>
                    {step === 1 && (
                      <>
                        <div className="qlabel">
                          <span className="qlabel-badge">
                            <span style={{ width: 28, height: 28, display: "block" }}>
                              <CompassMark />
                            </span>
                          </span>
                          {t("form.title")}
                        </div>
                        <p className="step-sub">{t("form.email.sub")}</p>
                        <div className="assess-field">
                          <input
                            type="email"
                            id="emailCapture"
                            placeholder={t("form.email.placeholder")}
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          />
                        </div>
                        <p className="assess-disclosure">
                          {t("form.disclosure.pre")}
                          <Link to="/editorial-standards">{t("form.disclosure.link")}</Link>
                          {t("form.disclosure.post")}
                        </p>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="qlabel">{t("form.gradYear.q")}</div>
                        <p className="step-sub">{t("form.gradYear.sub")}</p>
                        <div className="assess-field">
                          <select
                            id="gradYear"
                            value={form.gradYear}
                            onChange={(e) => setForm((f) => ({ ...f, gradYear: e.target.value }))}
                          >
                            <option value="">{t("form.gradYear.placeholder")}</option>
                            {yearOptions.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <div className="qlabel">{t("form.degree.q")}</div>
                        <p className="step-sub">{t("form.degree.sub")}</p>
                        {DEGREE_TIERS.map((tier) => (
                          <div className="tier-group" key={tier.labelKey}>
                            <div className="tier-label">{t(tier.labelKey as Parameters<typeof t>[0])}</div>
                            <div className="chip-row">
                              {tier.options.map((opt) => {
                                const label = opt.startsWith("form.") ? t(opt as Parameters<typeof t>[0]) : opt;
                                return (
                                  <button
                                    type="button"
                                    key={opt}
                                    className={`chip${form.degree === label ? " active" : ""}`}
                                    onClick={() => setForm((f) => ({ ...f, degree: label }))}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                        <div className="chip-row" style={{ marginTop: 12 }}>
                          <button
                            type="button"
                            className={`chip${form.degree === t("form.degree.other") ? " active" : ""}`}
                            onClick={() =>
                              setForm((f) => ({ ...f, degree: t("form.degree.other") }))
                            }
                          >
                            {t("form.degree.other")}
                          </button>
                        </div>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <div className="qlabel">{t("form.creditUse.q")}</div>
                        <p className="step-sub">{t("form.creditUse.sub")}</p>
                        <div className="assess-field">
                          <select
                            id="creditUse"
                            value={form.creditUse}
                            onChange={(e) => setForm((f) => ({ ...f, creditUse: e.target.value }))}
                          >
                            <option value="">{t("form.creditUse.placeholder")}</option>
                            <option>{t("form.creditUse.none")}</option>
                            <option>{t("form.creditUse.light")}</option>
                            <option>{t("form.creditUse.moderate")}</option>
                            <option>{t("form.creditUse.heavy")}</option>
                          </select>
                        </div>
                      </>
                    )}

                    {step === 5 && (
                      <>
                        <div className="qlabel">{t("form.savings.q")}</div>
                        <p className="step-sub">{t("form.savings.sub")}</p>
                        <div className="assess-field">
                          <select
                            id="savings"
                            value={form.savings}
                            onChange={(e) => setForm((f) => ({ ...f, savings: e.target.value }))}
                          >
                            <option value="">{t("form.savings.placeholder")}</option>
                            <option>$0 – $10,000</option>
                            <option>$10,000 – $25,000</option>
                            <option>$26,500 – $50,000</option>
                            <option>$50,000 – $75,000</option>
                            <option>$75,000+</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="nav-row">
                    <button
                      type="button"
                      className="btn-back"
                      style={{ visibility: step === 1 ? "hidden" : "visible" }}
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                    >
                      {t("form.back")}
                    </button>
                    <button
                      type="button"
                      className="btn-next"
                      disabled={!stepValid}
                      onClick={() => (step === 5 ? setSubmitted(true) : setStep((s) => s + 1))}
                    >
                      {step === 5 ? t("form.finish") : t("form.next")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="assess-thanks">
                <span style={{ width: 46, height: 46, display: "block" }}>
                  <CompassMark />
                </span>
                <h2>{t("form.thanks.title")}</h2>
                <p>{t("form.thanks.body")}</p>
              </div>
            )}
          </div>


        </section>

        <div className="wrap route-section" ref={routeRef}>
          <div className="route-line">
            <div className="fill" style={{ height: `${fill}%` }} />
          </div>

          <div className={stationClass("understand")} id="understand">
            <div className="station-dot">1</div>
            <div className="station-tag">{t("station.understand")}</div>
            <h2>{t("understand.h2")}</h2>
            <p className="desc">{t("understand.desc")}</p>
            <div className="stat-grid">
              <div className="stat">
                <div className="num">
                  $630<span>K</span>–$900<span>K</span>
                </div>
                <div className="label">{t("understand.stat1.label")}</div>
                <p className="stat-source">{t("understand.stat1.source")}</p>
              </div>
              <div className="stat">
                <div className="num">
                  17<span>%</span>
                </div>
                <div className="label">{t("understand.stat2.label")}</div>
                <p className="stat-source">{t("understand.stat2.source")}</p>
              </div>
              <div className="stat">
                <div className="num">
                  $249<span>K+</span>
                </div>
                <div className="label">{t("understand.stat3.label")}</div>
                <p className="stat-source">{t("understand.stat3.source")}</p>
              </div>
            </div>
            <a className="btn-primary" href="#quiz" style={{ marginTop: "28px" }}>
              {t("understand.cta")}
            </a>
          </div>

          <div className={stationClass("learn")} id="learn">
            <div className="station-dot">2</div>
            <div className="station-tag">{t("station.learn")}</div>
            <h2>{t("learn.h2")}</h2>
            <p className="desc">{t("learn.desc")}</p>

            <div className="card-row" style={{ maxWidth: "960px" }}>
              <Link className="article-card" to="/blog/refinancing-student-loans">
                <span className="tag">{t("blog.card1.tag")}</span>
                <h3>{t("blog.card1.title")}</h3>
                <p>{t("blog.card1.excerpt")}</p>
                <span className="card-more" style={{ marginTop: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  {t("blog.card1.cta")} →
                </span>
              </Link>

              <Link className="article-card" to="/blog/student-loan-interest-by-the-numbers">
                <span className="tag">{t("blog.card2.tag")}</span>
                <h3>{t("blog.card2.title")}</h3>
                <p>{t("blog.card2.excerpt")}</p>
                <span className="card-more" style={{ marginTop: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  {t("blog.card2.cta")} →
                </span>
              </Link>

              <Link className="article-card" to="/blog/student-loan-types">
                <span className="tag">{t("blog.card3.tag")}</span>
                <h3>{t("blog.card3.title")}</h3>
                <p>{t("blog.card3.excerpt")}</p>
                <span className="card-more" style={{ marginTop: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  {t("blog.card3.cta")} →
                </span>
              </Link>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Link className="btn-secondary" to="/educational-resources" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>{t("learn.navHub.cta")}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="15"
                  height="15"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>



          <div className={stationClass("apply")} id="apply">
            <div className="station-dot">3</div>
            <div className="station-tag">{t("station.apply")}</div>
            <h2>{t("applyStation.h2")}</h2>
            <p className="desc">{t("applyStation.desc")}</p>
            <Link className="btn-primary" to="/apply">
              {t("applyStation.cta")}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />


      <ChatWidget />
    </>
  );
}
