import { useMemo } from "react";
import {
  AlertTriangle,
  Car,
  CheckCircle,
  ChevronRight,
  Clock3,
  CreditCard,
  Home,
  PiggyBank,
  Plane,
  Route,
  Target,
  Trophy,
  Users,
  Briefcase,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    title: "Mes objectifs",
    subtitle:
      "Choisissez une destination universelle, simulez le chemin, puis activez seulement si le plan vous convient.",
    available: "Objectifs disponibles",
    active: "Objectifs actifs",
    completed: "Objectifs terminés",
    noActive: "Aucun objectif actif pour le moment.",
    noCompleted: "Aucun objectif terminé pour le moment.",
    simulate: "Simuler",
    continuePath: "Continuer le parcours",
    statusInactive: "Non activé",
    statusActive: "Actif",
    statusCompleted: "Terminé",
    progress: "Progression",
    remaining: "Reste",
    target: "Objectif",
    current: "Actuel",
    steps: "Étapes",
    flowTitle: "Flux V17.1",
    flowText:
      "Objectif → Simulation → Activation → Parcours → Progression → Réussite.",
    smartGoals: "Objectifs intelligents",
    smartStatus: "Statut intelligent",
    ahead: "En avance",
    onTrack: "Dans la cible",
    late: "En retard",
    noDate: "Date cible non définie",
    targetDate: "Date cible",
    timeLeft: "Temps restant",
    monthsLeft: "mois restants",
    daysLeft: "jours restants",
    started: "Objectif créé",
    ago: "il y a",
    recommendedAction: "Action recommandée",
    recommendationDefault:
      "Simulez cet objectif pour obtenir une recommandation plus précise.",
    recommendationMonthly: "Pour atteindre cet objectif à temps, prévoyez environ",
    perMonth: "/mois",
  },
  EN: {
    title: "My goals",
    subtitle:
      "Choose a universal destination, simulate the path, then activate it only if the plan works for you.",
    available: "Available goals",
    active: "Active goals",
    completed: "Completed goals",
    noActive: "No active goal yet.",
    noCompleted: "No completed goal yet.",
    simulate: "Simulate",
    continuePath: "Continue path",
    statusInactive: "Not activated",
    statusActive: "Active",
    statusCompleted: "Completed",
    progress: "Progress",
    remaining: "Remaining",
    target: "Target",
    current: "Current",
    steps: "Steps",
    flowTitle: "V17.1 flow",
    flowText: "Goal → Simulation → Activation → Path → Progress → Success.",
    smartGoals: "Smart goals",
    smartStatus: "Smart status",
    ahead: "Ahead",
    onTrack: "On track",
    late: "Late",
    noDate: "No target date",
    targetDate: "Target date",
    timeLeft: "Time left",
    monthsLeft: "months left",
    daysLeft: "days left",
    started: "Goal created",
    ago: "ago",
    recommendedAction: "Recommended action",
    recommendationDefault:
      "Simulate this goal to get a more precise recommendation.",
    recommendationMonthly: "To reach this goal on time, plan around",
    perMonth: "/month",
  },
  ES: {
    title: "Mis objetivos",
    subtitle:
      "Elige una meta universal, simula el camino y actívala solo si el plan te conviene.",
    available: "Objetivos disponibles",
    active: "Objetivos activos",
    completed: "Objetivos terminados",
    noActive: "No hay objetivo activo por ahora.",
    noCompleted: "No hay objetivo terminado por ahora.",
    simulate: "Simular",
    continuePath: "Continuar recorrido",
    statusInactive: "No activado",
    statusActive: "Activo",
    statusCompleted: "Terminado",
    progress: "Progreso",
    remaining: "Restante",
    target: "Objetivo",
    current: "Actual",
    steps: "Etapas",
    flowTitle: "Flujo V17.1",
    flowText: "Objetivo → Simulación → Activación → Recorrido → Progreso → Éxito.",
    smartGoals: "Objetivos inteligentes",
    smartStatus: "Estado inteligente",
    ahead: "Adelantado",
    onTrack: "En camino",
    late: "Atrasado",
    noDate: "Fecha objetivo no definida",
    targetDate: "Fecha objetivo",
    timeLeft: "Tiempo restante",
    monthsLeft: "meses restantes",
    daysLeft: "días restantes",
    started: "Objetivo creado",
    ago: "hace",
    recommendedAction: "Acción recomendada",
    recommendationDefault:
      "Simula este objetivo para obtener una recomendación más precisa.",
    recommendationMonthly: "Para alcanzar este objetivo a tiempo, reserva cerca de",
    perMonth: "/mes",
  },
};

