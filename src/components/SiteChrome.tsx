import { Link } from "@tanstack/react-router";
import { LANGUAGES, useI18n } from "@/i18n";
import { ContactDialog, openContactDialog } from "@/components/contact/ContactDialog";
import { SearchNavigationDialog } from "@/components/search/SearchNavigationDialog";
import { openSearchDialog } from "@/components/search/searchEvents";

function SearchIcon() {
  return (
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function CompassMark() {
  return (
    <img
      src="/favicon-192x192.png"
      alt="Grad Navigator Logo"
      width="24"
      height="24"
      style={{ display: "inline-block", objectFit: "contain", width: "100%", height: "100%" }}
    />
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
  const { lang, t } = useI18n();
  return (
    <>
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
            <Link to="/pay-for-school">{t("nav.pay")}</Link>
            <Link to="/manage-loans">{t("nav.manage")}</Link>
          </div>
          <div className="nav-right">
            <button
              type="button"
              className="nav-search-btn"
              onClick={() => openSearchDialog()}
              title={lang === "es" ? "Buscar en el sitio (⌘K)" : "Search site (⌘K)"}
              aria-label={lang === "es" ? "Buscar en el sitio" : "Search site"}
            >
              <SearchIcon />
            </button>
            <LanguageSwitcher />
            <Link className="nav-cta" to="/chart-your-path">
              {t("nav.cta")}
            </Link>
          </div>
        </nav>
      </header>
      <SearchNavigationDialog />
    </>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
    </svg>
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
          <div className="foot-socials" style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <a
              href="https://www.facebook.com/profile.php?id=61594019007088"
              target="_blank"
              rel="noopener noreferrer"
              className="foot-social-icon-btn fb"
              aria-label="Facebook"
              title="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/graduationnavigator/"
              target="_blank"
              rel="noopener noreferrer"
              className="foot-social-icon-btn ig"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/grad-navigator/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="foot-social-icon-btn li"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
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
