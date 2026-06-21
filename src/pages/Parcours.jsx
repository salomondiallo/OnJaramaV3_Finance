import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle,
  Circle,
  Clock3,
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
    subtitle: "Un objectif actif, des étapes universelles et une progression visible.",
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
    created: "Objectif créé",
    ago: "il y a",
    targetDate: "Date cible",
    noDate: "Date cible non définie",
    timeLeft: "Temps restant",
    daysLeft: "jours restants",
    monthsLeft: "mois restants",
    ahead: "En avance",
    onTrack: "Dans la cible",
    late: "En retard",
    smartStatus: "Statut intelligent",
  },
  EN: {
    title: "Path",
    subtitle: "One active goal, universal steps and visible progress.",
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
    created: "Goal created",
    ago: "ago",
    targetDate: "Target date",
    noDate: "No target date",
    timeLeft: "Time left",
    daysLeft: "days left",
    monthsLeft: "months left",
    ahead: "Ahead",
    onTrack: "On track",
    late: "Late",
    smartStatus: "Smart status",
  },
  ES: {
    title: "Recorrido",
    subtitle: "Un objetivo activo, etapas universales y progreso visible.",
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
    created: "Objetivo creado",
    ago: "hace",
    targetDate: "Fecha objetivo",
    noDate: "Fecha objetivo no definida",
    timeLeft: "Tiempo restante",
    daysLeft: "días restantes",
    monthsLeft: "meses restantes",
    ahead: "Adelantado",
    onTrack: "En camino",
    late: "Atrasado",
    smartStatus: "Estado inteligente",
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
  const targetDate = getGoalDate(focusedGoal);
  const smartStatus = getSmartGoalStatus(focusedGoal, progress, p);
  const createdLabel = getCreatedLabel(focusedGoal, p);
  const timeLeftLabel = getTimeLeftLabel(targetDate, p);

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
          updatedAt: new Date().toISOString(),
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
          <section style={{ ...heroCard, borderColor: smartStatus.color }}>
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

            {createdLabel && (
              <div style={createdBox}>
                <Clock3 size={16} color="var(--gold)" />
                <span>
                  🚩 {p.created} {createdLabel}
                </span>
              </div>
            )}

            <div style={progressBg}>
              <div
                style={{
                  ...progressFill,
                  width: `${progress}%`,
                  background: progress >= 100 ? "var(--green)" : smartStatus.color,
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
              <Small label={p.targetDate} value={formatDisplayDate(targetDate, p)} />
              <Small label={p.timeLeft} value={timeLeftLabel} />
              <Small label={p.smartStatus} value={smartStatus.label} />
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

          <section style={statusCard(smartStatus)}>
            <div style={header}>
              <AlertTriangle color={smartStatus.color} />
              <div>
                <p style={eyebrow}>{p.smartStatus}</p>
                <h2>{smartStatus.label}</h2>
                <p style={mutedSmall}>
                  {p.targetDate} : {formatDisplayDate(targetDate, p)}
                </p>
              </div>
            </div>
          </section>

          <section style={card}>
            <div style={header}>
              <Route color="var(--green)" />
              <div>
                <h2>{p.steps}</h2>
                <p style={mutedSmall}>{p.tapToValidate}</p>
              </div>
            </div>

            <div style={stepProgressBox}>
              <CheckCircle size={18} color="var(--green)" />
              <strong>
                {doneCount}/{steps.length} {p.checkedSteps}
              </strong>
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
                <CalendarDays color="var(--gold)" />
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
        "Budget défini",
        "Destination confirmée",
        "Documents vérifiés",
        "Transport planifié",
        "Dépenses principales prévues",
        "Marge de sécurité",
      ],
      maison: [
        "Budget défini",
        "Type de projet choisi",
        "Priorités confirmées",
        "Plan de financement",
        "Étapes principales validées",
        "Marge de sécurité",
      ],
      auto: [
        "Budget défini",
        "Type de véhicule choisi",
        "Coûts récurrents estimés",
        "Financement préparé",
        "Achat ou réparation planifié",
        "Marge de sécurité",
      ],
      dette: [
        "Solde confirmé",
        "Taux identifié",
        "Paiement minimum connu",
        "Montant extra défini",
        "Premier palier atteint",
        "Solde à zéro",
      ],
      urgence: [
        "Objectif défini",
        "Compte ou enveloppe choisi",
        "Premier dépôt effectué",
        "Palier intermédiaire atteint",
        "Objectif principal atteint",
        "Réserve stabilisée",
      ],
      epargne: [
        "Objectif défini",
        "Compte ou enveloppe choisi",
        "Premier dépôt effectué",
        "Palier intermédiaire atteint",
        "Objectif principal atteint",
        "Réserve stabilisée",
      ],
      famille: [
        "Besoin défini",
        "Budget estimé",
        "Priorité confirmée",
        "Plan de contribution",
        "Étape principale réalisée",
        "Marge de sécurité",
      ],
      liberte: [
        "Situation clarifiée",
        "Dettes priorisées",
        "Fonds de sécurité lancé",
        "Épargne régulière activée",
        "Plan long terme défini",
        "Progression stabilisée",
      ],
      business: [
        "Idée clarifiée",
        "Budget estimé",
        "Priorités choisies",
        "Plan d’action préparé",
        "Première étape lancée",
        "Projet stabilisé",
      ],
      libre: [
        "Objectif défini",
        "Montant cible choisi",
        "Date cible fixée",
        "Plan de contribution",
        "Premier palier atteint",
        "Objectif atteint",
      ],
    },
    EN: {
      voyage: [
        "Budget defined",
        "Destination confirmed",
        "Documents checked",
        "Transport planned",
        "Main expenses planned",
        "Safety margin",
      ],
      maison: [
        "Budget defined",
        "Project type chosen",
        "Priorities confirmed",
        "Funding plan",
        "Main steps validated",
        "Safety margin",
      ],
      auto: [
        "Budget defined",
        "Vehicle type chosen",
        "Recurring costs estimated",
        "Financing prepared",
        "Purchase or repair planned",
        "Safety margin",
      ],
      dette: [
        "Balance confirmed",
        "Rate identified",
        "Minimum payment known",
        "Extra amount defined",
        "First milestone reached",
        "Zero balance",
      ],
      urgence: [
        "Goal defined",
        "Account or envelope chosen",
        "First deposit made",
        "Intermediate milestone reached",
        "Main goal reached",
        "Reserve stabilized",
      ],
      epargne: [
        "Goal defined",
        "Account or envelope chosen",
        "First deposit made",
        "Intermediate milestone reached",
        "Main goal reached",
        "Reserve stabilized",
      ],
      famille: [
        "Need defined",
        "Budget estimated",
        "Priority confirmed",
        "Contribution plan",
        "Main step completed",
        "Safety margin",
      ],
      liberte: [
        "Situation clarified",
        "Debts prioritized",
        "Security fund started",
        "Regular savings activated",
        "Long-term plan defined",
        "Progress stabilized",
      ],
      business: [
        "Idea clarified",
        "Budget estimated",
        "Priorities chosen",
        "Action plan prepared",
        "First step launched",
        "Project stabilized",
      ],
      libre: [
        "Goal defined",
        "Target amount chosen",
        "Target date set",
        "Contribution plan",
        "First milestone reached",
        "Goal reached",
      ],
    },
    ES: {
      voyage: [
        "Presupuesto definido",
        "Destino confirmado",
        "Documentos verificados",
        "Transporte planificado",
        "Gastos principales previstos",
        "Margen de seguridad",
      ],
      maison: [
        "Presupuesto definido",
        "Tipo de proyecto elegido",
        "Prioridades confirmadas",
        "Plan de financiación",
        "Etapas principales validadas",
        "Margen de seguridad",
      ],
      auto: [
        "Presupuesto definido",
        "Tipo de vehículo elegido",
        "Costos recurrentes estimados",
        "Financiación preparada",
        "Compra o reparación planificada",
        "Margen de seguridad",
      ],
      dette: [
        "Saldo confirmado",
        "Tasa identificada",
        "Pago mínimo conocido",
        "Monto extra definido",
        "Primer hito alcanzado",
        "Saldo en cero",
      ],
      urgence: [
        "Objetivo definido",
        "Cuenta o sobre elegido",
        "Primer depósito realizado",
        "Hito intermedio alcanzado",
        "Objetivo principal alcanzado",
        "Reserva estabilizada",
      ],
      epargne: [
        "Objetivo definido",
        "Cuenta o sobre elegido",
        "Primer depósito realizado",
        "Hito intermedio alcanzado",
        "Objetivo principal alcanzado",
        "Reserva estabilizada",
      ],
      famille: [
        "Necesidad definida",
        "Presupuesto estimado",
        "Prioridad confirmada",
        "Plan de contribución",
        "Etapa principal realizada",
        "Margen de seguridad",
      ],
      liberte: [
        "Situación clarificada",
        "Deudas priorizadas",
        "Fondo de seguridad iniciado",
        "Ahorro regular activado",
        "Plan a largo plazo definido",
        "Progreso estabilizado",
      ],
      business: [
        "Idea aclarada",
        "Presupuesto estimado",
        "Prioridades elegidas",
        "Plan de acción preparado",
        "Primera etapa lanzada",
        "Proyecto estabilizado",
      ],
      libre: [
        "Objetivo definido",
        "Monto objetivo elegido",
        "Fecha objetivo fijada",
        "Plan de contribución",
        "Primer hito alcanzado",
        "Objetivo alcanzado",
      ],
    },
  };

  return labels[language] || labels.FR;
}