function getGoalCatalog(language) {
  const catalogText = {
    FR: {
      voyage: ["Voyage", "Préparer un déplacement, un séjour ou un retour important."],
      maison: ["Maison", "Achat, rénovation, construction, terrain ou amélioration."],
      auto: ["Auto", "Achat, réparation, remplacement ou mise de fonds."],
      dette: ["Dette", "Carte, prêt personnel, marge ou remboursement prioritaire."],
      urgence: ["Fonds d’urgence", "Construire une réserve pour les imprévus."],
      epargne: ["Épargne", "Mettre de côté pour un projet ou une sécurité."],
      famille: ["Famille", "Soutien, événement, école ou besoin important."],
      liberte: ["Liberté financière", "Réduire la pression et bâtir une base durable."],
      business: ["Projet personnel", "Formation, lancement, matériel ou projet libre."],
      libre: ["Objectif libre", "Un objectif totalement personnalisé."],
    },
    EN: {
      voyage: ["Travel", "Prepare a trip, stay or important return."],
      maison: ["Home", "Purchase, renovation, construction, land or improvement."],
      auto: ["Car", "Purchase, repair, replacement or down payment."],
      dette: ["Debt", "Card, personal loan, credit line or priority repayment."],
      urgence: ["Emergency fund", "Build a reserve for unexpected events."],
      epargne: ["Savings", "Set money aside for a project or security."],
      famille: ["Family", "Support, event, school or important need."],
      liberte: ["Financial freedom", "Reduce pressure and build a durable base."],
      business: ["Personal project", "Training, launch, equipment or open project."],
      libre: ["Custom goal", "A fully personalized goal."],
    },
    ES: {
      voyage: ["Viaje", "Preparar un viaje, estancia o regreso importante."],
      maison: ["Casa", "Compra, renovación, construcción, terreno o mejora."],
      auto: ["Auto", "Compra, reparación, reemplazo o pago inicial."],
      dette: ["Deuda", "Tarjeta, préstamo personal, línea de crédito o pago prioritario."],
      urgence: ["Fondo de emergencia", "Crear una reserva para imprevistos."],
      epargne: ["Ahorro", "Ahorrar para un proyecto o seguridad."],
      famille: ["Familia", "Apoyo, evento, escuela o necesidad importante."],
      liberte: ["Libertad financiera", "Reducir presión y construir una base durable."],
      business: ["Proyecto personal", "Formación, lanzamiento, material o proyecto libre."],
      libre: ["Objetivo libre", "Un objetivo totalmente personalizado."],
    },
  };

  const text = catalogText[language] || catalogText.FR;

  return [
    {
      id: "voyage",
      title: text.voyage[0],
      subtitle: text.voyage[1],
      icon: <Plane />,
      color: "var(--gold)",
      defaultAmount: 3500,
      defaultMonthly: 500,
    },
    {
      id: "maison",
      title: text.maison[0],
      subtitle: text.maison[1],
      icon: <Home />,
      color: "var(--green)",
      defaultAmount: 10000,
      defaultMonthly: 700,
    },
    {
      id: "auto",
      title: text.auto[0],
      subtitle: text.auto[1],
      icon: <Car />,
      color: "var(--blue)",
      defaultAmount: 8000,
      defaultMonthly: 450,
    },
    {
      id: "dette",
      title: text.dette[0],
      subtitle: text.dette[1],
      icon: <CreditCard />,
      color: "var(--red)",
      defaultAmount: 5000,
      defaultMonthly: 500,
    },
    {
      id: "urgence",
      title: text.urgence[0],
      subtitle: text.urgence[1],
      icon: <ShieldCheck />,
      color: "var(--green)",
      defaultAmount: 2500,
      defaultMonthly: 250,
    },
    {
      id: "epargne",
      title: text.epargne[0],
      subtitle: text.epargne[1],
      icon: <PiggyBank />,
      color: "var(--green)",
      defaultAmount: 3000,
      defaultMonthly: 250,
    },
    {
      id: "famille",
      title: text.famille[0],
      subtitle: text.famille[1],
      icon: <Users />,
      color: "var(--purple)",
      defaultAmount: 2500,
      defaultMonthly: 300,
    },
    {
      id: "liberte",
      title: text.liberte[0],
      subtitle: text.liberte[1],
      icon: <TrendingUp />,
      color: "var(--gold)",
      defaultAmount: 10000,
      defaultMonthly: 600,
    },
    {
      id: "business",
      title: text.business[0],
      subtitle: text.business[1],
      icon: <Briefcase />,
      color: "var(--blue)",
      defaultAmount: 4000,
      defaultMonthly: 350,
    },
    {
      id: "libre",
      title: text.libre[0],
      subtitle: text.libre[1],
      icon: <Target />,
      color: "var(--gold)",
      defaultAmount: 1000,
      defaultMonthly: 150,
    },
  ];
}

