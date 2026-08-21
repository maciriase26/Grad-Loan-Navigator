import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LANGUAGES, useI18n } from "@/i18n";
import { ContactDialog, openContactDialog } from "@/components/contact/ContactDialog";


export function CompassMark() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke="var(--teal)" strokeWidth="1.8" />
      <g transform="rotate(35 12 12)">
        <polygon points="12,4.3 14.6,12 12,12" fill="var(--ink)" />
        <polygon points="12,4.3 9.4,12 12,12" fill="var(--teal)" />
        <polygon points="12,19.7 14.6,12 12,12" fill="var(--teal)" />
        <polygon points="12,19.7 9.4,12 12,12" fill="var(--ink)" />
      </g>
      <circle cx="12" cy="12" r="1.3" fill="var(--ink)" />
    </svg>
  );
}

function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang-switcher" aria-label="Language selector">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-btn${l.code === lang ? " active" : ""}`}
          aria-pressed={l.code === lang}
          title={l.name}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="logo" onClick={() => setMobileOpen(false)}>
          Grad Navigat
          <span className="logo-o">
            <CompassMark />
          </span>
          r
        </Link>
        <div className="navlinks">
          <Link to="/educational-resources">{t("nav.understand")}</Link>
          <Link to="/pay-for-school">{t("nav.pay")}</Link>
          <Link to="/manage-loans">{t("nav.manage")}</Link>
        </div>
        <div className="nav-right">
          <LanguageSwitcher />
          <Link className="nav-cta" to="/chart-your-path">
            {t("nav.cta")}
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Drawer Menu (Contains only the 3 main nav links) */}
      {mobileOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-links">
            <Link to="/educational-resources" onClick={() => setMobileOpen(false)}>
              {t("nav.understand")}
            </Link>
            <Link to="/pay-for-school" onClick={() => setMobileOpen(false)}>
              {t("nav.pay")}
            </Link>
            <Link to="/manage-loans" onClick={() => setMobileOpen(false)}>
              {t("nav.manage")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="site-footer wrap">
      <div className="foot-grid">
        <div className="foot-brand">
          {t("footer.brand")}
          <p>{t("footer.blurb")}</p>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <h4>
              <Link to="/educational-resources" className="foot-col-heading-link">
                {t("footer.learn")}
              </Link>
            </h4>
            <Link to="/educational-resources">{t("footer.learn.resources")}</Link>
          </div>

          <div className="foot-col">
            <h4>{t("footer.about")}</h4>
            <Link to="/editorial-standards" hash="editorial">
              {t("footer.about.editorial")}
            </Link>
            <Link to="/editorial-standards" hash="disclosure">
              {t("footer.about.disclosure")}
            </Link>
            <button type="button" className="foot-link-btn" onClick={openContactDialog}>
              {t("footer.about.contact")}
            </button>

          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>{t("footer.copyright")}</span>
        <span>{t("footer.rates")}</span>
      </div>
      <ContactDialog />

    </footer>
  );
}
