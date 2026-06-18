import {
  AlertTriangle,
  CheckCircle,
  Clock3,
  CreditCard,
  Flag,
  PiggyBank,
  Route,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";

function MonPlan({
  financeData,
  selectedGoals,
  settings,
  setCurrentPage,
  activityHistory,
}) {
  const currency = settings?.currency || "CAD";

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];
  const history = Array.isArray(activityHistory) ? activityHistory : [];

  const lastActivity = history[0];
  const lastVictory = history.find((item) => item.type === "victoire");
  const firstGoal = [...goals].sort(
    (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  )[0];

  const debtTotal = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort(
      (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
    )[0];

  const totalGoalTarget = goals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );

  const totalGoalCurrent = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount || 0),
    0
  );

  const goalProgress =
    totalGoalTarget > 0
      ? Math.min(100, Math.round((totalGoalCurrent / totalGoalTarget) * 100))
      : 0;

  const mainGoal = goals.find((goal) => goal.highlighted) || goals[0];

  const closestGoal = [...goals]
    .filter((goal) => Number(goal.targetAmount || 0) > 0)
    .map((goal) => ({
      ...goal,
      progress: Math.min(
        100,
        Math.round(
          (Number(goal.currentAmount || 0) / Number(goal.targetAmount || 0)) *
            100
        )
      ),
    }))
    .sort((a, b) => b.progress - a.progress)[0];

  const achievedGoals = goals.filter(
    (goal) =>
      Number(goal.targetAmount || 0) > 0 &&
      Number(goal.currentAmount || 0) >= Number(goal.targetAmount || 0)
  );

  const nextAction = getNextAction({
    priorityDebt,
    debtTotal,
    mainGoal,
    closestGoal,
    achievedGoals,
    currency,
  });

  return (
    <div className="native-page">
      <h1>Mon Plan</h1>

      <p style={muted}>
        Votre feuille de route intelligente pour avancer sans vous disperser.
      </p>

      <section style={priorityCard}>
        <div style={header}>
          <TrendingUp color="var(--gold)" />
          <h2>Priorité automatique</h2>
        </div>

        <p>
          <strong>{nextAction.title}</strong>
        </p>

        <p style={muted}>{nextAction.description}</p>

        <button
          onClick={() => setCurrentPage(nextAction.page)}
          style={goldButton}
        >
          {nextAction.button}
        </button>
      </section>

      {lastActivity && (
        <section style={card}>
          <div style={header}>
            <Clock3 color="var(--blue)" />
            <h2>Dernière activité</h2>
          </div>

          <span style={typeBadge}>{labelType(lastActivity.type)}</span>

          <p>
            <strong>{lastActivity.title}</strong>
          </p>

          <p style={muted}>{lastActivity.message}</p>

          <small style={mutedSmall}>{formatDate(lastActivity.createdAt)}</small>

          <button
            onClick={() => setCurrentPage("historique")}
            style={blueButton}
          >
            Voir l’historique
          </button>
        </section>
      )}

      {lastVictory && (
        <section style={victoryCard}>
          <Trophy color="var(--gold)" />

          <div>
            <h2>Dernière victoire</h2>
            <p>
              <strong>{lastVictory.title}</strong>
            </p>
            <p style={muted}>{lastVictory.message}</p>
          </div>
        </section>
      )}

      {firstGoal && (
        <section style={disciplineCard}>
          <Flag color="var(--gold)" />

          <div>
            <h2>Discipline OnJarama</h2>
            <p style={muted}>
              Vous avez commencé votre parcours {getStartedLabel(firstGoal.createdAt)}.
            </p>
            <p style={muted}>
              Chaque dépôt vous rapproche d’une vie plus stable et mieux organisée.
            </p>
          </div>
        </section>
      )}

      {mainGoal && (
        <section style={card}>
          <div style={header}>
            <Flag color="var(--gold)" />
            <h2>Objectif principal</h2>
          </div>

          <p>
            <strong>{mainGoal.title}</strong>
          </p>

          <p style={muted}>
            {mainGoal.categoryLabel || "Objectif"}{" "}
            {mainGoal.option ? `• ${mainGoal.option}` : ""}
          </p>

          <ProgressLine goal={mainGoal} currency={currency} />

          <button
            onClick={() => setCurrentPage("objectifs")}
            style={greenButton}
          >
            Gérer cet objectif
          </button>
        </section>
      )}

      {closestGoal && (
        <section style={successCard}>
          <Trophy color="var(--green)" />

          <div style={{ flex: 1 }}>
            <h2>Le plus proche d’être atteint</h2>

            <p>
              <strong>{closestGoal.title}</strong>
            </p>

            <p style={muted}>Progression : {closestGoal.progress}%</p>

            {closestGoal.progress >= 100 ? (
              <p style={victoryText}>🏆 Objectif atteint</p>
            ) : closestGoal.progress >= 80 ? (
              <p style={almostText}>🔥 Presque atteint</p>
            ) : (
              <p style={muted}>Continue doucement, le chemin est déjà tracé.</p>
            )}
          </div>
        </section>
      )}

      <section style={card}>
        <div style={header}>
          <CreditCard color={debtTotal > 0 ? "var(--red)" : "var(--green)"} />
          <h2>Étape 1 — Réduire les dettes</h2>
        </div>

        {priorityDebt ? (
          <>
            <p>
              Dette prioritaire : <strong>{priorityDebt.name}</strong>
            </p>

            <p style={muted}>
              Taux : {priorityDebt.interestRate}% • Solde :{" "}
              {formatMoney(priorityDebt.balance, currency)}
            </p>
          </>
        ) : (
          <p style={muted}>Aucune dette prioritaire détectée.</p>
        )}

        <strong>{formatMoney(debtTotal, currency)}</strong>

        <button onClick={() => setCurrentPage("dettes")} style={redButton}>
          Voir mes dettes
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <PiggyBank color="var(--green)" />
          <h2>Étape 2 — Protéger votre base</h2>
        </div>

        <p style={muted}>
          Garder une petite épargne aide à éviter de retourner au crédit en cas
          d’imprévu.
        </p>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>Étape 3 — Avancer les objectifs</h2>
        </div>

        <p>
          <strong>{goals.length}</strong> objectifs actifs
        </p>

        <p style={muted}>
          Progression globale : <strong>{goalProgress}%</strong>
        </p>

        <MiniBar progress={goalProgress} />

        <button
          onClick={() => setCurrentPage("objectifs")}
          style={greenButton}
        >
          Gérer mes objectifs
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Route color="var(--blue)" />
          <h2>Étape 4 — Suivre le parcours</h2>
        </div>

        <p style={muted}>
          Le parcours vous aide à garder la discipline : une action claire à la
          fois.
        </p>

        <button onClick={() => setCurrentPage("parcours")} style={blueButton}>
          Voir mon parcours
        </button>
      </section>

      {debtTotal > 0 && (
        <section style={warningCard}>
          <AlertTriangle color="var(--red)" />
          <div>
            <h2>Rappel discipline</h2>
            <p style={muted}>
              Évitez d’ajouter un nouveau financement tant que la dette
              prioritaire reste élevée.
            </p>
          </div>
        </section>
      )}

      {achievedGoals.length > 0 && (
        <section style={successCard}>
          <Sparkles color="var(--gold)" />

          <div>
            <h2>Victoire enregistrée</h2>

            <p style={muted}>
              {achievedGoals.length} objectif
              {achievedGoals.length > 1 ? "s" : ""} atteint
              {achievedGoals.length > 1 ? "s" : ""}. OnJarama garde le cap.
            </p>
          </div>
        </section>
      )}

      <section style={successCard}>
        <CheckCircle color="var(--green)" />

        <div>
          <h2>Objectif final</h2>

          <p style={muted}>
            Moins de pression, plus de contrôle, et des projets personnels qui
            avancent réellement.
          </p>
        </div>
      </section>
    </div>
  );
}

