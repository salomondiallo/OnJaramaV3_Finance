export function formatMoney(value, currency = "CAD") {
  const amount = Number(value || 0);

  try {
    return amount.toLocaleString("fr-CA", {
      style: "currency",
      currency,
      maximumFractionDigits: ["GNF", "XOF", "XAF"].includes(currency) ? 0 : 2,
    });
  } catch {
    return `${amount.toLocaleString("fr-CA")} ${currency}`;
  }
}

export function cleanMoneyInput(value) {
  const cleaned = String(value || "").replace(/[^\d.]/g, "");

  if (cleaned === "") return "";

  return cleaned.replace(/^0+(?=\d)/, "");
}

export function percentage(part, total) {
  if (!total || total <= 0) return 0;

  return Math.min(100, Math.round((Number(part || 0) / Number(total)) * 100));
}