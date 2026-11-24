/**
 * Last line of defense: strip personal details from any free text the model
 * returns (labels, notes) before it leaves the server. The prompt already
 * forbids them; this catches slips.
 */

const PATTERNS: RegExp[] = [
  // Social Security numbers: 123-45-6789, 123 45 6789
  /\b\d{3}[- ]\d{2}[- ]\d{4}\b/g,
  // Masked SSNs: XXX-XX-1234, ***-**-1234
  /[xX*]{3}[- ]?[xX*]{2}[- ]?\d{4}\b/g,
  // Emails
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
  // US phone numbers
  /(?:\+?1[-.\s]?)?\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g,
  // Labeled IDs: "ID: A1234567", "Student ID 00123456", "Acct #12345"
  /\b(?:student\s*id|id\s*(?:no\.?|number|#)?|acct\.?|account(?:\s*(?:no\.?|number))?)\s*[:#]?\s*[A-Z0-9-]{4,}\b/gi,
  // Bare runs of 7+ digits not part of a dollar figure (IDs, account numbers)
  /(?<![$\d,.])\b\d{7,}\b/g,
];

export function redact(text: string): string {
  return PATTERNS.reduce((t, re) => t.replace(re, "[removed]"), text);
}

export function redactNullable(text: string | null | undefined): string | null {
  return text == null ? null : redact(text);
}