function getNextAction({
  priorityDebt,
  debtTotal,
  mainGoal,
  closestGoal,
  achievedGoals,
  currency,
}) {
  if (priorityDebt) {
    return {
      title: `Réduire ${priorityDebt.name}`,
      description: `Cette dette a le taux le plus élevé (${priorityDebt.interestRate}%). Solde : ${formatMoney(
        priorityDebt.balance,
        currency
      )}.`,
      button: "Voir mes dettes",
      page: "dettes",
    };
  }

  if (closestGoal && closestGoal.progress >= 80 && closestGoal.progress < 100) {
    return {
      title: `Finaliser ${closestGoal.title}`,
      description:
        "Cet objectif est presque atteint. Un petit effort ciblé peut créer une vraie victoire.",
      button: "Voir mes objectifs",
      page: "objectifs",
    };
  }

  if (mainGoal) {
    return {
      title: `Avancer ${mainGoal.title}`,
      description:
        "Votre objectif principal est identifié. Gardez le rythme sans vous disperser.",
      button: "Continuer l’objectif",
      page: "objectifs",
    };
  }

  if (achievedGoals.length > 0 && debtTotal <= 0) {
    return {
      title: "Consolider vos victoires",
      description:
        "Vous avez déjà atteint un objectif. La prochaine étape est de choisir un nouveau cap.",
      button: "Créer un objectif",
      page: "objectifs",
    };
  }

  return {
    title: "Créer votre premier objectif",
    description:
      "Ajoutez un objectif pour que Mon Plan puisse construire une priorité automatique.",
    button: "Créer un objectif",
    page: "objectifs",
  };
}

