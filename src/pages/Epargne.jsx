import { PiggyBank, ShieldCheck, Target, TrendingUp } from "lucide-react";

function Epargne({ financeData, setCurrentPage }) {
  const income = Number(financeData.overview.monthlyIncome || 0);
  const savings = Number(financeData.overview.monthlySavings || 0);
  const expenses = Number(financeData.overview.monthlyExpenses || 0);

  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
  const emergencyTarget = expenses * 3;
  const monthsToEmergency =
    savings > 0 ? Math.ceil(emergencyTarget / savings) : 0;

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 2,
    });
  }

  return (
    <div>
      <h1>Épargne</h1>
      <p style={muted}>Construire une sécurité avant les grands projets.</p>

      <section style={heroCard}>
        <PiggyBank color="var(--green)" size={38} />
        <p style={muted}>Épargne prévue par mois</p>
        <h1 style={{ color: "var(--green)" }}>{money(savings)} $</h1>
        <p style={muted}>{savingsRate}% de vos revenus mensuels.</p>
      </section>

      <div className="grid-2" style={grid}>
        <MiniCard
          icon={<ShieldCheck />}
          title="Coussin recommandé"
          value={`${money(emergencyTarget)} $`}
          color="var(--gold)"
          subtitle="Environ 3 mois de dépenses."
        />

        <MiniCard
          icon={<TrendingUp />}
          title="Temps estimé"
          value={`${monthsToEmergency} mois`}
          color="var(--green)"
          subtitle="Au rythme actuel."
        />
      </div>

      <section style={card}>
        <h2>Progression du coussin</h2>

        <ProgressLine
          label="Objectif sécurité"
          value={savings}
          total={emergencyTarget}
          color="var(--green)"
        />

        <p style={muted}>
          Votre coussin d’urgence aide à éviter de retourner au crédit lors d’un imprévu.
        </p>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>Actions recommandées</h2>
        </div>

        <Action text="Automatiser un montant fixe après chaque paie." />
        <Action text="Séparer l’épargne de l’argent courant." />
        <Action text="Prioriser le coussin avant les dépenses non essentielles." />

        <button onClick={() => setCurrentPage("objectifs")} style={primaryBtn}>
          Créer un objectif d’épargne
        </button>
      </section>
    </div>
  );
}

function MiniCard({ icon, title, value, color, subtitle }) {
  return (
    <div style={{ ...miniCard, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <p style={mutedSmall}>{title}</p>
      <h2>{value}</h2>
      <p style={mutedSmall}>{subtitle}</p>
    </div>
  );
}

function ProgressLine({ label, value, total, color }) {
  const progress = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;

  return (
    <div style={{ marginTop: "14px" }}>
      <div style={lineTop}>
        <strong>{label}</strong>
        <strong>{progress}%</strong>
      </div>

      <div style={barBg}>
        <div style={{ ...barFill, width: `${progress}%`, background: color }} />
      </div>
    </div>
  );
}

function Action({ text }) {
  return <p style={action}>✓ {text}</p>;
}

const heroCard = {
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

const miniCard = {
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
  marginBottom: "14px",
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

const action = {
  background: "#07111f",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "10px",
};

const primaryBtn = {
  marginTop: "16px",
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
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

export default Epargne;