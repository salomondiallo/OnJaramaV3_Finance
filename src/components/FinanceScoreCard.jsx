function FinanceScoreCard({ financeData }) {
  const debt = financeData.debts.reduce(
    (sum, item) => sum + Number(item.balance || 0),
    0
  );

  const available =
    Number(financeData.overview.monthlyIncome || 0) -
    Number(financeData.overview.monthlyExpenses || 0) -
    Number(financeData.overview.monthlySavings || 0);

  let score = 50;

  if (available > 500) score += 15;
  if (available > 1000) score += 10;

  if (debt < 10000) score += 10;
  if (debt < 5000) score += 10;

  score = Math.max(0, Math.min(100, score));

  const color =
    score >= 80
      ? "var(--green)"
      : score >= 60
      ? "var(--gold)"
      : "var(--red)";

  return (
    <section style={card}>
      <div style={header}>
        <span>Score financier OnJarama</span>
        <strong style={{ color }}>{score}/100</strong>
      </div>

      <div style={barBg}>
        <div
          style={{
            ...barFill,
            width: `${score}%`,
            background: color,
          }}
        />
      </div>

      <p style={muted}>
        Basé sur votre capacité disponible, vos dettes et votre progression.
      </p>
    </section>
  );
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "18px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const barBg = {
  height: "10px",
  background: "#07111f",
  borderRadius: "999px",
  marginTop: "12px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "12px",
};

export default FinanceScoreCard;