function Objectifs({ selectedGoals, settings, setCurrentPage }) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";
  const goals = Array.isArray(selectedGoals) ? selectedGoals : [];
  const goalCatalog = getGoalCatalog(language);

  const activeGoals = useMemo(
    () =>
      goals
        .filter((goal) => !goal.archived)
        .filter((goal) => getGoalProgress(goal) < 100),
    [goals]
  );

  const completedGoals = useMemo(
    () =>
      goals
        .filter((goal) => !goal.archived)
        .filter((goal) => getGoalProgress(goal) >= 100),
    [goals]
  );

  function simulateTemplate(template) {
    localStorage.setItem(
      "onjaramaGoalToSimulate",
      JSON.stringify({
        id: template.id,
        title: template.title,
        subtitle: template.subtitle,
        defaultAmount: template.defaultAmount,
        defaultMonthly: template.defaultMonthly,
        startedAt: new Date().toISOString(),
      })
    );

    setCurrentPage?.("simulateur");
  }

  function openPath(goalId) {
    if (goalId) {
      localStorage.setItem("onjaramaPathGoalId", String(goalId));
    }

    setCurrentPage?.("parcours");
  }

  return (
    <div className="native-page" style={page}>
      <h1>{t.objectifs || p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={flowCard}>
        <Route color="var(--gold)" />
        <div>
          <h2>{p.flowTitle}</h2>
          <p style={muted}>{p.flowText}</p>
        </div>
      </section>

      <section style={smartCard}>
        <div style={header}>
          <Zap color="var(--gold)" />
          <div>
            <h2>{p.smartGoals}</h2>
            <p style={mutedSmall}>
              {activeGoals.length > 0
                ? getTopRecommendation(activeGoals, p, currency)
                : p.recommendationDefault}
            </p>
          </div>
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <div>
            <h2>{p.available}</h2>
            <p style={mutedSmall}>{p.statusInactive}</p>
          </div>
        </div>

        <div style={catalogGrid}>
          {goalCatalog.map((template) => (
            <button
              key={template.id}
              onClick={() => simulateTemplate(template)}
              style={{ ...catalogTile, borderColor: template.color }}
            >
              <span style={{ ...iconBox, color: template.color }}>
                {template.icon}
              </span>

              <div>
                <strong>{template.title}</strong>
                <p style={mutedSmall}>{template.subtitle}</p>
              </div>

              <span style={{ ...statusPill, color: template.color }}>
                {p.simulate}
                <ChevronRight size={16} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Trophy color="var(--green)" />
          <div>
            <h2>{p.active}</h2>
            <p style={mutedSmall}>{p.statusActive}</p>
          </div>
        </div>

        {activeGoals.length === 0 ? (
          <EmptyMessage text={p.noActive} />
        ) : (
          <div style={goalList}>
            {activeGoals.map((goal) => (
              <GoalRow
                key={goal.id}
                goal={goal}
                currency={currency}
                text={p}
                onOpen={() => openPath(goal.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section style={card}>
        <div style={header}>
          <CheckCircle color="var(--gold)" />
          <div>
            <h2>{p.completed}</h2>
            <p style={mutedSmall}>{p.statusCompleted}</p>
          </div>
        </div>

        {completedGoals.length === 0 ? (
          <EmptyMessage text={p.noCompleted} />
        ) : (
          <div style={goalList}>
            {completedGoals.map((goal) => (
              <GoalRow
                key={goal.id}
                goal={goal}
                currency={currency}
                text={p}
                onOpen={() => openPath(goal.id)}
                completed
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function GoalRow({ goal, currency, text, onOpen, completed = false }) {
  const progress = getGoalProgress(goal);
  const remaining = Math.max(
    0,
    Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0)
  );
  const steps = Array.isArray(goal.pathSteps) ? goal.pathSteps : [];
  const doneSteps = steps.filter((step) => step.done).length;
  const smartStatus = getSmartGoalStatus(goal, progress, text);
  const targetDate = goal.targetDate || goal.deadline || goal.endDate || "";
  const monthlyNeed = getMonthlyNeed(goal);
  const startedLabel = getStartedLabel(goal, text);

  return (
    <div style={{ ...goalRow, borderColor: smartStatus.color }}>
      <div style={goalRowTop}>
        <div>
          <strong>
            {completed ? "✓ " : ""}
            {goal.title}
          </strong>
          <p style={mutedSmall}>
            {goal.option || goal.categoryLabel || goal.category || text.smartGoals}
          </p>
        </div>

        <span
          style={{
            ...activePill,
            borderColor: completed ? "var(--green)" : smartStatus.color,
            color: completed ? "var(--green)" : smartStatus.color,
            background: completed
              ? "rgba(34,197,94,.12)"
              : smartStatus.background,
          }}
        >
          {completed ? text.statusCompleted : smartStatus.label}
        </span>
      </div>

      {startedLabel && (
        <div style={startedBox}>
          <Clock3 size={16} color="var(--gold)" />
          <span>
            🚩 {text.started} {startedLabel}
          </span>
        </div>
      )}

      <div style={progressBg}>
        <div
          style={{
            ...progressFill,
            width: `${progress}%`,
            background: completed ? "var(--green)" : smartStatus.color,
          }}
        />
      </div>

      <div style={miniStats}>
        <Small label={text.progress} value={`${progress}%`} />
        <Small
          label={text.current}
          value={formatMoney(goal.currentAmount || 0, currency)}
        />
        <Small label={text.remaining} value={formatMoney(remaining, currency)} />
        <Small
          label={text.target}
          value={formatMoney(goal.targetAmount || 0, currency)}
        />
        <Small label={text.targetDate} value={formatDisplayDate(targetDate, text)} />
        <Small label={text.timeLeft} value={getTimeLeftLabel(targetDate, text)} />
        <Small label={text.steps} value={`${doneSteps}/${steps.length || 0}`} />
        <Small label={text.smartStatus} value={smartStatus.label} />
      </div>

      <div style={recommendationBox}>
        <AlertTriangle size={17} color={smartStatus.color} />
        <p>
          <strong>{text.recommendedAction} : </strong>
          {monthlyNeed > 0
            ? `${text.recommendationMonthly} ${formatMoney(
                monthlyNeed,
                currency
              )}${text.perMonth}.`
            : text.recommendationDefault}
        </p>
      </div>

      <button onClick={onOpen} style={pathButton}>
        <Route size={17} />
        {text.continuePath}
      </button>
    </div>
  );
}

function Small({ label, value }) {
  return (
    <div style={smallStat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EmptyMessage({ text }) {
  return (
    <div style={emptyBox}>
      <Target color="var(--gold)" />
      <p style={muted}>{text}</p>
    </div>
  );
}

function getGoalProgress(goal) {
  if (Array.isArray(goal?.pathSteps) && goal.pathSteps.length > 0) {
    const done = goal.pathSteps.filter((step) => step.done).length;
    return Math.round((done / goal.pathSteps.length) * 100);
  }

  const target = Number(goal?.targetAmount || 0);
  if (target <= 0) return 0;

  return Math.min(
    100,
    Math.round((Number(goal?.currentAmount || 0) / target) * 100)
  );
}

function getGoalDate(goal) {
  return goal?.targetDate || goal?.deadline || goal?.endDate || "";
}

function getMonthsUntil(dateValue) {
  if (!dateValue) return null;

  const today = new Date();
  const target = new Date(`${dateValue}T12:00:00`);

  if (Number.isNaN(target.getTime())) return null;

  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 0;

  return Math.max(1, Math.ceil(diffDays / 30));
}

function getMonthlyNeed(goal) {
  const target = Number(goal?.targetAmount || 0);
  const current = Number(goal?.currentAmount || 0);
  const remaining = Math.max(0, target - current);
  const monthsLeft = getMonthsUntil(getGoalDate(goal));

  if (!monthsLeft || remaining <= 0) return 0;

  return Math.ceil(remaining / monthsLeft);
}

function getSmartGoalStatus(goal, progress, text) {
  const targetDate = getGoalDate(goal);
  const monthlyNeed = getMonthlyNeed(goal);
  const plannedMonthly = Number(
    goal?.monthlyAmount || goal?.monthlyContribution || goal?.recommendedMonthly || 0
  );

  if (progress >= 100) {
    return {
      key: "completed",
      label: text.statusCompleted,
      color: "var(--green)",
      background: "rgba(34,197,94,.12)",
    };
  }

  if (!targetDate) {
    return {
      key: "onTrack",
      label: text.onTrack,
      color: "var(--gold)",
      background: "rgba(212,175,55,.12)",
    };
  }

  if (monthlyNeed > 0 && plannedMonthly > 0) {
    if (plannedMonthly >= monthlyNeed * 1.15) {
      return {
        key: "ahead",
        label: text.ahead,
        color: "var(--green)",
        background: "rgba(34,197,94,.12)",
      };
    }

    if (plannedMonthly < monthlyNeed * 0.85) {
      return {
        key: "late",
        label: text.late,
        color: "var(--red)",
        background: "rgba(239,68,68,.12)",
      };
    }
  }

  const daysLeft = getDaysUntil(targetDate);

  if (daysLeft < 0) {
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
  if (daysLeft <= 0) return text.late;
  if (daysLeft < 60) return `${daysLeft} ${text.daysLeft}`;

  return `${Math.ceil(daysLeft / 30)} ${text.monthsLeft}`;
}

function getStartedLabel(goal, text) {
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

function getTopRecommendation(goals, text, currency) {
  const sortedGoals = [...goals].sort((a, b) => {
    const aNeed = getMonthlyNeed(a);
    const bNeed = getMonthlyNeed(b);

    return bNeed - aNeed;
  });

  const topGoal = sortedGoals[0];
  const need = getMonthlyNeed(topGoal);

  if (!topGoal || need <= 0) return text.recommendationDefault;

  return `${topGoal.title} : ${text.recommendationMonthly} ${formatMoney(
    need,
    currency
  )}${text.perMonth}.`;
}

const page = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "18px",
};

const flowCard = {
  ...card,
  display: "flex",
  gap: "12px",
  borderColor: "var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.15), var(--bg-card))",
};

const smartCard = {
  ...card,
  borderColor: "var(--gold)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.16), rgba(34,197,94,.08), var(--bg-card))",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
};

const catalogGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "12px",
};

const catalogTile = {
  width: "100%",
  minHeight: "142px",
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "14px",
  color: "var(--text-main)",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "10px",
};

const iconBox = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  display: "grid",
  placeItems: "center",
  background: "var(--bg-card)",
};

const statusPill = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontWeight: "900",
};

const goalList = {
  display: "grid",
  gap: "12px",
};

const goalRow = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "14px",
};

const goalRowTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "flex-start",
};

const activePill = {
  border: "1px solid var(--gold)",
  color: "var(--gold)",
  background: "rgba(212,175,55,.12)",
  borderRadius: "999px",
  padding: "6px 9px",
  fontSize: "12px",
  fontWeight: "900",
};

const startedBox = {
  marginTop: "10px",
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
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
  height: "10px",
  background: "var(--bg-card)",
  borderRadius: "999px",
  overflow: "hidden",
  marginTop: "12px",
};

const progressFill = {
  height: "100%",
  borderRadius: "999px",
};

const miniStats = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px",
  marginTop: "12px",
};

const smallStat = {
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "9px",
  background: "var(--bg-card)",
  display: "grid",
  gap: "4px",
  fontSize: "12px",
};

const recommendationBox = {
  marginTop: "12px",
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
  borderRadius: "14px",
  padding: "11px",
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  fontSize: "13px",
  color: "var(--text-main)",
};

const pathButton = {
  width: "100%",
  marginTop: "12px",
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.13)",
  color: "var(--gold)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const emptyBox = {
  background: "var(--bg-panel)",
  border: "1px dashed var(--border)",
  borderRadius: "16px",
  padding: "14px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "5px",
};

export default Objectifs;