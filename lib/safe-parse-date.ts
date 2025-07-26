export function safeParseDate(
  value: string | Date | null | undefined
): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
}
