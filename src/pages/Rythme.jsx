import { useState } from "react";

function Rythme({ financeData }) {
  const [amount, setAmount] = useState("300");

  function cleanMoneyInput(value) {
    const cleaned = value.replace(/[^\d.]/g, "");
    if (cleaned === "") return "";
    return cleaned.replace(/^0+(?=\d)/, "");
  }

  const amountNumber = Number(amount || 0);

  const priorityDebt = [...financeData.debts].sort(
    (a, b) => b.interestRate - a.interestRate
  )[0];

  const months =
    amountNumber > 0 ? Math.ceil(priorityDebt.balance / amountNumber) : 0;

  const progress = Math.min(
    100,
    Math.round((amountNumber / priorityDebt.balance) * 100)
  );

  return (
    <div>
      <h1>Simulation</h1>
      <p style={muted}>Testez un montant et voyez l’effet sur votre plan.</p>

      <div style={card}>
        <h2>Je mets combien par mois ?</h2>

        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(cleanMoneyInput(e.target.value))}
          style={input}
        />

        <div style={result}>
          <h2>{months} mois estimés</h2>
          <p>Objectif simulé : {priorityDebt.name}</p>
          <p style={muted}>
            Source : {priorityDebt.balance.toFixed(2)}$ ÷ {amountNumber}$/mois.
          </p>
        </div>

        <div style={barBg}>
          <div style={{ ...barFill, width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "20px",
  marginTop: "20px",
};

const input = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  marginBottom: "15px",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
};

const result = {
  background: "var(--bg-panel)",
  borderRadius: "14px",
  padding: "16px",
};

const barBg = {
  height: "12px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  marginTop: "16px",
};

const barFill = {
  height: "100%",
  background: "var(--blue)",
  borderRadius: "999px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

export default Rythme;