import { CheckCircle, Flag, Route, Target } from "lucide-react";

function MonPlan({ financeData, selectedGoals }) {
  const debtTotal = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  return (
    <div>
      <h1>Mon Plan</h1>

      <p style={muted}>
        Votre feuille de route financière personnalisée.
      </p>

      <section style={card}>
        <div style={header}>
          <Route color="var(--green)" />
          <h2>Étape 1</h2>
        </div>

        <p>Réduire les dettes prioritaires.</p>

        <strong>{debtTotal.toLocaleString("fr-CA")} $</strong>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>Étape 2</h2>
        </div>

        <p>Consolider l’épargne et les objectifs.</p>

        <strong>{selectedGoals.length} objectifs actifs</strong>
      </section>

      <section style={card}>
        <div style={header}>
          <Flag color="var(--blue)" />
          <h2>Étape 3</h2>
        </div>

        <p>Construire les projets majeurs.</p>
      </section>

      <section style={successCard}>
        <CheckCircle color="var(--green)" />

        <h2>Objectif final</h2>

        <p style={muted}>
          Liberté financière, patrimoine et réalisation des projets personnels.
        </p>
      </section>
    </div>
  );
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const successCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.18), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
};

const muted = {
  color: "var(--text-muted)",
};

export default MonPlan;