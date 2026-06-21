import { useMemo } from "react";
import {
  Car,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Home,
  PiggyBank,
  Plane,
  Route,
  Target,
  Trophy,
  Users,
  Briefcase,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    title: "Mes objectifs",
    subtitle:
      "Choisissez une destination, simulez le chemin, puis activez seulement si le plan vous convient.",
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
    steps: "étapes",
    flowTitle: "Flux V12.2",
    flowText: "Objectif → Simulation → Activation → Parcours → Progression → Historique.",
  },
  EN: {
    title: "My goals",
    subtitle:
      "Choose a destination, simulate the path, then activate it only if the plan works for you.",
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
    steps: "steps",
    flowTitle: "V12.2 flow",
    flowText: "Goal → Simulation → Activation → Path → Progress → History.",
  },
  ES: {
    title: "Mis objetivos",
    subtitle:
      "Elige un destino, simula el camino y actívalo solo si el plan te conviene.",
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
    steps: "etapas",
    flowTitle: "Flujo V12.2",
    flowText: "Objetivo → Simulación → Activación → Recorrido → Progreso → Historial.",
  },
};

function getGoalCatalog(language) {
  const catalogText = {
    FR: {
      voyage: ["Voyage", "Billet, séjour, famille, marge de sécurité."],
      maison: ["Maison", "Construction, rénovation, terrain ou projet solaire."],
      auto: ["Auto", "Achat, réparation, remplacement ou mise de fonds."],
      dette: ["Dette", "Carte, prêt personnel, marge ou remboursement prioritaire."],
      epargne: ["Épargne", "Fonds d’urgence, sécurité ou réserve familiale."],
      famille: ["Famille", "Soutien, événement, école ou besoin important."],
      business: ["Projet personnel", "Formation, lancement, matériel ou projet libre."],
      libre: ["Objectif libre", "Un objectif totalement personnalisé."],
    },
    EN: {
      voyage: ["Travel", "Ticket, stay, family and safety margin."],
      maison: ["Home", "Construction, renovation, land or solar project."],
      auto: ["Car", "Purchase, repair, replacement or down payment."],
      dette: ["Debt", "Card, personal loan, credit line or priority repayment."],
      epargne: ["Savings", "Emergency fund, security or family reserve."],
      famille: ["Family", "Support, event, school or important need."],
      business: ["Personal project", "Training, launch, equipment or open project."],
      libre: ["Custom goal", "A fully personalized goal."],
    },
    ES: {
      voyage: ["Viaje", "Boleto, estadía, familia y margen de seguridad."],
      maison: ["Casa", "Construcción, renovación, terreno o proyecto solar."],
      auto: ["Auto", "Compra, reparación, reemplazo o pago inicial."],
      dette: ["Deuda", "Tarjeta, préstamo personal, línea de crédito o pago prioritario."],
      epargne: ["Ahorro", "Fondo de emergencia, seguridad o reserva familiar."],
      famille: ["Familia", "Apoyo, evento, escuela o necesidad importante."],
      business: ["Proyecto personal", "Formación, lanzamiento, material o proyecto libre."],
      libre: ["Objetivo libre", "Un objetivo totalmente personalizado."],
    },
  };

  const text = catalogText[language] || catalogText.FR;

  return [
    { id: "voyage", title: text.voyage[0], subtitle: text.voyage[1], icon: <Plane />, color: "var(--gold)", defaultAmount: 3500, defaultMonthly: 500 },
    { id: "maison", title: text.maison[0], subtitle: text.maison[1], icon: <Home />, color: "var(--green)", defaultAmount: 10000, defaultMonthly: 700 },
    { id: "auto", title: text.auto[0], subtitle: text.auto[1], icon: <Car />, color: "var(--blue)", defaultAmount: 8000, defaultMonthly: 450 },
    { id: "dette", title: text.dette[0], subtitle: text.dette[1], icon: <CreditCard />, color: "var(--red)", defaultAmount: 5000, defaultMonthly: 500 },
    { id: "epargne", title: text.epargne[0], subtitle: text.epargne[1], icon: <PiggyBank />, color: "var(--green)", defaultAmount: 3000, defaultMonthly: 250 },
    { id: "famille", title: text.famille[0], subtitle: text.famille[1], icon: <Users />, color: "var(--purple)", defaultAmount: 2500, defaultMonthly: 300 },
    { id: "business", title: text.business[0], subtitle: text.business[1], icon: <Briefcase />, color: "var(--blue)", defaultAmount: 4000, defaultMonthly: 350 },
    { id: "libre", title: text.libre[0], subtitle: text.libre[1], icon: <Target />, color: "var(--gold)", defaultAmount: 1000, defaultMonthly: 150 },
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
              <span style={{ ...iconBox, color: template.color }}>{template.icon}</span>
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

  return (
    <div style={goalRow}>
      <div style={goalRowTop}>
        <div>
          <strong>{completed ? "✓ " : ""}{goal.title}</strong>
          <p style={mutedSmall}>{goal.option || goal.categoryLabel || goal.category}</p>
        </div>
        <span style={completed ? completedPill : activePill}>
          {completed ? text.statusCompleted : text.statusActive}
        </span>
      </div>

      <div style={progressBg}>
        <div
          style={{
            ...progressFill,
            width: `${progress}%`,
            background: completed ? "var(--green)" : "var(--gold)",
          }}
        />
      </div>

      <div style={miniStats}>
        <Small label={text.progress} value={`${progress}%`} />
        <Small label={text.remaining} value={formatMoney(remaining, currency)} />
        <Small label={text.target} value={formatMoney(goal.targetAmount || 0, currency)} />
        <Small label={text.steps} value={`${doneSteps}/${steps.length || 0}`} />
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
  background:
    "linear-gradient(135deg, rgba(212,175,55,.15), var(--bg-card))",
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

const completedPill = {
  ...activePill,
  borderColor: "var(--green)",
  color: "var(--green)",
  background: "rgba(34,197,94,.12)",
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
