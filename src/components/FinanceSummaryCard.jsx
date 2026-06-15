import { AlertTriangle, Target, Trophy, Wallet } from "lucide-react";

function FinanceSummaryCard({ financeData, selectedGoals = [] }) {
  const totalDebt = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const available =
    Number(financeData.overview.monthlyIncome || 0) -
    Number(financeData.overview.monthlyExpenses || 0) -
    Number(financeData.overview.monthlySavings || 0);

  const priorityDebt = [...financeData.debts].sort(
    (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
  )[0];

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 2,
    });
  }

  return (
    <section>
      <h2 style={title}>Mon portrait actuel</h2>

      <div style={scroll}>
        <MiniCard
          icon={<Wallet />}
          color="var(--green)"
          title="Disponible"
          value={`${money(available)} $`}
        />

        <MiniCard
          icon={<AlertTriangle />}
          color="var(--red)"
          title="Dette"
          value={`${money(totalDebt)} $`}
        />

        <MiniCard
          icon={<Target />}
          color="var(--gold)"
          title="Objectifs"
          value={selectedGoals.length}
        />

        <MiniCard
          icon={<Trophy />}
          color="var(--purple)"
          title="Victoire"
          value={priorityDebt?.name || "À définir"}
        />
      </div>
    </section>
  );
}

function MiniCard({ icon, color, title, value }) {
  return (
    <div style={{ ...miniCard, borderColor: color }}>
      <div style={{ color }}>{icon}</div>
      <p style={mutedSmall}>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

const title = {
  marginTop: "20px",
};

const scroll = {
  display: "flex",
  gap: "10px",
  overflowX: "auto",
  padding: "12px 0 4px",
};

const miniCard = {
  minWidth: "140px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "17px",
  padding: "14px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "4px",
};

export default FinanceSummaryCard;