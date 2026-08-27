import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import { SEARCH_INDEX, POPULAR_SEARCHES, type SearchItem } from "./searchIndex";
import { OPEN_SEARCH_EVENT } from "./searchEvents";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width="18"
      height="18"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="13"
      height="13"
      aria-hidden="true"
      style={{ opacity: 0.65, marginLeft: 4 }}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function SearchNavigationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Open modal handler
  const handleOpen = useCallback((initialQuery?: string) => {
    setIsOpen(true);
    setQuery(initialQuery || "");
    setActiveIndex(0);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  // Listen for custom event & keyboard shortcuts (⌘K / Ctrl+K / /)
  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      handleOpen(customEvent.detail?.query);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            handleOpen();
            return true;
          }
          handleClose();
          return false;
        });
        return;
      }

      // '/' key when not in an input/textarea
      if (
        e.key === "/" &&
        !isOpen &&
        !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        handleOpen();
      }

      // Escape key to close
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener(OPEN_SEARCH_EVENT, handleCustomOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, handleCustomOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleOpen, handleClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Filter items matching query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Return top priority items when query is empty
      return SEARCH_INDEX.slice(0, 8);
    }

    return SEARCH_INDEX.filter((item) => {
      const title = (lang === "es" ? item.titleEs : item.titleEn).toLowerCase();
      const desc = (lang === "es" ? item.descEs : item.descEn).toLowerCase();
      const titleAlt = (lang === "es" ? item.titleEn : item.titleEs).toLowerCase();
      const keywords = item.keywords.join(" ").toLowerCase();

      return title.includes(q) || desc.includes(q) || titleAlt.includes(q) || keywords.includes(q);
    });
  }, [query, lang]);

  // Group filtered results by category
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: SearchItem[] } = {
      calculator: [],
      pages: [],
      articles: [],
      experian: [],
    };

    filteredItems.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });

    return groups;
  }, [filteredItems]);

  // Flat list for indexing navigation
  const flatItems = useMemo(() => {
    const list: SearchItem[] = [];
    ["calculator", "pages", "articles", "experian"].forEach((cat) => {
      if (groupedResults[cat]?.length) {
        list.push(...groupedResults[cat]);
      }
    });
    return list;
  }, [groupedResults]);

  // Reset active index on query change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Select & Navigate to item
  const handleSelect = useCallback(
    (item: SearchItem) => {
      handleClose();
      if (item.isExternal) {
        window.open(item.url, "_blank", "noreferrer,noopener");
      } else {
        navigate({ to: item.url as never });
      }
    },
    [handleClose, navigate],
  );

  // Keyboard navigation within list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (!flatItems.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatItems[activeIndex]) {
        handleSelect(flatItems[activeIndex]);
      }
    }
  };

  if (!isOpen) return null;

  let currentIndexTracker = 0;

  return (
    <div
      className="search-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t("search.title") || "Search Navigation"}
    >
      <div className="search-modal-dialog">
        {/* Search Header Bar */}
        <div className="search-input-header">
          <SearchIcon className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder={
              lang === "es"
                ? "Buscar páginas, calculadoras, guías o temas..."
                : "Search pages, calculators, guides, or topics..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleListKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              title="Clear search"
            >
              <CloseIcon />
            </button>
          )}
          <button
            type="button"
            className="search-close-btn"
            onClick={handleClose}
            title="Close (Esc)"
          >
            <span className="search-kbd-pill">ESC</span>
          </button>
        </div>

        {/* Popular Quick Filter Chips (Shown when query is empty) */}
        {!query && (
          <div className="search-popular-row">
            <span className="search-popular-label">
              {lang === "es" ? "Sugerencias:" : "Quick shortcuts:"}
            </span>
            <div className="search-chips-wrap">
              {POPULAR_SEARCHES.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="search-chip-btn"
                  onClick={() => {
                    setQuery(chip.query);
                    inputRef.current?.focus();
                  }}
                >
                  {lang === "es" ? chip.labelEs : chip.labelEn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="search-results-list" ref={listRef}>
          {flatItems.length === 0 ? (
            <div className="search-no-results">
              <p className="no-res-title">
                {lang === "es"
                  ? `No se encontraron resultados para "${query}"`
                  : `No matching results found for "${query}"`}
              </p>
              <p className="no-res-sub">
                {lang === "es"
                  ? "Prueba buscando términos como: calculadora, refinanciación, tasas o Experian."
                  : "Try searching for terms like: calculator, refinancing, interest rates, or Experian."}
              </p>
            </div>
          ) : (
            <>
              {/* 1. Calculator & Tools Group */}
              {groupedResults.calculator.length > 0 && (
                <div className="search-group">
                  <div className="search-group-header">
                    <span>
                      {lang === "es" ? "Calculadoras y Herramientas" : "Calculators & Tools"}
                    </span>
                  </div>
                  {groupedResults.calculator.map((item) => {
                    const itemIndex = currentIndexTracker++;
                    const isSelected = activeIndex === itemIndex;
                    return (
                      <div
                        key={item.id}
                        className={`search-result-item ${isSelected ? "active" : ""}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(itemIndex)}
                      >
                        <div className="search-item-icon-box">
                          <CompassIcon />
                        </div>
                        <div className="search-item-info">
                          <div className="search-item-title-row">
                            <span className="search-item-title">
                              {lang === "es" ? item.titleEs : item.titleEn}
                            </span>
                            {item.badgeEn && (
                              <span className="search-item-badge">
                                {lang === "es" ? item.badgeEs : item.badgeEn}
                              </span>
                            )}
                          </div>
                          <p className="search-item-desc">
                            {lang === "es" ? item.descEs : item.descEn}
                          </p>
                        </div>
                        <span className="search-item-arrow">↵</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 2. Core Pages Group */}
              {groupedResults.pages.length > 0 && (
                <div className="search-group">
                  <div className="search-group-header">
                    <span>{lang === "es" ? "Páginas del Sitio" : "Pages & Sections"}</span>
                  </div>
                  {groupedResults.pages.map((item) => {
                    const itemIndex = currentIndexTracker++;
                    const isSelected = activeIndex === itemIndex;
                    return (
                      <div
                        key={item.id}
                        className={`search-result-item ${isSelected ? "active" : ""}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(itemIndex)}
                      >
                        <div className="search-item-icon-box">
                          <CompassIcon />
                        </div>
                        <div className="search-item-info">
                          <div className="search-item-title-row">
                            <span className="search-item-title">
                              {lang === "es" ? item.titleEs : item.titleEn}
                            </span>
                            {item.badgeEn && (
                              <span className="search-item-badge">
                                {lang === "es" ? item.badgeEs : item.badgeEn}
                              </span>
                            )}
                          </div>
                          <p className="search-item-desc">
                            {lang === "es" ? item.descEs : item.descEn}
                          </p>
                        </div>
                        <span className="search-item-arrow">↵</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. Student Explainers & Articles */}
              {groupedResults.articles.length > 0 && (
                <div className="search-group">
                  <div className="search-group-header">
                    <span>
                      {lang === "es"
                        ? "Artículos y Explicaciones"
                        : "Student Explainers & Articles"}
                    </span>
                  </div>
                  {groupedResults.articles.map((item) => {
                    const itemIndex = currentIndexTracker++;
                    const isSelected = activeIndex === itemIndex;
                    return (
                      <div
                        key={item.id}
                        className={`search-result-item ${isSelected ? "active" : ""}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(itemIndex)}
                      >
                        <div className="search-item-icon-box">
                          <FileTextIcon />
                        </div>
                        <div className="search-item-info">
                          <div className="search-item-title-row">
                            <span className="search-item-title">
                              {lang === "es" ? item.titleEs : item.titleEn}
                            </span>
                            {item.badgeEn && (
                              <span className="search-item-badge badge-article">
                                {lang === "es" ? item.badgeEs : item.badgeEn}
                              </span>
                            )}
                          </div>
                          <p className="search-item-desc">
                            {lang === "es" ? item.descEs : item.descEn}
                          </p>
                        </div>
                        <span className="search-item-arrow">↵</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 4. Experian In-Depth Guides & PDFs */}
              {groupedResults.experian.length > 0 && (
                <div className="search-group">
                  <div className="search-group-header">
                    <span>
                      {lang === "es"
                        ? "Recursos y Guías de Experian"
                        : "Experian Deep Dives & Guides"}
                    </span>
                  </div>
                  {groupedResults.experian.map((item) => {
                    const itemIndex = currentIndexTracker++;
                    const isSelected = activeIndex === itemIndex;
                    return (
                      <div
                        key={item.id}
                        className={`search-result-item ${isSelected ? "active" : ""}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(itemIndex)}
                      >
                        <div className="search-item-icon-box">
                          <BookmarkIcon />
                        </div>
                        <div className="search-item-info">
                          <div className="search-item-title-row">
                            <span className="search-item-title">
                              {lang === "es" ? item.titleEs : item.titleEn}
                              {item.isExternal && <ExternalIcon />}
                            </span>
                            {item.badgeEn && (
                              <span className="search-item-badge badge-experian">
                                {lang === "es" ? item.badgeEs : item.badgeEn}
                              </span>
                            )}
                          </div>
                          <p className="search-item-desc">
                            {lang === "es" ? item.descEs : item.descEn}
                          </p>
                        </div>
                        <span className="search-item-arrow">↵</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer with Keyboard Shortcuts Hint */}
        <div className="search-modal-footer">
          <div className="search-footer-hint">
            <span className="search-kbd-key">↑</span>
            <span className="search-kbd-key">↓</span>
            <span>{lang === "es" ? "Navegar" : "Navigate"}</span>
          </div>
          <div className="search-footer-hint">
            <span className="search-kbd-key">↵</span>
            <span>{lang === "es" ? "Seleccionar" : "Select"}</span>
          </div>
          <div className="search-footer-hint">
            <span className="search-kbd-key">ESC</span>
            <span>{lang === "es" ? "Cerrar" : "Close"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
