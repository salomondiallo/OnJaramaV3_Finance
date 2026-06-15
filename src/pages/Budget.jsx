import { PiggyBank, ShoppingCart, TrendingUp, Wallet } from "lucide-react";

function Budget({ financeData, setCurrentPage }) {
  const income = Number(financeData.overview.monthlyIncome || 0);
  const expenses = Number(financeData.overview.monthlyExpenses || 0);
  const savings = Number(financeData.overview.monthlySavings || 0);
  const available = income - expenses - savings;

  const expensesRate = income > 0 ? Math.round((expenses / income) * 100) : 0;
  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
  const availableRate = income > 0 ? Math.round((available / income) * 100) : 0;

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 2,
    });
  }

  return (
    <div>
      <h1>Budget</h1>
      <p style={muted}>Comprendre ce qui entre, ce qui sort et ce qui reste.</p>

      <section style={mainCard}>
        <Wallet color="var(--green)" size={34} />
        <p style={muted}>Disponible estimé</p>
        <h1 style={{ color: available >= 0 ? "var(--green)" : "var(--red)" }}>
          {money(available)} $
        </h1>
        <p style={muted}>Revenus - dépenses - épargne prévue.</p>
      </section>

      <div className="grid-3" style={grid}>
        <BudgetCard
          icon={<Wallet />}
          title="Revenus"
          value={`${money(income)} $`}
          rate="100%"
          color="var(--green)"
        />

        <BudgetCard
          icon={<ShoppingCart />}
          title="Dépenses"
          value={`${money(expenses)} $`}
          rate={`${expensesRate}%`}
          color="var(--red)"
        />

        <BudgetCard
          icon={<PiggyBank />}
          title="Épargne"
          value={`${money(savings)} $`}
          rate={`${savingsRate}%`}
          color="var(--gold)"
        />
      </div>

      <section style={card}>
        <div style={header}>
          <TrendingUp color="var(--purple)" />
          <h2>Lecture OnJarama</h2>
        </div>

        <BudgetLine label="Dépenses" value={expensesRate} color="var(--red)" />
        <BudgetLine label="Épargne" value={savingsRate} color="var(--gold)" />
        <BudgetLine
          label="Marge disponible"
          value={Math.max(0, availableRate)}
          color="var(--green)"
        />

        <div style={advice}>
          <strong>Conseil</strong>
          <p style={muted}>
            {available >= 500
              ? "Votre marge est positive. Vous pouvez accélérer un objectif ou une dette."
              : available >= 0
              ? "Votre budget tient, mais la marge reste fragile."
              : "Votre budget est sous pression. Réduisez une dépense ou ajustez l’épargne prévue."}
          </p>
        </div>
      </section>

      <section style={card}>
        <h2>Actions rapides</h2>

        <div style={actions}>
          <button onClick={() => setCurrentPage("situation")} style={greenBtn}>
            Modifier ma situation
          </button>

          <button onClick={() => setCurrentPage("objectifs")} style={goldBtn}>
            Créer un objectif
          </button>
        </div>
      </section>
    </div>
  );
}

function BudgetCard({ icon, title, value, rate, color }) {
  return (
    <div style={{ ...smallCard, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <p style={mutedSmall}>{title}</p>
      <h2>{value}</h2>
      <p style={{ color }}>{rate}</p>
    </div>
  );
}

function BudgetLine({ label, value, color }) {
  return (
    <div style={line}>
      <div style={lineTop}>
        <strong>{label}</strong>
        <strong>{value}%</strong>
      </div>

      <div style={barBg}>
        <div
          style={{
            ...barFill,
            width: `${Math.min(100, Math.max(0, value))}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

const mainCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.18), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "24px",
  padding: "22px",
  marginTop: "20px",
};

const grid = {
  gap: "12px",
  marginTop: "18px",
};

const smallCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "16px",
};

const line = {
  marginTop: "14px",
};

const lineTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
};

const barBg = {
  height: "9px",
  background: "#07111f",
  borderRadius: "999px",
  marginTop: "8px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const advice = {
  marginTop: "18px",
  background: "#07111f",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "14px",
};

const actions = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "14px",
};

const greenBtn = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const goldBtn = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--gold)",
  color: "#07111f",
  fontWeight: "bold",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "4px",
};

export default Budget;