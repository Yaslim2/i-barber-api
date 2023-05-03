export function formatField(field: string) {
  const fieldFormatted = field.toLowerCase();
  return fieldFormatted.charAt(0).toUpperCase() + fieldFormatted.slice(1);
}
