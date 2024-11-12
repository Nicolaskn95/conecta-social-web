export function formatDate(date: Date): string {
  const datetime = new Date(date);

  return datetime.toLocaleString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
