import {
  Calendar,
  Flag,
  Lightbulb,
  Route,
  Sparkles,
  Target,
  Trophy,
  Wallet,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";

function GoalPremiumDashboard({ goals, currency, templates, onOpenJourney }) {
  const activeGoals = Array.isArray(goals) ? goals : [];

  const goalOfMoment =
    activeGoals.find((goal) => goal.highlighted) ||
    activeGoals.find((goal) => goal.progress >= 80 && goal.progress < 100) ||
    activeGoals[0];

  const totalTarget = activeGoals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );

  const totalCurrent = activeGoals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount || 0),
    0
  );

  const globalProgress =
    totalTarget > 0
      ? Math.min(100, Math.round((totalCurrent / totalTarget) * 100))
      : 0;

  const victories = activeGoals.filter((goal) => goal.progress >= 100).length;

  const nextVictory = activeGoals.find(
    (goal) => goal.progress >= 80 && goal.progress < 100
  );

  const firstGoal = [...activeGoals]
    .filter((goal) => goal.createdAt)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];

  const daysSinceStart = getDaysSinceStart(firstGoal?.createdAt);

  const color = goalOfMoment
    ? templates?.[goalOfMoment.category]?.color || "var(--gold)"
    : "var(--gold)";

  const nextAction = getNextAction(goalOfMoment, currency);

  return (
    <section style={dashboard}>
      <div style={head}>
        <div>
          <p style={eyebrow}>Objectifs Premium V11.5</p>
          <h1 style={title}>Centre de pilotage Objectifs</h1>
        </div>

        <Sparkles color="var(--gold)" />
      </div>

      <div style={actionCard}>
        <Lightbulb size={20} color="var(--gold)" />
        <div>
          <strong>Prochaine action recommandée</strong>
          <p style={muted}>{nextAction}</p>
        </div>
      </div>

      <div style={smartJourneyStrip}>
        <div>
          <strong>Smart Journey actif</strong>
          <p style={muted}>
            {firstGoal
              ? `Parcours commencé il y a ${daysSinceStart} jour${
                  daysSinceStart > 1 ? "s" : ""
                }.`
              : "Créez un objectif pour démarrer le parcours."}
          </p>
        </div>

        <button onClick={onOpenJourney} style={journeyBtn}>
          <Route size={16} />
          Parcours
        </button>
      </div>

      {goalOfMoment ? (
        <div style={{ ...momentCard, borderColor: color }}>
          {goalOfMoment.highlighted && (
            <div style={mainBadge}>⭐ Objectif principal</div>
          )}

          <div style={momentTop}>
            <div>
              <strong>{goalOfMoment.title}</strong>
              <p style={muted}>
                {goalOfMoment.categoryLabel ||
                  templates?.[goalOfMoment.category]?.label}
                {goalOfMoment.option ? ` • ${goalOfMoment.option}` : ""}
              </p>
            </div>

            <ScoreRing value={goalOfMoment.progress} color={color} />
          </div>

          <div style={barBg}>
            <div
              style={{
                ...barFill,
                width: `${goalOfMoment.progress}%`,
                background: color,
              }}
            />
          </div>

          <p style={muted}>
            Reste : {formatMoney(goalOfMoment.remaining, currency)} • Statut :{" "}
            {goalOfMoment.status}
          </p>
        </div>
      ) : (
        <div style={emptyCard}>
          <Target color="var(--gold)" />
          <strong>Aucun objectif actif</strong>
          <p style={muted}>Créez un objectif pour activer le tableau premium.</p>
        </div>
      )}

      <div style={grid}>
        <DashStat
          icon={<Target size={18} />}
          label="Objectifs"
          value={activeGoals.length}
          color="var(--gold)"
        />
        <DashStat
          icon={<Flag size={18} />}
          label="Progression"
          value={`${globalProgress}%`}
          color="var(--green)"
        />
        <DashStat
          icon={<Trophy size={18} />}
          label="Victoires"
          value={victories}
          color="var(--blue)"
        />
        <DashStat
          icon={<Wallet size={18} />}
          label="Origine"
          value="Profil financier"
          color="var(--purple)"
        />
      </div>

      <div style={journeyStats}>
        <MiniJourneyStat
          icon={<Calendar size={16} />}
          label="Départ"
          value={firstGoal ? formatDate(firstGoal.createdAt) : "—"}
        />

        <MiniJourneyStat
          icon={<Route size={16} />}
          label="Jours"
          value={firstGoal ? daysSinceStart : 0}
        />
      </div>

      {nextVictory && (
        <p style={victoryHint}>
          🔥 Presque atteint : <strong>{nextVictory.title}</strong>
        </p>
      )}
    </section>
  );
}