function ProgressLine({ goal, currency }) {
  const target = Number(goal.targetAmount || 0);
  const current = Number(goal.currentAmount || 0);
  const progress =
    target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  return (
    <>
      <p style={muted}>
        {formatMoney(current, currency)} / {formatMoney(target, currency)}
      </p>
      <MiniBar progress={progress} />
      <p style={muted}>Progression : {progress}%</p>
    </>
  );
}

function MiniBar({ progress }) {
  return (
    <div style={barBg}>
      <div style={{ ...barFill, width: `${progress}%` }} />
    </div>
  );
}

function labelType(type) {
  const labels = {
    objectif: "🎯 Objectif",
    depot: "💰 Dépôt",
    victoire: "🏆 Victoire",
    finance: "📊 Finance",
    reglages: "⚙️ Réglages",
  };

  return labels[type] || "Action";
}

function formatDate(value) {
  if (!value) return "Date inconnue";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date inconnue";

  return date.toLocaleString("fr-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStartedLabel(createdAt) {
  if (!createdAt) return "aujourd’hui";

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return "aujourd’hui";

  const diffMs = now.getTime() - start.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (days === 0) return "aujourd’hui";
  if (days === 1) return "il y a 1 jour";

  return `il y a ${days} jours`;
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const priorityCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.18), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const disciplineCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const warningCard = {
  background: "linear-gradient(135deg, rgba(239,68,68,.14), var(--bg-card))",
  border: "1px solid var(--red)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const successCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.18), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const victoryCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.18), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
};

const barBg = {
  height: "10px",
  background: "var(--bg-main)",
  borderRadius: "999px",
  marginTop: "12px",
  overflow: "hidden",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
  background: "var(--green)",
};

const typeBadge = {
  display: "inline-block",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "5px 9px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const goldButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  fontWeight: "bold",
};

const greenButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const blueButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--blue)",
  background: "rgba(56,189,248,.14)",
  color: "var(--blue)",
  fontWeight: "bold",
};

const redButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--red)",
  background: "rgba(239,68,68,.12)",
  color: "var(--red)",
  fontWeight: "bold",
};

const almostText = {
  color: "var(--gold)",
  fontWeight: "bold",
  marginTop: "8px",
};

const victoryText = {
  color: "var(--green)",
  fontWeight: "bold",
  marginTop: "8px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "12px",
  marginTop: "8px",
  display: "block",
};

export default MonPlan;