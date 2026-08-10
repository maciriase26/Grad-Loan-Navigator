import type { ReactNode } from "react";

/**
 * Final icon fleet — one icon per Loans 101 category.
 * Order matches the six categories; slugs map to the same glyphs.
 */
const GLYPHS: ReactNode[] = [
  // 01 How Grad Loans Actually Work — info circle
  <>
    <circle cx="12" cy="12" r="8.5" />
    <line x1="12" y1="10.3" x2="12" y2="16.5" />
    <circle cx="12" cy="7.3" r="0.15" fill="currentColor" />
  </>,
  // 02 What Changed With Grad PLUS — document, updated
  <>
    <path d="M7 3.5h7l4 4V20.5H7Z" />
    <path d="M14 3.5V7.5h4" />
    <path d="M9.5 14.5 12 12l2.5 2.5" />
    <line x1="12" y1="12" x2="12" y2="17.5" />
  </>,
  // 03 Qualifying & Getting Approved — check circle
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8 12.5 L10.7 15 L16 9.5" />
  </>,
  // 04 What Borrowing Actually Costs — calculator
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
    <line x1="7.5" y1="7" x2="16.5" y2="7" />
    <line x1="7.5" y1="10.5" x2="9.7" y2="10.5" />
    <line x1="12" y1="10.5" x2="14.2" y2="10.5" />
    <line x1="16.5" y1="10.5" x2="16.5" y2="17" />
    <line x1="7.5" y1="14" x2="9.7" y2="14" />
    <line x1="12" y1="14" x2="14.2" y2="14" />
    <line x1="7.5" y1="17.5" x2="9.7" y2="17.5" />
    <line x1="12" y1="17.5" x2="14.2" y2="17.5" />
  </>,
  // 05 Repayment & Life After You Borrow — road, milestones
  <>
    <line x1="4" y1="19" x2="20" y2="19" />
    <line x1="7" y1="19" x2="7" y2="15.5" />
    <line x1="12" y1="19" x2="12" y2="15.5" />
    <line x1="17" y1="19" x2="17" y2="15.5" />
    <path d="M4 12 L12 5 L20 12" />
  </>,
  // 06 Reducing What You Need to Borrow — scissors (cutting costs)
  <>
    <circle cx="6" cy="6" r="2.6" />
    <circle cx="6" cy="18" r="2.6" />
    <path d="M8.3 8.1 L11 11 L20 17" />
    <path d="M8.3 15.9 L11 11 L20 5" />
    <circle cx="11" cy="11" r="0.9" fill="currentColor" stroke="none" />
  </>,

];

/** Explicit slug → glyph index, with graceful fallback to position. */
const BY_SLUG: Record<string, number> = {
  "how-grad-loans-work": 0,
  "what-changed-grad-plus": 1,
  "qualifying-getting-approved": 2,
  "what-borrowing-costs": 3,
  "repayment-life-after": 4,
  "reducing-what-you-borrow": 5,
};

export function CategoryIcon({
  slug,
  index = 0,
  size = 22,
  className,
}: {
  slug?: string;
  index?: number;
  size?: number;
  className?: string;
}) {
  const i = (slug && BY_SLUG[slug] !== undefined ? BY_SLUG[slug] : index) % GLYPHS.length;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[i]}
    </svg>
  );
}
