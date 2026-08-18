import { Link } from "@tanstack/react-router";
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

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={t("nav.language")}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          className={l.code === lang ? "active" : ""}
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
  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="logo">
          Grad Navigat
          <span className="logo-o">
            <CompassMark />
          </span>
          r
        </Link>
        <div className="navlinks">
          <Link to="/educational-resources">{t("nav.understand")}</Link>
          <Link to="/apply">{t("nav.pay")}</Link>
          <Link to="/manage-loans">{t("nav.manage")}</Link>
        </div>
        <div className="nav-right">
          <LanguageSwitcher />
          <Link className="nav-cta" to="/" hash="quiz">
            {t("nav.cta")}
          </Link>
        </div>
      </nav>
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
