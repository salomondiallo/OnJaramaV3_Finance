import { Route, Trophy } from "lucide-react";

function MonPlanCard({ financeData, setCurrentPage }) {
  const totalDebt = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const priorityDebt = [...financeData.debts].sort(
    (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
  )[0];

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 2,
    });
  }

  return (
    <section style={card}>
      <div style={header}>
        <Route color="var(--green)" size={32} />

        <div>
          <p style={muted}>Mon plan actuel</p>
          <h2>{priorityDebt?.name || "Reprendre le contrôle"}</h2>
        </div>
      </div>

      <div style={victory}>
        <Trophy color="var(--gold)" />
        <div>
          <strong>Prochaine victoire</strong>
          <p style={muted}>
            {money(priorityDebt?.balance || totalDebt)} $ à réduire
          </p>
        </div>
      </div>

      <button onClick={() => setCurrentPage("parcours")} style={button}>
        Voir mon parcours
      </button>
    </section>
  );
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "18px",
};

const header = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};

const victory = {
  marginTop: "14px",
  background: "#07111f",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "14px",
  display: "flex",
  gap: "10px",
};

const button = {
  marginTop: "14px",
  width: "100%",
  border: "none",
  borderRadius: "14px",
  padding: "13px",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "6px",
};

export default MonPlanCard;