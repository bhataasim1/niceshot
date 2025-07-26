export function safeParseDate(
  value: string | Date | null | undefined
): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
}

export const formatDate = (date: Date | null | undefined) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};
