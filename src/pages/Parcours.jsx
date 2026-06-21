import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Circle,
  Flag,
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
    completedMessage: "est complété",
    done: "Complété",
    notDone: "À valider",
    tapToValidate: "Touchez une étape pour la valider ou la rouvrir.",
    checkedSteps: "Étapes validées",
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
    completedMessage: "is completed",
    done: "Completed",
    notDone: "To validate",
    tapToValidate: "Tap a step to validate it or reopen it.",
    checkedSteps: "Validated steps",
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
    completedMessage: "está completado",
    done: "Completado",
    notDone: "Por validar",
    tapToValidate: "Toca una etapa para validarla o reabrirla.",
    checkedSteps: "Etapas validadas",
    goGoals: "Mis objetivos",
    goSimulator: "Simular un objetivo",
    historyHint: "Los objetivos terminados estarán visibles en Perfil > Historial.",
  },
};

function Parcours({
  selectedGoals,
  setSelectedGoals,
  settings,
  setCurrentPage,
  addActivity,
}) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];

  const [focusedGoalId, setFocusedGoalId] = useState(null);
  const [justCheckedStepId, setJustCheckedStepId] = useState(null);

  useEffect(() => {
    const storedGoalId = localStorage.getItem("onjaramaPathGoalId");

    if (storedGoalId) {
      setFocusedGoalId(storedGoalId);
      localStorage.removeItem("onjaramaPathGoalId");
    }
  }, []);

  useEffect(() => {
    if (!justCheckedStepId) return;
    const timer = window.setTimeout(() => setJustCheckedStepId(null), 550);
    return () => window.clearTimeout(timer);
  }, [justCheckedStepId]);

  const activeGoals = useMemo(
    () => goals.filter((goal) => getProgress(goal, language) < 100),
    [goals, language]
  );

  const completedGoals = useMemo(
    () => goals.filter((goal) => getProgress(goal, language) >= 100),
    [goals, language]
  );

  const focusedGoal =
    activeGoals.find((goal) => String(goal.id) === String(focusedGoalId)) ||
    activeGoals.find((goal) => goal.highlighted) ||
    activeGoals[0] ||
    completedGoals.find((goal) => String(goal.id) === String(focusedGoalId)) ||
    completedGoals[0];

  const steps = ensureSteps(focusedGoal, language);
  const progress = getProgress(focusedGoal, language);
  const remaining = getRemaining(focusedGoal, language);
  const nextStep = getNextStep(focusedGoal, language);
  const doneCount = steps.filter((step) => step.done).length;

  function toggleStep(stepId) {
    if (!focusedGoal) return;

    setSelectedGoals?.(
      selectedGoals.map((goal) => {
        if (String(goal.id) !== String(focusedGoal.id)) return goal;

        const existingSteps = ensureSteps(goal, language);
        const nextSteps = existingSteps.map((step) =>
          step.id === stepId
            ? {
                ...step,
                done: !step.done,
                completedAt: !step.done ? new Date().toISOString() : null,
              }
            : step
        );

        const nextDoneCount = nextSteps.filter((step) => step.done).length;
        const nextProgress = Math.round((nextDoneCount / nextSteps.length) * 100);
        const completed = nextProgress >= 100;
        const wasCompleted = getProgress(goal, language) >= 100;

        if (completed && !wasCompleted) {
          addActivity?.(
            "victoire",
            p.completed,
            `${goal.title} ${p.completedMessage}.`
          );
        }

        setJustCheckedStepId(stepId);

        return {
          ...goal,
          pathSteps: nextSteps,
          currentAmount: completed
            ? Number(goal.targetAmount || 0)
            : goal.currentAmount,
          completedAt: completed
            ? goal.completedAt || new Date().toISOString()
            : null,
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
                <p style={mutedSmall}>
                  {focusedGoal.option ||
                    focusedGoal.categoryLabel ||
                    focusedGoal.category}
                </p>
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
              <Small label={p.checkedSteps} value={`${doneCount}/${steps.length}`} />
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

          {(activeGoals.length > 1 || completedGoals.length > 1) && (
            <section style={card}>
              <div style={header}>
                <Target color="var(--blue)" />
                <h2>{p.chooseGoal}</h2>
              </div>

              <div style={goalSwitcher}>
                {[...activeGoals, ...completedGoals].map((goal) => (
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
              <div>
                <h2>{p.steps}</h2>
                <p style={mutedSmall}>{p.tapToValidate}</p>
              </div>
            </div>

            <div style={stepList}>
              {steps.map((step, index) => {
                const done = Boolean(step.done);

                return (
                  <button
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    style={{
                      ...stepButton,
                      borderColor: done ? "var(--green)" : "var(--border)",
                      background: done
                        ? "rgba(34,197,94,.12)"
                        : "var(--bg-panel)",
                      transform:
                        justCheckedStepId === step.id ? "scale(.99)" : "scale(1)",
                    }}
                    aria-pressed={done}
                  >
                    <span
                      style={{
                        ...stepIcon,
                        borderColor: done ? "var(--green)" : "var(--border)",
                        background: done ? "rgba(34,197,94,.16)" : "var(--bg-card)",
                      }}
                    >
                      {done ? (
                        <CheckCircle color="var(--green)" size={26} />
                      ) : (
                        <Circle color="var(--text-muted)" size={26} />
                      )}
                    </span>

                    <div style={{ flex: 1 }}>
                      <strong>
                        {index + 1}. {step.label}
                      </strong>
                      <p style={done ? doneText : todoText}>
                        {done ? `✓ ${p.done}` : `○ ${p.notDone}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section style={nextCard}>
            <div style={header}>
              {progress >= 100 ? (
                <Trophy color="var(--green)" />
              ) : (
                <Flag color="var(--gold)" />
              )}

              <div>
                <p style={eyebrow}>
                  {progress >= 100 ? p.completed : p.nextAction}
                </p>
                <h2>{progress >= 100 ? p.completed : nextStep}</h2>
                <p style={muted}>{p.historyHint}</p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function getDefaultSteps(language) {
  const labels = {
    FR: {
      voyage: [
        "Passeport / documents",
        "Billet",
        "Bagages",
        "Séjour et dépenses",
        "Marge de sécurité",
      ],
      maison: [
        "Terrain",
        "Fondation",
        "Murs",
        "Toiture",
        "Électricité",
        "Finition",
      ],
      auto: [
        "Véhicule choisi",
        "Mise de fonds",
        "Financement",
        "Assurance",
        "Achat",
      ],
      dette: [
        "Solde confirmé",
        "Taux identifié",
        "Paiement mensuel fixé",
        "Premier palier atteint",
        "Solde à zéro",
      ],
      epargne: [
        "Compte séparé",
        "Premier dépôt",
        "3 mois",
        "6 mois",
        "12 mois",
      ],
      business: [
        "Idée clarifiée",
        "Budget minimum",
        "Matériel ou formation",
        "Premier lancement",
        "Projet opérationnel",
      ],
      libre: [
        "Objectif défini",
        "Plan de financement",
        "Premier palier",
        "Milieu du parcours",
        "Objectif atteint",
      ],
    },
    EN: {
      voyage: [
        "Passport / documents",
        "Ticket",
        "Bags",
        "Stay and expenses",
        "Safety margin",
      ],
      maison: ["Land", "Foundation", "Walls", "Roof", "Electricity", "Finishing"],
      auto: ["Vehicle chosen", "Down payment", "Financing", "Insurance", "Purchase"],
      dette: [
        "Balance confirmed",
        "Rate identified",
        "Monthly payment set",
        "First milestone reached",
        "Zero balance",
      ],
      epargne: [
        "Separate account",
        "First deposit",
        "3 months",
        "6 months",
        "12 months",
      ],
      business: [
        "Idea clarified",
        "Minimum budget",
        "Equipment or training",
        "First launch",
        "Project operating",
      ],
      libre: [
        "Goal defined",
        "Funding plan",
        "First milestone",
        "Mid-path",
        "Goal reached",
      ],
    },
    ES: {
      voyage: [
        "Pasaporte / documentos",
        "Boleto",
        "Equipaje",
        "Estadía y gastos",
        "Margen de seguridad",
      ],
      maison: [
        "Terreno",
        "Fundación",
        "Muros",
        "Techo",
        "Electricidad",
        "Finalización",
      ],
      auto: [
        "Vehículo elegido",
        "Pago inicial",
        "Financiamiento",
        "Seguro",
        "Compra",
      ],
      dette: [
        "Saldo confirmado",
        "Tasa identificada",
        "Pago mensual fijado",
        "Primer hito alcanzado",
        "Saldo en cero",
      ],
      epargne: [
        "Cuenta separada",
        "Primer depósito",
        "3 meses",
        "6 meses",
        "12 meses",
      ],
      business: [
        "Idea aclarada",
        "Presupuesto mínimo",
        "Material o formación",
        "Primer lanzamiento",
        "Proyecto operativo",
      ],
      libre: [
        "Objetivo definido",
        "Plan de financiación",
        "Primer hito",
        "Mitad del recorrido",
        "Objetivo alcanzado",
      ],
    },
  };

  return labels[language] || labels.FR;
}

function normalizeCategory(category) {
  if (["voyage", "travel", "trip"].includes(category)) return "voyage";
  if (["maison", "home", "house", "hypotheque", "mortgage"].includes(category)) {
    return "maison";
  }
  if (["auto", "car"].includes(category)) return "auto";
  if (["dette", "debt"].includes(category)) return "dette";
  if (["epargne", "savings", "ahorro"].includes(category)) return "epargne";
  if (["business", "project", "projet"].includes(category)) return "business";
  return "libre";
}

function ensureSteps(goal, language = "FR") {
  if (Array.isArray(goal?.pathSteps) && goal.pathSteps.length > 0) {
    return goal.pathSteps.map((step, index) => ({
      id: step.id || `step-${index + 1}`,
      label: step.label || step.title || `Étape ${index + 1}`,
      done: Boolean(step.done),
      completedAt: step.completedAt || null,
    }));
  }

  const labels = getDefaultSteps(language);
  const category = normalizeCategory(goal?.category);

  const ids = {
    voyage: ["passport", "ticket", "bags", "stay", "security"],
    maison: ["land", "foundation", "walls", "roof", "electricity", "finish"],
    auto: ["vehicle", "downpayment", "financing", "insurance", "purchase"],
    dette: ["balance", "rate", "payment", "threshold", "zero"],
    epargne: ["account", "first", "three", "six", "twelve"],
    business: ["idea", "budget", "equipment", "launch", "operating"],
    libre: ["start", "plan", "first", "mid", "victory"],
  };

  return labels[category].map((label, index) => ({
    id: ids[category][index] || `step-${index + 1}`,
    label,
    done: false,
    completedAt: null,
  }));
}

function getProgress(goal, language = "FR") {
  if (!goal) return 0;

  const steps = ensureSteps(goal, language);

  if (steps.length > 0) {
    return Math.round((steps.filter((step) => step.done).length / steps.length) * 100);
  }

  const target = Number(goal.targetAmount || 0);
  if (target <= 0) return 0;

  return Math.min(
    100,
    Math.round((Number(goal.currentAmount || 0) / target) * 100)
  );
}

function getRemaining(goal, language = "FR") {
  if (!goal) return 0;
  if (getProgress(goal, language) >= 100) return 0;

  return Math.max(
    0,
    Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0)
  );
}

function getNextStep(goal, language = "FR") {
  const step = ensureSteps(goal, language).find((item) => !item.done);

  const fallback =
    language === "EN"
      ? "Goal reached"
      : language === "ES"
        ? "Objetivo alcanzado"
        : "Objectif atteint";

  return step?.label || fallback;
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

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "18px",
};

const heroCard = {
  ...card,
  borderColor: "var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-card))",
};

const emptyCard = {
  ...card,
  borderColor: "var(--gold)",
  textAlign: "center",
  display: "grid",
  gap: "14px",
  justifyItems: "center",
};

const nextCard = {
  ...card,
  borderColor: "var(--green)",
  background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
};

const eyebrow = {
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: 900,
  margin: 0,
  textTransform: "uppercase",
};

const progressBg = {
  height: "12px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  overflow: "hidden",
  marginTop: "14px",
};

const progressFill = {
  height: "100%",
  borderRadius: "999px",
};

const statGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px",
  marginTop: "14px",
};

const smallStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "10px",
  display: "grid",
  gap: "4px",
  fontSize: "12px",
};

const goalSwitcher = {
  display: "flex",
  gap: "8px",
  overflowX: "auto",
  paddingBottom: "2px",
};

const goalButton = {
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  borderRadius: "999px",
  padding: "10px 12px",
  whiteSpace: "nowrap",
  fontWeight: 800,
};

const selectedGoalButton = {
  ...goalButton,
  borderColor: "var(--gold)",
  color: "var(--gold)",
  background: "rgba(212,175,55,.12)",
};

const stepList = {
  display: "grid",
  gap: "10px",
};

const stepButton = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  color: "var(--text-main)",
  padding: "14px",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  textAlign: "left",
  transition: "transform .12s ease, border-color .12s ease, background .12s ease",
};

const stepIcon = {
  width: "42px",
  height: "42px",
  borderRadius: "999px",
  border: "1px solid var(--border)",
  display: "grid",
  placeItems: "center",
  flex: "0 0 auto",
};

const buttonGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "10px",
  width: "100%",
};

const goldButton = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.13)",
  color: "var(--gold)",
  fontWeight: 900,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const greenButton = {
  ...goldButton,
  borderColor: "var(--green)",
  color: "var(--green)",
  background: "rgba(34,197,94,.13)",
};

const doneText = {
  color: "var(--green)",
  fontSize: "13px",
  marginTop: "5px",
  fontWeight: 800,
};

const todoText = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "5px",
  fontWeight: 800,
};

const muted = { color: "var(--text-muted)", marginTop: "8px" };

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "5px",
};

export default Parcours;