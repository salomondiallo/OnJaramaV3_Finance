function MainOverviewTile({ financeData }) {
  const totalDebt = financeData.debts.reduce(
    (total, debt) => total + debt.balance,
    0
  );

  const priorityDebt = [...financeData.debts].sort(
    (a, b) => b.interestRate - a.interestRate
  )[0];

  const available =
    financeData.overview.monthlyIncome -
    financeData.overview.monthlyExpenses -
    financeData.overview.monthlySavings;

  return (
    <div style={container}>
      <h2>Vue d’ensemble</h2>

      <div className="responsive-overview" style={grid}>
        <div style={card}>
          <p style={muted}>Priorité actuelle</p>
          <h2>{priorityDebt.name}</h2>
          <p>Solde : {priorityDebt.balance.toFixed(2)}$</p>
          <p style={{ color: "var(--red)" }}>Taux : {priorityDebt.interestRate}%</p>
        </div>

        <div style={card}>
          <p style={muted}>Rythme mensuel</p>
          <h2 style={{ color: available >= 0 ? "var(--green)" : "var(--red)" }}>
            {available}$
          </h2>
          <p style={muted}>Disponible après dépenses et épargne.</p>
        </div>

        <div style={card}>
          <p style={muted}>Dette totale</p>
          <h2 style={{ color: "var(--red)" }}>{totalDebt.toFixed(2)}$</h2>
          <p style={muted}>Fairstone + Modulo</p>
        </div>

        <div style={card}>
          <p style={muted}>Prochaine action</p>
          <h2>{financeData.overview.nextAction}</h2>
          <p style={muted}>Réduire les intérêts les plus élevés.</p>
        </div>
      </div>
    </div>
  );
}

const container = {
  marginTop: "22px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "14px",
  marginTop: "12px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "18px",
};

const muted = {
  color: "var(--text-muted)",
  marginBottom: "8px",
};

export default MainOverviewTile;