function DashStat({ icon, label, value, color }) {
  return (
    <div style={{ ...dashStat, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function MiniJourneyStat({ icon, label, value }) {
  return (
    <div style={miniJourneyStat}>
      <span style={{ color: "var(--gold)" }}>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function ScoreRing({ value, color }) {
  const safeValue = Math.min(100, Math.max(0, Number(value || 0)));
  const degree = Math.round((safeValue / 100) * 360);

  return (
    <div
      style={{
        ...ring,
        background: `conic-gradient(${color} ${degree}deg, rgba(255,255,255,.12) 0deg)`,
      }}
    >
      <div style={ringInner}>{safeValue}%</div>
    </div>
  );
}

function getNextAction(goal, currency) {
  if (!goal) return "Créer un premier objectif simple pour lancer le parcours.";

  if (goal.progress >= 100) {
    return "Objectif atteint. Choisir le prochain objectif à mettre en avant.";
  }

  const monthly = Number(goal.monthlyContribution || 0);

  if (monthly > 0) {
    return `Mettre de côté ${formatMoney(monthly, currency)} pour ${goal.title}.`;
  }

  if (goal.remaining > 0) {
    return `Ajouter un dépôt réaliste à ${goal.title} pour garder le rythme.`;
  }

  return `Continuer à suivre ${goal.title}.`;
}

function getDaysSinceStart(createdAt) {
  if (!createdAt) return 0;

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return 0;

  return Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
}

function formatDate(dateValue) {
  if (!dateValue) return "—";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const dashboard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.22), transparent 34%), var(--bg-card)",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "18px",
  marginTop: "16px",
};

const head = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  alignItems: "flex-start",
};

const eyebrow = {
  margin: 0,
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: "900",
};

const title = {
  margin: "4px 0 0",
  fontSize: "22px",
};

const actionCard = {
  marginTop: "16px",
  background: "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-panel))",
  border: "1px solid var(--gold)",
  borderRadius: "18px",
  padding: "14px",
  display: "grid",
  gridTemplateColumns: "28px 1fr",
  gap: "10px",
  alignItems: "start",
};

const smartJourneyStrip = {
  background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-panel))",
  border: "1px solid var(--green)",
  borderRadius: "18px",
  padding: "14px",
  marginTop: "14px",
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "10px",
  alignItems: "center",
};

const journeyBtn = {
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "10px 12px",
  fontWeight: "900",
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
};

const momentCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--gold)",
  borderRadius: "20px",
  padding: "16px",
  marginTop: "16px",
};

const mainBadge = {
  display: "inline-flex",
  marginBottom: "10px",
  padding: "7px 10px",
  borderRadius: "999px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: "900",
};

const momentTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  alignItems: "center",
};

const emptyCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "16px",
  marginTop: "16px",
  display: "grid",
  gap: "8px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))",
  gap: "10px",
  marginTop: "14px",
};

const dashStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "5px",
  minWidth: 0,
};

const journeyStats = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))",
  gap: "10px",
  marginTop: "12px",
};

const miniJourneyStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "5px",
};

const ring = {
  width: "66px",
  height: "66px",
  borderRadius: "999px",
  padding: "7px",
  flex: "0 0 auto",
};

const ringInner = {
  width: "100%",
  height: "100%",
  borderRadius: "999px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  display: "grid",
  placeItems: "center",
  fontWeight: "900",
  fontSize: "14px",
};

const barBg = {
  height: "10px",
  background: "var(--bg-card)",
  borderRadius: "999px",
  marginTop: "14px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const victoryHint = {
  margin: "14px 0 0",
  color: "var(--gold)",
  fontSize: "13px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

export default GoalPremiumDashboard;