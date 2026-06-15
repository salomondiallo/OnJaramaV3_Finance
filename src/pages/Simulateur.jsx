import { Calculator, TrendingUp, Target } from "lucide-react";
import { useState } from "react";

function Simulateur({ financeData }) {
  const [monthlyAmount, setMonthlyAmount] = useState("500");
  const [years, setYears] = useState("5");

  function cleanInput(value) {
    return value.replace(/[^\d]/g, "");
  }

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 0,
    });
  }

  const monthly = Number(monthlyAmount || 0);
  const durationYears = Number(years || 0);

  const totalSaved = monthly * 12 * durationYears;

  const debtTotal = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const debtReduction = Math.min(totalSaved, debtTotal);

  return (
    <div>
      <h1>Simulateur</h1>

      <p style={muted}>
        Visualisez l’impact de vos décisions financières.
      </p>

      <section style={card}>
        <div style={header}>
          <Calculator color="var(--blue)" />
          <h2>Simulation d’épargne</h2>
        </div>

        <label>Montant mensuel</label>

        <input
          value={monthlyAmount}
          onChange={(e) => setMonthlyAmount(cleanInput(e.target.value))}
          style={input}
          inputMode="numeric"
        />

        <label>Nombre d’années</label>

        <input
          value={years}
          onChange={(e) => setYears(cleanInput(e.target.value))}
          style={input}
          inputMode="numeric"
        />

        <div style={result}>
          <p style={muted}>Capital estimé</p>

          <h1 style={{ color: "var(--green)" }}>
            {money(totalSaved)} $
          </h1>
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <TrendingUp color="var(--green)" />
          <h2>Projection</h2>
        </div>

        <Info
          label="Épargne totale"
          value={`${money(totalSaved)} $`}
        />

        <Info
          label="Dette actuelle"
          value={`${money(debtTotal)} $`}
        />

        <Info
          label="Dette pouvant être remboursée"
          value={`${money(debtReduction)} $`}
        />
      </section>

      <section style={goalCard}>
        <Target color="var(--gold)" />
        <h2>Lecture OnJarama</h2>

        <p style={muted}>
          Avec {money(monthly)} $ par mois pendant {durationYears} ans,
          vous pourriez accumuler environ {money(totalSaved)} $.
        </p>
      </section>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={row}>
      <span style={muted}>{label}</span>
      <strong>{value}</strong>
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

const goalCard = {
  background: "linear-gradient(135deg,#2a210b,var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
};

const input = {
  display: "block",
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "#07111f",
  color: "white",
  marginTop: "8px",
  marginBottom: "14px",
};

const result = {
  marginTop: "10px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,.08)",
};

const muted = {
  color: "var(--text-muted)",
};

export default Simulateur;