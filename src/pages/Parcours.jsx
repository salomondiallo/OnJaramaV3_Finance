import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Circle,
  Flag,
  History,
  Route,
  Target,
  Trophy,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    title: "Parcours",
    subtitle: "Un objectif actif, des étapes claires et une progression visible.",
    activeGoal: "Objectif actif",
    noGoal: "Aucun objectif actif. Choisissez un objectif, simulez-le puis activez-le.",
    chooseGoal: "Choisir un objectif",
    steps: "Étapes du parcours",
    progress: "Progression",
    remaining: "Reste",
    monthly: "Contribution mensuelle",
    nextAction: "Prochaine action",
    completed: "Objectif atteint",
    goGoals: "Mes objectifs",
    goSimulator: "Simuler un objectif",
    historyHint: "Les objectifs terminés seront visibles dans Profil > Historique.",
  },
  EN: {
    title: "Path",
    subtitle: "One active goal, clear steps and visible progress.",
    activeGoal: "Active goal",
    noGoal: "No active goal. Choose a goal, simulate it and activate it.",
    chooseGoal: "Choose goal",
    steps: "Path steps",
    progress: "Progress",
    remaining: "Remaining",
    monthly: "Monthly contribution",
    nextAction: "Next action",
    completed: "Goal achieved",
    goGoals: "My goals",
    goSimulator: "Simulate a goal",
    historyHint: "Completed goals will be visible in Profile > History.",
  },
  ES: {
    title: "Recorrido",
    subtitle: "Un objetivo activo, etapas claras y progreso visible.",
    activeGoal: "Objetivo activo",
    noGoal: "No hay objetivo activo. Elige un objetivo, simúlalo y actívalo.",
    chooseGoal: "Elegir objetivo",
    steps: "Etapas del recorrido",
    progress: "Progreso",
    remaining: "Restante",
    monthly: "Contribución mensual",
    nextAction: "Próxima acción",
    completed: "Objetivo alcanzado",
    goGoals: "Mis objetivos",
    goSimulator: "Simular un objetivo",
    historyHint: "Los objetivos terminados estarán visibles en Perfil > Historial.",
  },
};

