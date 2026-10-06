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
    links: [{ rel: "canonical", href: "https://www.graduationnavigator.com/" }],
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

  /*
  // Form State (commented out for now)
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
  */

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
            setRevealed((prev) => (prev.includes(e.target.id) ? prev : [...prev, e.target.id]));
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
            <Link className="btn-primary" to="/chart-your-path">
              {t("home.cta.rate")}
            </Link>
            <Link className="btn-secondary" to="/educational-resources">
              {t("home.cta.loans101")}
            </Link>
          </div>

          {/*
          // Form Component (commented out for now)
          <div className="quiz-card" id="quiz">
            <div className="assess-form">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `20%` }} />
              </div>
              <div className="step-count">{t("form.step.count").replace("{n}", "1")}</div>
              <div className="steps-wrap">
                <div>
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
                    />
                  </div>
                  <p className="assess-disclosure">
                    {t("form.disclosure.pre")}
                    <Link to="/editorial-standards">{t("form.disclosure.link")}</Link>
                    {t("form.disclosure.post")}
                  </p>
                </div>

                <div className="nav-row">
                  <button type="button" className="btn-back" style={{ visibility: "hidden" }}>
                    {t("form.back")}
                  </button>
                  <button type="button" className="btn-next">
                    {t("form.next")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          */}
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
          </div>

          <div className={stationClass("learn")} id="learn">
            <div className="station-dot">2</div>
            <div className="station-tag">{t("station.learn")}</div>
            <h2>{t("learn.h2")}</h2>
            <p className="desc">{t("learn.desc")}</p>

            <div className="card-row" style={{ maxWidth: "960px" }}>
              <Link className="article-card" to="/blog/student-loan-interest-by-the-numbers">
                <span className="tag">{t("blog.card2.tag")}</span>
                <h3>{t("blog.card2.title")}</h3>
                <p>{t("blog.card2.excerpt")}</p>
                <span
                  className="card-more"
                  style={{
                    marginTop: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {t("blog.card2.cta")} →
                </span>
              </Link>

              <Link className="article-card" to="/blog/student-loan-types">
                <span className="tag">{t("blog.card3.tag")}</span>
                <h3>{t("blog.card3.title")}</h3>
                <p>{t("blog.card3.excerpt")}</p>
                <span
                  className="card-more"
                  style={{
                    marginTop: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {t("blog.card3.cta")} →
                </span>
              </Link>

              <Link className="article-card" to="/blog/refinancing-student-loans">
                <span className="tag">{t("blog.card1.tag")}</span>
                <h3>{t("blog.card1.title")}</h3>
                <p>{t("blog.card1.excerpt")}</p>
                <span
                  className="card-more"
                  style={{
                    marginTop: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {t("blog.card1.cta")} →
                </span>
              </Link>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Link
                className="btn-secondary"
                to="/educational-resources"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
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
            <Link className="btn-primary" to="/chart-your-path">
              {t("applyStation.cta")}
            </Link>
          </div>
        </div>

        <HomeVideoEmbed />
      </main>

      <SiteFooter />

      <ChatWidget />
    </>
  );
}

function HomeVideoEmbed() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasTriggeredRef = useRef(false);
  const isIframeReadyRef = useRef(false);
  const playerRef = useRef<{
    mute?: () => void;
    playVideo?: () => void;
    destroy?: () => void;
  } | null>(null);

  const startPlayback = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // 1. If YouTube IFrame API player instance is available
    if (playerRef.current && typeof playerRef.current.playVideo === "function") {
      try {
        playerRef.current.mute?.();
        playerRef.current.playVideo?.();
      } catch {
        // ignore and fallback
      }
    }

    // 2. Direct postMessage to YouTube iframe
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "mute", args: "" }),
          "*",
        );
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: "" }),
          "*",
        );
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    // Dynamically load YouTube IFrame API script for robust playback control
    const win = window as unknown as {
      YT?: {
        Player: new (
          element: HTMLElement,
          config: {
            events?: {
              onReady?: (e: { target: { mute: () => void; playVideo: () => void } }) => void;
            };
          },
        ) => { mute: () => void; playVideo: () => void; destroy: () => void };
      };
      onYouTubeIframeAPIReady?: () => void;
    };

    const initPlayer = () => {
      if (win.YT && win.YT.Player && iframeRef.current) {
        try {
          playerRef.current = new win.YT.Player(iframeRef.current, {
            events: {
              onReady: (event) => {
                if (hasTriggeredRef.current) {
                  try {
                    event.target.mute();
                    event.target.playVideo();
                  } catch {
                    // ignore
                  }
                }
              },
            },
          });
        } catch {
          // ignore
        }
      }
    };

    if (!win.YT) {
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prevCallback = win.onYouTubeIframeAPIReady;
      win.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        initPlayer();
      };
    } else {
      initPlayer();
    }

    // Scroll and Intersection triggers: start playing when user scrolls down towards footer
    const target = containerRef.current;
    const footer = document.querySelector(".site-footer");

    let observer: IntersectionObserver | null = null;
    if (target && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              startPlayback();
              observer?.disconnect();
              break;
            }
          }
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px 180px 0px",
        },
      );

      observer.observe(target);
      if (footer) {
        observer.observe(footer);
      }
    }

    const onScroll = () => {
      if (hasTriggeredRef.current) return;
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollPos < 700) {
        startPlayback();
        observer?.disconnect();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      try {
        playerRef.current?.destroy?.();
      } catch {
        // ignore
      }
    };
  }, []);

  const handleIframeLoad = () => {
    isIframeReadyRef.current = true;
    if (hasTriggeredRef.current) {
      setTimeout(() => {
        try {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: "command", func: "mute", args: "" }),
            "*",
          );
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: "command", func: "playVideo", args: "" }),
            "*",
          );
        } catch {
          // ignore
        }
      }, 250);
    }
  };

  return (
    <section
      ref={containerRef}
      className="wrap home-video-section"
      id="video-guide"
      aria-label={t("homeVideo.ariaLabel")}
    >
      <div className="home-video-card">
        <div className="home-video-header">
          <div className="station-tag">{t("homeVideo.tag")}</div>
          <h2>{t("homeVideo.title")}</h2>
          <p className="desc">{t("homeVideo.desc")}</p>
        </div>
        <div className="home-video-frame-wrapper">
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/6XUdp8cUvss?si=5AYBqWXwH0wIb1w2&enablejsapi=1&playsinline=1"
            title={t("homeVideo.iframeTitle")}
            width="560"
            height="315"
            loading="lazy"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        </div>
        <div className="home-video-footer">
          <span className="home-video-hint">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            {t("homeVideo.unmuteHint")}
          </span>
        </div>
      </div>
    </section>
  );
}
