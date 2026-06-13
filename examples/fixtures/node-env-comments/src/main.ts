// Mentioned only in docs for contributors: process.env.COMMENT_ONLY_TOKEN
/*
 * Old Vite examples used import.meta.env.VITE_COMMENT_ONLY.
 */

const literal = "http://localhost:5173//not-a-comment";
const stringExample = "Use process.env.STRING_ONLY_TOKEN in docs, not runtime.";
const templateExample = `Document import.meta.env.VITE_STRING_ONLY without reading it.`;

export function getLiteral(): string {
  return `${literal} ${stringExample} ${templateExample}`;
}
