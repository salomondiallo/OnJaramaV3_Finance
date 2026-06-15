import { Target, TrendingUp } from "lucide-react";

function GoalsCard({ selectedGoals = [], setCurrentPage }) {
  const activeCount = selectedGoals.length;
  const progress = Math.min(100, activeCount * 18);

  return (
    <section style={card}>
      <div style={header}>
        <div>
          <p style={muted}>Objectifs actifs</p>
          <h2>{activeCount}</h2>
        </div>

        <Target color="var(--gold)" size={34} />
      </div>

      <div style={barBg}>
        <div style={{ ...barFill, width: `${progress}%` }} />
      </div>

      <p style={muted}>
        {activeCount > 0
          ? "Vos objectifs actifs alimentent votre parcours."
          : "Ajoutez un objectif pour commencer votre parcours."}
      </p>

      <button onClick={() => setCurrentPage("objectifs")} style={button}>
        <TrendingUp size={16} />
        Voir mes objectifs
      </button>
    </section>
  );
}

const card = {
  background: "linear-gradient(135deg,#2a210b,var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "18px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const barBg = {
  height: "9px",
  background: "#07111f",
  borderRadius: "999px",
  marginTop: "12px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
  background: "var(--gold)",
};

const button = {
  marginTop: "14px",
  width: "100%",
  border: "none",
  borderRadius: "14px",
  padding: "13px",
  background: "var(--gold)",
  color: "#07111f",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "6px",
};

export default GoalsCard;