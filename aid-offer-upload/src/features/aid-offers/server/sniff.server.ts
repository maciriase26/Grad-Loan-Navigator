/**
 * Work out a file's real type from its first bytes. Never trust the file
 * name or the browser-reported MIME type.
 */
export type SniffedType = "image/jpeg" | "image/png" | "image/heic" | "image/heif" | "application/pdf";

export function sniffType(bytes: Uint8Array): SniffedType | null {
  const b = bytes;
  if (b.length < 12) return null;
  // JPEG: FF D8 FF
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  // PDF: %PDF-
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 && b[4] === 0x2d) return "application/pdf";
  // HEIC/HEIF: "ftyp" at offset 4, then a brand
  if (b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70) {
    const brand = String.fromCharCode(b[8], b[9], b[10], b[11]);
    if (["heic", "heix", "hevc", "hevx", "heim", "heis"].includes(brand)) return "image/heic";
    if (["mif1", "msf1", "heif"].includes(brand)) return "image/heif";
  }
  return null;
}

/** Rough page count for a PDF, without a PDF library. Good enough to reject huge files. */
export function approxPdfPages(bytes: Uint8Array): number {
  const text = new TextDecoder("latin1").decode(bytes);
  const matches = text.match(/\/Type\s*\/Page(?!s)/g);
  return matches ? matches.length : 1;
}