function normalizeCategory(category) {
  const value = String(category || "").toLowerCase();

  if (["voyage", "travel", "trip"].includes(value)) return "voyage";
  if (["maison", "home", "house", "hypotheque", "mortgage"].includes(value)) {
    return "maison";
  }
  if (["auto", "car"].includes(value)) return "auto";
  if (["dette", "debt"].includes(value)) return "dette";
  if (["urgence", "emergency", "emergencyfund", "fondsurgence"].includes(value)) {
    return "urgence";
  }
  if (["epargne", "savings", "ahorro"].includes(value)) return "epargne";
  if (["famille", "family"].includes(value)) return "famille";
  if (["liberte", "freedom", "financialfreedom", "libertefinanciere"].includes(value)) {
    return "liberte";
  }
  if (["business", "project", "projet"].includes(value)) return "business";

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
  const category = normalizeCategory(goal?.category || goal?.id);

  const ids = {
    voyage: ["budget", "destination", "documents", "transport", "expenses", "security"],
    maison: ["budget", "type", "priorities", "funding", "mainsteps", "security"],
    auto: ["budget", "vehicle", "costs", "financing", "purchase", "security"],
    dette: ["balance", "rate", "minimum", "extra", "threshold", "zero"],
    urgence: ["goal", "account", "deposit", "milestone", "main", "stable"],
    epargne: ["goal", "account", "deposit", "milestone", "main", "stable"],
    famille: ["need", "budget", "priority", "contribution", "main", "security"],
    liberte: ["situation", "debts", "fund", "savings", "longterm", "stable"],
    business: ["idea", "budget", "priorities", "plan", "launch", "stable"],
    libre: ["goal", "amount", "date", "plan", "milestone", "victory"],
  };

  const selectedLabels = labels[category] || labels.libre;
  const selectedIds = ids[category] || ids.libre;

  return selectedLabels.map((label, index) => ({
    id: selectedIds[index] || `step-${index + 1}`,
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

function getGoalDate(goal) {
  return goal?.targetDate || goal?.deadline || goal?.endDate || "";
}

function getDaysUntil(dateValue) {
  if (!dateValue) return null;

  const today = new Date();
  const target = new Date(`${dateValue}T12:00:00`);

  if (Number.isNaN(target.getTime())) return null;

  today.setHours(12, 0, 0, 0);

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function getTimeLeftLabel(dateValue, text) {
  const daysLeft = getDaysUntil(dateValue);

  if (daysLeft === null) return text.noDate;
  if (daysLeft < 0) return text.late;
  if (daysLeft === 0) return `0 ${text.daysLeft}`;
  if (daysLeft < 60) return `${daysLeft} ${text.daysLeft}`;

  return `${Math.ceil(daysLeft / 30)} ${text.monthsLeft}`;
}

function getSmartGoalStatus(goal, progress, text) {
  const targetDate = getGoalDate(goal);
  const daysLeft = getDaysUntil(targetDate);

  if (progress >= 100) {
    return {
      key: "completed",
      label: text.completed,
      color: "var(--green)",
      background: "rgba(34,197,94,.12)",
    };
  }

  if (daysLeft === null) {
    return {
      key: "onTrack",
      label: text.onTrack,
      color: "var(--gold)",
      background: "rgba(212,175,55,.12)",
    };
  }

  if (daysLeft < 0) {
    return {
      key: "late",
      label: text.late,
      color: "var(--red)",
      background: "rgba(239,68,68,.12)",
    };
  }

  if (progress >= 65 && daysLeft > 60) {
    return {
      key: "ahead",
      label: text.ahead,
      color: "var(--green)",
      background: "rgba(34,197,94,.12)",
    };
  }

  if (progress < 25 && daysLeft < 30) {
    return {
      key: "late",
      label: text.late,
      color: "var(--red)",
      background: "rgba(239,68,68,.12)",
    };
  }

  return {
    key: "onTrack",
    label: text.onTrack,
    color: "var(--gold)",
    background: "rgba(212,175,55,.12)",
  };
}

function getCreatedLabel(goal, text) {
  const startedAt = goal?.startedAt || goal?.createdAt || goal?.activatedAt;

  if (!startedAt) return "";

  const started = new Date(startedAt);
  const today = new Date();

  if (Number.isNaN(started.getTime())) return "";

  const diffDays = Math.max(
    0,
    Math.floor((today.getTime() - started.getTime()) / (1000 * 60 * 60 * 24))
  );

  if (diffDays < 30) {
    return `${text.ago} ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  }

  const months = Math.floor(diffDays / 30);
  return `${text.ago} ${months} mois`;
}

function formatDisplayDate(value, text) {
  if (!value) return text.noDate;

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) return text.noDate;

  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

const statusCard = (status) => ({
  ...card,
  borderColor: status.color,
  background: `linear-gradient(135deg, ${status.background}, var(--bg-card))`,
});

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

const createdBox = {
  marginTop: "10px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  borderRadius: "14px",
  padding: "9px 10px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "var(--text-main)",
  fontSize: "13px",
  fontWeight: "800",
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

const stepProgressBox = {
  border: "1px solid var(--green)",
  background: "rgba(34,197,94,.10)",
  borderRadius: "14px",
  padding: "10px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "var(--green)",
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