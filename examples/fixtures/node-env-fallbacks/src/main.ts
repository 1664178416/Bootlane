const docsOnly = "Example text: process.env.STRING_ONLY_TOKEN";
const templateDocsOnly = `Example text: import.meta.env.VITE_STRING_ONLY`;

export const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";
export const databaseUrl = process.env["DATABASE_URL"] || "sqlite://local.db";
export const publicUrl = import.meta.env.VITE_PUBLIC_URL ?? "/";

export function examples(): string {
  return `${docsOnly} ${templateDocsOnly}`;
}