function Parcours({ selectedGoals, setSelectedGoals, settings, setCurrentPage, addActivity }) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";
  const goals = Array.isArray(selectedGoals) ? selectedGoals.filter((goal) => !goal.archived) : [];
  const [focusedGoalId, setFocusedGoalId] = useState(null);

  useEffect(() => {
    const storedGoalId = localStorage.getItem("onjaramaPathGoalId");
    if (storedGoalId) {
      setFocusedGoalId(storedGoalId);
      localStorage.removeItem("onjaramaPathGoalId");
    }
  }, []);

  const activeGoals = useMemo(
    () => goals.filter((goal) => getProgress(goal) < 100),
    [goals]
  );

  const focusedGoal =
    activeGoals.find((goal) => String(goal.id) === String(focusedGoalId)) ||
    activeGoals.find((goal) => goal.highlighted) ||
    activeGoals[0];

  const progress = getProgress(focusedGoal);
  const remaining = getRemaining(focusedGoal);
  const nextStep = getNextStep(focusedGoal);

  function toggleStep(stepId) {
    if (!focusedGoal) return;

    setSelectedGoals?.(
      selectedGoals.map((goal) => {
        if (goal.id !== focusedGoal.id) return goal;

        const existingSteps = ensureSteps(goal);
        const nextSteps = existingSteps.map((step) =>
          step.id === stepId
            ? {
                ...step,
                done: !step.done,
                completedAt: !step.done ? new Date().toISOString() : null,
              }
            : step
        );
        const doneCount = nextSteps.filter((step) => step.done).length;
        const nextProgress = Math.round((doneCount / nextSteps.length) * 100);
        const completed = nextProgress >= 100;

        if (completed && getProgress(goal) < 100) {
          addActivity?.("victoire", "Objectif atteint", `${goal.title} est complété.`);
        }

        return {
          ...goal,
          pathSteps: nextSteps,
          currentAmount: completed ? Number(goal.targetAmount || 0) : goal.currentAmount,
          completedAt: completed ? goal.completedAt || new Date().toISOString() : goal.completedAt,
          status: completed ? "completed" : "active",
        };
      })
    );
  }

  return (
    <div className="native-page" style={page}>
      <h1>{t.parcours || p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      {!focusedGoal ? (
        <section style={emptyCard}>
          <Target color="var(--gold)" size={36} />
          <h2>{p.noGoal}</h2>
          <div style={buttonGrid}>
            <button onClick={() => setCurrentPage?.("objectifs")} style={goldButton}>
              <Target size={17} />
              {p.goGoals}
            </button>
            <button onClick={() => setCurrentPage?.("simulateur")} style={greenButton}>
              <Route size={17} />
              {p.goSimulator}
            </button>
          </div>
        </section>
      ) : (
        <>
          <section style={heroCard}>
            <div style={header}>
              <Flag color="var(--gold)" />
              <div>
                <p style={eyebrow}>{p.activeGoal}</p>
                <h2>{focusedGoal.title}</h2>
                <p style={mutedSmall}>{focusedGoal.option || focusedGoal.categoryLabel || focusedGoal.category}</p>
              </div>
            </div>

            <div style={progressBg}>
              <div
                style={{
                  ...progressFill,
                  width: `${progress}%`,
                  background: progress >= 100 ? "var(--green)" : "var(--gold)",
                }}
              />
            </div>

            <div style={statGrid}>
              <Small label={p.progress} value={`${progress}%`} />
              <Small label={p.remaining} value={formatMoney(remaining, currency)} />
              <Small
                label={p.monthly}
                value={
                  Number(focusedGoal.monthlyContribution || 0) > 0
                    ? formatMoney(focusedGoal.monthlyContribution, currency)
                    : "—"
                }
              />
            </div>
          </section>

          {activeGoals.length > 1 && (
            <section style={card}>
              <div style={header}>
                <Target color="var(--blue)" />
                <h2>{p.chooseGoal}</h2>
              </div>
              <div style={goalSwitcher}>
                {activeGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setFocusedGoalId(goal.id)}
                    style={
                      String(goal.id) === String(focusedGoal.id)
                        ? selectedGoalButton
                        : goalButton
                    }
                  >
                    {goal.title}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section style={card}>
            <div style={header}>
              <Route color="var(--green)" />
              <h2>{p.steps}</h2>
            </div>

            <div style={stepList}>
              {ensureSteps(focusedGoal).map((step, index) => (
                <button key={step.id} onClick={() => toggleStep(step.id)} style={stepButton}>
                  <span style={stepIcon}>
                    {step.done ? (
                      <CheckCircle color="var(--green)" />
                    ) : (
                      <Circle color="var(--text-muted)" />
                    )}
                  </span>
                  <div style={{ flex: 1 }}>
                    <strong>
                      {index + 1}. {step.label}
                    </strong>
                    {step.done && <p style={doneText}>✓ Complété</p>}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section style={nextCard}>
            <div style={header}>
              {progress >= 100 ? <Trophy color="var(--green)" /> : <Flag color="var(--gold)" />}
              <div>
                <p style={eyebrow}>{progress >= 100 ? p.completed : p.nextAction}</p>
                <h2>{progress >= 100 ? "🏆" : nextStep}</h2>
                <p style={muted}>{p.historyHint}</p>
              </div>
            </div>
          </section>

          <section style={historyNotice}>
            <History color="var(--gold)" />
            <p style={muted}>{p.historyHint}</p>
          </section>
        </>
      )}
    </div>
  );
}

function ensureSteps(goal) {
  if (Array.isArray(goal?.pathSteps) && goal.pathSteps.length > 0) {
    return goal.pathSteps;
  }

  if (goal?.category === "voyage") {
    return [
      { id: "passport", label: "Passeport / documents", done: false },
      { id: "ticket", label: "Billet", done: false },
      { id: "bags", label: "Bagages", done: false },
      { id: "stay", label: "Séjour et dépenses", done: false },
      { id: "security", label: "Marge de sécurité", done: false },
    ];
  }

  if (goal?.category === "maison") {
    return [
      { id: "plan", label: "Plan du projet", done: false },
      { id: "materials", label: "Matériaux", done: false },
      { id: "work", label: "Travaux", done: false },
      { id: "equipment", label: "Équipement", done: false },
      { id: "finish", label: "Finition", done: false },
    ];
  }

  if (goal?.category === "dette") {
    return [
      { id: "balance", label: "Solde confirmé", done: false },
      { id: "rate", label: "Taux identifié", done: false },
      { id: "payment", label: "Paiement mensuel fixé", done: false },
      { id: "threshold", label: "Premier palier atteint", done: false },
      { id: "zero", label: "Solde à zéro", done: false },
    ];
  }

  return [
    { id: "start", label: "Objectif défini", done: false },
    { id: "plan", label: "Plan de financement", done: false },
    { id: "first", label: "Premier palier", done: false },
    { id: "mid", label: "Milieu du parcours", done: false },
    { id: "victory", label: "Objectif atteint", done: false },
  ];
}

function getProgress(goal) {
  if (!goal) return 0;
  const steps = ensureSteps(goal);
  if (steps.length > 0) {
    return Math.round((steps.filter((step) => step.done).length / steps.length) * 100);
  }

  const target = Number(goal.targetAmount || 0);
  if (target <= 0) return 0;
  return Math.min(100, Math.round((Number(goal.currentAmount || 0) / target) * 100));
}

function getRemaining(goal) {
  if (!goal) return 0;
  if (getProgress(goal) >= 100) return 0;
  return Math.max(0, Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0));
}

function getNextStep(goal) {
  const step = ensureSteps(goal).find((item) => !item.done);
  return step?.label || "Objectif atteint";
}

function Small({ label, value }) {
  return (
    <div style={smallStat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const page = { display: "flex", flexDirection: "column", gap: "16px" };
const card = { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "22px", padding: "18px" };
const heroCard = { ...card, borderColor: "var(--gold)", background: "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-card))" };
const emptyCard = { ...card, borderColor: "var(--gold)", textAlign: "center", display: "grid", gap: "14px", justifyItems: "center" };
const nextCard = { ...card, borderColor: "var(--green)", background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))" };
const historyNotice = { ...card, display: "flex", gap: "10px", alignItems: "center" };
const header = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" };
const eyebrow = { color: "var(--gold)", fontSize: "12px", fontWeight: 900, margin: 0, textTransform: "uppercase" };
const progressBg = { height: "12px", background: "var(--bg-panel)", borderRadius: "999px", overflow: "hidden", marginTop: "14px" };
const progressFill = { height: "100%", borderRadius: "999px" };
const statGrid = { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", marginTop: "14px" };
const smallStat = { background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "14px", padding: "10px", display: "grid", gap: "4px", fontSize: "12px" };
const goalSwitcher = { display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px" };
const goalButton = { border: "1px solid var(--border)", background: "var(--bg-panel)", color: "var(--text-main)", borderRadius: "999px", padding: "10px 12px", whiteSpace: "nowrap", fontWeight: 800 };
const selectedGoalButton = { ...goalButton, borderColor: "var(--gold)", color: "var(--gold)", background: "rgba(212,175,55,.12)" };
const stepList = { display: "grid", gap: "10px" };
const stepButton = { width: "100%", background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "16px", color: "var(--text-main)", padding: "14px", display: "flex", gap: "10px", alignItems: "center", textAlign: "left" };
const stepIcon = { width: "30px", display: "grid", placeItems: "center", flex: "0 0 auto" };
const buttonGrid = { display: "grid", gridTemplateColumns: "1fr", gap: "10px", width: "100%" };
const goldButton = { width: "100%", padding: "14px", borderRadius: "14px", border: "1px solid var(--gold)", background: "rgba(212,175,55,.13)", color: "var(--gold)", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" };
const greenButton = { ...goldButton, borderColor: "var(--green)", color: "var(--green)", background: "rgba(34,197,94,.13)" };
const doneText = { color: "var(--green)", fontSize: "13px", marginTop: "5px", fontWeight: 800 };
const muted = { color: "var(--text-muted)", marginTop: "8px" };
const mutedSmall = { color: "var(--text-muted)", fontSize: "13px", marginTop: "5px" };

export default Parcours;
