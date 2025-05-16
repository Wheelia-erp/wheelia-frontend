export function formatQuoteId(code) {
  return code ? `#${String(code).padStart(5, '0')}` : "";
}