import { goalDefinitions } from "../data/goalDefinitions";

function QuickActions({ selectedGoals = [], setSelectedGoals, onOpenGoal }) {
  function toggleGoal(goalId) {
    if (!setSelectedGoals) return;

    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  }

  return (
    <div style={{ marginTop: "18px" }}>
      <h2>Quel est votre objectif aujourd’hui ?</h2>
      <p style={muted}>Touchez une carte pour l’activer ou la désactiver.</p>

      <div className="responsive-grid-4" style={grid}>
        {goalDefinitions.map((goal) => {
          const Icon = goal.Icon;
          const active = selectedGoals.includes(goal.id);

          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              onDoubleClick={() => onOpenGoal && onOpenGoal(goal)}
              className="tile-hover"
              style={{
                ...card,
                borderColor: active ? goal.color : "var(--border)",
                background: active ? "#143b73" : "var(--bg-card)",
              }}
            >
              <Icon size={30} color={goal.color} />
              <h3>{goal.title}</h3>
              <p style={subtitle}>{goal.subtitle}</p>
              <small style={{ color: active ? goal.color : "var(--text-muted)" }}>
                {active ? "Activé — ouvrir dans Objectifs" : "Toucher pour activer"}
              </small>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(160px, 1fr))",
  gap: "12px",
  marginTop: "12px",
};

const card = {
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "20px",
  cursor: "pointer",
  minHeight: "150px",
  color: "var(--text-main)",
  textAlign: "left",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const subtitle = {
  color: "var(--text-muted)",
  marginTop: "8px",
  marginBottom: "10px",
};

export default QuickActions;